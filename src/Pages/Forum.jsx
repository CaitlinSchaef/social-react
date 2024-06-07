import { useState } from 'react'
import { Link } from 'react-router-dom'
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { createPost, getPosts } from "../api"
import Form from 'react-bootstrap/Form';
import { AuthContext } from "../authContext"
import { useContext, useEffect } from 'react'
import Card from 'react-bootstrap/Card';

const PostDisplay = ({ post }) => {
  // because i had been working out my code all day, a few old posts had unknown users and so i needed to set
  // a guard variable to set it as 'Unknown Author', I will need to do the same sort of thing with the categories
  // I'm also going to handle images this way
  const username = post.post_author && post.post_author.user ? post.post_author.user.username : 'Unknown Author'
  const category = post.post_category ? post.post_category.category : 'Unknown Category'
  const subCategory = post.post_sub_category ? post.post_sub_category.post_sub_category : 'Unknown SubCategory'
  const image = post.image ? <img src={post.image} alt="Post Image" /> : null;
  const imageCaption = post.image_caption ? post.image_caption : ''


  return (
    <Col md={6} className="justify-content-center">
      <Card border="dark" style={{ width: '18rem' }} className="cardBody">
      <Card.Header>Category: {category} <br /> {subCategory}</Card.Header>
        <Card.Body>
          {/* <Card.Title className="cardTitle">
            
            </Card.Title> */}
          <Card.Text>{post.post_body}</Card.Text>
          {image}
          <br />
          {imageCaption}
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Posted By: {username}</small>
        </Card.Footer>
      </Card>
    </Col>
  )
}

// you need to convert this object to array or you cannot map
const SpecificDisplay = ({ posts }) => {
  return (
    <div>
      <Row className="justify-content-center g-4">
        {posts?.map((post) => <PostDisplay key={post.id} post={post} />)}
      </Row>
    </div>
  )
}

const AllPostDisplay = () => {
  const { auth } = useContext(AuthContext)
  const [posts, setPosts] = useState([])

  //come back and filter by user then set posts with that data 
  useEffect(() => {
    getPosts({ auth }).then(response => {
      console.log('RESPONSE: ', response)
      setPosts(response.data)
      console.log('POSTS: ', posts)
    })
  }, [])


  return (
    <div>
      <br />
      <SpecificDisplay posts={posts}/>
    </div>
  )
}


function Forum() {
  const [display, setDisplay] = useState('')

    return (
        <ThemeProvider
          breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs']}
          minBreakpoint="xs"
          >
          <Container>
            <Row className="justify-content-center m-3">
              <Col xs={12} md={7} className="d-flex flex-column justify-content-between text-center MainBody">
                <div className="overflow-scroll" style={{height: "75vh"}}>
                  <h1>Forums:</h1>
                  <span>
                    <button
                    className="me-2"
                    title="New Post Display:" onClick={(() => setDisplay('New Post Display:'))}
                    > This will be continents </button>
                    <button
                    title="User Posts:" onClick={(() => setDisplay('User Posts:'))}
                    > See All Posts: </button>
                  </span>
                  <div>
                  {display === "User Posts:" && <AllPostDisplay />}
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
      </ThemeProvider>
    )
  }

  
  export default Forum

