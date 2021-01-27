import React, { useState } from "react";
import axios from "axios";
import { NavLink, RouteComponentProps } from "react-router-dom";
import Button from "./Button";
// import { ReactRouterPropTypes } from "react-router-prop-types"


//fakedate
// import user from "../test_data_user.json";

// interface MatchParam {
//   signOut: () => void;
//   state: {
//     password: string;
//   }

// }
// interface RemoveProps extends RouteComponentProps<any> {
//   signOut: () => void;
//   state: {
//     password: string;
//   }
// }
// type RemoveProps = RouteComponentProps;
function Remove(props: any) {
  // console.log("remove", props)
  const [modal, setModal] = useState<boolean>(true);
  const [input, setInput] = useState<{ password?: string, errorMessage?: string }>({ password: "", errorMessage: "" })



  const closeModal = () => {
    setModal(
      false
    )
    props.history.push("/mypage");
  }

  const handleInputValue = (key: string) => (text: React.ChangeEvent<HTMLInputElement>) => {
    // key: password 아래 렌더부분에 설정해놈.
    setInput({
      [key]: text.target.value
    })
    // console.log("removeInput", input.password)
  }

  const handleClickRemoveUserInfo = () => {
    const inputPw = {
      password: input.password
    }

    axios.post("https://api.get-todo.com/remove", inputPw)
      .then((response) => {
        console.log("handleClickRemoveUserInfo", response)
      })
  }

  return (
    <>
      {modal === true ?
        (<div className="modal">
          <div className="modal_overlay" onClick={closeModal}></div>
          <div className="modal_content">
            <h1>회원탈퇴</h1>

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
                      onChange={handleInputValue("password")}
                    />
                  </div>
                </div>
                <div>
                  <div>{input.errorMessage}</div>

                  <Button
                    className="signUp_btn"
                    onClick={handleClickRemoveUserInfo}
                  >
                    계정 삭제
                </Button>

                </div>
              </form>
            </div>
          </div>
        </div>
        ) : null}
    </>
  )
}

// Remove.propTypes = {
//   history: ReactRouterPropTypes.history.isRequired,
// };

export default Remove;
