import React, { Component } from 'react'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class QuestionCard extends Component {
    handleViewPoll = (questionId) => {
        this.props.history.push(`/questions/${questionId}`)
    }

    render() {
        const { questionId, users, questions } = this.props
        const question = questions[questionId]
        let author = users[question.author]
        let questionSummary = `Would you rather ${question.optionOne.text.slice(0, 25)}...`

        return (
            <div className='card'>
                <div>{author.name} asked:</div>
                <br></br>
                <img className='card-image' src={author.avatarURL} alt='avatar' />
                <br></br>
                <div>{questionSummary}</div>
                <br></br>
                <button onClick={() => this.handleViewPoll(question.id)}>View poll</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        loggedInUser: state.loggedInUser,
        users: state.users,
        questions: state.questions
    }
}

export default withRouter(connect(mapStateToProps)(QuestionCard))