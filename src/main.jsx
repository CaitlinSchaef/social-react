import React, { useContext } from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import { createContext } from 'react'
import { useState, useEffect } from 'react'
import { useReducer } from 'react'

//project styles
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

// page imports
import App from './Pages/App.jsx';
import ErrorPage from './Pages/ErrorPage.jsx';
import UserProfile from './Pages/UserProfile.jsx';
import MyNavBar from './NavBar.jsx';
import CreateUser from './Pages/CreateUser.jsx';
import Forum from './Pages/Forum.jsx';
// import { initialState, taskReducer } from './Pages/ToDoFunction.jsx';

// Importing Context
import { AuthContext } from './authContext.js'


const site = import.meta.env.BASE_URL


const Protected = ({component}) => {
  const { auth } = useContext(AuthContext)
  return auth?.accessToken ? (
    <>
      {component}
    </>
  ) : (
    <Navigate to="/" replace={true} />
  )
}

//this is our layout to install
// If you want to add a footer, do it after the outlet div with <Footer /> same for navbar
function Layout() {
  return (
    <div className="d-flex flex-column justify-content-between vh-100">
      <MyNavBar />
      <div id='page-content'>
        <Outlet />
      </div>
    </ div>
  )
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <App />
      },
      {
        path: '/createuser',
        element: <CreateUser />
      },
      {
        path: '/userprofile',
        element: <Protected component={<UserProfile />} />
      },
      {
        path: '/forum',
        element: <Protected component={<Forum />} />
      },
    ]
  }
], {
  basename: site
})


// basically we're creating values that we're going to track and update, and then we need to wrap that whole thing around the app
const AuthContextProvider = ({ children }) => {
  //we're going to set up local storage to store their token
  let tempToken = localStorage.getItem('token')
  let tempUser = localStorage.getItem('user')
  
  const [accessToken, setAccessToken] = useState(tempToken ? tempToken : '')
  const [user, setUser] = useState(tempUser ? tempUser : '')

  useEffect(() => {
    localStorage.setItem("token", JSON.stringify(accessToken))
    localStorage.setItem("user", JSON.stringify(user))
  }, [accessToken])

  const auth = {
    accessToken,
    setAccessToken,
    user,
    setUser
  }

  return (
    <AuthContext.Provider value ={{ auth }}>
      {children}
    </AuthContext.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
   <RouterProvider router={router} />
  </AuthContextProvider>
)
