import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './App.css';

class Top extends Component {
    render() {
        return (
        <div>
            <h1>ニジボックス 社員名簿</h1>
            <div className="menu">
                <h2 className="menu__title">メニュー</h2>
                <ul className="menu__list">
                    <li><Link to="/search" className="menu__item">社員検索</Link></li>
                    <li><Link to="/game" className="menu__item">神経衰弱</Link></li>
                </ul>
            </div>
        </div>
        )
    }
}

export default Top;
