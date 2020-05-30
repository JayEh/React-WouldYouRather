import React, { Component } from 'react'
import Scorecard from './Scorecard'
import { connect } from 'react-redux'

class Leaderboard extends Component {
    render() {
        const { users } = this.props
        let userIds = Object.keys(users)

        userIds.forEach((userId) => {
            let user = users[userId]
            user['score'] = Object.keys(user.answers).length + user.questions.length
            user['answeredQuestions'] = Object.keys(user.answers).length
            user['createdQuestions'] = user.questions.length
        })

        userIds.sort((a, b) => users[b].score - users[a].score)

        return (
            <div>
                <h3>Leaderboard</h3>
                {userIds.map((userId) => (
                    <Scorecard key={userId} user={users[userId]} />
                ))}
            </div>
        )
    }
}

function mapStateToProps({ users }) {
    return {
        users
    }
}

export default connect(mapStateToProps)(Leaderboard)