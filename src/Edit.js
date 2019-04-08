import React, { Component } from 'react';
import './App.css';
import axiosCreate from "./utility/axiosCreate";
import handleResponse from "./utility/handleResponse";
import QueryGenerator from './utility/QueryGenerator';

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      isLogin: false,
      nickname: null,
      description: null,
      enterDate: null
    };
  }
  componentDidMount() {
    this.httpClient = axiosCreate();
    this.props.setShownPage();
    this.loadUserInfo();
  }
  commonResponseHandling(res) {
    return handleResponse(res);
  }
  loadUserInfo() {
    this.httpClient
      .get("/profile/get")
      .then(this.commonResponseHandling)
      .then(result => {
        this.setState({
          userInfo: result
        });
      });
  }
  updateUserInfo(params) {
    this.httpClient.post("/profile/update", params);
  }
  onChangeNickname(e) {
    const nickname = e.target.value;
    this.setState({
      nickname: nickname
    });
  }
  onChangeDesc(e) {
    const desc = e.target.value;
    this.setState({
      description: desc
    });
  }
  onChangeEnterDate(e) {
    const enterDate = e.target.value;
    this.setState({
      enterDate: enterDate
    });
  }
  onSubmit() {
    const params = new QueryGenerator();
    params.nickname = this.state.nickname;
    params.description = this.state.description;
    params.enterDate = this.state.enterDate;
    this.updateUserInfo(params);
  }
  render() {
    return (
      <React.Fragment>
        <h2>プロフィール更新</h2>
        <div className="edit">
          <div className="edit__info">
            <div className="">{this.state.userInfo.user_name}</div>
            <div className="">{this.state.userInfo.user_kana}</div>
            <div className="">{this.state.userInfo.department_name}</div>
            <div className="">{this.state.userInfo.mail}</div>
            <div className="">{this.state.userInfo.slack_display_name}</div>
          </div>
          <div className="edit__input">
            <label htmlFor="nickname">ニックネーム</label>
            <input
              type="text"
              name="nickname"
              placeholder={this.state.userInfo.nickname}
              onChange={e => this.onChangeNickName(e)}
            />
            <label htmlFor="desc">一言</label>
            <input
              type="text"
              name="desc"
              placeholder={this.state.userInfo.description}
              onChange={e => this.onChangeDesc(e)}
            />
            <label htmlFor="enterdate">入社日</label>
            <input
              type="text"
              name="enterdate"
              placeholder={this.state.userInfo.enterDate}
              onChange={e => this.onChangeEnterDate(e)}
            />
          </div>
          <button
            onClick={this.onSubmit()}
            type="button"
            className="freeword__btn"
          >
            更新する
              </button>
        </div>
      </React.Fragment>
    );
  }
}

export default Edit;
