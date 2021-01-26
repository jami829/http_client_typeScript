import React from "react";
import { Link } from "react-router-dom";

// Css
import "./Nav.scss";

function Nav() {

  const NavLinkStyle = {
    textDecoration: `none`,
    color: `white`
  }
  return (

    <ul className="nav">
      <div className="nav-welcome">안녕~~~</div>

      <li className="nav-todo">
        <Link to={"/"} style={NavLinkStyle}>
          홈
        </Link>
      </li>
      <li className="nav-mypage">
        <Link to={"/mypage"} style={NavLinkStyle}>
          마이페이지
        </Link>
      </li>
      <li className="nav-important">
        <Link to={"/important"} style={NavLinkStyle}>
          중요일정
        </Link>
      </li>
    </ul>

  )
}
export default Nav;
