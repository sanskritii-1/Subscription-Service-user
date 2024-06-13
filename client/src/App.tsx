import React from 'react';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/Home';
import TestPage from './pages/Test';
import ResourcePage from './pages/Resources';

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
      path:'/register',
      element:<SignupPage/>
    },
    {
      path: '/protected',
      element: <TestPage />
    },
    {
      path: '/resources',
      element: <ResourcePage />
    }
  ])
  return (
    <RouterProvider router = {routers}/>
  );
}

export default App;
