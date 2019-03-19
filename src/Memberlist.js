import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './App.css';

class Memberlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: null,
      totalPages: null,
      nextPage: null,
      prevPage: null,
      flgPrev: false,
      flgNext: false
    }
  }
  componentWillReceiveProps(props) {
    this.setPageState(props);
  }
  setPageState(props) {
    if(props.userList === null || props.userList.length === 0) {
      return;
    }
    const currentPage = props.dataSummary.current_page;
    const totalPages = props.dataSummary.total_pages;
    let nextPage;
    let prevPage;
    if (!(currentPage === totalPages)) {
      nextPage = currentPage + 1;
    } else {
      nextPage = null;
    }
    if (!(currentPage === 1)) {
      prevPage = currentPage - 1;
    } else {
      prevPage = null;
    }
    this.setState({
      currentPage: currentPage,
      totalPages: totalPages,
      nextPage: nextPage,
      prevPage: prevPage
    }, () => {this.setPageFlg();})
  }
  setPageFlg() {
    let flgPrev = true;
    let flgNext = true;
    if (this.state.currentPage === 1) {
      flgPrev = false;
    }
    if (this.state.currentPage === this.state.totalPages || this.state.totalPages === 0) {
      flgNext = false;
    }
    this.setState({
      flgPrev: flgPrev,
      flgNext: flgNext
    });
  }
  renderUserList(userList) {
    if (userList === null) {
      return <p className="result-message">検索してください</p>;
    } else if(userList.length !== 0) {
      return (
        <div>
          <h2>社員一覧</h2>
          <div>
            <ul className="l-memberlist">
              {userList.map((item) => {
                return (
                  <li key={item.user_id}>
                    <Link to={"/user/" + item.user_id} className="memberlist">
                      <div className="memberlist__img"><img src={item.photo_url} alt={item.user_name + 'の写真'}></img></div>
                      <div className="memberlist__name">{item.user_name}</div>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="pager">
              {this.state.flgPrev && <button type="button" className="btn-pager" onClick={e => this.props.onClickPager(e)} data-page={this.state.prevPage} data-id={this.props.departmentID} data-query={this.props.query}> 前へ</button>}
              <div className="pager__page">{this.state.currentPage}/{this.state.totalPages}ページ</div>
              {this.state.flgNext && <button type="button" className="btn-pager" onClick={e => this.props.onClickPager(e)} data-page={this.state.nextPage} data-id={this.props.departmentID} data-query={this.props.query}>次へ</button>}
            </div>
          </div>
        </div>
      );
    } else {
      return <p className="result-message">該当するメンバーがいませんでした</p>;
    }
  }

  render() {
    return (
      <div className="result-container">
        {this.renderUserList(this.props.userList)}
      </div>
    );
  }
}

export default Memberlist;
