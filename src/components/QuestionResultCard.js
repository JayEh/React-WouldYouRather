import React, { Component } from 'react'
import { connect } from 'react-redux'

class QuestionResultCard extends Component {
    render() {
        const { loggedInUser, users, questions, questionId } = this.props
        const question = questionId ? questions[questionId] : null
        const answer = questionId ? users[loggedInUser].answers[questionId] : null

        if (!question || !answer)
            return null

        let reverseLookup = {
            'optionOne': 'optionTwo',
            'optionTwo': 'optionOne'
        }

        const author = users[question.author]
        const votedSame = question[answer].votes.length
        const votedOther = question[reverseLookup[answer]].votes.length
        const allVotes = votedSame + votedOther
        const percentSame = Math.round((votedSame / allVotes) * 100)
        const summaryText = `${votedSame}/${allVotes} voted for ${question[answer].text}`

        return (
            <div className='card'>
                <div>
                    <div>{author.name} asked</div>
                    <img className='card-image' src={'../' + author.avatarURL} alt='avatar' />
                </div>
                <br></br>
                <div>Would you rather</div>
                <div>
                    {answer === 'optionOne' && (<span className='bold'>You Chose:  </span>)}
                    {question.optionOne.text}
                </div>
                <div>
                    ...Or...
                </div>
                <div>
                    {answer === 'optionTwo' && (<span className='bold'>You Chose:  </span>)}
                    {question.optionTwo.text}
                </div>
                <br></br>
                <div>
                    {summaryText}
                    <br></br>
                    {percentSame}% of people chose the same option as you.
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { loggedInUser, users, questions } = state

    return {
        loggedInUser,
        users,
        questions
    }
}

export default connect(mapStateToProps)(QuestionResultCard)