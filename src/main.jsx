
import React from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css'
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

import ThemeContextProvider from './context/ThemeContext.jsx';
import './I18n.jsx';


createRoot(document.getElementById('root')).render(
 <>
 <ThemeContextProvider>
<ToastContainer />
    <App /> 

 </ThemeContextProvider>
     
   
  </>
)
