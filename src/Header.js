import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
        return (
            <header id="header">
                <div className="header__inner">
                    <div className="header__logo"><img src="" width="" heigth="" alt ="NIJIBOX"></img></div>
                    <nav className="header__nav">
                        <ul className="nav">
                            <li><div><Link to="/Search">社員名簿</Link></div></li>
                            <li><div><Link to="/Game">神経衰弱</Link></div></li>
                            <li><div><Link to="/">トップ</Link></div></li>                        
                        </ul>
                    </nav>
                </div>
            </header>
        );
};

export default Header;