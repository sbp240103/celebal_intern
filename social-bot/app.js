require('dotenv').config();
const express = require('express');
const cron = require('node-cron');
const app = express();
const { postScheduledContent } = require('./controllers/scheduler');
const { likeAndComment } = require('./controllers/interaction');

app.use(express.json());

// ✅ Schedule posting every hour
cron.schedule('0 * * * *', postScheduledContent);

// ✅ Automate likes/comments every 10 mins
cron.schedule('*/10 * * * *', likeAndComment);

app.get('/', (req, res) => res.send('Social Bot Running'));
app.listen(3000, () => console.log('Bot server on http://localhost:3000'));
