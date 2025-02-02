require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const faqRoutes = require('./routes/faqRoutes');
const redis = require('redis');
const sanitizeHtml = require('sanitize-html');
const FAQ = require('./models/faq');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

const client = redis.createClient({ url: process.env.REDIS_URL });
client.connect()
  .then(() => console.log('Redis client connected'))
  .catch(err => console.log('Redis connection error:', err));

app.use(express.static('public'));
app.use('/api/faqs', faqRoutes);

app.post('/api/faqs', async (req, res) => {
    const { question, answer } = req.body;
    const cleanAnswer = sanitizeHtml(answer);

    try {
        const newFaq = new FAQ({
            question: question,
            answer: cleanAnswer,
            translations: {}
        });
        await newFaq.save();
        res.status(201).json(newFaq);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
// export default app;