import React from 'react';
import './App.css';
import Banner from './components/Banner'
import Home from './components/Home'
import Login from './components/Login'

import { connect } from 'react-redux'
import { handleInitialData } from './actions/shared'
import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends React.Component {

  componentDidMount() {
    this.handleInitialData()
  }

  handleInitialData = () => {
    this.props.dispatch(handleInitialData())
  }

  render() {
    const { loggedInUser } = this.props

    console.log('in App.. user: ', loggedInUser)

    return (
      <Router>
        <div>
          <Route path='/' component={Banner} />
          {!loggedInUser
            ? <Login />
            : <Home />}
        </div>
      </Router>
    )
  }
}

function mapStateToProps({ loggedInUser }) {
  console.log('in mapStateToProps.. loggedInUser:', loggedInUser)
  return {
    loggedInUser
  }
}

export default connect(mapStateToProps)(App);
