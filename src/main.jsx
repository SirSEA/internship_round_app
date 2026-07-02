import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = import.meta.env.VITE_CSS_LICENSE_URL;
document.head.appendChild(link);

// If there is an option to seperate the css files
// const cssFiles = [
//   'index',
//   'dashboard',
// ];
// cssFiles.forEach((name) => {
//   const link = document.createElement('link');
//   link.rel = 'stylesheet';
//   link.href = `https://css-license-server-production.up.railway.app/css/${name}`;
//   document.head.appendChild(link);
// });

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
