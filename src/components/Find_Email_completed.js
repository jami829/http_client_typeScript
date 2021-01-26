import React from "react";
import { NavLink } from "react-router-dom";

class CompletedFindEmail extends React.Component {
  render() {
    console.log(this.props)
    return (
      <div className="modal">
        <div className="modal_overlay"></div>
        <div className="modal_content">
          <h2>e-mail</h2>

          <div className="container">
            <div className="find_e-mail_box">
              <div className="information">
                {this.props.location.state}
              </div>
            </div>

            <NavLink to="/findaccount">
              <button className="findBtn">PW 찾기</button>
            </NavLink>

            <NavLink to="" className="signUp_link">
              <button className="signUp_btn">로그인 페이지로 돌아가기</button>
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}

export default CompletedFindEmail;
