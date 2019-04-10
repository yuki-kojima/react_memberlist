import React, { Component } from 'react';
import './App.css';
import axiosCreate from "./utility/axiosCreate";
import handleResponse from "./utility/handleResponse";
import { Link } from "react-router-dom";
import db from "./firebase/firestore";

class TagSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      tagList: [],
      userList: null,
      requestedTagID: '01'
    };
  }

  componentDidMount() {
    this.httpClient = axiosCreate();
    this.getTags();
    this.props.setShownPage();
    this.loadUserList(this.state.requestedTagID);
  }
  commonResponseHandling(res) {
    return handleResponse(res);
  }

  getTags() {
    const tagRefs = db.collection("tags");
    const tagList = [];
    tagRefs
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          tagList.push({
            id: doc.id,
            name: doc.data().name
          });
        });
      })
      .then(() => {
        this.setState({
          tagList: tagList
        });
      });
  }

  loadUserList(tagId) {
    const userList = [];
    db.collection("members")
      .where("tags", "array-contains", tagId)
      .get()
      .then(result => {
        result.forEach(doc => {
          userList.push({
            name: doc.data().name,
            photo: doc.data().photo,
            userId: doc.data().userID
          });
          this.setState({
            userList: userList,
            requestedTagID: tagId
          });
        });
      });
  }

  onTagChange(e) {
    const tagId = e.target.value;
    this.setState({
      userList: []
    }, this.loadUserList(tagId));
  }

  render() {
    return (
      <React.Fragment>
        <h2>タグで検索</h2>
        <div className="taglist">
          <label className="taglist-label" htmlFor="tag">
            タグ：
          </label>
          <div className="taglist-select">
            <select
              id="js-tagID"
              name="tag"
              onChange={e => this.onTagChange(e)}
            >
              {this.state.tagList.map((item, index) => {
                return (
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="l-tagmemberlist">
          {this.state.userList && (
            <ul className="tagmemberlist">
              {this.state.userList.map((item, index) => {
                return (
                  <li key={index}>
                  <Link to={"/user/" + item.userId}>
                    <div className="tagmemberlist__item">
                      <div className="tagmemberlist__img">
                        <img src={item.photo} alt="" />
                      </div>
                      <div className="tagmemberlist__name">{item.name}</div>
                    </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default TagSearch;
