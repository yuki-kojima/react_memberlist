import React, { Component } from 'react';
import './App.css';
import axiosCreate from "./utility/axiosCreate";
import handleResponse from "./utility/handleResponse";
import ParamGenerator from './utility/ParamGenearator';
import InputText from './InputText'

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      isLogin: false,
      nickname: '',
      description: '',
      enterDate: ''
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
    this.httpClient
      .post("/profile/update", params)
      .then(this.commonResponseHandling)
      .then(function() {
        alert('プロフィールを更新しました！');
      });
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
    if (this.state.nickname === '' && this.state.description === '' && this.state.enterDate === '') {
      alert('変更する項目を入力してください');
      return;
    }
    const params = new ParamGenerator();
    params.nickname = this.state.nickname;
    params.description = this.state.description;
    params.enterDate = this.state.enterDate;
    this.updateUserInfo(params.params);
  }
  render() {
    return (
      <React.Fragment>
        <h2>プロフィール更新</h2>
        <div className="l-edit">
          <div className="edit">
            <div className="edit__content">
              <div className="edit__img"><img src={this.state.userInfo.main_photo_url} alt={`${this.state.userInfo.name}の写真`} /></div>
              <div className="edit__info">
                <table className="infotable">
                    <tbody>
                      <tr>
                        <td className="infotable__header">
                          名前(かな)：
                          </td>
                        <td className="infotable__body">
                        {this.state.userInfo.user_name}({this.state.userInfo.user_kana})
                        </td>
                      </tr>
                      <tr>
                          <td className="infotable__header">部署：</td>
                          <td className="infotable__body">
                            {this.state.userInfo.department_name}
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
                        <tr>
                          <td className="infotable__header"><label htmlFor="enterdate">入社日：</label></td>
                          <td className="infotable__body">
                            <InputText name='enterdate' placeholder={this.state.userInfo.enter_date} onChange={e => this.onChangeEnterDate(e)} />
                          </td>
                        </tr>
                        <tr>
                          <td className="infotable__header"><label htmlFor="nickname">ニックネーム：</label></td>
                          <td className="infotable__body">
                            <InputText name='nickname' placeholder={this.state.userInfo.nickname} onChange={e => this.onChangeNickname(e)} />
                          </td>
                        </tr>
                        <tr>
                        <td className="infotable__header"><label htmlFor="desc">一言：</label></td>
                          <td className="infotable__body">
                            <InputText name='desc' placeholder={this.state.userInfo.description} onChange={e => this.onChangeDesc(e)} />
                          </td>
                        </tr>
                    </tbody>
                  </table>
                  <button
                    onClick={() => this.onSubmit()}
                    type="button"
                    className="freeword__btn"
                  >
                    更新する
                  </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Edit;
