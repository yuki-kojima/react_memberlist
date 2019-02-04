import React, { Component } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import '../App.css';
import Memberlist from './Memberlist';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      departmentList: [],
      userList: null,
      departmentID: null,
      query: null,
      inputText: ""
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
        return this.loadDepartments();
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
  loadDepartments() {
    return this.httpClient
      .get("/who/departments")
      .then(this.commonResponseHandling)
      .then(result => {
        this.setState({ departmentList: result });
      });
  }
  loadUserInfo(e) {
    const target = e.target;
    const params = {
      department_id: parseInt(target.getAttribute("data-id"), 10) || null,
      page: parseInt(target.getAttribute("data-page"), 10) || 1,
      query: target.value || target.getAttribute("data-query") || ""
    };
    return this.httpClient
      .get("/who/search/", { params: params })
      .then(this.commonResponseHandling)
      .then(result => {
        this.setState({
          userList: result,
          departmentID: params.department_id,
          query: params.query
        });
      });
  }
  changeInputText(e) {
    const value = e.target.value;

    this.setState({
      inputText: value
    });
  }
  onClickSearh(e) {
    if (e.target.getAttribute("data-query").trim().length === 0) {
        return;
    }
    this.loadUserInfo(e);
  }
  render() {
    return (
      <div>
        <h1>社員検索</h1>
        <div>
          <h2>部署から検索する</h2>
          <div>
            <ul>
              {this.state.departmentList.map((row, index) => {
                return (
                  <li key={index}>
                    <button
                      onClick={e => this.loadUserInfo(e)}
                      data-id={row.department_id}
                      type="button"
                    >
                      {row.department_name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <h2>フリーワードで検索する</h2>
          <div>
            <input type="text" onChange={e => this.changeInputText(e)} />
            <button
              onClick={e => this.onClickSearh(e)}
              data-query={this.state.inputText}
              type="button"
            >
              検索する
            </button>
          </div>
        </div>
        <div>
          <Memberlist
            userList={this.state.userList}
            loadUserInfo={e => this.loadUserInfo(e)}
            departmentID={this.state.departmentID}
            query={this.state.query}
          />
        </div>

        <Link to="/">トップへ戻る</Link>
      </div>
    );
  }
}

export default Search;
