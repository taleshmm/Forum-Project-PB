import React, { useState } from 'react';
import '../pages/styles/Faq.css';
import Header from '../organism/Header';
import Footer from '../organism/Footer';

const FaqPage = () => {
  const [faqs, setFaqs] = useState([
    {
      question: 'Como posso criar uma conta?',
      answer:
        'Você pode criar uma conta clicando no botão de inscrição na página inicial.',
      open: false,
    },
    {
      question: 'Posso alterar meu nome de usuário?',
      answer:
        'Sim, você pode alterar seu nome de usuário nas configurações do perfil.',
      open: false,
    },
    {
      question: 'Como posso deletar minha conta?',
      answer:
        'Para deletar sua conta, entre em contato com o suporte ao cliente.',
      open: false,
    },
  ]);

  const toggleFAQ = (index) => {
    setFaqs(
      faqs.map((faq, i) => {
        if (i === index) {
          faq.open = !faq.open;
        } else {
          faq.open = false;
        }
        return faq;
      })
    );
  };

  return (
    <>
      <Header />
      <div className="faq-container">
        <h2>Dúvidas Frequentes</h2>
        <div className="faqs">
          {faqs.map((faq, index) => (
            <div
              className={`faq ${faq.open ? 'open' : ''}`}
              key={index}
              onClick={() => toggleFAQ(index)}
            >
              <div className="faq-question">{faq.question}</div>
              <div className="faq-answer">{faq.answer}</div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FaqPage;
