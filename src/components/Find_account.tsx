import React, { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { string } from "prop-types";
import Button from "./Button";

//Fake Data
// import user from "../test_data_user.json";

function FindAccount({ history }: any) {

  const [info, setInfo] = useState<{
    email: string;
    name: string;
    mobile: string;
    errorMessageEmail: string;
    errorMessagePw: string;
  }>({
    email: "",
    name: "",
    mobile: "",
    errorMessageEmail: "",
    errorMessagePw: "",
  })

  const handleInputValue = (key: string) => (text: React.ChangeEvent<HTMLInputElement>): void => {
    console.log("질입력되나?");
    // console.log('k', key)
    // console.log('t', text)
    setInfo({
      ...info,
      [key]: text.target.value,
    });
  };

  /* //! 백앤드 분들께 구현 요청하기 due to sign up function flows 
    //* 연락처 형식 헬퍼 함수: '-' 삽입 필수
    notFormedMobileNumOnFindEmail = () => {
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
        errorMessageEmail: "'-'를 입력해주세요.",
      });
    }; 

  notFormedMobileNumOnFindPw = () => {
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
      errorMessagePw: "'-'를 입력해주세요.",
    });
  };*/
  //*----------------------------------

  const handleFindEmailValue = (): void => {
    const { email, name, mobile } = info;
    const userIdInfo = {
      name: name,
      mobile: mobile,
    };

    if (!userIdInfo.name.length || !userIdInfo.mobile.length) {
      setInfo({
        ...info,
        errorMessageEmail: "모든 항목을 입력하세요.",
      });
    } else {
      axios
        .post("https://api.get-todo.com/searchinfo/email", userIdInfo)
        .then((response) => {
          history.push({
            pathname: "/useremail",
            state: response.data, // CompletedFindEmail에 props로 입력 값 넘겨주기
          });
        })
        .catch((error) => {
          setInfo({
            ...info,
            errorMessageEmail: error.response.data,
          });
        });
    }

    /*     fakedata 용 코드
        
            for (let i = 0; i < user.length; i++) {
              if (
                userIdInfo.name === user[i].name &&
                userIdInfo.mobile === user[i].mobile
              ) {
                // console.log(this.props)
                this.props.history.push({
                  pathname: "/useremail",
                  state: { name: user[i].name, email: user[i].email },
                }); // CompletedFindEmail에 props로 입력 값 넘겨주기
              } else if (!userIdInfo.name.length || !userIdInfo.mobile.length) {
                this.setState({
                  errorMessageEmail: "모든 항목을 입력하세요.",
                });
              } else if (
                userIdInfo.name !== user[i].name ||
                userIdInfo.mobile !== user[i].mobile
              ) {
                this.setState({
                  errorMessageEmail: "일치하는 e-mail이 없습니다.",
                });
                // this.notFormedMobileNumOnFindEmail();
              }
            } */
  };

  const handleFindPwValue = (): void => {
    const { email, name, mobile } = info;
    const userPwInfo = {
      email: email,
      name: name,
      mobile: mobile,
    };

    if (
      !userPwInfo.email.length ||
      !userPwInfo.name.length ||
      !userPwInfo.mobile.length
    ) {
      setInfo({
        ...info,
        errorMessagePw: "모든 항목을 입력하세요.",
      });
    } else {
      axios
        .post("https://api.get-todo.com/searchinfo/password", userPwInfo)
        .then((response) => {
          history.push({
            pathname: "/userpw",
            state: response.data,
          });
        })
        .catch((error) => {
          console.log(error.response);
          setInfo({
            ...info,
            errorMessagePw: error.response.data,
          });
        });
    }

    /*     fakedata 용 코드
       for (let i = 0; i < user.length; i++) {
         if (
           userPwInfo.email === user[i].email &&
           userPwInfo.name === user[i].name &&
           userPwInfo.mobile === user[i].mobile
         ) {
           this.props.history.push({
             pathname: "userpw",
             state: { pw: user[i].password },
           });
         } else if (
           !userPwInfo.email.length ||
           !userPwInfo.name.length ||
           !userPwInfo.mobile.length
         ) {
           this.setState({
             errorMessagePw: "모든 항목을 입력하세요.",
           });
         } else if (
           userPwInfo.email !== user[i].email ||
           userPwInfo.name !== user[i].name ||
           userPwInfo.mobile !== user[i].mobile
         ) {
           this.setState({
             errorMessagePw: "비밀번호를 찾지 못하였습니다.",
           });
           // this.notFormedMobileNumOnFindPw(); // 연락처 형식 맞추는게 우선순위이니.
         }
       } */
  };


  return (
    <div className="modal">
      <div className="modal_overlay"></div>
      <div className="modal_content">
        {/* -----------------이메일 찾기------------------ */}

        <h2>e-mail 찾기</h2>

        <div className="container">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="container1">
              <div className="findAccount_div">
                <span className="findAccount_span">고객명</span>
                <input
                  type="text"
                  onChange={handleInputValue("name")}
                ></input>
              </div>

              <div className="findAccount_div">
                <span className="findAccount_span">연락처</span>
                <input
                  type="text"
                  onChange={handleInputValue("mobile")}
                ></input>
              </div>
            </div>

            <div>{info.errorMessageEmail}</div>
            {/* <NavLink to='/useremail'> */}
            <Button className="findBtn" onClick={handleFindEmailValue}>
              e-mail 찾기
              </Button>
            {/* </NavLink> */}
          </form>

          <div className="line"> </div>

          {/* -----------------패스워드 찾기------------------ */}

          <h2>PW 찾기</h2>
          {/* 바로 아랫 줄 코드. 이메일 형식이 안맞으면 말풍선으로 에러 메세지 띄움 */}
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="container1">
              <div className="findAccount_div">
                <span className="findAccount_span">e-mail</span>
                <input
                  type="email"
                  onChange={handleInputValue("email")}
                ></input>
              </div>
              <div className="findAccount_div">
                <span className="findAccount_span">고객명</span>
                <input
                  type="text"
                  onChange={handleInputValue("name")}
                ></input>
              </div>

              <div className="findAccount_div">
                <span className="findAccount_span">연락처</span>
                <input
                  type="text"
                  onChange={handleInputValue("mobile")}
                ></input>
              </div>
            </div>
            <div>{info.errorMessagePw}</div>

            {/* <NavLink to='/userpw'> */}
            <Button className="findBtn" onClick={handleFindPwValue}>
              PW 찾기
              </Button>
            {/* </NavLink> */}
          </form>

          <NavLink to="" className="signUp_link">
            <Button className="signUp_btn">로그인 페이지로 돌아가기</Button>
          </NavLink>

          <NavLink to="/signup" className="signUp_link">
            <Button className="signUp_btn">회원 가입</Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}


export default FindAccount;
