import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
import { history } from '../index'

const firebaseConfig = {
  apiKey: 'AIzaSyBOWfLl_EoXMyKy9-gKbiHVHKC7UCixAe8',
  authDomain: 'ventus-e8164.firebaseapp.com',
  databaseURL: 'https://ventus-e8164.firebaseio.com',
  projectId: 'ventus-e8164',
  storageBucket: 'ventus-e8164.appspot.com',
  messagingSenderId: '639759208106',
  appId: '1:639759208106:web:e2962e6f13a62633cc0ad3',
  measurementId: 'G-YEW5P44ZVY',
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
const firebaseAuth = firebase.auth
export default firebaseApp

export async function login(email, password, tenant) {
  sessionStorage.setItem('email', email)
  sessionStorage.setItem('password', password)
  sessionStorage.setItem('tenant', tenant)
  history.push('/')
  return true
}

export async function createUser(data) {
  sessionStorage.setItem('email', data.username)
  sessionStorage.setItem('password', data.password)
  sessionStorage.setItem('tenant', data.tenant)
  function getCurrentUser() {
    return new Promise(() => {
      fetch('http://backend:9009/users', {
        method: 'POST',
        headers: {
          mode: 'cors',
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      history.push('/')
      return true
    })
  }
  return getCurrentUser(firebaseAuth())
}

export async function logout() {
  return firebaseAuth()
    .signOut()
    .then(() => true)
}
