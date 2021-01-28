import React, { useEffect, useLayoutEffect, useState } from 'react';
import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom';
import axios from 'axios';

// css
import './App.css';
import Nav from './components/Nav';
import Remove from './components/Remove';
import Remove_completed from './components/Remove_completed';
import SignInModal from './components/SignIn';
import MyPage from './routes/MyPage';
import ToDo from './routes/ToDo';
import ImportantTodo from './components/Todo/ImportantTodo';
import SignUpModal from './components/SignUp';
import FindAccount from './components/Find_account';
import CompletedFindEmail from './components/Find_Email_completed';
import CompletedFindPw from './components/Find_PW_completed';
import Edit from './components/Edit';


function App() {

  const [login, setLogin] = useState<{
    isLogin: boolean;
    userId: string | null;
    email: string | null;
    password: string;
    name: string | null;
    mobile: string;
    errorMessage: string;
  }>({
    isLogin: false,
    userId: "",
    email: "",
    password: "",
    name: "",
    mobile: "",
    errorMessage: ""
  })
  const [todos, setTodos] = useState<any>([])

  const History = useHistory();

  const {
    isLogin,
    userId,
    email,
    name,
    password,
    mobile
  } = login

  console.log(name)

  // 세션 저장소에 저장된 id를 불러와 req하자.
  const handleResponseSuccess = (): void => {
    axios
      .post("https://api.get-todo.com/getMain", {
        id: window.sessionStorage.getItem("id"),
      })
      // axios({
      //   method: "GET",
      //   url: "https://api.get-todo.com/getMain",
      //   headers: {
      //     "Content-Type": "application/json",
      //     // accept: "application/json",
      //     // Cookie: window.sessionStorage.getItem("id"),
      //     withCredentials: true,
      //     credentials: "include",
      //   },
      // })
      // axios.get("https://api.get-todo.com/getMain", {
      //   withCredentials: true
      // })
      .then((res) => {
        console.log("메인2 성공", res.data);
        setTodos({ todos: res.data });
      })
      .catch((error) => {
        console.log("메인2 에러", error.response);
      });
    setLogin({
      ...login,
      isLogin: true,
      email: window.sessionStorage.getItem("email"),
      userId: window.sessionStorage.getItem("id"),
      name: window.sessionStorage.getItem("name"),
    });
  };




  const handleSignOut = () => {
    setLogin({
      ...login,
      isLogin: false,
      email: "",
      password: "",
      name: "",
      mobile: ""
    })
    // alert("로그아웃이 되었습니다.")
    doSignOut();
  }

  const doSignOut = (): void => {
    window.sessionStorage.clear();
  }

  // Edit 컴포넌트의 결과를 끌어올린다.
  const adoptModifiedInfo = (data: any) => {
    if (data.email !== "") setLogin({ ...login, email: data.email });
    if (data.password !== "") setLogin({ ...login, password: data.password });
    if (data.name !== "") setLogin({ ...login, name: data.name });
    if (data.mobile !== "") setLogin({ ...login, mobile: data.mobile });
  };
  // ToDo 컴포넌트의 결과를 끌어올린다.
  const adoptRecentTodo = (data: any) => {
    setTodos({ todos: data });
  };

  useLayoutEffect(() => {  // useEffect로 하면 새로고침 시 아주 잠시동안 로그아웃상태가 됨, 둘의 성격차이를 보면 알 수 있음.
    // login

    const userEmail = window.sessionStorage.getItem("email");
    if (userEmail) {
      // return () => handleResponseSuccess();
      handleResponseSuccess();
    } else {
      // handleSignOut();
      // window.sessionStorage.clear();
    }
    // adoptRecentTodo;
    // console.log("메인2 변경감지", this.state);

  }, [email])

  // useLayoutEffect(() => {
  //   const userEmail = window.sessionStorage.getItem("email");
  //   if (userEmail) {
  //     // History.push("/");
  //     try {
  //       handleResponseSuccess();
  //     }
  //     catch {
  //       // window.sessionStorage.clear();
  //     }
  //   }
  // }, [email])

  console.log("login", login)


  return (
    <Router>
      <div className="menu">
        <Nav resetLogin={handleSignOut} loginUserInfo={login} />
      </div>
      <div className="screen">
        <Route
          path={"/"}
          exact={true}
          render={() =>
            isLogin ? ( // 새로고침해도 로그인 상태를 유지시키기 위해 localstorage에 저장된 정보를 사용한다. local storage는 사용자가 지우지 않는 이상 영구적으로 계속 브라우저에 남아있음 (단, session storage는 브라우저가 닫은 겨우 사라지고, 브라우저 내에서 탬을 생성하는 경우에도 별도의 영역으로 할당됨.)
              <ToDo
                userId={userId}
                email={email}
                name={name}
                todos={todos}
                adoptRecentTodo={adoptRecentTodo}
              />
            ) : (
                <SignInModal
                  handleResponseSuccess={handleResponseSuccess}
                />
              )
          }
        />
        <Route path={"/todo"} component={ToDo} />
        <Route
          path="/mypage"
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
        { // 시우님께 여쭤보기
        /* <Route
          path={"/important"}
          render={() =>
            <ImportantTodo
              todos={() => {
                axios
                  .get("https://api.get-todo.com/important", userId)
                  .then((res) => res.data);
              }}
            />
          }
        /> */}
        <Route path={"/signup"} component={SignUpModal} />
        <Route path={"/findaccount"} component={FindAccount} />
        <Route path={"/useremail"} component={CompletedFindEmail} />
        <Route path={"/userpw"} component={CompletedFindPw} />
        <Route path={"/edit"} component={Edit} />
        <Route path={"/remove"} render={() => <Remove signOut={handleSignOut} pass={password} />} />
        {/* <Route path={"/remove"} signOut={handleSignOut} pass={login.password} >
          <Remove />
        </Route> */}
        {/* <Route path={"/remove"} component={Remove} /> */}
        <Route path={"/remove_user_completed"} component={Remove_completed} signOut={handleSignOut} />
      </div>
    </Router>
  )
}

export default App;