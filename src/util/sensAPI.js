const axios = require('axios');
const CryptoJS = require('crypto-js');

class SENSService {
  constructor() {
    this.serviceId = process.env.SENS_SERVICE_ID;
    this.accessKey = process.env.SENS_ACCESS_KEY;
    this.secretKey = process.env.SENS_SECRET_KEY;
    this.from = process.env.SENS_SMS_FROM;
    this.adminPhone = process.env.ADMIN_PHONE;
    this.url = `https://sens.apigw.ntruss.com/sms/v2/services/${this.serviceId}/messages`;
  }

  makeSignature(timestamp) {
    const space = " ";
    const newLine = "\n";
    const method = "POST";
    const url2 = `/sms/v2/services/${this.serviceId}/messages`;

    const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, this.secretKey);
    hmac.update(method);
    hmac.update(space);
    hmac.update(url2);
    hmac.update(newLine);
    hmac.update(timestamp);
    hmac.update(newLine);
    hmac.update(this.accessKey);

    const hash = hmac.finalize();
    return hash.toString(CryptoJS.enc.Base64);
  }

  async sendToAdmin(formData) {
  const timestamp = Date.now().toString();
  const signature = this.makeSignature(timestamp);

  // 전체 메시지 먼저 구성
  const fullMessage = 
    `[상담문의]\n` +
    `이름: ${formData.name}\n` +
    `연락처: ${formData.contact}\n` +
    `내용: ${formData.content}`;  // ← 전체 내용 포함

  // 전체 메시지 크기 체크
  const messageBytes = Buffer.byteLength(fullMessage, 'utf8');
  
  let messageType;
  let finalMessage;
  
  if (messageBytes <= 90) {
    // 90바이트 이하: SMS로 전체 전송
    messageType = 'SMS';
    finalMessage = fullMessage;
  } else if (messageBytes <= 2000) {
    // 90바이트 초과, 2000바이트 이하: LMS로 전체 전송
    messageType = 'LMS';
    finalMessage = fullMessage;
  } else {
    // 2000바이트 초과: LMS로 잘라서 전송
    messageType = 'LMS';
    const cutContent = formData.content.substring(0, 900); // 대략적인 글자수
    finalMessage = 
      `[상담문의]\n` +
      `이름: ${formData.name}\n` +
      `연락처: ${formData.contact}\n` +
      `내용: ${cutContent}...`;
  }

  const requestBody = {
    type: messageType,
    contentType: 'COMM',
    countryCode: '82',
    from: this.from,
    content: messageType === 'SMS' ? finalMessage : undefined,
    subject: messageType === 'LMS' ? '[상담문의 접수]' : undefined,
    messages: [
      {
        to: this.adminPhone.replace(/-/g, '').replace(/^0/, ''),
        content: messageType === 'LMS' ? finalMessage : undefined
      }
    ]
  };

    try {
      const response = await axios.post(this.url, requestBody, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'x-ncp-apigw-timestamp': timestamp,
          'x-ncp-iam-access-key': this.accessKey,
          'x-ncp-apigw-signature-v2': signature
        }
      });

      return response.data;
    } catch (error) {
      console.error('SMS 발송 오류:', error.response?.data || error.message);
      throw error;
    }
  }
}

module.exports = SENSService;