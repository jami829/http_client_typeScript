import React from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

//fakedate
// import user from "../test_data_user.json";

class Remove extends React.Component {
  state = {
    isModalOpen: true,
    password: "",
    errorMessage: "",
  };

  /*  모달 닫기 : isModalOpen이 true면 모달창이 떠있도록 셋팅 후 삼항연산자로 아래 렌더부분을 모두 감싸고, 
      아래 closemodal이벤트로 isModaalOpen의 상태를 false로 변경시켜주어 모달을 끄게 하자. 
      모달을 끄게되면 "/remove"에서 -> "/mypage" 로 리다이렉트 시켜주자.
      */
  closeModal = () => {
    this.setState({
      isModalOpen: false,
    });
    this.props.history.push("/mypage");
  };

  handleInPutValue = (key) => (text) => {
    console.log("잘 입력되나?");
    // console.log('k', key)
    // console.log('t', text)
    this.setState({
      [key]: text.target.value,
    });
  };

  // 유저 정보를 삭제하는 기능 이벤트
  handleClickRemoveUserInfo = () => {
    const InputPw = {
      password: this.state.password,
    };

    axios.post("https://api.get-todo.com/remove", InputPw).then((response) => {
      console.log(response);
    });

    /* fake data

     if (!InputPw.password.length) {
      this.setState({
        errorMessage: "비밀번호를 입력해주세요."
      });
    }
    else if (InputPw.password !== user[0].password) {
      this.setState({
        errorMessage: "비밀번호가 일치하지 않습니다."
      })
    }
    // 비밀번호가 일치하면 로그아웃 시키고 --> 회원탈퇴완료 컴포넌터모달 보여주기 
    else if (InputPw.password === user[0].password) {
      this.props.history.location.signOut()  // App.js -> myPage 경로로 전달된 signOut (session storage에 저장된 유저정보 삭제)
      this.props.history.push({
        pathname: "/remove_user_completed"
      })
    } */
  };

  //   //! 해당 신규 유저의 정보를 서버로 post 요청을 한 후(DB추가 등),  res로 응답코드를 받든 뭐든 받으면 로그인 페이지로 리다이렉트
  //   //* 서버 통신시 아래 코드를 테스트해보고 사용하기
  //   /*     else {
  //         axios.post('http', NewUserInformation)
  //         .then(response => {
  //           this.props.history.push("/")
  //         })
  //         .catch(error => {
  //           this.setState({
  //             errorMessage: "회원가입에 실패했습니다. 다시 시도해주세요."
  //           })
  //         })
  //       } */
  // };

  render() {
    // console.log('user', user)
    // console.log('사인아웃 props', this.props)
    // console.log("signout", this.props.history)
    return (
      <>
        {this.state.isModalOpen === true ? (
          <div className="modal">
            <div className="modal_overlay" onClick={this.closeModal}></div>
            <div className="modal_content">
              <h1>진짜 탈퇴하게유...?</h1>

              <div className="container">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <div className="container1">
                    <div>비밀번호를 입력하세요.</div>
                    <div>
                      <span>PW</span>
                      <input
                        type="password"
                        onChange={this.handleInPutValue("password")}
                      ></input>
                    </div>
                  </div>
                  <div>
                    <div>{this.state.errorMessage}</div>

                    <button
                      className="signUp_btn"
                      onClick={this.handleClickRemoveUserInfo}
                    >
                      계정 삭제
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ) : null}
      </>
    );
  }
}

export default Remove;
