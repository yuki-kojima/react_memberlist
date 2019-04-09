import React from "react";
import { Link } from "react-router-dom";
import logo from "./img/logo.png";

const Header = (props) => {
        return (
          <header id="header">
            <div className="header__inner">
              <h1>
                <Link to="/" className="pagetitle">
                  <img
                    src={logo}
                    width="45"
                    heigth="45"
                    alt="NIJIBOX"
                  />
                  <span className="pagetitle__text">
                    NIJIBOX社員名簿
                  </span>
                </Link>
              </h1>
              <nav className="header__nav">
                <ul className="nav">
                  <li>
                    <div>
                      <Link
                        to="/"
                        className={
                          props.shownPage === "search"
                            ? "is-active"
                            : undefined
                        }
                      >
                        社員名簿
                      </Link>
                    </div>
                  </li>
                  <li>
                    <div>
                      <Link
                        to="/tagSearch"
                        className={
                          props.shownPage === "tagSearch"
                            ? "is-active"
                            : undefined
                        }
                      >
                        タグで検索
                      </Link>
                    </div>
                  </li>
                  <li>
                    <div>
                      <Link
                        to="/Game"
                        className={
                          props.shownPage === "game"
                            ? "is-active"
                            : undefined
                        }
                      >
                        神経衰弱
                      </Link>
                    </div>
                  </li>
                  <li>
                    <div>
                      <Link
                        to="/edit"
                        className={
                          props.shownPage === "edit"
                            ? "is-active"
                            : undefined
                        }
                      >
                        プロフィール更新
                      </Link>
                    </div>
                  </li>
                </ul>
              </nav>
            </div>
          </header>
        );
};

export default Header;