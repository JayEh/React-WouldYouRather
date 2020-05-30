export const SET_QUESTIONS = 'SET_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ADD_USER_VOTE = 'ADD_USER_VOTE'

export function setQuestionsAction(questions) {
    return {
        type: SET_QUESTIONS,
        questions
    }
}

export function createQuestionAction_question(question) {
    return {
        type: ADD_QUESTION,
        question
    }
}

export function answerQuestionAction_question(userId, questionId, option) {
    return {
        type: ADD_USER_VOTE,
        userId,
        questionId,
        option
    }
}

