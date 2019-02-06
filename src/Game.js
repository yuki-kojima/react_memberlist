import React, { Component } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import GameBoard from "./GameBoard";
import './App.css';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      departmentList: [],
      userList: null,
      summary: null,
      departmentName: '',
    };
  }
  componentDidMount() {
    this.httpClient = axios.create({
      baseURL: "https://kadou.i.nijibox.net/api",
      withCredentials: true
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
    const departmentName = target.innerText;
    const params = {
      department_id: parseInt(target.getAttribute("data-id"), 10) || null,
      page: parseInt(target.getAttribute("data-page"), 10) || 1
    };
    return this.httpClient
      .get("/who/Game/", { params: params })
      .then(this.commonResponseHandling)
      .then(result => {
        this.setState({
          userList: result.item_list,
          summary: result.summary,
          departmentID: params.department_id,
          departmentName: departmentName
        });
      });
  }
  PickRandomNum(totalNum) {
    const total = parseInt(totalNum, 10);
  }
  render() {
    return (
      <div>
        <h1>神経衰弱</h1>
          <div>
            <h2>部署を選ぶ</h2>
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
        </div>
        <div>
          <GameBoard />
        </div>

        <Link to="/">トップへ戻る</Link>
      </div>
    );
  }
}

export default Game;
