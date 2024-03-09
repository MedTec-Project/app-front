import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from "./views/LoginForm.jsx";
import "./index.css";


const router = createBrowserRouter([
  {
    path: "/",
    element: <div>inicio /</div>,
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
