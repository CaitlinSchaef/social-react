import { useState } from 'react'
import { Link } from 'react-router-dom'
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { createUser } from "../api"



const Body = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    
    const submit = () => {
      createUser({ username, password, firstName, lastName })
    }

  return (
    <ThemeProvider
    breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs']}
    minBreakpoint="xs"
    >
      <Container>
        <Row className="justify-content-center m-3">
          <Col xs={12} md={8} className="d-flex flex-column justify-content-between text-center MainBody">
            <div className="overflow-scroll" style={{height: "50vh"}}>
              <h1>Create New User</h1>
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
              <div>
                <div>First Name:</div>
                <input 
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                />
              </div>
              <div>
                <div>Last Name:</div>
                <input 
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                />
              </div>
              <div style={{ marginTop: 20 }}>
                <button onClick={() => submit()}>Create New User</button>
              </div>

              <br />

                <Link to ='/'>
                <button>Log In</button>
                </Link>

            </div>
          </Col>
        </Row>
      </Container>
    </ThemeProvider>
  )
}




function CreateUser() {

  return (
    <>
      <Body />
    </>
  )
}

export default CreateUser