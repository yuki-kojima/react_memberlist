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
      flgNext: false,
      message: "検索してください"
    };
  }
  componentWillReceiveProps(props) {
    this.setMessage(props);
    this.setPageState(props);
    console.log(props);
  }
  setPageState(props) {
    if (props.userList === null || props.userList.length === 0) {
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
    this.setState(
      {
        currentPage: currentPage,
        totalPages: totalPages,
        nextPage: nextPage,
        prevPage: prevPage
      },
      () => {
        this.setPageFlg();
      }
    );
  }
  setPageFlg() {
    let flgPrev = true;
    let flgNext = true;
    if (this.state.currentPage === 1) {
      flgPrev = false;
    }
    if (
      this.state.currentPage === this.state.totalPages ||
      this.state.totalPages === 0
    ) {
      flgNext = false;
    }
    this.setState({
      flgPrev: flgPrev,
      flgNext: flgNext
    });
  }
  setMessage(props) {
    var userList = props.userList;
    if (userList === null) {
      this.setState({
        message: "検索してください"
      });
    } else if (userList.length === 0) {
      console.log("0");
      this.setState({
        message: "該当するメンバーがいませんでした"
      });
    }
  }

  render() {
    const userList = this.props.userList;
    return (
      <div className="result">
        {userList === null || userList.length === 0 ? (
          <div className="result-message">
            <p className="result-message-text">{this.state.message}</p>
          </div>
        ) : (
            <React.Fragment>
            <ul className="l-memberlist">
              {userList.map(item => {
                return (
                  <li key={item.user_id}>
                    <Link to={"/user/" + item.user_id} className="memberlist">
                      <div className="memberlist-img">
                        <img
                          src={item.photo_url}
                          alt={item.user_name + "の写真"}
                        />
                      </div>
                      <div className="memberlist-name">{item.user_name}</div>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="pager">
              {this.state.flgPrev && (
                <button
                  type="button"
                  className="btn-pager"
                  onClick={e => this.props.onClickPager(e)}
                  data-page={this.state.prevPage}
                  data-id={this.props.departmentID}
                  data-query={this.props.query}
                >
                  {" "}
                  前へ
                </button>
              )}
              <div className="pager__page">
                {this.state.currentPage}/{this.state.totalPages}ページ
              </div>
              {this.state.flgNext && (
                <button
                  type="button"
                  className="btn-pager"
                  onClick={e => this.props.onClickPager(e)}
                  data-page={this.state.nextPage}
                  data-id={this.props.departmentID}
                  data-query={this.props.query}
                >
                  次へ
                </button>
              )}
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Memberlist;
