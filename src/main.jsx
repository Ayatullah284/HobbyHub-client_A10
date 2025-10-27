import { Component, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // ✅ একসাথে dom থেকে
import Root from './components/Root.jsx';
import NotFound from './components/NotFound.jsx';
import Home from './components/Home.jsx';
import Register from './components/authentication/Register';
import AuthProvider from './Auth/AuthProvider.jsx';
import Login from './components/authentication/Login.jsx';
import CreateGroup from './components/CreateGroup.jsx';
import AllGroup from './components/AllGroup.jsx';
import MyGroups from './components/MyGroups.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import AllGroups from './components/AllGroup.jsx';
import GroupDetails from './components/GroupDetails.jsx';
import UpdateGroup from './components/UpdateGroup.jsx';
import LoadingSpinner from './components/LoadingSpinner.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: '/register',
        Component: Register
      },
      {
        path: '/login',
        Component: Login
      },
      {
        path:"/create-group",
        element:
          (<PrivateRoute>
            <CreateGroup />
          </PrivateRoute>)
      },
      {
        path: 'allGroups',
        element: (
          <PrivateRoute>
            <AllGroups />
          </PrivateRoute>
        )
        
      },
      {
        path: 'my-groups',
        element: (
        <PrivateRoute>
          <MyGroups/>
        </PrivateRoute>)
      },
      {
        path: 'allGroups/:id',
        element: (
          <PrivateRoute>
            <GroupDetails />
          </PrivateRoute>
        )
      },
      {
        path: '/updateGroup/:id',
        element: (
          <PrivateRoute>
            <UpdateGroup />
          </PrivateRoute>
        )
      },
      {
        path: 'groupDetails/:id',
        element: <GroupDetails/>
      }
    ]
  },
  {
    path: '*',
    Component: NotFound
  }
], {
    future: {
    v7_relativeSplatPath: true,
    v7_startTransition: true,
  },
  fallbackElement: <LoadingSpinner />  // ✅ global loading
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
