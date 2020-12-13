import { call, put, all, takeLeading } from 'redux-saga/effects'
import { notification } from 'antd'

import getProjectData from 'services/spring.boot.service.projects.get'
import setProjectData from 'services/spring.boot.service.projects.set'
import deleteProjectData from 'services/spring.boot.service.projects.delete'

import actions from './actions'

export function* GET_PROJECTS() {
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const projects = yield call(getProjectData)
  if (projects) {
    yield put({
      type: 'service/GET_PROJECTS',
      payload: {
        projects,
      },
    })
  }
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* SET_PROJECTS(action) {
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const success = yield call(setProjectData, action.payload)
  yield put({
    type: 'service/SET_PROJECTS',
  })
  if (success) {
    notification.success({
      message: `Data Saved`,
      description: action.payload.map(item => item.projectName),
    })
    yield put({
      type: 'user/SET_STATE',
      payload: {
        loading: false,
      },
    })
  } else {
    notification.error({
      message: `Data Failed`,
      description: `sorry`,
    })
  }
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: false,
    },
  })
}
export function* DELETE_PROJECTS(action) {
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: true,
    },
  })
  yield call(deleteProjectData, action.payload)
  yield put({
    type: 'service/DELETE_PROJECTS',
  })
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export default function* rootSaga() {
  yield all([
    takeLeading(actions.SET_PROJECTS, SET_PROJECTS),
    takeLeading(actions.GET_PROJECTS, GET_PROJECTS),
    takeLeading(actions.DELETE_PROJECTS, DELETE_PROJECTS),
  ])
}
