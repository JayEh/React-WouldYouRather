import { getinitialData, saveQuestionAnswer, saveQuestion } from '../utils/api'
import { setUsersAction, answerQuestionAction_user, createQuestionAction_user } from '../actions/users'
import { setQuestionsAction, answerQuestionAction_question, createQuestionAction_question } from '../actions/questions'

export const HANDLE_INITIAL_DATA = 'HANDLE_INITIAL_DATA'
export const CREATE_QUESTION = 'CREATE_QUESTION'

export function handleInitialData() {
    return (dispatch) => {
        // make api call for users and questions
        return getinitialData()
            .then(({ users, questions }) => {
                // dispath actions to update the store with the lists from the api
                dispatch(setUsersAction(users))
                dispatch(setQuestionsAction(questions))
            })
    }
}

export function createQuestion(question) {
    return (dispatch) => {
        const toSave = {
            optionOneText: question.optionOne.text,
            optionTwoText: question.optionTwo.text,
            author: question.author
        }

        saveQuestion(toSave)
            .then((q) => {
                dispatch(createQuestionAction_question(q))
                dispatch(createQuestionAction_user(q))
            })
    }
}

export function answerQuestion(userId, questionId, option) {
    return (dispatch) => {
        saveQuestionAnswer(userId, questionId, option)
            .then((res) => {
                console.log(res)
                dispatch(answerQuestionAction_question(userId, questionId, option))
                dispatch(answerQuestionAction_user(userId, questionId, option))
            })
    }
}