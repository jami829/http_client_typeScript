import React from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

//fakedate
// import user from "../test_data_user.json";

class SignUpModal extends React.Component {
  state = {
    name: "",
    password: "",
    email: "",
    mobile: "",
    duplicatedIdMsg: "",
    errorMessage: "",
    errorMessageMobile: "",
    errorMessageEmail: "",
  };

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
  handleClickduplicatedId = () => {
    const { email, duplicatedIdMsg } = this.state;
    const userInfo = {
      email: email,
      message: duplicatedIdMsg,
    };

    axios
      .post("https://api.get-todo.com/searchinfo/overlapEmail", userInfo)
      .then((response) => {
        console.log("중복이메일?", response);
        // this.setState({
        //   duplicatedIdMsg: response
        // })
      })
      .catch((error) => {
        // this.setState({
        //   duplicatedIdMsg: error.response.data
        // })
      })
      .catch((error) => {
        // this.setState({
        //   duplicatedIdMsg: error.response.data
        // })
      });

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

  handleInPutValue = (key) => (text) => {
    console.log("잘 입력되나?");
    // console.log('k', key)
    // console.log('t', text)
    this.setState({
      [key]: text.target.value,
    });
    console.log(text);
  };

  // 회원가입한 새로운 유저 정보를 데이터 베이스에 저장한다.
  // 서버에 회원가입을 요청 후 로그인 페이지로 이동한다.
  handClickAddNewUserInfo = () => {
    const NewUserInformation = {
      name: this.state.name,
      password: this.state.password,
      email: this.state.email,
      mobile: this.state.mobile,
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
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log("err", error.response);
        this.setState({
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

  render() {
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
                <div className="inputInfo">
                  <span className="email_span">e-mail</span>
                  <input
                    type="email"
                    onChange={this.handleInPutValue("email")}
                  ></input>
                  <button
                    className="check"
                    onClick={this.handleClickduplicatedId}
                  >
                    중복 확인
                  </button>
                  <div>{this.state.duplicatedIdMsg}</div>
                </div>

                <div>
                  <span>PW</span>
                  <input
                    type="password"
                    onChange={this.handleInPutValue("password")}
                  ></input>
                </div>

                <div>
                  <span>고객명</span>
                  <input
                    type="text"
                    onChange={this.handleInPutValue("name")}
                  ></input>
                </div>

                <div>
                  <span>연락처</span>
                  <input
                    type="text"
                    onChange={this.handleInPutValue("mobile")}
                  ></input>
                  <div>{this.state.errorMessageMobile}</div>
                </div>
              </div>
              <div>
                <div>{this.state.errorMessage}</div>

                {/* <NavLink to='' className='signUp_link'> */}
                <button
                  className="signUp_btn"
                  onClick={this.handClickAddNewUserInfo}
                >
                  회원 가입
                </button>
                {/* </NavLink> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUpModal;
