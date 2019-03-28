import React, { Component } from 'react';
import './App.css';
import axiosCreate from "./utility/axiosCreate";
import handleResponse from "./utility/handleResponse";
import Memberlist from './Memberlist';
import QueryGenerator from './utility/QueryGenerator';
import SelectDepartment from './input';

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
          <SelectDepartment
            departmentList={this.state.departmentList}
            onChangeDepartment={e => this.onChangeDepartment(e)}
            onChangeText={e => this.onInputText(e)}
            onClick={e => this.onClickSearh(e)}
          />
        <div>
          <Memberlist
            userList={this.state.userList}
            departmentID={this.state.requestedDepartmentID}
            query={this.state.requestedQuery}
            dataSummary={this.state.dataSummary}
            onClickPager={e => this.onClickPager(e)}
          />
        </div>
      </div>
    );
  }
}

export default Search;
