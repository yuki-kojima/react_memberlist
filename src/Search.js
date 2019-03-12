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
      userList: [],
      requestedDepartmentID: null,
      requestedQuery: '',
      requestedPage: null,
      totalPages: null
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
  generateParams(departmentID, query, page) {
    const params = {
      department_id: departmentID,
      query: query,
      page: page
    };

    return params;
  }
  loadUserInfo(params) {
    var userList;
    var totalPages;
    // 違う部署IDの場合はuserListをリセットする
    if (this.isDefferentRequest(params)) {
      userList = [];
    } else {
      userList = this.state.userList.concat();
    }
    return this.httpClient
      .get("/who/search/", { params: params })
      .then(this.commonResponseHandling)
      .then(result => {
        userList[params.page] = result.item_list;
        totalPages = parseInt(result.summary.total_pages, 10);
        this.setState({
          userList: userList,
          requestedDepartmentID: params.department_id,
          requestedQuery: params.query,
          requestedPage: params.page,
          totalPages: totalPages
        });
      });
  }
  onClickSearh() {
    const departmentID = parseInt(document.getElementById('js-departmentID').value, 10);
    const query = document.getElementById('js-freeword').value;
    const page = 1;
    let params;
    if ((departmentID === 0) && (query === '')) {
        alert('条件を指定してください');
        return;
    }
    params = this.generateParams(departmentID, query, page);
    this.loadUserInfo(params);
  }
  isAlreadyRequestedPage(pageNum) {
    if (this.state.userList[pageNum]) {
      return true;
    } else {
      return false;
    }
  }
  isDefferentRequest(params) {
    const isDifferentDepartmentID = (this.state.requestedDepartmentID !== params.department_id);
    const isDifferentQuery = (this.state.requestedQuery !== params.query);
    return isDifferentDepartmentID || isDifferentQuery;
  }
  onClickPager(e) {
    const target = e.target;
    const departmentID = parseInt(target.getAttribute("data-id"), 10);
    const query = target.getAttribute("data-query");
    const page = parseInt(target.getAttribute("data-page"), 10);
    const params = this.generateParams(departmentID, query, page);

    // 同じページをリクエスト済みの場合はpageのステートの変更のみ行う
    if (this.isAlreadyRequestedPage(params.page)) {
      this.setState({
        requestedPage: params.page
      });
      return;
    }
    this.loadUserInfo(params);
  }
  render() {
    return (
      <div>
        <h1>社員検索</h1>
        <div>
          <div>
            <h2>部署から検索する</h2>
            <div className="l-departmentlist">
              <select id="js-departmentID" className="departmentlist">
                <option key="0" value="0">指定しない</option>
                {this.state.departmentList.map((row, index) => {
                  return (
                    <option key={index + 1} value={row.department_id}>
                        {row.department_name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div>
            <h2>フリーワードで検索する</h2>
            <div className="l-freeword">
              <div className="freeword">
                <input id="js-freeword" className="freeword__input" type="text" placeholder="キーワードを入れてください"/>
                <button
                  onClick={e => this.onClickSearh(e)}
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
            userList={this.state.userList[this.state.requestedPage]}
            dataSummary={this.state.dataSummary}
            departmentID={this.state.requestedDepartmentID}
            query={this.state.requestedQuery}
            onClickPager={e => this.onClickPager(e)}
            requestedPage={this.state.requestedPage}
            totalPages={this.state.totalPages}
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
