const express = require('express');
const FAQ = require('../models/faq');
const { getTranslatedFAQs } = require('../utils/translator');
const router = express.Router();

// Fetch FAQs with optional language translation
router.get('/', async (req, res) => {
  const lang = req.query.lang || 'en';
  try {
    const faqs = await getTranslatedFAQs(lang);
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new FAQ
router.post('/', async (req, res) => {
  const { question, answer } = req.body;
  try {
    const newFaq = new FAQ({ question, answer, translations: {} });
    await newFaq.save();
    res.status(201).json(newFaq);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an existing FAQ
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;
  try {
    const updatedFaq = await FAQ.findByIdAndUpdate(id, { question, answer }, { new: true });
    if (!updatedFaq) {
      return res.status(404).json({ message: 'FAQ not found' });
    }
    res.json(updatedFaq);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete an FAQ
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedFaq = await FAQ.findByIdAndDelete(id);
    if (!deletedFaq) {
      return res.status(404).json({ message: 'FAQ not found' });
    }
    res.json({ message: 'FAQ deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
