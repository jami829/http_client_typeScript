
import React from "react";
import { useHistory } from "react-router-dom";

// components
import Button from "./Button";

interface Props {
  logOut: () => void;
  loginStatus?: boolean;
}

const SignOut: React.FC<Props> = (props) => {

  const History = useHistory()
  const reLogin = () => {
    if (props.loginStatus === false) {
      // window.location.href = "/";
      History.push("/")
    }
  }

  return (
    /* 1. 로그아웃하기 위해 App.js로부터 props로 로그인 된 유저정보를 받아왔고, 이 컴포넌트에서 로그아웃 이벤트를 state 끌어올리기로 App.js로 전달.  
       2. App.js에서 isLogin 정보를 받아와 false일 경우 "로그인" 버튼을, true일 경우 "로그아웃"버튼을 렌더하기 \
       3. reLogin()의 역할: 만약 홈경로가 아닌 /mypage와 같은 페이지에서 로그아웃을 하게 된다면, 로그아웃이 된 빈페이지만 렌더가 된다. 
          이 때 "로그인"으로 변환이 된 버튼을 누르면 로그인 "/"로 돌아가 로그인 모달창이 나타나도록 함.
          (App.js에서 isLogin이 false면 로그인모달이 나타나게끔 path경로 설정해놈)
   */
    <div>
      <Button
        style={{
          fontSize: `0.7rem`,
          background: `#6f88ad`
        }}
        onClick={
          props.loginStatus === true ? props.logOut : reLogin
        }
      >
        {props.loginStatus === false ? "로그인" : "로그아웃"}
      </Button>
    </div>
  )
}
export default SignOut;
