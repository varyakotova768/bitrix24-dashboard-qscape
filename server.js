// server.js
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Webhook из переменных окружения
const WEBHOOK_URL = process.env.VITE_BITRIX_WEBHOOK;

// Получение списка сотрудников
app.get('/api/users', async (req, res) => {
    try {
        const response = await fetch(`${WEBHOOK_URL}user.get`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                filter: { ACTIVE: 'Y' },
                select: ['ID', 'NAME', 'LAST_NAME', 'PERSONAL_PHOTO', 'EMAIL', 'WORK_POSITION']
            })
        });

        const data = await response.json();
        
        if (data.error) {
            return res.status(400).json({ error: data.error });
        }

        res.json(data.result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});