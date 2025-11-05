const express = require("express");
const path = require("path");
const app = express();
const { Sequelize } = require("sequelize");
const { sendContactSMS } = require("./src/util/sensAPI");
require('dotenv').config();
const cors = require('cors');

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sequelize 설정
const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USERNAME,
    process.env.DATABASE_PASSWORD,
    {
        host: process.env.DATABASE_HOST,
        port: 3306,
        dialect: 'mysql',
        timezone: "+09:00",
        define: {
            charset: "utf8",
            collate: "utf8_general_ci",
            timestamps: true,
            freezeTableName: true
        }
    }
);
 
app.set("port", process.env.PORT || 3000);

app.use(cors({
    origin: [
        'https://housemanager1661-3822.site',
        'http://humare-web-page.s3-website.ap-northeast-2.amazonaws.com'
    ]
}));

// 정적 파일
app.use('/js', express.static(path.join(__dirname, 'build/js'), {
    setHeaders: (res, path) => {
        if (path.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
        }
    }
}));
app.use('/style', express.static(path.join(__dirname, 'build/style'), {
    setHeaders: (res, path) => {
        if (path.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        }
    }
}));
app.use(express.static(path.join(__dirname, "build")));

// 메인 페이지
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "build/index.html"));
});

// 상담 문의 API
app.post("/api/contact", async (req, res) => {
    try {
        const { name, contact, content } = req.body;
        
        // SMS 전송
        await sendContactSMS(name, contact, content);
        
        res.json({ success: true });
    } catch (err) {
        console.error('SMS 전송 실패:', err);
        res.status(500).json({ success: false });
    }
});

// 서버 시작
app.listen(app.get("port"), '0.0.0.0', async () => {
    try {
        await sequelize.authenticate();
        console.log("DB 연결 성공");
        console.log(`Server running on port ${app.get("port")}`);  // 괄호 수정
    } catch (err) {
        console.log("DB 연결 실패", err);
    }
});
