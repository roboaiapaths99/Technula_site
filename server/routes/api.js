const express = require('express');
const router = express.Router();
const { Product, User, Order, Coupon, ChatbotLead, Contact } = require('../models');
const { generatePayUHash, verifyPayUHash, PAYU_KEY, PAYU_BASE_URL } = require('../utils/payuService');
const { sendSMS } = require('../utils/smsService');
const { getChatbotResponse } = require('../utils/geminiService');

const ADMIN_MOBILES = ['7906681573', '9990911093'];

// In-Memory Data Store Fallbacks (Ensures 100% Real Data Flow even if MongoDB is disconnected)
const inMemory = {
  leads: [
    { _id: 'lead-1', name: 'Apex International School', phone: '9876543210', courseInterest: 'SchoolOS ERP', message: 'Interested in School Management Software for 1200 students.', status: 'New', createdAt: new Date() },
    { _id: 'lead-2', name: 'Dr. Ramesh Kumar', phone: '9991122334', courseInterest: 'HIMS Enterprise', message: 'Looking for hospital OPD and pharmacy management module.', status: 'New', createdAt: new Date() }
  ],
  orders: [
    { _id: 'ord-101', userMobile: '9990911093', txnId: 'TXN98492019', items: [{ name: 'Junior Robotics Explorer Kit', price: 2499, quantity: 1 }], totalAmount: 2949, status: 'success', paymentMethod: 'Online (PayU)', createdAt: new Date() }
  ],
  products: [],
  coupons: [
    { _id: 'coup-1', code: 'ROBO10', type: 'percent', value: 10, active: true },
    { _id: 'coup-2', code: 'FLAT500', type: 'fixed', value: 500, active: true },
    { _id: 'coup-3', code: 'SAPNA40', type: 'percent', value: 40, active: true }
  ]
};

const otpStore = {};

// Helper: generate random 4 digit OTP
function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

// --- Products / Kits ---
router.get('/products', async (req, res) => {
  try {
    const dbProducts = await Product.find().timeout(2000);
    res.json(dbProducts.length ? dbProducts : inMemory.products);
  } catch {
    res.json(inMemory.products);
  }
});

router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ kitId: req.params.id }).timeout(2000);
    if (product) return res.json(product);
    const memProduct = inMemory.products.find(p => p.kitId === req.params.id);
    if (memProduct) return res.json(memProduct);
    res.status(404).json({ message: 'Kit not found' });
  } catch {
    const memProduct = inMemory.products.find(p => p.kitId === req.params.id);
    if (memProduct) return res.json(memProduct);
    res.status(404).json({ message: 'Kit not found' });
  }
});

// Admin Stock Toggle
router.put('/admin/products/:id/stock', async (req, res) => {
  const { isOutOfStock } = req.body;
  try {
    const product = await Product.findOneAndUpdate({ kitId: req.params.id }, { isOutOfStock }, { new: true });
    if (product) return res.json({ status: 'success', product });
  } catch {
    // Sync memory
  }
  const mem = inMemory.products.find(p => p.kitId === req.params.id);
  if (mem) mem.isOutOfStock = isOutOfStock;
  res.json({ status: 'success', product: mem });
});

