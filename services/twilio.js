const twilio = require('twilio');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = new twilio(accountSid, authToken);

const sendVerificationCode = async (phoneNumber, channel = 'sms') => {
    try {
        const serviceSid = process.env.TWILIO_VERIFY_SERVICE_SID;
        const formattedPhoneNumber = phoneNumber.replace(/\s/g, '');

        const verification = await client.verify.v2.services(serviceSid)
            .verifications.create({ to: formattedPhoneNumber, channel });

        return verification;
    } catch (error) {
        throw new Error('Failed to send verification code: ' + error.message);
    }
};

const verifyCode = async (phoneNumber, code) => {
    try {
        const serviceSid = process.env.TWILIO_VERIFY_SERVICE_SID;
        const formattedPhoneNumber = phoneNumber.replace(/\s/g, '');

        const verificationCheck = await client.verify.v2.services(serviceSid)
            .verificationChecks.create({ to: formattedPhoneNumber, code });
        return verificationCheck;
    } catch (error) {
        throw new Error('Failed to verify code: ' + error.message);
    }
};

module.exports = { sendVerificationCode, verifyCode };

