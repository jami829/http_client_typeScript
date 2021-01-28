import React from "react";
import { NavLink } from "react-router-dom";
import Button from "./Button";


function CompletedFindEmail({ location }: any) {

  console.log(location)
  return (
    <div className="modal">
      <div className="modal_overlay"></div>
      <div className="modal_content">
        <h2>e-mail</h2>

        <div className="container">
          <div className="find_e-mail_box">
            <div className="information">
              {location.state}
            </div>
          </div>

          <NavLink to="/findaccount">
            <Button className="findBtn">PW 찾기</Button>
          </NavLink>

          <NavLink to="" className="signUp_link">
            <Button className="signUp_btn">로그인 페이지로 돌아가기</Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}


export default CompletedFindEmail;
