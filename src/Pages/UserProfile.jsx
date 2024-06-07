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
  const image = post.image ? <img src={`http://127.0.0.1:8000${post.image}`} width="150"
  height="150" alt="Post Image" /> : null;
  const imageCaption = post.image_caption ? post.image_caption : ''


  return (
    <div>
    <Col md={6} className="justify-content-center">
      <Card border="dark" style={{ width: '18rem' }} className="cardBody justify-content-center">
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
          <button>Delete Post:</button> <button>Edit Post:</button>
        </Card.Footer>
      </Card>
    </Col>
    </div>
  )
}

// you need to convert this object to array or you cannot map
const SpecificDisplay = ({ posts }) => {
  return (
    <div>
      <Row className=" g-4">
        {posts?.map((post) => <PostDisplay key={post.id} post={post} />)}
      </Row>
    </div>
  )
}

const UserPostDisplay = () => {
  const { auth } = useContext(AuthContext)
  const [posts, setPosts] = useState([])

  
  useEffect(() => {
    // Retrieve username from local storage
    const storedUsername = localStorage.getItem('user')
    
    // Check if auth and storedUsername are not null or undefined
    if (auth && storedUsername) {
      getPosts({ auth }).then(response => {
        // console.log('RESPONSE: ', response)
        try {
          // Log response data before filtering
          // console.log('Response data before filtering: ', response.data)
          
          //filter first the nulls out then by author
          // Filter posts where post_author is not null
          const userPosts = response.data.filter(post => post.post_author !== null)
          // console.log('USER POSTS BY USER: ', userPosts)
          
          
          // Filter the remaining posts based on the author's username
          const userPostsByUsername = []
          userPosts.forEach(post => {
            console.log('storedUsername: ', typeof(storedUsername), storedUsername)
            // you have to take off all of the quotes that the username is in 
            let newNameMinusQuotes = storedUsername.replaceAll('"', '')
            console.log('AUTHOR IN POST WE ARE TESTING: ', typeof(post.post_author.user.username), post.post_author.user.username)
            if (post.post_author.user.username === newNameMinusQuotes) {
              console.log('POST WE ARE RETURNING: ', post)
              userPostsByUsername.push(post)
            }
          })
        
          console.log('USER POSTS FILTERED BY USER: ', userPostsByUsername)

          // Set the posts state
          setPosts(userPostsByUsername)
        } catch (error) {
          console.error('Error filtering posts:', error)
        }
      }).catch(error => {
        console.error('Error fetching posts:', error)
      });
    }
  }, [auth]);



  // useEffect(() => {
  //   // get posts and filter them based on the logged-in user's ID
  //   getPosts({ auth }).then(response => {
  //     console.log('RESPONSE: ', response);
  //     // Filter posts based on the user's ID
  //     const userPosts = response.data.filter(post => post.post_author.id === auth.user.id);
  //     setPosts(userPosts);
  //     console.log('USER POSTS: ', userPosts);
  //   });
  // }, [auth])


  return (
    <div>
      <br />
      <SpecificDisplay posts={posts}/>
    </div>
  )
}

const NewPostDisplay = () => {
    const { auth } = useContext(AuthContext)
    const [postCategory, setPostCategory] = useState('')
    const [postSubCategory, setPostSubCategory] = useState('')
    const [postBody, setPostBody] = useState('')
    const [image, setImage] = useState(undefined)
    const [imageCaption, setImageCaption] = useState('')

    // could identify some of these in views.py in the backend (like user etc)
    const submit = () => {
      createPost({ auth, postCategory, postSubCategory, postBody, image, imageCaption })
      .then(response => {
        console.log('UPLOAD POST: RESPONSE: ', response)
      })
      .catch(error => console.log('POST UPLOAD ERROR: ', error))
    }

  return (
  
        <div>
          <h3>New Post:</h3>
            <Form>
              <Form.Select aria-label="Default select example"
                onChange={(e) => setPostCategory(e.target.value)}
                value={ postCategory }
              >
                <option>Select A Category:</option>
                <option value="Africa">Africa</option>
                <option value="Asia">Asia</option>
                <option value="Australia">Australia</option>
                <option value="North America">North America</option>
                <option value="Central America">Central America</option>
                <option value="South America">South America</option>
                <option value="Europe">Europe</option>
              </Form.Select>
              <br />
              <Form.Select aria-label="Default select example"
                onChange={(e) => setPostSubCategory(e.target.value)}
                value={ postSubCategory }
              >
                <option>Select A SubCategory:</option>
                <option value="Cities">Cities</option>
                <option value="Lodging">Lodging</option>
                <option value="Language">Language</option>
                <option value="Food">Food</option>
                <option value="Transportation">Transportation</option>
              </Form.Select>
              <br />
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Write Your Post:</Form.Label>
                <Form.Control as="textarea" rows={4} 
                  onChange={(e) => setPostBody(e.target.value)}
                  value={ postBody }
                />
              </Form.Group>
              {/* <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Attach Image?</Form.Label>
                <Form.Control 
                  type="file"
                  accept='image/*'
                  onChange={(e) => setImage(e.target.files[0])}
                  value={ image }
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Image Caption:</Form.Label>
                <Form.Control as="textarea" rows={1} 
                  onChange={(e) => setImageCaption(e.target.value)}
                  value={ imageCaption }
                />
              </Form.Group> */}
            </Form>
            <div>
              <input 
                type="file"
                accept='image/*'
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <div>
              <div>Image Caption</div>
              <input
                onChange={e => setImageCaption(e.target.value)}
                value={ imageCaption }
              />
            </div>
            <button onClick={() => submit()}>Submit Post!</button>
          </div>

  )
}


function UserProfile() {
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
                  <h1>User Portal:</h1>
                  <span>
                    <button
                    className="me-2"
                    title="New Post Display:" onClick={(() => setDisplay('New Post Display:'))}
                    > Create New Post: </button>
                    <button
                    title="User Posts:" onClick={(() => setDisplay('User Posts:'))}
                    > See Your Posts: </button>
                  </span>
                  <div>
                    {display === "New Post Display:" && <NewPostDisplay/>}
                    {display === "User Posts:" && <UserPostDisplay />}
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
      </ThemeProvider>
    )
  }
  
  export default UserProfile