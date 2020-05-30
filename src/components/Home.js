import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import QuestionCard from './QuestionCard'
import QuestionResultCard from './QuestionResultCard'
import QuestionAnswerResultCard from './QuestionAnswerResultCard'
import NewQuestion from './NewQuestion'
import Leaderboard from './Leaderboard'

import { connect } from 'react-redux'

class Home extends Component {
    state = {
        showQuestionType: 'unanswered'
    }

    setControlledState = (stateProp, value) => {
        this.setState({
            [stateProp]: value
        })
    }

    render() {
        const { questions, users, loggedInUser } = this.props
        let user = users[loggedInUser]

        let filteredQuestions
        if (this.state.showQuestionType === 'answered')
            filteredQuestions = Object.keys(user.answers)
        else
            filteredQuestions = Object.keys(questions).filter((q) => !Object.keys(user.answers).includes(q))

        filteredQuestions.sort((qa, qb) => questions[qb].timestamp - questions[qa].timestamp)

        return (
            <div className='home'>

                <Route path='/' exact>
                    <div className='container'>
                        <span
                            onClick={() => this.setControlledState('showQuestionType', 'unanswered')}
                            className={`home-text cursor-pointer ${this.state.showQuestionType === 'unanswered' ? 'selected' : null}`}>
                            Unanswered Questions
                        </span>
                        <span
                            onClick={() => this.setControlledState('showQuestionType', 'answered')}
                            className={`home-text cursor-pointer ${this.state.showQuestionType === 'answered' ? 'selected' : null}`}>
                            Answered Questions
                        </span>
                    </div>

                    <div>
                        {filteredQuestions.map((id) => (
                            this.state.showQuestionType === 'unanswered'
                                ? <QuestionCard key={id} questionId={id} />
                                : <QuestionResultCard key={id} questionId={id} />
                        ))}
                    </div>
                </Route>

                <Route path='/leaderboard' component={Leaderboard} />
                <Route path='/add' component={NewQuestion} />
                <Route path='/questions/:questionId' component={QuestionAnswerResultCard} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        loggedInUser: state.loggedInUser,
        questions: state.questions,
        users: state.users
    }
}

export default connect(mapStateToProps)(Home)