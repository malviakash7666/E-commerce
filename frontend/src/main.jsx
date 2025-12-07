
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from 'react'

import {BrowserRouter} from "react-router-dom"
import ShopContxtProvider from './context/ShopContext.jsx'

createRoot(document.getElementById('root')).render(
  
  <BrowserRouter>
  <ShopContxtProvider>
    <App />
    </ShopContxtProvider>
  </BrowserRouter>

)
