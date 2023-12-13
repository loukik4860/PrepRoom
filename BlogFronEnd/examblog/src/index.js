import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import { BlogIndex } from './IndexComponent/BlogIndex';
import { Provider } from 'react-redux';
import { store } from './AuthAppComponent/App/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BlogIndex/>
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
