import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Button from "./Button";

//fakedate
// import user from "../test_data_user.json";


function SignUpModal(props: any) {

  const [info, setInfo] = useState<{
    name: string;
    password: string;
    email: string;
    mobile: string;
    duplicatedIdMsg: string;
    errorMessage: string,
    errorMessageMobile: string,
    errorMessageEmail: string,
  }>({
    name: "",
    password: "",
    email: "",
    mobile: "",
    duplicatedIdMsg: "",
    errorMessage: "",
    errorMessageMobile: "",
    errorMessageEmail: "",
  })


  /* //! 백앤드 분들께 구현 요청하기 due to sign up function flows 
    //* 연락처 형식 헬퍼 함수: '-' 삽입 필수
    notFormedMobileNum = () => {
      const { mobile } = this.state;
      const userIdInfo = {
        mobile: mobile,
      };
      let count = 0;
      for (let i = 0; i < userIdInfo.mobile.length; i++) {
        if (userIdInfo.mobile[i] === "-") {
          count++;
          if (count === 2) {
            console.log("c", count);
            return;
          }
        }
      }
      this.setState({
        errorMessageMobile: "'-'를 입력해주세요."
      });
    };
   */

  // 중복확인 --> 백앤드 팀원들에게 구현했는지 물어보기 우선, 기능플로우 부터 확인.
  //fakedata 이용
  const handleClickduplicatedId = () => {
    const { email, duplicatedIdMsg } = info
    const userInfo = {
      email: email,
      message: duplicatedIdMsg,
    };

    axios
      .post("https://api.get-todo.com/searchinfo/overlapEmail", userInfo)
      .then((response) => {
        console.log("중복이메일?", response);
        setInfo({
          ...info,
          duplicatedIdMsg: response.data
        })
        // alert(info.duplicatedIdMsg)
        setInfo({
          ...info,
          duplicatedIdMsg: ""
        })
      })
      .catch((error) => {
        setInfo({
          ...info,
          duplicatedIdMsg: error.response.data
        })
        // alert(info.duplicatedIdMsg)
      })


    /* fakeData 사용 코드
    for (let i = 0; i < user.length; i++) {
      if (!userInfo.email.length) {
        return alert("항목을 입력해주세요.");
        
      }
      else if (userInfo.email === user[i].email) {
        return alert("이미 존재하는 e-mail입니다.");
      }
      else if (!userInfo.email.includes('@') || !userInfo.email.includes('.')) {
        return alert("이메일 형식을 지켜주세요. ex) @, .com 등");
      }
    }
    return alert("사용이 가능한 e-mail입니다.");*/
  };
  useEffect(() => { // axios와 같은 fetch 비동기 해결(state 적용되는 속도 맞추기 위함)
    if (info.duplicatedIdMsg.length > 0) {
      try {
        alert(info.duplicatedIdMsg)
      }
      catch {
        console.log("주의 메시지가 없습니다.")
      }
    }
  })

  const handleInPutValue = (key: string) => (text: React.ChangeEvent<HTMLInputElement>) => {
    console.log("잘 입력되나?");
    // console.log('k', key)
    // console.log('t', text)
    setInfo({
      ...info,
      [key]: text.target.value,
    });
    console.log(text);
  };

  // 회원가입한 새로운 유저 정보를 데이터 베이스에 저장한다.
  // 서버에 회원가입을 요청 후 로그인 페이지로 이동한다.
  const handClickAddNewUserInfo = () => {
    const { name, password, email, mobile } = info
    const NewUserInformation = {
      name: name,
      password: password,
      email: email,
      mobile: mobile,
    };

    // 신규 등록 회원 정보를 서버로 전달 서버 -> DB -> DB 저장 후 해당 정보를 response에 담아서 클라이언트로 재 전송될 것.

    // if (
    //   NewUserInformation.email.length &&
    //   NewUserInformation.password.length &&
    //   NewUserInformation.name.length &&
    //   NewUserInformation.mobile.length
    // ) {
    //   this.notFormedMobileNum();  //! 코드 순서 때문에 알고리즘 무용지물. 백앤드분들께 -- 규칙 적용해달라 요청하기.
    // }

    axios
      .post("https://api.get-todo.com/signup", NewUserInformation)
      .then((response) => {
        console.log("res", response);
        alert("회원가입이 완료되었습니다. 로그인을 해주세요.")
        props.history.push("/");
      })
      .catch((error) => {
        console.log("err", error.response);
        setInfo({
          ...info,
          errorMessage: error.response.data,
        });
      });

    /*  fake Data
         if (
          !NewUserInformation.email.length ||
          !NewUserInformation.password.length ||
          !NewUserInformation.name.length ||
          !NewUserInformation.mobile.length
        ) {
          this.setState({
            errorMessage: "모든 항목은 필수입니다.",
          });
        } else if (
          NewUserInformation.email.length &&
          NewUserInformation.password.length &&
          NewUserInformation.name.length &&
          NewUserInformation.mobile.length
        ) {
          this.notFormedMobileNum();
        } */

    //! 해당 신규 유저의 정보를 서버로 post 요청을 한 후(DB추가 등),  res로 응답코드를 받든 뭐든 받으면 로그인 페이지로 리다이렉트
    //* 서버 통신시 아래 코드를 테스트해보고 사용하기
    /*     else {
      axios.post('http', NewUserInformation)
      .then(response => {
        this.props.history.push("/")
      })
      .catch(error => {
        this.setState({
          errorMessage: "회원가입에 실패했습니다. 다시 시도해주세요."
        })
      })
    } */
  };
  useEffect(() => { // axios와 같은 fetch 비동기 해결(state 적용되는 속도 맞추기 위함)
    if (info.errorMessage.length > 0) {
      try {
        alert(info.errorMessage)
      }
      catch {
        console.log("주의메세지가 없습니다.")
      }
    }
  })

  // console.log('user', user)
  // console.log(this.props)
  return (
    <div className="modal">
      <div className="modal_overlay"></div>
      <div className="modal_content">
        <h1>회원 가입</h1>

        <div className="container">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="container1">
              <div id="signup_email_div">
                <span className="signup_span_title">e-mail</span>
                <span>
                  <input
                    type="email"
                    placeholder="이메일을 입력하세요."
                    onChange={handleInPutValue("email")}
                  ></input>
                </span>
                <span className="check">
                  <button
                    onClick={handleClickduplicatedId}
                  >
                    중복 확인
                  </button>
                </span>
                {/* <div>{info.duplicatedIdMsg}</div> */}
              </div>

              <div>
                <span className="signup_span_title">PW</span>
                <span>
                  <input
                    className="Signup_Pw_inputInfo"
                    type="password"
                    placeholder="비밀번호를 입력하세요."
                    onChange={handleInPutValue("password")}
                  ></input>
                </span>
              </div>
              <div>
                <span className="signup_span_title">고객명</span>
                <span>
                  <input
                    type="text"
                    placeholder="이름을 입력하세요."
                    onChange={handleInPutValue("name")}
                  ></input>
                </span>
              </div>

              <div>
                <span className="signup_span_title">연락처</span>
                <span>
                  <input
                    type="text"
                    placeholder="연락처를 입력하세요."
                    onChange={handleInPutValue("mobile")}
                  ></input>
                </span>
              </div>
            </div>
            <div>

              {/* <NavLink to='' className='signUp_link'> */}
              <Button
                className="signUp_btn"
                onClick={handClickAddNewUserInfo}
              >
                회원 가입
                </Button>
              {/* </NavLink> */}
            </div>
          </form>
          <div className="return_to_signin">
            <NavLink to="/" style={{ textDecoration: "none", color: "gray" }}>
              <span> 로그인 페이지로 돌아가기 </span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}


export default SignUpModal;
