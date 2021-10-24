import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise";
import ReduxTunk from "redux-thunk";
import Reducer from "./redux/reducers";
//firebase service
import { firebaseApp } from "./service/firebase";
import PetRepository from "./service/pet_repository";
import { authService } from "./service/firebase";

// 리덕스: 오브젝트만 받을 수 있음
// 미들웨어: 함수,프로미스를 받을 수 있게 사용
// 미들웨어를 이용하여 스토어생성
const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware,
  ReduxTunk,
)(createStore);

// const authService = new AuthService(firebaseApp);
const petRepository = new PetRepository(firebaseApp);

ReactDOM.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider
      store={createStoreWithMiddleware(
        Reducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__(),
      )}
    >
      <App authService={authService} petRepository={petRepository} />
    </Provider>
  </BrowserRouter>,
  // </React.StrictMode>,
  document.getElementById("root"),
);
