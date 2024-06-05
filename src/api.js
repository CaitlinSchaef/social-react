
import axios from 'axios'


// const baseUrl = 'https://social-django.fly.dev/'
const baseUrl = 'http://127.0.0.1:8000'


// Get access token:
export const getToken = ({ auth, username, password }) => {
    return axios.post(`${baseUrl}/token/`, {
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

