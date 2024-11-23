import plugin from "tailwindcss/plugin";
import forms from '@tailwindcss/forms';
import daisyui from "daisyui";


export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/preline/dist/*.js',
  ],
  darkMode: 'class',
  plugins: [
    forms, // Tailwind CSS Forms
    daisyui, // DaisyUI components
    plugin(({ addVariant, e }) => {
      addVariant('sidebar-expanded', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => `.sidebar-expanded .${e(`sidebar-expanded${separator}${className}`)}`);
      });
    }),
  ],
};
