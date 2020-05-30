import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setLoggedInUserAction } from '../actions/loggedInUser'

class Login extends Component {

    handleLogin = (e) => {
        const { dispatch } = this.props
        let user = document.querySelector('#login-select').value
        dispatch(setLoggedInUserAction(user))
    }

    render() {
        let users = this.props.users

        return (
            <div className='login '>
                <div>
                    <div>Welcome! Please Login</div>
                    <select className='login-select' id='login-select'>
                        {users && (
                            Object.keys(users).map((id) => (
                                <option key={id} value={id}>{users[id].name}</option>
                            ))
                        )}
                    </select>

                    <button onClick={this.handleLogin}>Login</button>
                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        users: state.users
    }
}

export default connect(mapStateToProps)(Login)