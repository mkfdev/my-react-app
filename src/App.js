/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { Route, Switch, useHistory } from "react-router";
// import { authService } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import "./App.scss";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import PetInfo from "./components/PetInfo/PetInfo";
import Register from "./components/Register/Register";

//redux hook
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser } from "./redux/action/user_action";

function App({ authService }) {
  //router 하위 컴포넌트에서 사용가능
  let history = useHistory();
  let dispatch = useDispatch();
  const isLoading = useSelector(state => state.user.isLoading);

  //인증된 유저는 펫 메인페이지로 보내주기
  useEffect(() => {
    //auth 상태 지켜보기
    onAuthStateChanged(authService, user => {
      console.log("user", user);
      //user 로그인
      if (user) {
        history.push("/petInfo");
        //setUser 함수를 dispatch로 날림
        //redux store에 user 정보를 담는다
        dispatch(setUser(user));
      } else {
        history.push("/");
        //redux sotre에 있는 user 정보 제거
        dispatch(clearUser());
      }
    });
  }, []);

  if (isLoading) {
    return <div>isLoading...</div>;
  } else {
    return (
      <div className="app-wrapper">
        <Switch>
          <Route path="/" component={Home} exact={true} />
          <Route path="/login">
            <Login authService={authService} />
          </Route>
          <Route path="/register">
            <Register authService={authService} />
          </Route>
          <Route path="/petInfo" component={PetInfo} />
        </Switch>
      </div>
    );
  }
}

export default App;
