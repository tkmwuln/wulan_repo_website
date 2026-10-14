import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import CuteCursor from './components/CuteCursor'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <CuteCursor />
  </React.StrictMode>,
)
