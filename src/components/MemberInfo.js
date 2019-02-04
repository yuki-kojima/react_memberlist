import React, { Component } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import '../App.css';

class Memberlist extends Component {
    constructor(props){
        super(props);
        this.state = {
            userInfo: null
        }
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
        return this.loadUserDetail();
      })
      .catch(err => {
        alert("APIがエラーを返しました\n\n" + err);
      });
  }
  loadAuth() {
    return this.httpClient
      .get("/auth", { params: { callback: "http://localhost:3000" } })
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

  loadUserDetail() {
    const { params } = this.props.match;
    console.log(params.id);
    const user_id = parseInt(params.id, 10);
    return this.httpClient
      .get("/who/user/"+ user_id)
      .then(this.commonResponseHandling)
      .then(result => {
        this.setState({
          userInfo: result
        });
      });
  }
  render() {
    return (
      <div>
        {this.state.userInfo ? <div>
            <h2>詳細</h2>
            <div>
                <div>{this.state.userInfo.user_name}</div>
            </div>
        </div> : <p>該当メンバーがいません</p>
        }
            <Link to="/search">検索へ戻る</Link>
            <Link to="/">トップへ戻る</Link>
      </div>
    );
  }
}

export default Memberlist;
