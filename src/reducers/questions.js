import { SET_QUESTIONS, ADD_QUESTION, ADD_USER_VOTE } from '../actions/questions'

export default function questions(state = null, action) {
    switch (action.type) {
        case SET_QUESTIONS:
            return action.questions
        case ADD_QUESTION:
            return {
                ...state,
                [action.question.id]: action.question
            }
        case ADD_USER_VOTE:
            return {
                ...state,   // spread the previous state
                [action.questionId]: { // get the question
                    ...state[action.questionId], // spread the question
                    [action.option]: {  // get the option
                        ...state[action.questionId][action.option], // spread the option
                        votes: state[action.questionId][action.option].votes.concat([action.userId]) // add users vote
                    }
                }
            }
        default:
            return state
    }
}