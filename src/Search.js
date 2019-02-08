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
      departmentID: '',
      query: '',
      page: 1,
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
  setDepartmentIdState(e) {
    const id = e.target.value;
    this.initPageState();
    this.setState(
      {
        departmentID: id
      }
    )
  }
  setQueryState(e) {
    const query = e.target.value;
    this.initPageState();
    this.setState({
      query: query
    });
  }
  // setPageState(result) {
  //   const currentPage = parseInt(result.summary.current_page);
  //   const totalPages = parseInt(result.summary.total_pages);
  //   let nextPage;
  //   let prevPage;
  //   if (!(currentPage === totalPages)) {
  //     nextPage = currentPage + 1;
  //   } else{
  //     nextPage = null;
  //   }
  //   if (!(currentPage === 1)) {
  //     prevPage = currentPage - 1;
  //   } else {
  //     prevPage = null;
  //   }
  //   this.setState({
  //     nextPage: nextPage,
  //     prevPage: prevPage
  //   })
  // }
  generateParams() {
    const departmentID = parseInt(this.state.departmentID, 10) || null;
    const page = parseInt(this.state.page, 10);
    const query = this.state.query;
    const params = {
      department_id: departmentID,
      page: page,
      query: query
    };

    return params;
  }
  loadUserInfo(params) {
    return this.httpClient
      .get("/who/search/", { params: params })
      .then(this.commonResponseHandling)
      .then(result => {
        this.setState({
          userList: result,
        });
      });
  }
  onClickSearh() {
    let params;
    if ((this.state.departmentID === '') && (this.state.query === '')) {
        alert('条件を指定してください');
        return;
    }
    params = this.generateParams();
    this.loadUserInfo(params);
  }
  onClickPager(e) {
    const target = e.target;
    const page = target.getAttribute("data-page");
    this.setState({
      page: page
    },
    () => {
      const params = this.generateParams();
      this.loadUserInfo(params);
    });
  }
  initPageState() {
    this.setState({
      page: 1
    });
  }
  render() {
    return (
      <div>
        <h1>社員検索</h1>
        <div>
          <div>
            <h2>部署から検索する</h2>
            <div className="l-departmentlist">
              <select className="departmentlist" onChange={e => this.setDepartmentIdState(e)}>
                <option key="0" value="">指定しない</option>
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
                <input className="freeword__input" type="text" onChange={e => this.setQueryState(e)} placeholder="キーワードを入れてください"/>
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
            loadUserInfo={e => this.loadUserInfo(e)}
            departmentID={this.state.departmentID}
            query={this.state.query}
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
