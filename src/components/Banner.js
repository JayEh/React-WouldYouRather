import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { setLoggedInUserAction } from '../actions/loggedInUser'

class Banner extends Component {
    handleLogout = () => {
        this.props.dispatch(setLoggedInUserAction(null))
        this.props.history.push('/')
    }

    render() {
        const { loggedInUser, users } = this.props

        let disableBannerButtons = !loggedInUser
        let userFullName = loggedInUser && users ? users[loggedInUser].name : ''
        let conditionalCss = disableBannerButtons ? 'disabled' : ''

        return (
            <div className='banner'>
                <NavLink to='/' exact className='banner-text' activeClassName='active'>
                    Home
                </NavLink>
                <NavLink to='/add' className={`banner-text cursor-pointer ${conditionalCss}`} activeClassName='active'>
                    New Question
                </NavLink>
                <NavLink to='/leaderboard' className={`banner-text cursor-pointer ${conditionalCss}`} activeClassName='active'>
                    Leaderboard
                </NavLink>
                <div className='banner-text' hidden={disableBannerButtons} >Welcome, {userFullName}</div>
                <div className='banner-text cursor-pointer' onClick={() => this.handleLogout()}>Logout</div>
            </div>
        )
    }
}

function mapStateToProps({ loggedInUser, users }) {
    return {
        loggedInUser,
        users
    }
}

export default connect(mapStateToProps)(Banner)