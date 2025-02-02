
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Adjust the path as necessary
const expect = chai.expect;

// import { expect } from 'chai';
// // import chai from 'chai';
// import chaiHttp from 'chai-http';
// import app from '../app.js';




chai.use(chaiHttp);

describe('FAQ API', () => {
  // Test for GET all FAQs
  it('should GET all FAQs', (done) => {
    chai.request(app)
      .get('/api/faqs')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  // Test for POST a new FAQ
  it('should POST a new FAQ', (done) => {
    const faq = {
      question: 'What is Node.js?',
      answer: 'Node.js is a JavaScript runtime built on Chrome\'s V8 JavaScript engine.'
    };
    chai.request(app)
      .post('/api/faqs')
      .send(faq)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('question').eql(faq.question);
        expect(res.body).to.have.property('answer').eql(faq.answer);
        done();
      });
  });

  // Test for PUT to update an existing FAQ
  it('should UPDATE an existing FAQ', (done) => {
    const updatedFaq = {
      question: 'What is Node.js?',
      answer: 'Node.js is a powerful JavaScript runtime.'
    };
    chai.request(app)
      .put('/api/faqs/1') // Assuming 1 is a valid FAQ ID
      .send(updatedFaq)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('answer').eql(updatedFaq.answer);
        done();
      });
  });

  // Test for DELETE an FAQ
  it('should DELETE an FAQ', (done) => {
    chai.request(app)
      .delete('/api/faqs/1') // Assuming 1 is a valid FAQ ID
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message').eql('FAQ deleted successfully');
        done();
      });
  });
});
