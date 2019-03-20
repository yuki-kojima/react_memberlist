import React, { Component } from 'react';
import $ from "jquery";
import { Link } from "react-router-dom";
import GameBoard from "./GameBoard";
import './App.css';
import axiosCreat from "./utility/axiosCreate";
import handleResponse from './utility/handleResponse';
import QueryGenerator from './utility/QueryGenerator';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      departmentList: [],
      userList: null,
      summary: null,
      departmentName: "",
      pairNum: 0, //ペアになったカードの組数
      cardList: [], //各カードの情報を入れる配列({id:user_id, photo: photo_url})
      flgFirst: true, //クリックしたカードが1枚目かどうかの判定用
      firstCard: null, //1枚目に引いたカードの番号
    };
  }
  componentDidMount() {
    this.httpClient = axiosCreat();

    this.loadDepartments();
  }
  commonResponseHandling(res) {
    return handleResponse(res);
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
    const params = new QueryGenerator();
    params.department_id = parseInt(target.getAttribute("data-id"), 10);
    params.page = 1;
    return this.httpClient
      .get("/who/search/", { params: params.params })
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
  // カード生成
  PickRandomUserList(userList, num) {
    var a = userList;
    var t = [];
    var randomUserList = [];
    var l = a.length;
    var n = num < l ? num : l;
    while (n-- > 0) {
      var i = (Math.random() * l) | 0;
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
    cardList.sort(function() {
      return Math.random() - Math.random();
    });
  }

  setCardList(userList) {
    if (userList === null) {
      return;
    }
    const randomUSerList = this.PickRandomUserList(userList, 5);
    const cardList = this.GenerateCardList(randomUSerList);
    this.ShuffleCardList(cardList);
    this.setState({
      cardList: cardList
    });
  }

  initGameStatus() {
    this.setState({
      pairNum: 0,
      firstCard: null,
      flgFirst: true
    })
  }

  startGame(userList) {
    this.initGameStatus();
    this.setCardList(userList);
  }

  // クリック時の関数
  changeCard($target, func, speed) {
    const $targetImg = $target.find("img");
    $targetImg.stop().animate({ left: "75" }, speed);
    $targetImg.stop().animate({ width: "0", height: "150" }, speed, function() {
      func($target, speed);
    });
  }
  //面を開く
  showUpside($target, speed) {
    const $targetImg = $target.find("img");
    const imgSrc = $target.data("img");
    $targetImg.attr("src", imgSrc);
    $targetImg.stop().animate({ width: "150px", height: "150" }, speed);
    $target.stop().animate({ left: "0" }, speed);
  }
  //裏を開く
  showBackside($target, speed) {
    const $targetImg = $target.find("img");
    $targetImg.attr("src", "./nblogo.jpg");
    $targetImg
      .stop()
      .animate({ width: "150px", height: "150" }, speed);
    $target.stop().animate({ left: "0" }, speed);
  }
  //クリックできないようにカードをロック
  lockCard($target) {
    $target.addClass("is-locked");
  }
  //全てのカードをロック
  lockAllCard() {
    $("#card li").addClass("is-locked");
  }
  //全てのカードをアンロック
  unlockAllCards() {
    $("#card li").removeClass("is-locked");
  }

  // 判定
  judgeCards($secondCard, speed) {
    let pairNum = this.state.pairNum;
    const $firstCard = this.state.firstCard;
    const id1 = $firstCard.data("id");
    const id2 = $secondCard.data("id");
    const total = this.state.cardList.length;
    if (id1 === id2) {
      $firstCard.addClass("is-disabled");
      $secondCard.addClass("is-disabled");
      pairNum++;
      if(pairNum === total / 2) {
        setTimeout(() => {
          alert("コンプリート！！！");
        }, 1000)
      }
      this.setState({
        pairNum: pairNum
      });
    } else {
      setTimeout(() => {
        this.changeCard($secondCard, this.showBackside);
        this.changeCard($firstCard, this.showBackside);
      }, 1000)
    }
    this.setState({
      flgFirst: true
    })
    setTimeout(() => {
      this.unlockAllCards();
    }, speed * 2 + 1000);
  }
  // カードクリック時の挙動
  handleCardClick(e) {
    const $target = $(e.currentTarget);
    const speed = 150;
    let flgFirst = this.state.flgFirst;
    this.lockCard($target);
    this.changeCard($target, this.showUpside, speed);

    if (flgFirst === true) {
      this.setState({
        firstCard: $target,
        flgFirst: false
      })
    } else {
      this.lockAllCard();
      this.judgeCards($target, speed);
    }
  }

  render() {
    return (
      <div>
        <h1>神経衰弱</h1>
        <div>
          <h2>部署を選ぶ</h2>
          <div>
            <ul className="radiolist">
              {this.state.departmentList.map((row, index) => {
                return (
                  <li key={index}>
                    <input
                      type="radio"
                      name="department"
                      value=""
                      onClick={e => this.loadUserInfo(e)}
                      data-id={row.department_id}
                    />
                    {row.department_name}
                  </li>
                );
              })}
            </ul>
            <div className="l-btn-start">
              <button
                onClick={e => this.startGame(this.state.userList)}
                type="button"
                className="btn-start"
              >
                遊ぶ！
              </button>
            </div>
          </div>
        </div>
        <div>
          <GameBoard
            cardList={this.state.cardList}
            handleCardClick={(e, flgFirst) =>
              this.handleCardClick(e, flgFirst)
            }
            flgFirst={this.props.flgFirst}
          />
        </div>
        <div className="l-pager">
          <div className="pager">
            <Link to="/">トップへ戻る</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
