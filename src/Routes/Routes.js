import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import AllMedia from "../pages/Media/AllMedia";
import Home from "../pages/Home/Home";
import About from "../pages/About";
import Login from "../pages/Login/Login/Login";
import Register from "../pages/Login/Register/Register";
import PrivateRoute from "./PrivateRoute";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/allmedia",
        element: (
          <PrivateRoute>
            <AllMedia></AllMedia>
          </PrivateRoute>
        ),
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
]);
