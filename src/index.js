import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.scss";
import LoginForm from "./views/login/LoginForm.jsx";

const user = localStorage.getItem('user')
console.log(user)

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Inicio /</div>,
  }
]);

const login = createBrowserRouter([
  {
    path: "/",
    element: <LoginForm />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={user ? router : login} />
  </React.StrictMode>
);
