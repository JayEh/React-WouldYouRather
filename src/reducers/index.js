import { combineReducers } from 'redux'
import questions from '../reducers/questions'
import users from '../reducers/users'
import loggedInUser from './loggedInUser'

export default combineReducers({
    loggedInUser,
    questions,
    users
})