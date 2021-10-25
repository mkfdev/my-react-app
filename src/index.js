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
import AuthService from "./service/auth_service";
import ImageUploader from "./service/image_uploader";
import InputImageFile from "./components/InputImageFile/InputImageFile";

const authService = new AuthService(firebaseApp);
const petRepository = new PetRepository(firebaseApp);
const imageUploader = new ImageUploader();
//DI, 컴포넌트를 만들어서 전달(재사용성, 확장성)
//다른 props를 받아 사용할 수 있음. 추가로 다른 서비스를 한번에 전달 할 수 있음
const InputFile = props => (
  <InputImageFile {...props} imageUploader={imageUploader} />
);

// -리덕스: 오브젝트만 받을 수 있음
// -promiseMiddleware, ReduxTunk미들웨어: 프로미스,함수를 받을 수 있게 함
// 미들웨어를 이용하여 스토어생성
const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware,
  ReduxTunk,
)(createStore);

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
      <App
        InputFile={InputFile}
        authService={authService}
        petRepository={petRepository}
      />
    </Provider>
  </BrowserRouter>,
  // </React.StrictMode>,
  document.getElementById("root"),
);
