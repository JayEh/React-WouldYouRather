import React, { Component } from 'react'

class Scorecard extends Component {
    render() {
        const { user } = this.props
        return (
            <div className='card'>
                <img className='card-image' src={user.avatarURL} alt='avatar' />
                <div className='bold'>{user.name}</div>
                <br></br>
                <div>Answered questions: {user.answeredQuestions}</div>
                <div>Asked questions: {user.createdQuestions}</div>
                <br></br>
                <div className='bold'>Score: {user.score}</div>
            </div>
        )
    }
}

export default Scorecard