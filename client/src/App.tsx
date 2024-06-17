import React from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/Home";
import TestPage from "./pages/Test";
import PaymentHistoryPage from "./pages/PaymentHistoryPage";
import CurrentPlanPage from "./pages/CurrentPlanPage";

function App() {
  const routers = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <SignupPage />,
    },
    {
      path: "/payment-history",
      element: <PaymentHistoryPage />,
    },
    {
      path: "/current-plan-details",
      element: <CurrentPlanPage />,
    },
    {
      path: "/protected",
      element: <TestPage />,
    },
  ]);
  return <RouterProvider router={routers} />;
}

export default App;
