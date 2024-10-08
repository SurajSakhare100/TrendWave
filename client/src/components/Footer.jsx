import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-10">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
                {/* Company Info */}
                <div>
                    <h2 className="text-2xl font-bold text-white mb-4 ">Trend-Wave</h2>
                    <p className="text-sm text-wrap">
                        Stay ahead of the trends with Trend-Wave, your ultimate source for the latest fashion, tech, and lifestyle updates.
                    </p>
                </div>

                <div className='w-full flex justify-between'>
                    {/* Quick Links */}
                <div className='md:text-right text-left'>
                    <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><a href="/about" className="hover:text-white transition duration-300">About Us</a></li>
                        <li><a href="/services" className="hover:text-white transition duration-300">Services</a></li>
                        <li><a href="/blog" className="hover:text-white transition duration-300">Blog</a></li>
                        <li><a href="/contact" className="hover:text-white transition duration-300">Contact</a></li>
                    </ul>
                </div>

                {/* Support */}
                <div className='text-right md:text-left'>
                    <h3 className=" text-lg font-semibold text-white mb-3">Support</h3>
                    <ul className="space-y-2">
                        <li><a href="/help" className="hover:text-white transition duration-300">Help Center</a></li>
                        <li><a href="/faq" className="hover:text-white transition duration-300">FAQ</a></li>
                        <li><a href="/privacy" className="hover:text-white transition duration-300">Privacy Policy</a></li>
                        <li><a href="/terms" className="hover:text-white transition duration-300">Terms of Service</a></li>
                    </ul>
                </div>
                </div>

                {/* Newsletter */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Subscribe to our Newsletter</h3>
                    <p className="text-sm mb-4">Get the latest updates on trends, offers, and more directly in your inbox.</p>
                    <form className="flex space-x-2">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none"
                        />
                        <button className="bg-blue-600 px-4 py-2 rounded-md text-white hover:bg-blue-700 transition duration-300">
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm">
                <p>&copy; 2024 Trend-Wave. All rights reserved.</p>
                <div className="mt-4 flex justify-center space-x-6">
                    <a href="https://facebook.com" className="hover:text-white transition duration-300">Facebook</a>
                    <a href="https://twitter.com" className="hover:text-white transition duration-300">Twitter</a>
                    <a href="https://instagram.com" className="hover:text-white transition duration-300">Instagram</a>
                    <a href="https://linkedin.com" className="hover:text-white transition duration-300">LinkedIn</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
