import React from "react";
import { Link } from "react-router-dom";

// Css
import "./Nav.scss";
import SignOut from "./SignOut";
import Welcome from "./Welcome";

interface Props {
  resetLogin: () => void;
  loginUserInfo: {
    isLogin?: boolean;
    userId?: string;
    email?: string;
    password?: string;
    name?: string;
    mobile?: string;
    errorMessage?: string;
  }
}

const Nav: React.FC<Props> = (props) => {
  console.log("props", props)
  const NavLinkStyle = {
    textDecoration: `none`,
    color: `white`
  }
  return (

    <ul className="nav">
      <div className="nav-welcome">
        <Welcome name={props.loginUserInfo.name} />
        <SignOut
          logOut={props.resetLogin}
          loginStatus={props.loginUserInfo.isLogin}
        />
      </div>

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
