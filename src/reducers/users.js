import { SET_USERS, ANSWER_QUESTION } from '../actions/users'
import { CREATE_QUESTION } from '../actions/shared'



export default function users(state = {}, action) {
    switch (action.type) {
        case SET_USERS:
            return action.users
        case ANSWER_QUESTION:
            return {
                ...state, // spread the initial state
                [action.userId]: { // select the user
                    ...state[action.userId], // spread the user
                    answers: {  // get the answers
                        ...state[action.userId].answers, // spread the answers
                        [action.questionId]: action.option  // update this particular question
                    }
                }
            }
        case CREATE_QUESTION:
            return {
                ...state,
                [action.authorId]: {
                    ...state[action.authorId],
                    questions: state[action.authorId].questions.concat([action.questionId])
                }
            }
        default:
            return state
    }
}