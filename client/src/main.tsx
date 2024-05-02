import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { SWRConfig } from 'swr';
import fetcher from './lib/fetch.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SWRConfig value={{ fetcher }}>
      <App />
    </SWRConfig>
  </React.StrictMode>,
)
