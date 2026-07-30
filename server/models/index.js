const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  kitId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  mrp: { type: Number },
  isOutOfStock: { type: Boolean, default: false },
  image: { type: String },
  classFor: { type: String },
  ageGroup: { type: String },
  description: { type: String },
  features: [String],
  components: [String]
}, { timestamps: true });

const UserSchema = new mongoose.Schema({
  mobile: { type: String, required: true, unique: true },
  firstName: String,
  lastName: String,
  email: String
}, { timestamps: true });

const OrderSchema = new mongoose.Schema({
  userMobile: { type: String, required: true },
  txnId: { type: String, required: true, unique: true },
  items: [{
    productId: String,
    name: String,
    quantity: Number,
    price: Number
  }],
  subtotal: Number,
  discount: Number,
  gst: Number,
  totalAmount: Number,
  couponUsed: String,
  status: { type: String, enum: ['pending', 'success', 'failed'], default: 'pending' },
  paymentMethod: String,
  address: String,
  city: String,
  state: String,
  zip: String
}, { timestamps: true });

const CouponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  type: { type: String, enum: ['percent', 'fixed'], required: true },
  value: { type: Number, required: true },
  active: { type: Boolean, default: true }
}, { timestamps: true });

const ChatbotLeadSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  phone: { type: String, default: '' },
  childClass: { type: String, default: '' },
  courseInterest: { type: String, default: '' },
  city: { type: String, default: '' },
  message: String,
  sessionId: String,
  status: { type: String, enum: ['New', 'Contacted', 'Demo Scheduled', 'Joined', 'Not Interested'], default: 'New' }
}, { timestamps: true });

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  division: { type: String, default: 'General' },
  message: { type: String, required: true },
  status: { type: String, default: 'New' }
}, { timestamps: true });

module.exports = {
  Product: mongoose.model('Product', ProductSchema),
  User: mongoose.model('User', UserSchema),
  Order: mongoose.model('Order', OrderSchema),
  Coupon: mongoose.model('Coupon', CouponSchema),
  ChatbotLead: mongoose.model('ChatbotLead', ChatbotLeadSchema),
  Contact: mongoose.model('Contact', ContactSchema)
};
