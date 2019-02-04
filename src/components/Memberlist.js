import React, { Component } from 'react';
import '../App.css';

class Memberlist extends Component {

  render() {
      let userInfo;
      let currentPage;
      let totalPages;
      let flgForward = true;
      let flgBackward = true;
      if (this.props.userList){
          userInfo = this.props.userList.item_list;
          currentPage = this.props.userList.summary.current_page;
          totalPages = this.props.userList.summary.total_pages;

          if (currentPage === 1) {
              flgBackward = false;
          }
          if (currentPage === totalPages) {
              flgForward = false;
          }
        }
    return (
      <div>

        {this.props.userList ? <div>
            <h2>社員一覧</h2>
            <div>
                <ul>
                    {userInfo.map((row, index) => {
                        return <li key={row.user_id}>{row.user_name}</li>;
                    })}
                </ul>
                    {flgBackward && <div onClick={e => this.props.loadUserInfo(e)} data-page={parseInt(currentPage, 10) - 1} data-id={this.props.departmentID} data-query={this.props.query}> 前へ</div>
                }
                    {flgForward && <div onClick={e => this.props.loadUserInfo(e)} data-page={parseInt(currentPage, 10) + 1} data-id={this.props.departmentID} data-query={this.props.query}>次へ</div>
                }
                <div>{currentPage}/{totalPages}ページ</div>
            </div>
        </div> : <p>検索してください</p>
        }
      </div>
    );
  }
}

export default Memberlist;
