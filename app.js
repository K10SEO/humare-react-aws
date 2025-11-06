const express = require('express');
const cors = require('cors');
require('dotenv').config();
const SENSService = require('./src/util/sensAPI');

const app = express();
const sensService = new SENSService();

// 미들웨어
app.use(cors());
app.use(express.json());

// 상담 문의 API
app.post('/api/contact', async (req, res) => {
  try {
    const { name, contact, content } = req.body;

    // 입력값 검증
    if (!name || !contact || !content) {
      return res.status(400).json({
        success: false,
        message: '모든 필수 항목을 입력해주세요.'
      });
    }

    // 관리자에게 SMS 발송
    await sensService.sendToAdmin({
      name,
      contact,
      content
    });

    // 성공 응답
    res.json({
      success: true,
      message: '문의가 성공적으로 접수되었습니다.'
    });

  } catch (error) {
    console.error('문의 처리 오류:', error);
    
    res.status(500).json({
      success: false,
      message: '문의 접수 중 오류가 발생했습니다.'
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});