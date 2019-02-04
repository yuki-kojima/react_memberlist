import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../App.css';

class Top extends Component {
    render() {
        return (
        <div>
            <h1>ニジボックス 社員名簿</h1>
            <ul>
                <li><Link to="/search">社員検索</Link></li>
                <li><Link to="/game">神経衰弱</Link></li>
            </ul>
        </div>
        )
    }
}

export default Top;
