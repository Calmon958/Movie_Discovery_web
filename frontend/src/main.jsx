import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { WatchlistProvider } from './context/WatchlistContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <WatchlistProvider>
        <App />
      </WatchlistProvider>
    </BrowserRouter>
  </React.StrictMode>
)
