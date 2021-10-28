/* eslint-disable no-unused-vars */
import { Route, Switch } from "react-router";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import PetInfo from "./components/PetInfo/PetInfo";
import Register from "./components/Register/Register";
import "./App.scss";
import PetSearch from "./components/PetSearch/PetSearch";

//redux hook
// import { useSelector } from "react-redux";
function App({ InputFile, authService, petRepository }) {
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
          <PetInfo
            InputFile={InputFile}
            authService={authService}
            petRepository={petRepository}
          />
        </Route>
        <Route path="/search">
          <PetSearch authService={authService} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
