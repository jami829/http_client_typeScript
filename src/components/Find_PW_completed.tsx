import React from "react";
import { NavLink } from "react-router-dom";
import Button from "./Button";

function CompletedFindPw({ location }: any) {

  return (
    <div className="modal">
      <div className="modal_overlay"></div>
      <div className="modal_content">
        <div className="container">
          <h2>PW</h2>
          <div className="find_pw_box">
            <div className="information">
              {location.state}
            </div>
          </div>

          <NavLink to="" className="signUp_link">
            <Button className="signUp_btn">로그인 페이지로 돌아가기</Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}


export default CompletedFindPw;
