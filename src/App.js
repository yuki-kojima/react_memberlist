import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from 'axios';
import 'ress';
import './App.css';
import Top from "./Top";
import Search from "./Search";
import MemberInfo from "./MemberInfo";
import Game from "./Game";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false
    };
  }
  componentDidMount() {

    this.httpClient = axios.create({
      baseURL: "https://kadou.i.nijibox.net/api",
      withCredentials: true
    });

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
          callback: "http://localhost:3000"
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
    console.debug(res);
    if (res.data.code !== "200") {
      console.error(res.data.data);
      return Promise.reject("API Error:" + res.data.data.message);
    }
    return Promise.resolve(res.data.data);
  }

  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
          <div className="wrap">
            <Route exact path="/" component={Top} />
            <Route path="/search" component={Search} />
            <Route path="/user/:id" component={MemberInfo} />
            <Route path="/game" component={Game} />
          </div>
        </Router>
    );
  }
}

export default App;
