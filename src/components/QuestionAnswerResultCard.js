import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import QuestionResultCard from './QuestionResultCard'
import QuestionAnswerCard from './QuestionAnswerCard'

class QuestionAnswerResultCard extends Component {
    state = {
        isQuestionAnswered: false
    }

    componentDidMount = () => {
        const { questionId } = this.props.match.params
        const { loggedInUser, users } = this.props
        const isQuestionAnswered = Object.keys(users[loggedInUser].answers).indexOf(questionId) !== -1
        this.setState({ isQuestionAnswered })
    }

    setIsQuestionAnswered = () => {
        this.setState({
            isQuestionAnswered: true
        })
    }

    render() {
        const { questionId } = this.props.match.params
        const question = this.props.questions[questionId]

        if (!question)
            return (
                <div>
                    <h3>404 - Question Not Found</h3>
                    <p>I'm sorry, but I couldn't find that question. Please try again.</p>
                </div>
            )
        else

            return (
                <Fragment>
                    {this.state.isQuestionAnswered
                        ? <QuestionResultCard questionId={questionId} />
                        : <QuestionAnswerCard questionId={questionId} setIsQuestionAnswered={this.setIsQuestionAnswered} />}
                </Fragment>
            )
    }
}

function mapStateToProps({ loggedInUser, users, questions }) {
    return {
        loggedInUser,
        users,
        questions
    }
}

export default connect(mapStateToProps)(QuestionAnswerResultCard)