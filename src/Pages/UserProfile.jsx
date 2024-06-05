import { useState } from 'react'
import { Link } from 'react-router-dom'
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { createPost } from "../api"
import Form from 'react-bootstrap/Form';




const Body = () => {
    const [username, setUsername] = useState('')
    const [post_category, setPostCategory] = useState('')
    const [post_sub_category, setPostSubCategory] = useState('')
    const [post_body, setPostBody] = useState('')
    const [image, setImage] = useState('')

    
    const submit = () => {
      createPost({ username, post_category, post_sub_category, post_body, image })
    }

  return (
    <ThemeProvider
    breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs']}
    minBreakpoint="xs"
    >
      <Container>
        <Row className="justify-content-center m-3">
          <Col xs={12} md={7} className="d-flex flex-column justify-content-between text-center MainBody">
            <div className="overflow-scroll" style={{height: "75vh"}}>
              <h1>User Portal:</h1>
              <div>
                <h3>New Post:</h3>
                  <Form>
                    <Form.Select aria-label="Default select example">
                      <option>Select A Category:</option>
                      <option value="1">Africa</option>
                      <option value="2">Asia</option>
                      <option value="3">Australia</option>
                      <option value="4">North America</option>
                      <option value="5">Central America</option>
                      <option value="6">South America</option>
                      <option value="7">Europe</option>
                    </Form.Select>
                    <br />
                    <Form.Select aria-label="Default select example">
                      <option>Select A SubCategory:</option>
                      <option value="1">Cities</option>
                      <option value="2">Lodging</option>
                      <option value="3">Language/Communication</option>
                      <option value="4">Food</option>
                      <option value="5">Transportation</option>
                    </Form.Select>
                    <br />
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                      <Form.Label>Write Your Post:</Form.Label>
                      <Form.Control as="textarea" rows={4} />
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Label>Attach Image?</Form.Label>
                      <Form.Control type="file" />
                    </Form.Group>
                  </Form>
                </div>
            </div>
          </Col>
        </Row>
      </Container>
    </ThemeProvider>
  )
}


function UserProfile() {

    return (
      <>
       <Body />
      </>
    )
  }
  
  export default UserProfile