import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { SaleProvider } from './context/SaleContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider>
  <SaleProvider>
    <App />
  </SaleProvider>
</AuthProvider>
  
  </StrictMode>,
)
