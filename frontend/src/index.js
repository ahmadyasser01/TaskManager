import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import {UserProvider} from './context/Auth'
import { TaskProvider } from './context/Tasks';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <TaskProvider>
  <UserProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </UserProvider>
  </TaskProvider>
);

