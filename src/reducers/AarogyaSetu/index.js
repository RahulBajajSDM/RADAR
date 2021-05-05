import * as Types from "../../actionTypes";
const initialState = {
  details: null,
  requestDetails: null,
  showLoading: false
};

const aarogyaSetu = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_AAROGYA_TOKEN_REQUEST:
      return {
        ...state
      };
    case Types.GET_AAROGYA_TOKEN_SUCCESS:
      return {
        ...state,
        details: action.payload
      };
    case Types.GET_AAROGYA_TOKEN_FAIL:
      return { ...state };
    case Types.AAROGYA_USERSTATUS_REQUEST:
      return {
        ...state
      };
    case Types.AAROGYA_USERSTATUS_SUCCESS:
      return {
        ...state,
        requestDetails: action.payload
      };
    case Types.AAROGYA_USERSTATUS_FAIL:
      return { ...state };

    case "RESET":
      return {
        ...state
      };
    default:
      return state;
  }
};

export default aarogyaSetu;
