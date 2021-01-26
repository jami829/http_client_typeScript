import React from "react";
import { NavLink } from "react-router-dom"


class RemoveUserCompleted extends React.Component {

  state = {
    isModalOpen: true
  }

  closeModla = () => {
    this.setState({
      isModalOpen: false
    });
    this.props.history.push("/")
  };

  render() {
    return (
      <>
        { this.state.isModalOpen === true ?
          <div className="modal">
            <div className="modal_overlay" onClick={this.closeModla}></div>
            <div className="modal_content">
              <h1>가 그냥...</h1>

              <div className="container">

                <div className="container1">

                  <div>
                    회원 탈퇴가 완료되었습니다.
                </div>

                </div>
                <div>
                  <NavLink to="/" className='signUp_link'>
                    <button
                      className="signUp_btn"
                    >
                      로그인 페이지
                </button>
                  </NavLink>
                </div>

              </div>
            </div>
          </div>
          : null}
      </>
    );
  }
}

export default RemoveUserCompleted;
