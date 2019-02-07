import React, { Component } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import './App.css';
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

    this.loadDepartments();
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
          <div>
            <h2>部署から検索する</h2>
            <div className="l-departmentlist">
              <ul className="departmentlist">
                {this.state.departmentList.map((row, index) => {
                  return (
                    <li key={index}>
                      <button
                        onClick={e => this.loadUserInfo(e)}
                        data-id={row.department_id}
                        type="button"
                        className="departmentlist__item"
                      >
                        {row.department_name}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div>
            <h2>フリーワードで検索する</h2>
            <div className="l-freeword">
              <div className="freeword">
                <input className="freeword__input" type="text" onChange={e => this.changeInputText(e)} placeholder="キーワードを入れてください"/>
                <button
                  onClick={e => this.onClickSearh(e)}
                  data-query={this.state.inputText}
                  type="button"
                  className="freeword__btn"
                >
                  検索する
                </button>
              </div>
            </div>
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
        <div className="l-pager">
          <div className="pager pager--search">
            <Link to="/">トップへ戻る</Link>
          </div>
        </div>
        
      </div>
    );
  }
}

export default Search;
