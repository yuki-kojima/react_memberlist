import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './App.css';

class Memberlist extends Component {

  render() {
      let userInfo;
      let currentPage;
      let totalPages;
      let flgNext = true;
      let flgPrev = true;
      if (this.props.userList){
          userInfo = this.props.userList.item_list;
          currentPage = this.props.userList.summary.current_page;
          totalPages = this.props.userList.summary.total_pages;

          if (currentPage === 1) {
              flgPrev = false;
          }
          if (currentPage === totalPages) {
              flgNext = false;
          }
        }
    return (
      <div className="result-container">

        {this.props.userList ? <div>
            <h2>社員一覧</h2>
            <div>
                <ul className="l-memberlist">
                    {userInfo.map((row, index) => {
                        return (
                          <li key={row.user_id}>
                            <Link to={"/user/" + row.user_id} className="memberlist">
                                    <div className="memberlist__img"><img src={row.photo_url} alt={row.user_name + 'の写真'}></img></div>
                            <div className="memberlist__name">{row.user_name}</div>
                            </Link>
                          </li>
                        );
                    })}
                </ul>
                <div className="pager">
                    <button type="button" className={"btn-pager" + ' ' + (!flgPrev ? "is-hidden" : '')} onClick={e => this.props.loadUserInfo(e)} data-page={parseInt(currentPage, 10) - 1} data-id={this.props.departmentID} data-query={this.props.query}> 前へ</button>
                    <div className="pager__page">{currentPage}/{totalPages}ページ</div>
                    <button type="button" className={"btn-pager" + ' ' + (!flgNext ? "is-hidden" : '')} onClick={e => this.props.loadUserInfo(e)} data-page={parseInt(currentPage, 10) + 1} data-id={this.props.departmentID} data-query={this.props.query}>次へ</button>
                </div>
            </div>
        </div> : <p className="result-message">検索してください</p>
        }
      </div>
    );
  }
}

export default Memberlist;
