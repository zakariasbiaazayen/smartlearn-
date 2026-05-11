import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './styles.css'
import App from './pages/upload.jsx'
import User from './pages/result.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
