import React from 'react';
import ReactDOM from 'react-dom';
import AppBuilder from './AppBuilder';
import 'antd/dist/antd.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

ReactDOM.render(
  <>
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      theme="light"
      pauseOnVisibilityChange
      draggable
      pauseOnHover
      style={{ minWidth: '400px' }}
    />
    <AppBuilder />
  </>,
  document.getElementById('app')
);

console.log('App has been loaded successfully');
