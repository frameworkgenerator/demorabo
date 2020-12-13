import actions from './actions'

const initialState = {
  projects: [],
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_DROPDOWN:
      return { ...state, ...action.payload }
    case actions.GET_PROJECTS:
      return { ...state, ...action.payload }
    case actions.SET_PROJECTS:
      return { ...state, ...action.payload }
    case actions.DELETE_PROJECTS:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
