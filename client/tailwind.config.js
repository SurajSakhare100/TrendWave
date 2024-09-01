// tailwind.config.js
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Adjust this if your files are in different directories
    './src/index.html',           // Update this to the correct path of your HTML file
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1d4ed8', // Custom primary color
        secondary: '#64748b', // Custom secondary color
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // Custom font family
      },
    },
  },
  plugins: [],
};
