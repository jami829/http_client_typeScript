import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../image/logo.png";
// import user from "../test_data_user.json";
import axios from "axios";
class SignInModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            email: "",
            name: "",
            password: "",
            errorMessage: "",
        };
        // console.log("props", this.props); // App.js 로부터 handleResponseSuccess()가 내려옴
        /* ----------------소셜 로그인------------------- */
        /* ----------------로그인----------------------- */
    }
    // e-mail, pw 입력 기능
    hadleInputValue = (key) => (text) => {
        this.setState({
            [key]: text.target.value,
        });
    };
    handleSignIn = () => {
        const signInfo = {
            // id: this.state.id,
            email: this.state.email,
            password: this.state.password,
        };
        if (!signInfo.email.length || !signInfo.password.length) {
            this.setState({
                errorMessage: "e-mail과 비밀번호를 입력하세요.",
            });
        } else {
            axios
                .post("https://api.get-todo.com/signin", signInfo)
                .then((response) => {
                    console.log("뭘받아와?", response);
                    this.setState({
                        id: response.data.id, // 서버에서 생성 및 전달받은 고유 유저id
                        email: response.data.email,
                        name: response.data.name,
                    });
                    this.doSignIn();
                })
                .catch((error) => {
                    // console.log("??", error.response)
                    this.setState({
                        errorMessage: error.response.data,
                    });
                });
        }
        /*     fakedata 용 코드
                for (let i = 0; i < user.length; i++) {
                  if (!signInfo.email.length || !signInfo.password.length) {
                    this.setState({
                      errorMessage: "e-mail과 PW를 입력하세요.",
                    });
                  }
                  //* 입력이 된 값으로 서버에 로그인 요청을 하고, props로 전달된 callback을 호출
                  // else {  //! 추후 알맞게 수정하기, 우선은 fackdata로
                  //     axios.post('http://localhost:8000/', signInfo)
                  //         .then(res => {
                  //             this.props.handleResponseSuccess()
                  //         })
                  //         .catch(error => {
                  //             this.setState({
                  //                 errorMessage: 'e-mail 혹은 PW가 일치하지 않습니다.'
                  //             })
                  //         })
                  // }
                  else {
                    if (
                      user[i].email === this.state.email &&
                      user[i].password === this.state.password
                    ) {
                      // this.doSignIn();
                      this.doSignIn();
                    } else
                      this.setState({
                        errorMessage: "e-mail 혹은 PW가 일치하지 않습니다.",
                      });
                  }
                  // console.log(user)
                } */
    };
    //! session storage에 저장하여 로그인을 유지시킨다.
    doSignIn = () => {
        const { id, email, name } = this.state;
        window.sessionStorage.setItem("id", id);
        window.sessionStorage.setItem("email", email);
        window.sessionStorage.setItem("name", name);
        this.props.handleResponseSuccess(); // App.js로 state 끌어올려서 App.js의 isLogin을 true로 변경해주어 홈경로 또한 바뀌고 동시에 컴포넌트도 todo로 변경된다.
    };
    render() {
        console.log("사인 state", this.state);
        console.log("사인인,세션저장소", window.sessionStorage);
        return (
            <div className="modal hidden">
                <div className="modal_overlay"></div>
                <div className="modal_content">
                    <h1>너의 시간을 겟~⭐️</h1>
                    <div className="container">
                        <div className="signUp_div">
                            <NavLink to="/signup" className="signUp_link">
                                아직 회원이 아니신가요?
              </NavLink>
                        </div>
                        <img
                            id="sign_in_img"
                            //   src="https://t1.daumcdn.net/cfile/tistory/992C413B5D2ACF7C1D"
                            src={logo}
                        ></img>
                        {/*-------------- e-mail pw 입력칸 ----------------- */}
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className="container1">
                                <div className="email_div">
                                    <span className="email_span">e-mail</span>
                                    <input
                                        type="email"
                                        onChange={this.hadleInputValue("email")}
                                    ></input>
                                </div>
                                <div className="PW_div">
                                    <span>PW</span>
                                    <input
                                        type="password"
                                        onChange={this.hadleInputValue("password")}
                                    ></input>
                                </div>
                            </div>
                            <div className="findAccount_span">
                                <span>
                                    <NavLink to="/findaccount" className="findAccount_link">
                                        e-mail | PW 찾기
                  </NavLink>
                                </span>
                            </div>
                            <div>
                                {/* <NavLink to="/todo"> */}
                                <button
                                    className="loginButton"
                                    type="submit"
                                    onClick={this.handleSignIn}
                                >
                                    로그인
                </button>
                                {/* </NavLink> */}
                                <div>
                                    <button className="loginButton" type="submit">
                                        Github 로그인
                  </button>
                                </div>
                                <div className="alert-box">{this.state.errorMessage}</div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default SignInModal;
