/*
AuthorName : Suraj Sanwal
FileName: reducer.js
Description: Contains the reducer regarding the user
Date : 11 Sept 2018  
*/

import * as Types from "../../actionTypes";
const initialState = {
  instiutionLoader: false,
  loginLoader: false,
  signupLoader: false,
  getCodeInfoLoader: false,
  getHotspotsLoader: false,
  changePasswordLoader: false,
  myActivityLoader: false,
  posimationLoader: false,
  posimationDelLoader: false,
  addQuestionnaire: false
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case Types.LOGIN_REQUEST:
      return {
        ...state,
        loginLoader: true
      };
    case Types.LOGIN:
      return {
        ...state,
        loginLoader: false
      };
    case Types.LOGIN_REQUEST_FAIL:
      return {
        ...state,
        loginLoader: false
      };
    case Types.REGISTER_REQUEST:
      return {
        ...state,
        signupLoader: true
      };
    case Types.REGISTER_REQUEST_SUCCESS:
      return {
        ...state,
        signupLoader: false
      };
    case Types.REGISTER_REQUEST_FAIL:
      return {
        ...state,
        signupLoader: false
      };
    case Types.GET_CODE_INFO_REQUEST:
      return {
        ...state,
        getCodeInfoLoader: true
      };
    case Types.GET_CODE_INFO:
      return {
        ...state,
        getCodeInfoLoader: false
      };
    case Types.GET_CODE_INFO_REQUEST_FAIL:
      return {
        ...state,
        getCodeInfoLoader: false
      };
    case Types.GET_HOTSPOTS_REQUEST:
      return {
        ...state,
        getHotspotsLoader: true
      };
    case Types.GET_HOTSPOTS_SUCCESS:
      return {
        ...state,
        getHotspotsLoader: false
      };
    case Types.GET_HOTSPOTS_FAILED:
      return {
        ...state,
        getHotspotsLoader: false
      };
    case Types.ADD_QUESTIONS_REQUEST:
      return {
        ...state,
        addQuestionnaire: true
      };
    case Types.ADD_QUESTIONS_SUCCESS:
      return {
        ...state,
        addQuestionnaire: false
      };
    case Types.ADD_QUESTIONS_FAILED:
      return {
        ...state,
        addQuestionnaire: false
      };
    case Types.CHANGE_PASSWORD_REQUEST:
      return {
        ...state,
        changePasswordLoader: true
      };
    case Types.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        changePasswordLoader: false
      };
    case Types.CHANGE_PASSWORD_FAIL:
      return {
        ...state,
        changePasswordLoader: false
      };
    case Types.MY_ACTIVITIES_REQUEST:
      return {
        ...state,
        myActivityLoader: true
      };
    case Types.MY_ACTIVITIES_SUCCESS:
      return {
        ...state,
        myActivityLoader: false
      };
    case Types.MY_ACTIVITIES_FAILED:
      return {
        ...state,
        myActivityLoader: false
      };
    case Types.LOGOUT_REQUEST:
      return {
        ...state,
        loginLoader: true
      };
    case Types.LOGOUT:
      return {
        ...state,
        loginLoader: false
      };

    case "RESET":
      return { initialState };
    default:
      return state;
  }
};

export default user;
