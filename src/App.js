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
import db from './firebase/firestore';
import TagSearch from './TagSearch';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      shownPage: 'search',
    };
  }
  componentDidMount() {
    this.httpClient = axiosCreate();
    this.registerUserData();
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

  registerUserData() {
  this.httpClient
    .get("/profile/get")
    .then(this.commonResponseHandling)
    .then(result => {
      db.collection('members').doc(result.user_id).get().then(doc => {
        if(doc.exists) {
          return false;
        } else {
          db.collection('members').doc(result.user_id).set({
            userID: result.user_id,
            name: result.user_name,
            photo: result.main_photo_url
          });
        }
      })
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
            <Route
              path="/tagSearch"
              render={() => (
                <TagSearch setShownPage={() => this.setShownPage("tagSearch")} />
              )}
            />
          </div>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
