import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

// components
import Remove from "../components/Remove";
import Edit from "../components/Edit";
import Button from "../components/Button";
import "./MyPage.scss";

interface Props {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  mobile?: string;
  adoptModifiedInfo: (data: any) => void;
  signOut: () => void;
}

const MyPage: React.FC<Props> = (props) => {

  console.log("myProps", props)

  const [mypageInfo, setMypageInfo] = useState<{
    email?: string;
    password?: string;
    name?: string;
    mobile?: string;
  }>({
    email: props.email,
    password: props.password,
    name: props.name,
    mobile: props.mobile
  })
  const makeChange = (data: any) => {
    if (data.password !== "") setMypageInfo({ password: data.password });
    if (data.name !== "") setMypageInfo({ name: data.name });
    props.adoptModifiedInfo(data);
  }

  useEffect(() => {
    mypageInfo;
    makeChange;
  })

  const { email, name } = mypageInfo;

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
                    password: props.password,
                  },
                  // signOut: props.signOut, // 메소드화가 되어 전달되어질 것. ex) signOut();
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
    </>
  )
}

export default MyPage;
