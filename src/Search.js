import React, { Component } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import './App.css';
import Memberlist from './Memberlist';
import QueryGenerator from './utility/QueryGenerator';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      departmentList: [],
      userList: [],
      requestedDepartmentID: null,
      requestedQuery: '',
      currentPage: null,
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
    return this.httpClient
      .get("/who/search/", { params: params })
      .then(this.commonResponseHandling)
      .then(result => {
        this.setState({
          userList: result.item_list,
          requestedDepartmentID: params.department_id,
          requestedQuery: params.query,
          currentPage: result.summary.current_page,
          totalPages: result.summary.total_pages
        });
      });
  }
  onClickSearh() {
    const departmentID = parseInt(document.getElementById('js-departmentID').value, 10);
    const query = document.getElementById('js-freeword').value;
    const params = new QueryGenerator();

    if ((departmentID === 0) && (query === '')) {
        alert('条件を指定してください');
        return;
    }
    params.department_id = departmentID;
    params.query = query;
    this.loadUserInfo(params.params);
  }
  onClickPager(e) {
    const target = e.target;
    const departmentID = parseInt(target.getAttribute("data-id"), 10);
    const query = target.getAttribute("data-query");
    const page = parseInt(target.getAttribute("data-page"), 10);
    const params = new QueryGenerator();
    params.department_id = departmentID;
    params.query = query;
    params.page = page;
    this.loadUserInfo(params.params);
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
            userList={this.state.userList}
            dataSummary={this.state.dataSummary}
            departmentID={this.state.requestedDepartmentID}
            query={this.state.requestedQuery}
            onClickPager={e => this.onClickPager(e)}
            currentPage={this.state.currentPage}
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
