import React from "react";
import { useState } from "react";
import { NavLink, useHistory } from "react-router-dom"
import Button from "./Button";

interface RemoveUserCompletedState {
  isModalOpen: boolean
}
const RemoveUserCompleted: React.FC<RemoveUserCompletedState> = (props) => {

  const [modal, setModal] = useState<boolean>(true)
  const History = useHistory();

  const closeModal = () => {
    setModal(
      false
    )
    // this.props.history.push("/")
    History.push("/")

  };


  return (
    <>
      { modal === true ?
        <div className="modal">
          <div className="modal_overlay" onClick={closeModal}></div>
          <div className="modal_content">
            <h1>회원 탈퇴</h1>

            <div className="container">

              <div className="container1">

                <div>
                  회원 탈퇴가 완료되었습니다.
                </div>

              </div>
              <div>
                <NavLink to="/" className='signUp_link'>
                  <Button
                    className="signUp_btn"
                  >
                    로그인 페이지
                </Button>
                </NavLink>
              </div>

            </div>
          </div>
        </div>
        : null}
    </>
  );
}


export default RemoveUserCompleted;
