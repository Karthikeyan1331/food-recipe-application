import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from './login/formSignUpIn'
import SearchP from './login/Search'
import Instruction from './foodSteps/foodInstruction'
import CheckYourMail from './login/EmailVerifiefied'
import Verifiedd from './login/verify'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
createBrowserRouter,
  RouterProvider,
  Route
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path:"/Login",
    element:<Login/>,
  },
  {
    path:"/Search",
    element:<SearchP/>,
  },
  {
    path:"/Instruction",
    element:<Instruction/>,
  },
  {
    path:"/CheckYourMail",
    element:<CheckYourMail/>,
  },
  {
    path:"/verify",
    element:<Verifiedd/>,
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);