import React, { Component } from 'react'
import firebase from './firebase/firebase'

class Login extends Component {
    state = {
        user: null
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            console.log(user);
            this.setState({ user })
        })
    }

    login() {
        const provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithRedirect(provider)
    }

    logout() {
        firebase.auth().signOut()
    }

    render() {
        return (
            <div className="App">
                <p className="App-intro">
                    UID: {this.state.user && this.state.user.uid}
                </p>

                {this.state.user ? (
                    <button onClick={this.logout}>Google Logout</button>
                ) : (
                        <button onClick={this.login}>Google Login</button>
                    )}
            </div>
        )
    }
}

export default Login;