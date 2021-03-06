import React, { useEffect, useLayoutEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../image/logo.png";
// import user from "../test_data_user.json";
import axios from "axios";
import { any, number, string } from "prop-types";
import Button from "./Button";

interface SignInModalProps {
    handleResponseSuccess: () => void;
}

const SignInModal: React.FC<SignInModalProps> = (props) => {

    // const [id, setId] = useState<string>("")
    // const [email, setEmail] = useState<string>("")
    // const [name, setName] = useState<string>("")
    // const [password, setPassword] = useState<string>("")
    // const [errorMessage, setErrorMessage] = useState<string>("")


    const [userInfo, setUserInfo] = useState<{
        id: string;
        email: string;
        name: string;
        password: string;
        errorMessage: string;
    }>({
        id: "",
        email: "",
        name: "",
        password: "",
        errorMessage: ""
    })
    // const [userInfo, setUserInfo] = useState({
    //     id: "",
    //     email: "",
    //     name: "",
    //     password: "",
    //     errorMessage: ""
    // })

    // const [userInfo, setuserInfo] = useState<{
    //     email?: string;
    //     password?: string;
    // }>({
    //     email: "",
    //     password: ""
    // })

    const { id, email, name, password, errorMessage } = userInfo;

    // console.log("props", this.props); // App.js 로부터 handleResponseSuccess()가 내려옴
    /* ----------------소셜 로그인------------------- */
    /* ----------------로그인----------------------- */
    // console.log("name", name)
    // // const { email, password } = userInfo
    // console.log("string obeject", userInfo)
    // console.log("email", email)
    // console.log("pw", password)
    // e-mail, pw 입력 기능
    const hadleInputValue = (key: string) => (text: React.ChangeEvent<HTMLInputElement>) => {
        setUserInfo({
            ...userInfo,
            [key]: text.target.value,
        });
        console.log("ㅁㄴㅇㄹㅁㄴㅇ", text.target.value)
    };
    const handleSignIn = () => {
        // const signInfo = {
        //     email: userInfo.email,
        //     password: userInfo.password,
        // };
        // console.log("handlelength", email)


        if (!email.length || !password.length) {
            setUserInfo({
                ...userInfo,
                errorMessage: "e-mail과 비밀번호를 입력하세요.",
            });
        } else {
            axios
                .post("https://api.get-todo.com/signin", userInfo)
                .then((response) => {
                    // console.log("뭘받아와?", response);
                    // setUserInfo({
                    //     ...userInfo,
                    //     id: response.data.id, // 서버에서 생성 및 전달받은 고유 유저id
                    //     // name: "zxc",
                    //     name: response.data.name,
                    //     email: response.data.email,
                    // })
                    window.sessionStorage.setItem("id", response.data.id)
                    window.sessionStorage.setItem("name", response.data.name)
                    window.sessionStorage.setItem("email", response.data.email)
                    console.log("axiosthen", userInfo)
                    console.log("response", response.data.name)

                    doSignIn();
                })
                .catch((error) => {
                    console.log("??", error.response)
                    setUserInfo({
                        ...userInfo,
                        errorMessage: error.response.data,
                    });
                    console.log("axios", userInfo.errorMessage)
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
    console.log("사인 state", userInfo);
    //! session storage에 저장하여 로그인을 유지시킨다.
    const doSignIn = () => {
        // const { id, name } = userInfo;
        // console.log("dosignin", email)
        // window.sessionStorage.setItem("id", id);
        // window.sessionStorage.setItem("email", email);
        // window.sessionStorage.setItem("name", name);
        // const { id, name } = userInfo;
        // const { email } = userInfo;

        // window.sessionStorage.setItem("id", userInfo.id!);
        // window.sessionStorage.setItem("name", userInfo.name!);
        // window.sessionStorage.setItem("email", userInfo.email!);
        props.handleResponseSuccess(); // App.js로 state 끌어올려서 App.js의 isLogin을 true로 변경해주어 홈경로 또한 바뀌고 동시에 컴포넌트도 todo로 변경된다.
    };

    // useLayoutEffect(() => {
    //     console.log("layout", userInfo)
    //     // window.sessionStorage.setItem("id", id);
    //     // window.sessionStorage.setItem("email", email);
    //     // window.sessionStorage.setItem("name", name);
    // })
    useEffect(() => {
        console.log("effect", userInfo)

        // window.sessionStorage.setItem("id", id)
        // window.sessionStorage.setItem("email", email)
        // window.sessionStorage.setItem("name", name)

    }, [id, email, name]);
    // }, []);

    // window.sessionStorage.setItem("id", id)
    // window.sessionStorage.setItem("email", email)
    // window.sessionStorage.setItem("name", name)
    window.sessionStorage.setItem("sdf", "asdf")


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
                                <span>
                                    <input
                                        type="email"
                                        placeholder="이메일을 입력하세요."
                                        onChange={hadleInputValue("email")}
                                    ></input>
                                </span>
                            </div>
                            <div className="PW_div">
                                <span>PW</span>
                                <span>
                                    <input
                                        type="password"
                                        placeholder="비밀번호를 입력하세요."
                                        onChange={hadleInputValue("password")}
                                    ></input>
                                </span>
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
                            <Button
                                className="loginButton"
                                type="submit"
                                onClick={handleSignIn}
                            >
                                로그인
                </Button>
                            {/* </NavLink> */}
                            <div>
                                <Button className="loginButton" type="submit">
                                    Github 로그인
                  </Button>
                            </div>
                            <div className="alert-box">{userInfo.errorMessage}</div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignInModal;
