// import React from 'react';
// import ReactDOM from 'react-dom/client'; // Updated import for React 18+
// import { Provider } from 'react-redux';
// import store from './app/store/store.js';
// import App from './App.jsx';
// import './index.css';

// // Ensure to use `createRoot` for React 18+
// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
//   <Provider store={store}>
//     <App />
//   </Provider>
// );

import React from 'react';
import ReactDOM from 'react-dom/client';
// import { BrowserRouter as Router } from 'react-router-dom';
import ThemeProvider from './utils/ThemeContext';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <ThemeProvider>
        <App />
      </ThemeProvider>
  </React.StrictMode>
);
