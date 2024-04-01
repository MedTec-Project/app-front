import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from "../src/views/Login/LoginForm.jsx"
import "./index.css";


const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Inicio /</div>,
  },
  {
    path: "/Login",
    element: <Login />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
