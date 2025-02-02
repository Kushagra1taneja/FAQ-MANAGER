const FAQ = require('../models/faq');
const redis = require('redis');
const client = redis.createClient({ url: process.env.REDIS_URL });
const tr = require('googletrans').default;

async function getTranslatedFAQs(lang) {
  const cacheKey = `faqs_${lang}`;
  const cachedData = await client.get(cacheKey);
  if (cachedData) return JSON.parse(cachedData);

  const faqs = await FAQ.find({});
  const translatedFaqs = await Promise.all(faqs.map(async (faq) => {
    if (faq.translations[lang]) {
      return faq.getTranslatedText(lang);
    } else {
      const translatedQuestion = await tr(faq.question, lang);
      const translatedAnswer = await tr(faq.answer, lang);
      return {
        question: translatedQuestion.text,
        answer: translatedAnswer.text
      };
    }
  }));

  await client.setEx(cacheKey, 3600, JSON.stringify(translatedFaqs));
  return translatedFaqs;
}

module.exports = { getTranslatedFAQs };
