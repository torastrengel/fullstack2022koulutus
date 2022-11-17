import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import ErrorPage from './ErrorPage';
import Tentti, { loader as tenttiLoader } from './Tentti';
import Login from './Login';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    /* loader: rootLoader, */
    children: [
      {
        path: 'tentit/:tenttiId',
        element: <Tentti />,
        errorElement: <ErrorPage />,
        loader: tenttiLoader,
      },
      {
        path: 'login',
        element: <Login />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
