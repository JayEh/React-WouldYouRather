import React, { Component } from 'react'

// needs to come from shared! not questions
import { createQuestion } from '../actions/shared'


import { connect } from 'react-redux'
import { generateUID } from '../utils/_DATA'

class NewQuestion extends Component {
    state = {
        question1: '',
        question2: '',
        submitDisabled: true
    }

    setControlledState = (stateProp, value) => {
        this.setState({
            [stateProp]: value
        })

        this.updateSubmitButton()
    }

    updateSubmitButton = () => {
        this.setState((prevState) => ({
            submitDisabled: !prevState.question1 || !prevState.question2
        }))
    }

    handleSubmit = () => {
        const { dispatch, loggedInUser } = this.props
        let q1 = this.state.question1
        let q2 = this.state.question2
        let question = this.newQuestion(loggedInUser, q1, q2)

        dispatch(createQuestion(question))

        this.setState({
            question1: '',
            question2: ''
        })

        this.updateSubmitButton()
        this.props.history.push('/')
    }

    newQuestion = (authorId, q1, q2) => {
        return {
            author: authorId,
            id: generateUID(),
            timestamp: Date.now(),
            optionOneText: q1,
            optionOne: {
                text: q1,
                votes: []
            },
            optionTwoText: q2,
            optionTwo: {
                text: q2,
                votes: []
            }
        }
    }

    render() {
        return (
            <div className='card'>
                <div>Add a New Question!</div>
                <br></br>
                <span>Would you rather...</span>
                <div>
                    <input
                        id='question1' type='text' placeholder='question #1'
                        value={this.state.question1}
                        onChange={(e) => this.setControlledState('question1', e.target.value)}>
                    </input>
                </div>
                <span>...Or...</span>
                <div>
                    <input
                        id='question2' type='text' placeholder='question #2'
                        value={this.state.question2}
                        onChange={(e) => this.setControlledState('question2', e.target.value)}>
                    </input>
                </div>
                <br></br>
                <div>
                    <button
                        disabled={this.state.submitDisabled}
                        onClick={this.handleSubmit}>
                        Submit
                    </button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        loggedInUser: state.loggedInUser
    }
}

export default connect(mapStateToProps)(NewQuestion)