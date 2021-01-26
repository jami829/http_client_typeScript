import React from "react";
import { Link, NavLink } from "react-router-dom";

// components
import Remove from "../components/Remove";
import Edit from "../components/Edit";
import Button from "../components/Button";
import "./MyPage.scss";

class MyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.email,
      password: this.props.password,
      name: this.props.name,
      mobile: this.props.mobile,
    };
    console.log(`로그인 유저정보
  * 이름: ${this.state.name}   * 이메일: ${this.state.email}    * 비밀번호: ${this.state.password}   * 연락처: ${this.state.mobile}
  `);
  }

  makeChange(data) {
    if (data.password !== "") this.setState({ password: data.password });
    if (data.name !== "") this.setState({ name: data.name });
    this.props.adoptModifiedInfo(data);
  }

  /* 1. history.push.location을 이용해 props를 회원탈퇴 컴포넌트로 이동 
     2. pw도 같이 담아 보내기 
  */
  // tossUserPwToSignOut = ({ history }) => {

  // }

  componentDidMount() {
    this.makeChange;
  }

  render() {
    console.log("마이페이지 props", this.props);
    const { email, password, name, mobile } = this.state;
    return (
      <>
        <br />
        <br />
        <section className="mypage">
          <div className="myinfo-title">&#129296; 회원정보</div>
          <div>
            <div className="email-info">
              <div className="description">e-mail</div>
              <div className="print">{email}</div>
            </div>
            <div className="pw-info">
              <div className="description">PW</div>
              <div className="print">******</div>
            </div>
            <div className="name-info">
              <div className="description">고객명</div>
              <div className="print">{name}</div>
            </div>
            <div className="mobile-info">
              <div className="description">연락처</div>
              <div className="print">010-****-****</div>
            </div>
          </div>
          <div className="myinfobox">
            <div>
              <Button>
                {/* props내리기 --> 아래와 같이 작성하면 props.location 혹은 props.history.location에 아래 정보가 담겨 전달
                    전달받은 Remove.js는 this.props.location 혹은 this.props.history.location에 담긴 pw를 사용할 수 있음
                */}
                <Link
                  to={{
                    pathname: "/remove",
                    state: {
                      password: this.props.password,
                    },
                    signOut: this.props.signOut, // 메소드화가 되어 전달되어질 것. ex) signOut();
                  }}
                  style={{ color: `white`, textDecoration: `none` }}

                  // to={"/remove"}
                  // style={{ textDecoration: "none", color: "white" }}
                  // email={email}
                  // password={password}
                  // name={name}
                  // mobile={mobile}
                >
                  회원탈퇴
                </Link>
              </Button>
            </div>
          </div>
        </section>
        <br />
        <br />
        <br />
        <hr />
        <br />
        <br />
        <br />
        <section>
          <Edit
            to={"/edit"}
            style={{ textDecoration: "none", color: "black" }}
            makeChange={this.makeChange.bind(this)}
          />
        </section>
      </>
    );
  }
}
export default MyPage;
