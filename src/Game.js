import React, { Component } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import GameBoard from "./GameBoard";
import './App.css';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      departmentList: [],
      userList: null,
      summary: null,
      departmentName: '',
      total: 20,  //カードの枚数
      speed: 150,  //カードをめくる速度
      returnSec: 1000,  //めくったカードが元に戻る秒数
      cardList: [],  //各カードの情報を入れる配列({id:user_id, photo: photo_url})
      index: null,  //クリックしたカードの並び順
      first: true,  //クリックしたカードが1枚目かどうかの判定用
      card1: null,  //1枚目に引いたカードの番号
      card2: null,  //2枚目に引いたカードの番号
      pair: 0  //正解したカードのペア数
    };
  }
  componentDidMount() {
    this.httpClient = axios.create({
      baseURL: "https://kadou.i.nijibox.net/api",
      withCredentials: true
    });

    this.loadDepartments();
  }
  commonResponseHandling(res) {
    console.debug(res);
    if (res.data.code !== "200") {
      console.error(res.data.data);
      return Promise.reject("API Error:" + res.data.data.message);
    }
    return Promise.resolve(res.data.data);
  }
  loadDepartments() {
    return this.httpClient
      .get("/who/departments")
      .then(this.commonResponseHandling)
      .then(result => {
        this.setState({ departmentList: result });
      });
  }
  loadUserInfo(e) {
    const target = e.target;
    const departmentName = target.innerText;
    const params = {
      department_id: parseInt(target.getAttribute("data-id"), 10) || null,
      page: parseInt(target.getAttribute("data-page"), 10) || 1
    };
    return this.httpClient
      .get("/who/search/", { params: params })
      .then(this.commonResponseHandling)
      .then(result => {
        this.setState({
          userList: result.item_list,
          summary: result.summary,
          departmentName: departmentName
        });
      });
  }

  // 以下ゲームで使いたい関数

  PickRandomUserList(userList, num) {
    var a = userList;
    var t = [];
    var randomUserList = [];
    var l = a.length;
    var n = num < l ? num : l;
    while (n-- > 0) {
      var i = Math.random() * l | 0;
      randomUserList[n] = t[i] || a[i];
      --l;
      t[i] = t[l] || a[l];
    }
    return randomUserList;
  }

  GenerateCardList(randomUserList) {
    const cardList = [];
    for (let i = 0; i < randomUserList.length; i++) {
      const item = randomUserList[i];
      cardList.push(item, item);
    }
    return cardList;
  }
  ShuffleCardList(cardList) {
    cardList.sort(function () {
      return Math.random() - Math.random();
    });
  }

  setCardList(userList) {
    const randomUSerList = this.PickRandomUserList(userList, 5);
    const cardList = this.GenerateCardList(randomUSerList);
    this.ShuffleCardList(cardList);
    this.setState({
      cardList: cardList
    });
  }




  render() {
    return (
      <div>
        <h1>神経衰弱</h1>
        <div>
          <h2>部署を選ぶ</h2>
          <div>
            <ul>
              {this.state.departmentList.map((row, index) => {
                return (
                  <li key={index}>
                    <input type="radio" name="department" value=""
                      onClick={e =>
                        this.loadUserInfo(e)
                      }
                      data-id={row.department_id}
                    />
                      {row.department_name}
                  </li>
                );
              })}
            </ul>
            <button onClick={e => this.setCardList(this.state.userList)} type="button">遊ぶ！</button>
          </div>
        </div>
        <div>
          <GameBoard />
        </div>

        <Link to="/">トップへ戻る</Link>
      </div>
    );
  }
}

export default Game;
