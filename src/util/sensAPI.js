const axios = require('axios');
const crypto = require('crypto');

async function sendContactSMS(name, contact, content) {
  // 현재 시간
  const time = Date.now().toString();
  
  // 서명 생성
  const hmac = crypto.createHmac('sha256', process.env.SENS_SECRET_KEY);
  hmac.update(`POST /sms/v2/services/${process.env.SENS_SERVICE_ID}/messages\n${time}\n${process.env.SENS_ACCESS_KEY}`);
  const sign = hmac.digest('base64');
  
  // SMS 내용
  const text = `[상담문의]\n\n이름: ${name}\n연락처: ${contact}\n\n상담내용:\n${content}\n\n접수시간: ${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}`;
  
  // SENS API 호출
  await axios.post(
    `https://sens.apigw.ntruss.com/sms/v2/services/${process.env.SENS_SERVICE_ID}/messages`,
    {
      type: 'LMS',
      from: process.env.SENS_FROM_NUMBER,
      content: text,
      messages: [{ to: process.env.SENS_TO_NUMBER }]
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'x-ncp-apigw-timestamp': time,
        'x-ncp-iam-access-key': process.env.SENS_ACCESS_KEY,
        'x-ncp-apigw-signature-v2': sign
      }
    }
  );
}

module.exports = { sendContactSMS };