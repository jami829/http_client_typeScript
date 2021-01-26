import React, { useCallback, useReducer } from "react";
import { Link } from "react-router-dom";

// components
import Button from "../components/Button";

import "./Edit.scss";

/*****************************************************************
                            리액트 훅 명세표

(1) useReducer
 - Input 개체가 다수일 때, 이것들에 의한 state 변화를 한번에 관리하기 위함
 - 클래스 컴포넌트에서 e.target.value들에 대한 setState를 한번에 한 것과 동일
 - 

(2) useCallback
 - ToDo.js 컴포넌트의 주석 참조 부탁드립니다.
******************************************************************/

// reducer hook 액션 정의
function reducer(state, action) {
  return {
    ...state,
    [action.name]: action.value,
  };
}

const Edit = ({ makeChange }) => {
  // reducer hook으로 한꺼번에 state 관리할 대상 정의
  const [state, dispatch] = useReducer(reducer, {
    password: "",
    name: "",
  });

  const { password, name } = state;

  // reducer hook 구동 대상("액션값")은 "이벤트 객체(e.target 값)"라고 설정
  const onChange = (e) => {
    dispatch(e.target);
  };

  // reducer hook 구동 결과(state)를 부모(MyPage.js) 컴포넌트로 끌어올리기
  const onClick = useCallback(() => {
    console.log(`제출!! =======>
    최종제출 비밀번호: ${state.password}
    최종제출 이름: ${state.name}
    `);

    makeChange(state);
  }, [makeChange, state]);

  return (
    <>
      <section className="editpage">
        <div className="myinfo-title">&#9997; 회원정보 수정</div>
        <div>
          <div>
            <div className="description">PW</div>
            <input
              className="editbox"
              type="text"
              name="password"
              value={password}
              placeholder="변경할 비밀번호를 입력하세요"
              onChange={onChange}
            ></input>
          </div>
          <div>
            <div className="description">고객명</div>
            <input
              className="editbox"
              type="text"
              name="name"
              value={name}
              placeholder="변경할 고객명을 입력하세요"
              onChange={onChange}
            ></input>
          </div>
        </div>
      </section>
      <div>
        <Button onClick={onClick}>수정</Button>
      </div>
    </>
  );
};

export default Edit;
