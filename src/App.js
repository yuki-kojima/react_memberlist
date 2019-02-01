import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLogin: false,
      departmentList: [],
      user: null,
    };
  }
  componentDidMount() {
    this.httpClient = axios.create({
      baseURL: 'https://kadou.i.nijibox.net/api',
      withCredentials: true,
    });

    this.loadAuth()
      .then(() => {
        if (!this.state.isLogin) {
          return Promise.resolve();
        }
        return this.loadDepartments();
      })
      .catch((err) => {
        alert("APIがエラーを返しました\n\n" + err);
      });
  }
  loadAuth() {
    return this.httpClient.get('/auth', { params: { callback: 'http://localhost:3000' } })
      .then(this.commonResponseHandling)
      .then((result: any) => {
        if (result.is_login) {
          this.setState({ isLogin: true });
        } else if (result.auth_url) {
          window.location.href = result.auth_url;
        }
      });
  }
  loadDepartments() {
    return this.httpClient.get('/who/departments')
      .then(this.commonResponseHandling)
      .then((result: any) => {
        this.setState({ departmentList: result });
      })
  }
  loadUser() {
    return this.httpClient
      .get('/who/search/', { params: { query: 'さいとう' } })
      .then(this.commonResponseHandling)
      .then((result: any) => {
        this.setState({ user: result });
      });
  }

  commonResponseHandling(res: AxiosResponse) {
    console.debug(res);
    if (res.data.code !== "200") {
      console.error(res.data.data);
      return Promise.reject("API Error:" + res.data.data.message);
    }
    return Promise.resolve(res.data.data);
  }

  clickHandler = () => {
    this.loadUser()
      .catch((err) => {
        alert('エラー発生');
      });
  };

  render() {
    return <div>
      <ul>
        {this.state.departmentList.map((row, index) => {
          return <li key={index}>{row.department_name}</li>;
        })}
      </ul>

      {this.state.isLogin ? <div>
        <button onClick={this.clickHandler}>
          ユーザも取得してみる
                </button>

        {this.state.user && <div>
          {this.state.user.item_list[0].user_name}
          <br />
          {this.state.user.item_list[0].nickname}
          <img src={this.state.user.item_list[0].photo_url} />
        </div>}
      </div> : <p>未ログイン</p>}
    </div>;
  }
}

export default App;
