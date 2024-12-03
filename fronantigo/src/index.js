import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "./index.scss";
import LoginForm from "./views/login/LoginForm.jsx";

const user = localStorage.getItem('user');

const router = createBrowserRouter([
  {
    path: "/",
    element: user ? <div>Inicio /</div> : <Navigate to="/Login" />
  },
  {
    path: "/Login",
    element: <LoginForm />
  },
  {
    path: "*",
    element: <Navigate to={user ? "/" : "/Login"} />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
