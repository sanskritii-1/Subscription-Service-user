import React from 'react';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/Home';

function App() {
  const routers = createBrowserRouter([
    {
      path:'/',
      element:<HomePage/>
    },
    {
      path:'/login',
      element:<LoginPage/>
    },
    {
      path:'/signup',
      element:<SignupPage/>
    }
  ])
  return (
    <RouterProvider router = {routers}/>
  );
}

export default App;
