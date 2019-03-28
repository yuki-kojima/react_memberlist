import React from "react";
import "./App.css";

const GameModal = (props) => {
    return (
    <div className="modal">
        <div className="modal__overlay">
            <div className="modal__content">
                <div className="modal__header">コンプリート！</div>
                <div className="modal__body">
                    <button onClick={e => props.restartGame(e)}>もう一度遊ぶ</button>
                    <button onClick={e => props.resetGame(e)}>別の部署で遊ぶ</button>
                </div>
            </div>
        </div>
    </div>
    );

};

export default GameModal;