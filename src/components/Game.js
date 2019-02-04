import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../App.css';

class Game extends Component {
    render() {
        return (
        <div>
            <h1>神経衰弱</h1>
            <Link to="/">トップへ戻る</Link>
        </div>
        )
    }
}

export default Game;
