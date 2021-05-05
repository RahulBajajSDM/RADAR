/*
AuthorName : Suraj Sanwal
FileName: reducer.js
Description: Contains the reducer regarding the user
Date : 11 Sept 2018  
*/

import * as Types from "../../actionTypes";
const initialState = {
  loading: false,
  institutions: []
};

const signUp = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_INSTITUTIONS:
      return {
        ...state,
        loading: true
      };
    case Types.INSTITUTIONS:
      return {
        ...state,
        institutions: action.payload,
        loading: false
      };
    case Types.INSTITUTIONS_FAIL:
      return {
        ...state,
        loading: false
      };
    case "RESET":
      return { ...initialState };
    default:
      return state;
  }
};

export default signUp;
