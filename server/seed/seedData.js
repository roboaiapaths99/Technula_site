require('dotenv').config();
const mongoose = require('mongoose');
const { Product, Coupon } = require('../models');

const kits = [
  { kitId: 'kit1', name: 'Non Programmable Kit', price: 5909, mrp: 6500, isOutOfStock: false, image: '/img/kits/nonProgrammableKit.jpeg', classFor: 'Class 1-2', ageGroup: '6-8 years', description: 'Learn the basics of electronics without coding.' },
  { kitId: 'kit2', name: 'Introduction to Robotics', price: 5909, mrp: 6500, isOutOfStock: false, image: '/img/kits/roboCar.jpeg', classFor: 'Class 2-3', ageGroup: '7-9 years', description: 'Programmable robotics and Arduino basics.' },
  { kitId: 'kit3', name: 'Otto Ninja', price: 10067, mrp: 11074, isOutOfStock: true, image: '/img/kits/ottoNinja.jpeg', classFor: 'Class 4-5', ageGroup: '9-11 years', description: 'Biped walking robot with 3D printed body.' },
  { kitId: 'kit4', name: 'Plug and Play Kit', price: 4369, mrp: 4806, isOutOfStock: true, image: '/img/kits/plug&play.jpeg', classFor: 'Class 2-3', ageGroup: '7-9 years', description: 'Snap-together electronics modules.' },
  { kitId: 'kit5', name: 'Robo Expert', price: 8217, mrp: 9039, isOutOfStock: false, image: '/img/kits/roboArm.jpeg', classFor: 'Class 5-6', ageGroup: '10-12 years', description: 'Programmable arm, IoT, and AI concepts.' },
  { kitId: 'kit6', name: 'Jetty Bot Car', price: 5737, mrp: 6311, isOutOfStock: false, image: '/img/kits/JETTY BOT FOR CLASS 5th.jpeg', classFor: 'Class 5', ageGroup: '10-11 years', description: 'Line-following and obstacle avoidance robot car.' },
  { kitId: 'kit7', name: 'Smart IOT Home', price: 5394, mrp: 5933, isOutOfStock: true, image: '/img/kits/SMART IOT HOME FOR CLASS 8th.jpeg', classFor: 'Class 8', ageGroup: '13-14 years', description: 'Smart home automation model with mobile app control.' },
  { kitId: 'kit8', name: 'MR Bot', price: 4369, mrp: 4806, isOutOfStock: true, image: '/img/kits/MR BOT FOR CLASS 7th.jpeg', classFor: 'Class 7', ageGroup: '12-13 years', description: 'Multi-purpose mechanics and programming robot.' },
  { kitId: 'kit9', name: 'PY Card', price: 5566, mrp: 6123, isOutOfStock: false, image: '/img/kits/PY CARD  FOR CLASS 6th.webp', classFor: 'Class 6', ageGroup: '11-12 years', description: 'Python microcontroller card for text-based coding.' },
  { kitId: 'kit10', name: 'PC Bot', price: 6593, mrp: 7252, isOutOfStock: false, image: '/img/kits/PC BOT FOR CLASS 3rd.jpeg', classFor: 'Class 3', ageGroup: '8-9 years', description: 'Computer-controlled robot for visual programming.' },
  { kitId: 'kit11', name: 'RC Drift Car', price: 6593, mrp: 7252, isOutOfStock: false, image: '/img/kits/RC DRIFT CAR FOR CLASS 4th.jpeg', classFor: 'Class 4', ageGroup: '9-10 years', description: 'High-performance RC drift car with wireless control.' }
];

const coupons = [
  { code: 'ROBO10', type: 'percent', value: 10, active: true },
  { code: 'FLAT500', type: 'fixed', value: 500, active: true },
  { code: 'SAPNA40', type: 'percent', value: 40, active: true }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/technula_db');
    await Product.deleteMany({});
    await Coupon.deleteMany({});

    await Product.insertMany(kits);
    await Coupon.insertMany(coupons);

    console.log('Seeding successful: 11 kits & 3 coupons inserted');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err.message);
    process.exit(1);
  }
}

seed();
