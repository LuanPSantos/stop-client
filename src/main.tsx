import React, { createContext, useReducer } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import { io } from "socket.io-client"
import axios from 'axios'

export const socket = io('ws://192.168.0.106:3001')
export const http = axios.create({ baseURL: "http://192.168.0.106:3001" })

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
