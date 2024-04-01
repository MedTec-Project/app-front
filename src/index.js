import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.scss";
import LoginForm from "./views/login/LoginForm.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>inicio /</div>,
  },
  {
    path: "/Login",
    element: <LoginForm />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
