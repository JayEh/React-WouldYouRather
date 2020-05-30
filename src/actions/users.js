import { CREATE_QUESTION } from './shared'
export const SET_USERS = 'SET_USERS'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'

export function setUsersAction(users) {
    return {
        type: SET_USERS,
        users
    }
}

export function createQuestionAction_user(question) {
    return {
        type: CREATE_QUESTION,
        authorId: question.author,
        questionId: question.id
    }
}


export function answerQuestionAction_user(userId, questionId, option) {
    return {
        type: ANSWER_QUESTION,
        userId,
        questionId,
        option
    }
}
