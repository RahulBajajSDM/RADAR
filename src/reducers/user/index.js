/*
AuthorName : Suraj Sanwal
FileName: reducer.js
Description: Contains the reducer regarding the user
Date : 11 Sept 2018  
*/

import * as Types from "../../actionTypes";
const initialState = {
  isLoggedIn: false,
  isIntroScreenWatched: false,
  userData: null,
  fcmDeviceToken: null,
  loginData: null,
  showLoading: false,
  questionnaireId: null
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case Types.IS_INTROSCREEN_WATHCED:
      return { ...state, isIntroScreenWatched: true };
    case Types.LOGIN_REQUEST:
      return {
        ...state
      };
    case Types.LOGIN:
      return {
        ...state,
        userData: action.payload,
        isLoggedIn: true
      };
    case Types.GET_EMPLOYEEDATA_SUCCESS:
      return {
        ...state,
        userData: action.payload,
        isLoggedIn: true
      };
    case Types.LOGIN_REQUEST_FAIL:
      return { ...state };
    case Types.SAVE_QUESTIONNAIRE_ID: {
      return { ...state, questionnaireId: action.payload };
    }
    case "RESET":
      return {
        ...state,
        isLoggedIn: false,
        userData: null,
        fcmDeviceToken: null
      };
    default:
      return state;
  }
};

export default user;
