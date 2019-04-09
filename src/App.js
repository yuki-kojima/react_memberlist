import React, { Component } from 'react';
import { HashRouter as Router, Route } from "react-router-dom";
import axiosCreate from "./utility/axiosCreate";
import handleResponse from "./utility/handleResponse";
import 'ress';
import './App.css';
import Header from "./Header";
import Search from "./Search";
import MemberInfo from "./MemberInfo";
import Game from "./Game";
import Edit from './Edit';
import firebase from './firebase/firebase'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      shownPage: 'search',
    };
  }
  componentDidMount() {
    this.checkLoginStatus();
    this.httpClient = axiosCreate();
    this.loadAuth()
      .then(() => {
        if (!this.state.isLogin) {
          return Promise.resolve();
        }
      })
      .catch(err => {
        alert("APIがエラーを返しました\n\n" + err);
      });
  }
  
  loadAuth() {
    return this.httpClient
      .get("/auth", {
        params: {
          callback: process.env.REACT_APP_CALLBACK_URL
        }
      })
      .then(this.commonResponseHandling)
      .then(result => {
        if (result.is_login) {
          this.setState({ isLogin: true });
        } else if (result.auth_url) {
          window.location.href = result.auth_url;
        }
      });
  }

  commonResponseHandling(res) {
    return handleResponse(res);
  }

  login() {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    firebase.auth().signInWithRedirect(provider);
  }

  checkLoginStatus() {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.login();
      }
    });
  }

  setShownPage(page) {
    this.setState({
      shownPage: page
    });
  }

  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <React.Fragment>
          <Header shownPage={this.state.shownPage} />
          <div className="wrapper">
            <Route
              exact
              path="/"
              render={() => (
                <Search setShownPage={() => this.setShownPage("search")} />
              )}
            />
            <Route path="/user/:id" component={MemberInfo} />
            <Route
              path="/edit"
              render={() => (
                <Edit setShownPage={() => this.setShownPage("edit")} />
              )}
            />
            <Route
              path="/game"
              render={() => (
                <Game setShownPage={() => this.setShownPage("game")} />
              )}
            />
          </div>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
