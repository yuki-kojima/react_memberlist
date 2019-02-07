import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './App.css';

class Top extends Component {
    render() {
        return (
        <div>
            <h1>ニジボックス 社員名簿</h1>
            <nav className="nav">
                <h2 className="nav__title">メニュー</h2>
                <ul className="nav__list">
                    <li><Link to="/search" className="nav__item">社員検索</Link></li>
                    <li><Link to="/game" className="nav__item">神経衰弱</Link></li>
                </ul>
            </nav>
        </div>
        )
    }
}

export default Top;
