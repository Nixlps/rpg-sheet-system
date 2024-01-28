import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App';

// Routes
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

const router = createBrowserRouter([
  {
    path: '/',
    element:  <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/cadastro",
        element: <Register />
      }
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('app'));

root.render( <RouterProvider router={router} /> );
