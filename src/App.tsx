import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

// css
import './App.css';
import Nav from './components/Nav';
import Remove from './components/Remove';
import MyPage from './routes/MyPage';

function App() {

  const [login, setLogin] = useState<{
    isLogin?: boolean;
    userId?: string;
    email?: string;
    password?: string;
    name?: string;
    mobile?: string;
    errorMessage?: string;
  }>({
    isLogin: true,
    userId: "",
    email: "",
    password: "",
    name: "",
    mobile: "",
    errorMessage: ""
  })
  const [todos, setTodos] = useState<[]>([])

  const handleSignOut = (): void => {
    setLogin({
      isLogin: false,
      email: "",
      password: "",
      name: "",
      mobile: ""
    })
    alert("로그아웃이 되었습니다.")
    doSignOut();
  }

  const doSignOut = (): void => {
    window.sessionStorage.clear();
  }

  // Edit 컴포넌트의 결과를 끌어올린다.
  const adoptModifiedInfo = (data: any) => {
    if (data.email !== "") setLogin({ email: data.email });
    if (data.password !== "") setLogin({ password: data.password });
    if (data.name !== "") setLogin({ name: data.name });
    if (data.mobile !== "") setLogin({ mobile: data.mobile });
  };

  useEffect(() => {
    login
  })

  const {
    isLogin,
    userId,
    email,
    name,
    password,
    mobile
  } = login
  return (
    <BrowserRouter>
      <div className="menu">
        <Nav resetLogin={handleSignOut} loginUserInfo={login} />
      </div>
      <div className="screen">
        <Route
          path={"/mypage"}
          render={() =>
            // isLogin ? (
            <MyPage
              id={userId}
              name={name}
              email={email}
              password={password}
              mobile={mobile}
              adoptModifiedInfo={adoptModifiedInfo}
              signOut={handleSignOut}
            />
            // ) : (
            //   <MyPage />
            // )
          }
        />
        <Route path={"/remove"} component={Remove} />
      </div>
    </BrowserRouter>
  )
}

export default App;