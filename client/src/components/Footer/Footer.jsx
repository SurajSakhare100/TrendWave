import React from 'react';

const Footer = ({ className = '', children }) => {
  return (
    <footer className={`bg-black text-white py-8 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="font-bold text-lg">About Us</h3>
            <p className="mt-2 text-sm">We are a company dedicated to providing the best services.</p>
          </div>
          <div>
            <h3 className="font-bold text-lg">Quick Links</h3>
            <ul className="mt-2 space-y-1 text-sm">
              <li><a href="#" className="hover:text-blue-400">Home</a></li>
              <li><a href="#" className="hover:text-blue-400">About</a></li>
              <li><a href="#" className="hover:text-blue-400">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg">Follow Us</h3>
            <p className="mt-2 text-sm">Stay connected through our social media platforms.</p>
            <div className="mt-3">
              <a href="#" className="text-blue-400 hover:text-blue-600 mx-2">Facebook</a>
              <a href="#" className="text-blue-400 hover:text-blue-600 mx-2">Twitter</a>
              <a href="#" className="text-blue-400 hover:text-blue-600 mx-2">Instagram</a>
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
          <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
