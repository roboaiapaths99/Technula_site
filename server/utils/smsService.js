const METAREACH_API_KEY = process.env.METAREACH_API_KEY || '';
const METAREACH_SENDER_ID = process.env.METAREACH_SENDER_ID || '';
const METAREACH_TEMPLATE_ID = process.env.METAREACH_TEMPLATE_ID || '';

/**
 * Sends real OTP SMS using MetaReach Gateway with AGPKAC Sender ID and DLT Approved Template ID
 */
async function sendSMS(mobile, otp) {
  try {
    const rawMessage = `Welcome to AGPK Academy login. Your verification code is ${otp}. This OTP will expire in 5 minutes`;
    const encodedMessage = encodeURIComponent(rawMessage);
    
    const url = `https://sms.metareach.in/vb/apikey.php?apikey=${METAREACH_API_KEY}&senderid=${METAREACH_SENDER_ID}&number=${mobile}&message=${encodedMessage}&templateid=${METAREACH_TEMPLATE_ID}`;
    
    console.log(`[SMS Gateway] Sending MetaReach SMS to +91 ${mobile} using Key: ${METAREACH_API_KEY}...`);
    const response = await fetch(url);
    const responseText = await response.text();
    console.log(`[SMS Gateway] MetaReach Response for +91 ${mobile}:`, responseText);
    
    try {
      const json = JSON.parse(responseText);
      if (json.status === 'false' || json.code === '001') {
        console.warn(`[SMS Gateway Warning] MetaReach Gateway returned error: ${json.description}`);
      }
    } catch {
      // Non-JSON response
    }
    
    return { status: 'success', gatewayResponse: responseText };
  } catch (error) {
    console.error('[SMS Gateway Error]:', error.message);
    return { status: 'error', message: error.message };
  }
}

module.exports = { sendSMS };
