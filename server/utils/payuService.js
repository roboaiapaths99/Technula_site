const crypto = require('crypto');

const PAYU_KEY = process.env.PAYU_KEY || '';
const PAYU_SALT = process.env.PAYU_SALT || '';
const PAYU_BASE_URL = process.env.PAYU_ENV === 'test' ? 'https://test.payu.in' : 'https://secure.payu.in';

function generatePayUHash(txnid, amount, productinfo, firstname, email) {
  const hashString = `${PAYU_KEY}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${PAYU_SALT}`;
  return crypto.createHash('sha512').update(hashString).digest('hex').toLowerCase();
}

function verifyPayUHash(params) {
  const { status, txnid, amount, productinfo, firstname, email, hash } = params;
  const hashString = `${PAYU_SALT}|${status}|||||||||||${email}|${firstname}|${productinfo}|${amount}|${txnid}|${PAYU_KEY}`;
  const calculatedHash = crypto.createHash('sha512').update(hashString).digest('hex').toLowerCase();
  return calculatedHash === hash;
}

module.exports = { generatePayUHash, verifyPayUHash, PAYU_KEY, PAYU_BASE_URL };
