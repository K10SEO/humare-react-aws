const express = require("express");
const app = express();
const { sendContactSMS } = require("./src/util/sensAPI");
require('dotenv').config();
const cors = require('cors');

// CORS 먼저! (중요)
app.use(cors({
    origin: [
        'https://housemanager1661-3822.site',
        'http://housemanager1661-3822.site',
        'http://humare-web-page.s3-website.ap-northeast-2.amazonaws.com'
    ],
    credentials: true
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("port", process.env.PORT || 80);

// 정적 파일 제공 부분 전부 삭제!
// app.use(express.static(...)) ← 삭제
// app.get("/", ...) ← 삭제

// API만 남김
app.post("/api/contact", async (req, res) => {
    try {
        const { name, contact, content } = req.body;
        
        console.log('SMS 전송 시도:', { name, contact, content });
        
        await sendContactSMS(name, contact, content);
        
        res.json({ success: true });
    } catch (err) {
        console.error('SMS 전송 실패:', err);
        res.status(500).json({ 
            success: false,
            message: 'SMS 전송에 실패했습니다.'
        });
    }
});

// 서버 시작
app.listen(app.get("port"), '0.0.0.0', () => {
    console.log(`API Server running on port ${app.get("port")}`);
});