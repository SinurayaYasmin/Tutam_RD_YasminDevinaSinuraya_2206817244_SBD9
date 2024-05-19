import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegisterAccount from "../pages/register.jsx";
import MainPage from "../pages/mainpage.jsx";
import Login from "./App.jsx";
import BookingPage from "../pages/bookingpage.jsx";
import UpdateTicketPage from "../pages/updateticketpage.jsx";
import SchedulePage from "../pages/schedulepage.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "register",
    element: <RegisterAccount />,
  },
  {
    path: "/mainPage/:email",
    element: <MainPage />,
  },
  {
    path: "login",
    element: <Login />,
  },

  {
    path: "bookingPage/:email",
    element: <BookingPage />,
  },
  
  {
    path: "updateTicketPage/:email",
    element: <UpdateTicketPage />,
  },
  {
    path: "schedulePage/:email",
    element: <SchedulePage />,
  },

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
