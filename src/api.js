
import axios from 'axios'


const baseUrl = 'https://social-django.fly.dev/'
// const baseUrl = 'http://127.0.0.1:8000'


// Get access token:
export const getToken = ({ auth, username, password }) => {
    return axios.post(`${baseUrl}token/`, {
        username: username,
        password: password
    }).then(response => {
        console.log('TOKEN RESPONSE: ', response)
        auth.setAccessToken(response.data.access)
    }).catch(error => {
        console.log('TOKEN GRAB ERROR: ', error)
        auth.setAccessToken(undefined)
    })
}

// Fetch User
export const fetchUser = ({ auth }) => {
    axios({
      method: 'get',
      url: `${baseUrl}profile/`, 
      headers: {
        Authorization: `Bearer ${auth.accessToken}`
      }
    }).then(response => {
      console.log('PROFILE: ', response)
    })
    .catch(error => {
      console.log('GET USER ERROR: ', error)
      auth.setAccessToken(undefined)
    })
  }

//Create New User
export const createUser = ({ username, password, firstName, lastName }) => {
    axios({
      method: 'post',
      url: `${baseUrl}create_user/`, 
      data: {
        username,
        password: password,
        first_name: firstName,
        last_name: lastName
      }
    }).then(response => {
      console.log('CREATE USER: ', response)
    })
    .catch(error => {
      console.log('CREATE USER ERROR: ', error)
    })
  }

//Get Posts
// export const getImages = ({ auth }) => {
//     return axios({
//       method: 'get',
//       url: `${baseUrl}/get-images`,
//       headers: {
//         Authorization: `Bearer ${auth.accessToken}`
//       }
//     })
//   }

//Create New Posts
//content type is important here
// export const createImage = ({ title, image, auth }) => {
//     return axios({
//       method: 'post',
//       url: `${baseUrl}/create-image/`,
//       headers: {
//         Authorization: `Bearer ${auth.accessToken}`,
//         'Content-Type': 'multipart/form-data'
//       },
    //   data: {
    //     image,
    //     title,
//       }
//     })
//   }
