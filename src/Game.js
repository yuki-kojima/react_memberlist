import React, { Component } from 'react';
import $ from "jquery";
import { Link } from "react-router-dom";
import GameBoard from "./GameBoard";
import './App.css';
import axiosCreat from "./utility/axiosCreate";
import handleResponse from './utility/handleResponse';
import QueryGenerator from './utility/QueryGenerator';
import GameModal from './GameModal';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      departmentList: [],
      departmentID: null,
      userList: null,
      totalPage: null,
      departmentName: "",
      pairNum: 0, //ペアになったカードの組数
      cardList: [], //各カードの情報を入れる配列({id:user_id, photo: photo_url})
      flgFirst: true, //クリックしたカードが1枚目かどうかの判定用
      firstCard: null, //1枚目に引いたカードの番号
      isCleared: false,
      isPlaying: false
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
  getTotalPageNum(departmentID) {
    const params = new QueryGenerator();
    params.department_id = this.state.departmentID;
    return this.httpClient
      .get(`/who/search/${params.queryString}`)
      .then(this.commonResponseHandling)
      .then(result => {
        this.setState({ totalPage: result.summary.total_pages });
      });
  }
  onChangeDepartment(e) {
    const departmentID = e.target.value;
    this.setState(
      {
        departmentID: departmentID
      },
      () => {
        this.getTotalPageNum(this.state.departmentID);
      }
    );
  }
  loadAllUserInfo(requestList) {
    let userList = [];
    Promise.all(requestList).then(result => {
      for(let i of result) {
        userList = userList.concat(i);
      }
      this.setState({
        userList: userList
      }, e => this.setCardList(this.state.userList));
    })
  }
  returnRequestList() {
    const params = new QueryGenerator();
    const requests = [];
    let request;
    for (var i = 1; i <= this.state.totalPage; i++) {
      params.department_id = this.state.departmentID;
      params.page = i;
      request = this.httpClient.get(`/who/search/${params.queryString}`)
        .then(this.commonResponseHandling)
        .then(function (result) {
          return Promise.resolve(result.item_list);
        });
      requests.push(request);
    }
    return requests;
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
      flgFirst: true,
      isCleared: false
    });
  }

  startGame() {
    if (this.state.departmentID === null) {
      alert('部署を選んでください');
      return;
    }
    this.setState({
      isPlaying: true
    });
    const requests = this.returnRequestList();
    this.initGameStatus();
    this.loadAllUserInfo(requests);
  }

  restartGame() {
    this.initGameStatus();
    this.setState({
      cardList: [],
      isPlaying: true
    }, () => this.setCardList(this.state.userList));
  }

  resetGame() {
    this.initGameStatus();
    this.setState({
      departmentID: null,
      userList: null,
      cardList: [],
      isPlaying: false
    })
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
    $targetImg.stop().animate({ width: "150px", height: "150" }, speed);
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
      if (pairNum === total / 2) {
        setTimeout(()=> {
          this.setState({
            isCleared: true,
            isPlaying: false
          });
        }, 1000);
      }
      this.setState({
        pairNum: pairNum
      });
    } else {
      setTimeout(() => {
        this.changeCard($secondCard, this.showBackside);
        this.changeCard($firstCard, this.showBackside);
      }, 1000);
    }
    this.setState({
      flgFirst: true
    });
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
      });
    } else {
      this.lockAllCard();
      this.judgeCards($target, speed);
    }
  }

  render() {
    return (
      <div className="game">
        <h2 className="game-title">神経衰弱</h2>
        <div className="l-action">
          <div className="action">
            <div className="action-title">部署をんで「遊ぶ！」を押してね</div>
            <div>
              <ul className="radiolist">
                {this.state.departmentList.map(row => {
                  return (
                    <li key={row.department_id}>
                      <div className="radio">
                        <label>
                          <input
                            type="radio"
                            name="department"
                            value={row.department_id}
                            checked={
                              this.state.departmentID ===
                              row.department_id
                            }
                            onChange={e =>
                              this.onChangeDepartment(e)
                            }
                          />
                          {row.department_name}
                        </label>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className="l-btn-start">
                {this.state.isPlaying === true ? (
                  <button
                    onClick={() => this.resetGame()}
                    type="button"
                    className="btn-start"
                  >
                    ゲームをやめる
                  </button>
                ) : (
                  <button
                    onClick={e => this.startGame()}
                    type="button"
                    className="btn-start"
                  >
                    遊ぶ！
                  </button>
                )}
              </div>
            </div>
          </div>
          <div />
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
            <Link to="/">検索へ戻る</Link>
          </div>
        </div>
        {this.state.isCleared && (
          <GameModal
            restartGame={e => this.restartGame(e)}
            resetGame={e => this.resetGame(e)}
          />
        )}
      </div>
    );
  }
}

export default Game;
