import React, { useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaChevronRight } from 'react-icons/fa';

const ContactPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqsLeft = [
    { question: "Pulvinar nostrud class cum facilis?", answer: "I am item content. Click edit button to change this text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar leo." },
    { question: "Consequat nesciunt fusce facilisi?", answer: "I am item content. Click edit button to change this text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar leo." },
    { question: "Pulvinar nostrud class cum facilis?", answer: "I am item content. Click edit button to change this text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar leo." },
  ];

  const faqsRight = [
    { question: "Pulvinar nostrud class cum facilis?", answer: "I am item content. Click edit button to change this text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar leo." },
    { question: "Pulvinar nostrud class cum facilis?", answer: "I am item content. Click edit button to change this text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar leo." },
    { question: "Consequat nesciunt fusce facilisi?", answer: "I am item content. Click edit button to change this text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar leo." },
  ];

  return (
    <div className="pt-20 bg-gradient-to-r from-blue-50 to-purple-50 min-h-screen flex flex-col items-center relative">
      <div className="absolute inset-0 flex justify-center items-center overflow-hidden">
        <div className="w-96 h-96 bg-blue-400 opacity-20 rounded-full absolute -top-32 -left-32"></div>
        <div className="w-80 h-80 bg-purple-400 opacity-20 rounded-full absolute bottom-12 -right-32"></div>
      </div>

      <div className="relative w-full py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-extrabold text-gray-800 drop-shadow-md">Contact Us</h1>
          <p className="mt-4 text-2xl text-gray-600">We’re here to help! Check out our FAQ or reach out to us directly.</p>
        </div>
      </div>

      <div className="relative container mx-auto py-12 grid grid-cols-1 md:grid-cols-3 gap-12 text-center px-6 sm:px-10 md:px-20">
        {[
          { icon: FaPhoneAlt, color: "text-blue-500", title: "Phone", text: "+1 234 567 890" },
          { icon: FaEnvelope, color: "text-purple-500", title: "Email", text: "support@clothingstore.com" },
          { icon: FaMapMarkerAlt, color: "text-green-500", title: "Address", text: "123 Fashion St, New York, NY" },
        ].map(({ icon: Icon, color, title, text }, idx) => (
          <div key={idx} className="flex flex-col items-center p-8 bg-white shadow-xl rounded-2xl transform transition-transform hover:scale-105">
            <Icon className={`text-5xl ${color} mb-4`} />
            <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
            <p className="mt-2 text-lg text-gray-600">{text}</p>
          </div>
        ))}
      </div>

      <section className="contact_container relative py-28 px-8 text-gray-800">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-6">Frequently Asked Questions!</h1>
        </div>

        <div className="faq-container md:w-2/3 mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 h-auto">
          {[faqsLeft, faqsRight].map((faqs, colIdx) =>
            faqs.map((faq, index) => (
              <div key={index + colIdx * faqsLeft.length} className="block p-4 bg-white shadow-md rounded-md">
                <div
                  className="flex justify-between items-center cursor-pointer text-lg font-semibold text-gray-800"
                  onClick={() => toggleFAQ(index + colIdx * faqsLeft.length)}
                  aria-expanded={activeIndex === index + colIdx * faqsLeft.length}
                >
                  <p>{faq.question}</p>
                  <FaChevronRight className={`transition-transform ${activeIndex === index + colIdx * faqsLeft.length ? 'rotate-90' : ''}`} />
                </div>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${activeIndex === index + colIdx * faqsLeft.length ? 'max-h-96' : 'max-h-0'}`}>
                  <p className="p-4 text-gray-600">{faq.answer}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
