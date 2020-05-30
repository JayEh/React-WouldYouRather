import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { answerQuestion } from '../actions/shared'


class QuestionAnswerCard extends Component {
    state = {
        selectedOption: null
    }

    onRadioChange = (e) => {
        this.setState({
            selectedOption: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { dispatch, loggedInUser, questionId, setIsQuestionAnswered } = this.props
        const { selectedOption } = this.state
        dispatch(answerQuestion(loggedInUser, questionId, selectedOption))

        setIsQuestionAnswered()
    }


    render() {
        const { questions, users, questionId } = this.props
        let question = questions[questionId]
        let author = users[question.author]

        return (
            <div className='card'>
                <div>
                    <div>{author.name} asked</div>
                    <img className='card-image' src={`../${author.avatarURL}`} alt='avatar' />
                </div>
                <br></br>

                <div>Would you rather</div>
                <div>
                    <input type='radio' id='optionOne' value='optionOne' name='answer' onChange={this.onRadioChange}></input>
                    <label>{question.optionOne.text}</label>
                </div>
                <div>...Or...</div>
                <div>
                    <input type='radio' id='optionTwo' value='optionTwo' name='answer' onChange={this.onRadioChange}></input>
                    <label>{question.optionTwo.text}</label>
                </div>
                <br></br>
                <div>
                    <button disabled={!this.state.selectedOption} onClick={(e) => this.handleSubmit(e)}>Submit</button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        loggedInUser: state.loggedInUser,
        questions: state.questions,
        users: state.users,
    }
}

export default withRouter(connect(mapStateToProps)(QuestionAnswerCard))