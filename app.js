const express = require("express");
const app = express();
const { sendContactSMS } = require("./src/util/sensAPI");
require('dotenv').config();
const cors = require('cors');

// CORS 설정
app.use(cors({
    origin: [
        'https://housemanager1661-3822.site',
        'http://housemanager1661-3822.site',
        'http://humare-web-page.s3-website.ap-northeast-2.amazonaws.com'
    ],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("port", 80);

// API만!
app.post("/api/contact", async (req, res) => {
    try {
        const { name, contact, content } = req.body;
        console.log('SMS 전송 요청:', { name, contact });
        
        await sendContactSMS(name, contact, content);
        
        res.json({ success: true });
    } catch (err) {
        console.error('SMS 전송 실패:', err);
        res.status(500).json({ 
            success: false,
            message: 'SMS 전송 실패'
        });
    }
});

// 서버 시작 (DB 연결 제거!)
app.listen(app.get("port"), '0.0.0.0', () => {
    console.log(`API Server running on port ${app.get("port")}`);
});