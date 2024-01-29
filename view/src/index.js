import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App';

// Routes
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import Confirmation from './pages/Confirmation/Confirmation';
import ResetPassword from './pages/ResetPassword/ResetPassword';

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
      },
      {
        path: "/home",
        element: <Home />
      },
      {
        path: "/confirmacao",
        element: <Confirmation />
      },
      {
        path: "recuperar-senha",
        element: <ResetPassword />
      },
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('app'));

root.render( <RouterProvider router={router} /> );
