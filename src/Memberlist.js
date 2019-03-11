import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './App.css';

class Memberlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: null,
      nextPage: null,
      prevPage: null,
      totalPages: null,
      flgPrev: true,
      flgNext: false
    }
  }
  componentWillReceiveProps(props) {
    this.setPageState(props);
  }
  setPageState(props) {
    if(!props.userList) {
      return;
    }
    const currentPage = parseInt(props.userList.summary.current_page);
    const totalPages = parseInt(props.userList.summary.total_pages);
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
      nextPage: nextPage,
      prevPage: prevPage,
      totalPages: totalPages
    }, () => {this.setPageFlg();})
  }

  setPageFlg() {
    let flgPrev = true;
    let flgNext = true;
    if(this.state.currentPage === 1) {
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
  render() {

      let userInfo;
      if (this.props.userList){
          userInfo = this.props.userList.item_list;        }
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
                    {this.state.flgPrev && <button type="button" className="btn-pager" onClick={e => this.props.onClickPager(e)} data-page={this.state.prevPage} data-id={this.props.departmentID} data-query={this.props.query}> 前へ</button>}
                    <div className="pager__page">{this.state.currentPage}/{this.state.totalPages}ページ</div>
                    {this.state.flgNext && <button type="button" className="btn-pager" onClick={e => this.props.onClickPager(e)} data-page={this.state.nextPage} data-id={this.props.departmentID} data-query={this.props.query}>次へ</button>}
                </div>
            </div>
        </div> : <p className="result-message">検索してください</p>
        }
      </div>
    );
  }
}

export default Memberlist;
