import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { createUser, getToken } from "../api"
import { AuthContext } from '../authContext'

const Body = () => {
  const { auth } = useContext(AuthContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submit = () => {
    getToken({ auth, username, password })
  }

  return (
    <ThemeProvider
    breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs']}
    minBreakpoint="xs"
    >
      <Container>
        <Row className="justify-content-center m-3">
          <Col xs={6} md={3} className="d-flex flex-column justify-content-between text-center MainBody">
            <div className="overflow-scroll" style={{height: "50vh"}}>
              <h1>Login</h1>
              <div>
              <div>Username:</div>
              <input 
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
              </div>
              <div>
                <div>Password:</div>
                <input 
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
              <div style={{ marginTop: 20 }}>
                <Link to ='/userprofile'>
                <button onClick={() => submit()}>Submit</button>
                </Link>
              </div>
             <br />
                <Link to ='/CreateUser'>
                <button>New User? Create Account</button>
                </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </ThemeProvider>
  )
}




function App() {

  return (
    <>
      <Body />
    </>
  )
}

export default App