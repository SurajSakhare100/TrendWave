import React from 'react';

const Footer = () => {
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
  };
  
  return (
    <div className="grid grid-cols-12 gap-4 relative bg-white dark:bg-black dark:text-gray-200">
      <div className="col-span-12">
        <section className="py-10 sm:pt-16 lg:pt-24">
          <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid grid-cols-2 md:col-span-3 lg:grid-cols-6 gap-y-16 gap-x-12">
              <div className="col-span-2 md:col-span-3 lg:col-span-2 lg:pr-8">
                <img
                  className="w-auto h-8 lg:h-10"
                  src="https://website-builderx-assets.s3.ap-south-1.amazonaws.com/official/logo-1.png"
                  alt="Company Logo"
                />
                <p className="text-base leading-relaxed text-gray-600 dark:text-gray-400 mt-7">
                  Discover a world of creativity and inspiration. Let your imagination soar with us!
                </p>
                <button onClick={toggleDarkMode}> toggleDarkMode</button>

                <ul className="flex items-center space-x-3 mt-9">
                  {/* Social Icons */}
                  {['Twitter', 'Facebook', 'Instagram', 'GitHub'].map((platform, index) => (
                    <li key={index}>
                      <a
                        href="#"
                        title={platform}
                        className="flex items-center justify-center text-white transition-all duration-200 bg-gray-800 rounded-full w-7 h-7 hover:bg-blue-600 focus:bg-blue-600 dark:bg-gray-700 dark:hover:bg-blue-500"
                      >
                        <svg
                          className="w-4 h-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          {/* SVG Path */}
                        </svg>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase dark:text-gray-500">
                  Discover
                </p>
                <ul className="mt-6 space-y-4">
                  {['Inspiration', 'Creativity', 'Stories', 'Contact'].map((item, index) => (
                    <li key={index}>
                      <a
                        href="#"
                        className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase dark:text-gray-500">
                  Assistance
                </p>
                <ul className="mt-6 space-y-4">
                  {['Help Center', 'FAQs', 'Support', 'Feedback'].map((item, index) => (
                    <li key={index}>
                      <a
                        href="#"
                        className="flex text-base text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-span-2 md:col-span-1 lg:col-span-2 lg:pl-8">
                <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase dark:text-gray-500">
                  Get Updates
                </p>
                <form action="#" method="POST" className="mt-6">
                  <div>
                    <label htmlFor="email" className="sr-only">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter your email"
                      className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600 dark:bg-gray-800 dark:text-gray-200 dark:placeholder-gray-500 dark:border-gray-600 dark:focus:border-blue-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center px-6 py-4 mt-3 font-semibold text-white transition-all duration-200 bg-blue-600 rounded-md hover:bg-blue-700 focus:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>

            <hr className="mt-16 mb-10 border-gray-200 dark:border-gray-700" />
            <p className="text-sm text-center text-gray-600 dark:text-gray-400">
              © 2022, All Rights Reserved. Crafted with ❤️ by Postcraft
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Footer;
