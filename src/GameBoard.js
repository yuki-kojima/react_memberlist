import React, { Component } from 'react';
import './App.css';

class GameBoard extends Component {
    render() {
        const cardList = this.props.cardList;
        return(
            <div id="gameBoard">
                {cardList.length === 0 ?
                    <div className="l-game-text">
                        <div className="game-text">部署を選んでください</div>
                    </div>:
                    <ul id="card">
                        {cardList.map((item, index) => {
                            return (<li key={index + item.user_id} data-id={item.user_id} data-img={item.photo_url} onClick={e => this.props.handleCardClick(e)}><img src="./nblogo.jpg" alt="" /></li>);
                        })}
                    </ul>
                }
            </div>
        )
    }
}

export default GameBoard;