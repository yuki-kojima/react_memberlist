import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './App.css';
import axiosCreate from "./utility/axiosCreate";
import handleResponse from "./utility/handleResponse";

class MemberInfo extends Component {
    constructor(props){
        super(props);
        this.state = {
          isLogin: false,
          userInfo: null
        }
    }

  componentDidMount() {
    this.httpClient = axiosCreate();
    this.loadUserDetail();
  }

  commonResponseHandling(res) {
    return handleResponse(res);
  }

  loadUserDetail() {
    const { params } = this.props.match;
    const user_id = parseInt(params.id, 10);
    return this.httpClient
      .get("/who/user/"+ user_id)
      .then(this.commonResponseHandling)
      .then(result => {
        this.setState({
          userInfo: result
        });
      });
  }
  
  render() {
    return (
      <div className="l-memberinfo">
        {this.state.userInfo ? (
          <React.Fragment>
            <div className="memberinfo">
              <div className="memberinfo__img">
                <img
                  src={this.state.userInfo.main_photo_url}
                  alt={this.state.userInfo.user_name + "の写真"}
                />
              </div>
              <div className="memberinfo__info">
                <div className="memberinfo__info__header">
                  <h3 className="memberinfo-title">
                    <span className="memberinfo-title__name">
                      {this.state.userInfo.user_name}
                    </span>
                    <span className="memberinfo-title__sub">
                      {this.state.userInfo.user_kana}
                    </span>
                  </h3>
                </div>
                <div className="memberinfo__info__body">
                  <table className="infotable">
                    <tbody>
                      <tr>
                        <td className="infotable__header">
                          ニックネーム：
                        </td>
                        <td className="infotable__body">
                          {this.state.userInfo.nickname}
                        </td>
                      </tr>
                      <tr>
                        <td className="infotable__header">部署：</td>
                        <td className="infotable__body">
                          {this.state.userInfo.department_name}
                        </td>
                      </tr>
                      <tr>
                        <td className="infotable__header">入社日：</td>
                        <td className="infotable__body">
                          {this.state.userInfo.enter_date}
                        </td>
                      </tr>
                      <tr>
                        <td className="infotable__header">slack名：</td>
                        <td className="infotable__body">
                          {this.state.userInfo.slack_desplay_name}
                        </td>
                      </tr>
                      <tr>
                        <td className="infotable__header">
                          メールアドレス：
                        </td>
                        <td className="infotable__body">
                          {this.state.userInfo.mail}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </React.Fragment>
        ) : (
          <p>該当メンバーがいません</p>
        )}
        <div className="l-gotop">
          <div className="gotop">
            <Link to="/">検索へ戻る</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default MemberInfo;
