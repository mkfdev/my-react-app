/* eslint-disable no-unused-vars */
import { Route, Switch } from "react-router";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import PetInfo from "./components/PetInfo/PetInfo";
import Register from "./components/Register/Register";
import "./App.scss";

//redux hook
// import { useSelector } from "react-redux";
function App({ authService, repository }) {
  //router 하위 컴포넌트에서 사용가능
  //loading기능은 넣고싶은데..일단 pass
  // const isLoading = useSelector(state => state.user.isLoading);

  // if (isLoading) {
  //   return <div>isLoading...</div>;
  // } else {
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
        <Route path="/petInfo">
          <PetInfo authService={authService} repository={repository} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
