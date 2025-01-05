import React from 'react';
import { Youtube, Github, Facebook, Linkedin, LinkedinIcon, FacebookIcon, GithubIcon, YoutubeIcon, LucideYoutube } from 'lucide-react';
import paymentLine from '../../../public/paymentLine.png';

function Footer() {
  return (
    <div>
      <div className="w-full bg-[#F5F5F3] py-20 px-10">
        <div className="max-w-container mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 px-4 gap-10">
          <div className="col-span-2">
            <h3 className="text-xl font-bodyFont font-semibold mb-6"> More about Trend Wave</h3>
            <div className="flex flex-col gap-6">
              <p className="text-base w-full xl:w-[80%]">
                Trend Wave is one of the world's leading ecommerce brands and is internationally recognized for celebrating the essence of classic worldwide clothing style.
              </p>
              <ul className="flex items-center gap-2">
                <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
                  <li className="w-7 h-7 bg-primeColor text-gray-100 hover:text-white cursor-pointer text-lg rounded-full flex justify-center items-center hover:bg-black duration-300">
                    <LucideYoutube size={18} color='black'/>
                  </li>
                </a>
                <a href="https://github.com/ddhoye" target="_blank" rel="noreferrer">
                  <li className="w-7 h-7 bg-primeColor text-gray-100 hover:text-white cursor-pointer text-lg rounded-full flex justify-center items-center hover:bg-black duration-300">
                    <GithubIcon size={18} color='black'/>
                  </li>
                </a>
                <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
                  <li className="w-7 h-7 bg-primeColor text-gray-100 hover:text-white cursor-pointer text-lg rounded-full flex justify-center items-center hover:bg-black duration-300">
                    <FacebookIcon size={18} color='black' />
                  </li>
                </a>
                <a href="https://www.linkedin.com/in/" target="_blank" rel="noreferrer">
                  <li className="w-7 h-7 bg-primeColor text-gray-100 hover:text-white cursor-pointer text-lg rounded-full flex justify-center items-center hover:bg-black duration-300">
                    <LinkedinIcon size={18} color='black' />
                  </li>
                </a>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bodyFont font-semibold mb-6">Shop</h3>
            <ul className="flex flex-col gap-2">
              <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">Accessories</li>
              <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">Clothes</li>
              <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">Electronics</li>
              <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">Home appliances</li>
              <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">New Arrivals</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bodyFont font-semibold mb-6">Your account</h3>
            <ul className="flex flex-col gap-2">
              <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">Profile</li>
              <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">Orders</li>
              <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">Addresses</li>
              <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">Account Details</li>
              <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">Payment Options</li>
            </ul>
          </div>

          <div className="col-span-2 flex flex-col items-center w-full px-4">
            <h3 className="text-xl font-bodyFont font-semibold mb-6">Subscribe to our newsletter.</h3>
            <div className="w-full">
              <p className="text-center mb-4">
                Subscribe to our newsletter in order to be the first to receive news about our amazing deals and offers.
              </p>
              <div className="w-full flex-col xl:flex-row flex justify-between items-center gap-4">
                <div className="flex flex-col w-full">
                  <input
                    className="w-full h-12 border-b border-gray-400 bg-transparent px-4 text-primeColor text-lg placeholder:text-base outline-none"
                    type="text"
                    placeholder="Insert your email ...*"
                    value=""
                  />
                </div>
                <button className="bg-white text-lightText w-[30%] h-10 hover:bg-black hover:text-white duration-300 text-base tracking-wide">
                  Subscribe
                </button>
              </div>
              <img
                className="w-[80%] lg:w-[60%] mx-auto mt-6"
                src={paymentLine}
                alt="/static/media/payment.3e00cc601c9e7fc1e7d3.png"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#F5F5F3] group">
        <div className="max-w-container mx-auto border-t-[1px] pt-10 pb-10">
          <p className="text-titleFont font-normal text-center flex md:items-center justify-center text-lightText duration-200 text-sm">
            <span className="text-md mr-[1px] mt-[2px] md:mt-0 text-center hidden md:inline-flex">
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372zm5.6-532.7c53 0 89 33.8 93 83.4.3 4.2 3.8 7.4 8 7.4h56.7c2.6 0 4.7-2.1 4.7-4.7 0-86.7-68.4-147.4-162.7-147.4C407.4 290 344 364.2 344 486.8v52.3C344 660.8 407.4 734 517.3 734c94 0 162.7-58.8 162.7-141.4 0-2.6-2.1-4.7-4.7-4.7h-56.8c-4.2 0-7.6 3.2-8 7.3-4.2 46.1-40.1 77.8-93 77.8-65.3 0-102.1-47.9-102.1-133.6v-52.6c.1-87 37-135.5 102.2-135.5z"></path>
              </svg>
            </span>
            Copyright 2025 | Trend Wave | All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
