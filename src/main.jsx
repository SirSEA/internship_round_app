import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './context/AuthContext.jsx'
import App from './App.jsx'
import './index.css'

if (import.meta.env.DEV) {
  import('./styles/main.css')
} else {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = import.meta.env.VITE_CSS_LICENSE_URL;
  document.head.appendChild(link);
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)