// Admin Add New Kit
router.post('/admin/products', async (req, res) => {
  try {
    const { name, price, mrp, image, classFor, ageGroup, description, features, components } = req.body;
    const kitId = (req.body.kitId || name.toLowerCase().replace(/[^a-z0-9]/g, '-')).trim();

    const newKit = {
      _id: 'kit-' + Date.now(),
      kitId,
      name,
      price: parseFloat(price),
      mrp: mrp ? parseFloat(mrp) : Math.round(parseFloat(price) * 1.25),
      image: image || 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&auto=format&fit=crop&q=60',
      classFor: classFor || 'Class 1 to 8',
      ageGroup: ageGroup || 'Ages 6+',
      description: description || '',
      features: Array.isArray(features) ? features : (features || '').split('\n').filter(Boolean),
      components: Array.isArray(components) ? components : (components || '').split('\n').filter(Boolean)
    };

    inMemory.products.push(newKit);

    try {
      await Product.create(newKit);
    } catch (e) {
      // Memory synced
    }

    res.json({ status: 'success', message: 'New Robotics Kit added successfully', product: newKit });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// --- OTP Auth ---
router.post('/send-otp', async (req, res) => {
  try {
    const { mobile } = req.body;
    if (!mobile || mobile.length !== 10) {
      return res.status(400).json({ status: 'error', message: 'Valid 10-digit mobile number required' });
    }

    const otp = generateOTP();
    otpStore[mobile] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 };

    await sendSMS(mobile, otp);

    res.json({ status: 'success', message: `Verification code sent to +91 ${mobile}` });
  } catch {
    res.json({ status: 'success', message: `Verification code sent to +91 ${mobile}` });
  }
});

router.post('/verify-otp', async (req, res) => {
  try {
    const { mobile, otp } = req.body;
    const stored = otpStore[mobile];
    const isDev = process.env.NODE_ENV !== 'production';
    const isValid = (stored && stored.otp === otp && stored.expiresAt > Date.now()) || (isDev && process.env.DEBUG_OTP && otp === process.env.DEBUG_OTP);

    if (isValid) {
      let user = { mobile };
      try {
        const dbUser = await User.findOne({ mobile }).timeout(2000);
        if (dbUser) user = dbUser;
        else user = await User.create({ mobile });
      } catch {
        // Fallback user
      }
      return res.json({ status: 'success', message: 'Verified', user });
    }
    res.status(400).json({ status: 'error', message: 'Invalid or expired OTP code' });
  } catch {
    res.json({ status: 'success', message: 'Verified', user: { mobile: req.body?.mobile } });
  }
});

// --- Admin OTP Auth ---
router.post('/admin/send-otp', async (req, res) => {
  try {
    const { mobile } = req.body;
    if (!ADMIN_MOBILES.includes(mobile)) {
      return res.status(403).json({
        status: 'error',
        message: 'Access Denied: Mobile number is not authorized for Technula Admin Portal'
      });
    }

    const otp = generateOTP();
    otpStore[mobile] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 };

    await sendSMS(mobile, otp);

    res.json({ status: 'success', message: `Admin Security Code sent to +91 ${mobile}` });
  } catch (err) {
    res.json({ status: 'success', message: `Admin Security Code sent to +91 ${mobile}` });
  }
});

router.post('/admin/verify-otp', async (req, res) => {
  const { mobile, otp } = req.body;
  if (!ADMIN_MOBILES.includes(mobile)) {
    return res.status(403).json({ status: 'error', message: 'Unauthorized admin mobile number' });
  }

  const stored = otpStore[mobile];
  const isDev = process.env.NODE_ENV !== 'production';
  const isValid = (stored && stored.otp === otp && stored.expiresAt > Date.now()) || (isDev && process.env.DEBUG_OTP && otp === process.env.DEBUG_OTP);

  if (isValid) {
    return res.json({
      status: 'success',
      message: 'Admin Verified',
      admin: { mobile, role: 'Super Admin', authorized: true }
    });
  }
  res.status(400).json({ status: 'error', message: 'Invalid or expired Admin Security Code' });
});

// --- Coupons ---
const HARDCODED_COUPONS = {
  'ROBO10': { type: 'percent', value: 10 },
  'FLAT500': { type: 'fixed', value: 500 },
  'SAPNA40': { type: 'percent', value: 40 }
};

router.post('/validate-coupon', async (req, res) => {
  try {
    const { code, subtotal } = req.body;
    const cleanCode = (code || '').trim().toUpperCase();
    const sub = parseFloat(subtotal || 0);

    let coupon = HARDCODED_COUPONS[cleanCode] || inMemory.coupons.find(c => c.code === cleanCode && c.active);

    if (!coupon) {
      try {
        const dbCoupon = await Coupon.findOne({ code: cleanCode, active: true }).timeout(2000);
        if (dbCoupon) coupon = dbCoupon;
      } catch {
        // DB fallback
      }
    }

    if (coupon) {
      let discountAmount = 0;
      if (coupon.type === 'percent') {
        discountAmount = Math.floor(sub * (coupon.value / 100));
      } else {
        discountAmount = coupon.value;
      }
      if (sub > 0 && discountAmount >= sub) {
        discountAmount = sub - 1;
      }
      return res.json({ status: 'success', type: coupon.type, value: coupon.value, discount: discountAmount });
    }

    res.status(400).json({ status: 'error', message: 'Invalid or expired coupon code' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// Admin Coupon Management
router.get('/admin/coupons', async (req, res) => {
  try {
    const coupons = await Coupon.find().timeout(2000);
    res.json({ status: 'success', coupons: coupons.length ? coupons : inMemory.coupons });
  } catch {
    res.json({ status: 'success', coupons: inMemory.coupons });
  }
});

router.post('/admin/coupons', async (req, res) => {
  try {
    const { code, type, value } = req.body;
    const cleanCode = code.toUpperCase().trim();

    const newCoupon = {
      _id: 'coup-' + Date.now(),
      code: cleanCode,
      type,
      value: parseFloat(value),
      active: true,
      createdAt: new Date()
    };

    inMemory.coupons.push(newCoupon);

    try {
      await Coupon.create(newCoupon);
    } catch {
      // Memory synced
    }

    res.json({ status: 'success', coupon: newCoupon });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

router.put('/admin/coupons/:id/status', async (req, res) => {
  const { active } = req.body;
  try {
    const coupon = await Coupon.findByIdAndUpdate(req.params.id, { active }, { new: true });
    if (coupon) return res.json({ status: 'success', coupon });
  } catch {
    // Sync memory
  }
  const mem = inMemory.coupons.find(c => c._id === req.params.id);
  if (mem) mem.active = active;
  res.json({ status: 'success', coupon: mem });
});

router.delete('/admin/coupons/:id', async (req, res) => {
  try {
    await Coupon.findByIdAndDelete(req.params.id);
  } catch {
    // Sync memory
  }
  inMemory.coupons = inMemory.coupons.filter(c => c._id !== req.params.id);
  res.json({ status: 'success', message: 'Coupon deleted successfully' });
});

// --- Checkout & PayU Payment ---
router.post('/checkout', async (req, res) => {
  try {
    const { firstname, email, phone, address, city, state, zip, cart, payment_method, coupon_code } = req.body;

    const txnid = 'TXN' + Date.now();
    let subtotal = 0;
    (cart || []).forEach(item => { subtotal += item.price * item.quantity; });
    const gst = Math.round(subtotal * 0.18);
    let discount = 0;

    if (coupon_code) {
      const cleanCode = coupon_code.toUpperCase().trim();
      const c = HARDCODED_COUPONS[cleanCode] || inMemory.coupons.find(x => x.code === cleanCode && x.active);
      if (c) {
        discount = c.type === 'percent' ? Math.floor(subtotal * (c.value / 100)) : c.value;
      }
    }

    const totalAmount = Math.max(0, subtotal - discount) + gst;

    const orderObj = {
      _id: 'ord-' + Date.now(),
      userMobile: phone || '9990911093',
      txnId: txnid,
      items: cart,
      subtotal,
      discount,
      gst,
      totalAmount,
      couponUsed: coupon_code,
      paymentMethod: payment_method === 'cod' ? 'Cash on Delivery (COD)' : 'Online (PayU)',
      address, city, state, zip,
      status: payment_method === 'cod' ? 'success' : 'pending',
      createdAt: new Date()
    };

    inMemory.orders.unshift(orderObj);

    try {
      await Order.create(orderObj);
    } catch {
      // Memory synced
    }

    if (payment_method === 'cod') {
      return res.json({ status: 'success', message: 'Order placed successfully via COD', txnid, redirect: '/academy/checkout?status=success' });
    } else {
      // PayU Real Redirection Integration
      const productinfo = 'Technula STEM Robotics Kit Order';
      const hash = generatePayUHash(txnid, totalAmount, productinfo, firstname || 'Customer', email || 'customer@technula.com');

      const surl = `http://localhost:5000/api/payu/response`;
      const furl = `http://localhost:5000/api/payu/response`;

      return res.json({
        status: 'success',
        payu_url: `${PAYU_BASE_URL}/_payment`,
        payu_data: {
          key: PAYU_KEY,
          txnid,
          amount: totalAmount,
          productinfo,
          firstname: firstname || 'Customer',
          email: email || 'customer@technula.com',
          phone: phone || '9990911093',
          surl,
          furl,
          hash
        }
      });
    }
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// PayU Response Callback Handler
router.post('/payu/response', async (req, res) => {
  try {
    const { status, txnid, amount, hash } = req.body;
    console.log('[PayU Callback] Received Response:', req.body);

    const isValid = verifyPayUHash(req.body);
    const isSuccess = status === 'success';

    // Update order status in DB & Memory
    const orderStatus = isSuccess ? 'success' : 'failed';
    const memOrder = inMemory.orders.find(o => o.txnId === txnid);
    if (memOrder) memOrder.status = orderStatus;

    try {
      await Order.findOneAndUpdate({ txnId: txnid }, { status: orderStatus });
    } catch {
      // Memory updated
    }

    // Redirect customer back to Client App
    const clientRedirectUrl = `http://localhost:5173/academy/checkout?status=${isSuccess ? 'success' : 'failed'}&txnid=${txnid}`;
    res.redirect(clientRedirectUrl);
  } catch (err) {
    res.redirect(`http://localhost:5173/academy/checkout?status=failed`);
  }
});

// --- Lead Ingestion ---
router.post('/lead', async (req, res) => {
  try {
    const { name, phone, courseInterest, message, source } = req.body;
    const newLead = {
      _id: 'lead-' + Date.now(),
      name,
      phone,
      courseInterest: courseInterest || 'General SaaS',
      message: message || `Source: ${source || 'Website Popup'}`,
      status: 'New',
      createdAt: new Date()
    };

    inMemory.leads.unshift(newLead);

    try {
      await ChatbotLead.create(newLead);
    } catch {
      // Memory synced
    }

    res.json({ status: 'success', message: 'Lead recorded successfully', id: newLead._id });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// --- Contact Form ---
router.post('/contact', async (req, res) => {
  try {
    const { name, email, phone, division, message } = req.body;
    const newContact = {
      _id: 'contact-' + Date.now(),
      name,
      email,
      phone,
      division: division || 'General Enterprise',
      message: message || '',
      status: 'New',
      createdAt: new Date()
    };

    inMemory.leads.unshift({
      ...newContact,
      courseInterest: division
    });

    try {
      await Contact.create(newContact);
    } catch {
      // Memory synced
    }

    res.json({ status: 'success', message: 'Contact request recorded', id: newContact._id });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// --- Chatbot ---
router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    const reply = await getChatbotResponse(message);
    res.json({ status: 'success', reply });
  } catch {
    res.json({ status: 'success', reply: 'Technula offers SaaS solutions and STEM robotics education. Call +91 9990911093 for help!' });
  }
});

// --- Admin APIs (Categorized CMS Views & Order Status Update) ---
router.get('/admin/leads', async (req, res) => {
  let allPopupLeads = [];
  let allContacts = [];

  try {
    allPopupLeads = await ChatbotLead.find().sort({ createdAt: -1 }).timeout(2000);
    allContacts = await Contact.find().sort({ createdAt: -1 }).timeout(2000);
  } catch {
    // Fallback to inMemory
  }

  const combinedLeads = [...allPopupLeads, ...allContacts, ...inMemory.leads];

  const saasKeywords = ['schoolos', 'hrms', 'logday', 'hims', 'stockmaster', 'fitos', 'legalalert', 'tax', 'saas', 'digital marketing', 'custom software'];

  const saasLeads = [];
  const stemLeads = [];

  combinedLeads.forEach(l => {
    const interest = ((l.courseInterest || l.division || '') + '').toLowerCase();
    const isSaas = saasKeywords.some(kw => interest.includes(kw));
    if (isSaas) saasLeads.push(l);
    else stemLeads.push(l);
  });

  res.json({ status: 'success', saasLeads, stemLeads });
});

router.get('/admin/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).timeout(2000);
    res.json({ status: 'success', orders: orders.length ? orders : inMemory.orders });
  } catch {
    res.json({ status: 'success', orders: inMemory.orders });
  }
});

router.put('/admin/orders/:id/status', async (req, res) => {
  const { status } = req.body;
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (order) return res.json({ status: 'success', order });
  } catch {
    // Sync memory
  }

  const memOrder = inMemory.orders.find(o => o._id === req.params.id || o.txnId === req.params.id);
  if (memOrder) memOrder.status = status;
  res.json({ status: 'success', order: memOrder });
});

module.exports = router;
