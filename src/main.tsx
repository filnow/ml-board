import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import LoginForm from './components/LoginForm'
import TensorTest from './components/TensorTest'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TensorTest />
    <LoginForm />
  </React.StrictMode>,
)
