/* eslint import/no-anonymous-default-export: [2, {"allowAnonymousFunction": true}] */
import { SET_USER, CLEAR_USER } from "../action/types";

const initialUserState = {
  currentUser: null,
  isLoading: true, //로그인이 끝나면 false
};

export default function (state = initialUserState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        currentUser: action.payload,
        isLoading: false,
      };
    case CLEAR_USER:
      return {
        ...state,
        currentUser: null,
        isLoading: false,
      };

    default:
      return state;
  }
}
