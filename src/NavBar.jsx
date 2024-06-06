import './NavBarStyle.css'
import React from "react";
import { Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavbarCollapse from 'react-bootstrap/NavbarCollapse'
import { useState, useContext } from 'react'

import { AuthContext } from './authContext'




function MyNavBar() {
  const { auth } = useContext(AuthContext)
  
  // this will both clear the local storage and also take away the access token!
  const logOut = () => {
    localStorage.clear("token")
    auth.setAccessToken('')
    localStorage.clear("user")
    auth.setUser('')
    console.log('LOGGED OUT: SUCCESS')
  }

  return (
      <>
    <Navbar className="">
      <Container>
        <Navbar.Collapse className="">
        <Navbar.Brand>
          <Link className="nav-link" to='/'>
            CarryOn
          </Link>
        </Navbar.Brand>

        <Navbar.Text className="nav-link me-2">
        <Link className="nav-link" to='/userprofile'>Profile</Link> 
        </Navbar.Text>

        <Navbar.Text className="nav-out me-2 justify-content-end">
          <button onClick={() => logOut()}>Log Out</button>
        </Navbar.Text>

      </Navbar.Collapse>
      </Container>
    </Navbar>
  </>
  )
}

export default MyNavBar