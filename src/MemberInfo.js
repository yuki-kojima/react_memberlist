import React, { Component } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import './App.css';

class MemberInfo extends Component {
    constructor(props){
        super(props);
        this.state = {
          isLogin: false,
          userInfo: null
        }
    }
  componentDidMount() {
    this.httpClient = axios.create({
      baseURL: "https://kadou.i.nijibox.net/api",
      withCredentials: true
    });

    this.loadUserDetail();
  }
    commonResponseHandling(res) {
        console.debug(res);
        if (res.data.code !== "200") {
            console.error(res.data.data);
            return Promise.reject("API Error:" + res.data.data.message);
        }
        return Promise.resolve(res.data.data);
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
      <div>
        {this.state.userInfo ? <div>
            <h2>詳細</h2>
            <div className="memberinfo">
                <div className="memberinfo__img"><img src={this.state.userInfo.main_photo_url} alt={this.state.userInfo.user_name + "の写真"}/></div>
                <div className="memberinfo__info">
                  <div className="memberinfo__info__header">
                    <h3 className="memberinfo-title">
                      <span className="memberinfo-title__name">{this.state.userInfo.user_name}</span>
                      <span className="memberinfo-title__sub">{this.state.userInfo.user_kana}</span>
                    </h3>
                  </div>
                  <div className="memberinfo__info__body">
                    <table className="infotable">
                      <tbody>
                        <tr>
                          <td className="infotable__header">ニックネーム：</td>
                          <td className="infotable__body">{this.state.userInfo.nickname}</td>
                        </tr>
                        <tr>
                          <td className="infotable__header">部署：</td>
                          <td className="infotable__body">{this.state.userInfo.department_name}</td>
                        </tr>
                        <tr>
                          <td className="infotable__header">入社日：</td>
                          <td className="infotable__body">{this.state.userInfo.enter_date}</td>
                        </tr>
                        <tr>
                          <td className="infotable__header">slack名：</td>
                          <td className="infotable__body">{this.state.userInfo.slack_desplay_name}</td>
                        </tr>
                        <tr>
                          <td className="infotable__header">メールアドレス：</td>
                          <td className="infotable__body">{this.state.userInfo.mail}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
            </div>
        </div> : <p>該当メンバーがいません</p>
        }
        <div className="pagenav">
        <Link to="/search">検索へ戻る</Link>
        <Link to="/">トップへ戻る</Link>
        </div>
      </div>
    );
  }
}

export default MemberInfo;
