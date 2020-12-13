import { all, takeLatest, put, call } from 'redux-saga/effects'
import { login, logout, createUser } from 'services/firebase.auth.service'
import actions from './actions'
import getProjectData from '../../services/spring.boot.service.projects.get'

export function* LOGIN({ payload }) {
  console.log('LOGIN')
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const { email, password } = payload
  const response = yield call(login, email, password)
  if (response) {
    console.log('Login response')
    const projects = yield call(getProjectData)
    const { uid: id, email: mail, photoURL: avatar, displayName } = response

    sessionStorage.setItem('email', email)
    sessionStorage.setItem('password', password)

    yield put({
      type: 'user/SET_STATE',
      payload: {
        id,
        name: 'Administrator',
        email: mail,
        avatar,
        role: 'admin',
        authorized: true,
        displayName,
      },
    })
    yield put({
      type: 'service/GET_PROJECTS',
      payload: {
        projects,
      },
    })
  } else {
    return false
  }
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* SIGNUP({ payload }) {
  console.log('SIGNUP')
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const { email, password, tenant } = payload
  sessionStorage.setItem('email', email)
  sessionStorage.setItem('password', password)
  sessionStorage.setItem('tenant', tenant)

  try {
    const x = {
      role: 'admin',
      username: sessionStorage.getItem('email'),
      password: sessionStorage.getItem('password'),
      tenant: sessionStorage.getItem('tenant'),
      token: 'temptoken',
      enabled: true,
      accountNonExpired: true,
      accountNonLocked: true,
      credentialsNonExpired: true,
    }
    const result = createUser(x)
    console.log(result)
  } catch {
    console.log('Error')
  }

  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* LOGOUT() {
  yield call(logout)
  yield put({
    type: 'user/SET_STATE',
    payload: {
      id: '',
      name: '',
      role: '',
      email: '',
      avatar: '',
      authorized: false,
      loading: false,
      token: '',
    },
  })
}

export default function* rootSaga() {
  yield all([
    takeLatest(actions.LOGIN, LOGIN),
    takeLatest(actions.LOGOUT, LOGOUT),
    takeLatest(actions.SIGNUP, SIGNUP),
  ])
}
