import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './App.css';
import axiosCreate from "./utility/axiosCreate";
import handleResponse from "./utility/handleResponse";
import Memberlist from './Memberlist';
import QueryGenerator from './utility/QueryGenerator';
import SelectDepartment from './SelectDepartment';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      departmentList: [],
      userList: null,
      requestedDepartmentID: null,
      requestedQuery: '',
      selectedDepartmentID: '',
      selectedQuery: '',
      dataSummary: null
    };
  }
  componentDidMount() {
    this.httpClient = axiosCreate();
    this.loadDepartments();
  }
  commonResponseHandling(res) {
    return handleResponse(res);
  }
  loadDepartments() {
    return this.httpClient
      .get("/who/departments")
      .then(this.commonResponseHandling)
      .then(result => {
        this.setState({ departmentList: result });
      });
  }
  loadUserInfo(query) {
    return this.httpClient
      .get(`/who/search/${query}`)
      .then(this.commonResponseHandling)
      .then(result => {
        this.setState({
          userList: result.item_list,
          dataSummary: result.summary
        });
      });
  }
  onChangeDepartment(e) {
    const departmentID = e.target.value;
    this.setState({
      selectedDepartmentID: departmentID
    });
  }
  onInputText(e) {
    const query = e.target.value;
    this.setState({
      selectedQuery: query
    });
  }
  onClickSearh() {
    const params = new QueryGenerator();

    if ((this.state.selectedDepartmentID === '') && (this.state.selectedQuery === '')) {
        alert('条件を指定してください');
        return;
    }
    params.department_id = this.state.selectedDepartmentID;
    params.query = this.state.selectedQuery;
    this.loadUserInfo(params.queryString);
    this.setState({
      requestedDepartmentID: this.state.selectedDepartmentID,
      requestedQuery: this.state.selectedQuery
    })
  }
  onClickPager(e) {
    const target = e.target;
    const departmentID = target.getAttribute("data-id");
    const query = target.getAttribute("data-query");
    const page = target.getAttribute("data-page");
    const params = new QueryGenerator();
    params.department_id = departmentID;
    params.query = query;
    params.page = page;
    this.loadUserInfo(params.queryString);
  }
  render() {
    return (
      <div>
        <h1>社員検索</h1>
        <div>
          <div>
            <h2>部署から検索する</h2>
            <SelectDepartment departmentList={this.state.departmentList} onChangeDepartment={e => this.onChangeDepartment(e)}/>
          </div>
          <div>
            <h2>フリーワードで検索する</h2>
            <div className="l-freeword">
              <div className="freeword">
                <input id="js-freeword" className="freeword__input" type="text" placeholder="キーワードを入れてください" onChange={e => this.onInputText(e)}/>
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
            departmentID={this.state.requestedDepartmentID}
            query={this.state.requestedQuery}
            dataSummary={this.state.dataSummary}
            onClickPager={e => this.onClickPager(e)}
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
