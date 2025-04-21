import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import Garaj from './Garaj';
import OrnekJson from './OrnekJson';
import reportWebVitals from './reportWebVitals';
import Sayac from './Sayac';
import Yapilacaklar from './Yapilacaklar';
import Yorumlar from './Yorumlar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Yorumlar />
    <Yapilacaklar />
    <Sayac />
    <Garaj />
    <OrnekJson />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
