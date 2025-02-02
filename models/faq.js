const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  translations: {
    hi: { question: String, answer: String },
    bn: { question: String, answer: String }
  }
});

faqSchema.methods.getTranslatedText = function(lang) {
  return this.translations[lang] || { question: this.question, answer: this.answer };
};

const FAQ = mongoose.model('FAQ', faqSchema);
module.exports = FAQ;
