import React, { Component } from 'react';
import './App.css';

class GameBoard extends Component {
    render() {
        const cardList = this.props.cardList;

        if (cardList.length === 0) {
            return (
              <div className="l-game-text">
                <div className="game-text">部署を選んでください</div>
              </div>
            );
        } else {
            return (
                <ul id="card">
                    {cardList.map((item, index) =>  {
                        return (<li key={index + item.user_id} data-id={item.user_id} data-img={item.photo_url} onClick={e => this.props.handleCardClick(e)}><img src="./nblogo.jpg" alt="" /></li>);
                    })}
                </ul>
            );
        }
    }
}

export default GameBoard;