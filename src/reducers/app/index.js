import * as types from "../../actionTypes";
import Immutable from "seamless-immutable";

const initialState = Immutable({
  root: "login", // 'login' / 'after-login',
  textInput: false,
  textInputTenNumber: false,
  textInputNumber: false,
  textAddMessage: false,
  loading: false,
  selectedtab: null,
  selectedScreen: null,
  tabPushed: false,
  endOfValidationTimestamp: null,
  AjivarGuideEnable: false,
  ooZChallengeShow: 0,
  fcm_token: "",
  questionnaireSubmitted: false
});

export default function app(state = initialState, action = {}) {
  console.log(action);
  switch (action.type) {
    case types.ROOT_CHANGED:
      return {
        ...state,
        root: action.root
      };
    case types.TEXT_INPUT_CHAT: {
      return { ...state, textInput: action.payload };
    }
    case types.TEXT_INPUT_TEN_NUMBER: {
      return { ...state, textInputTenNumber: action.payload };
    }
    case types.TEXT_INPUT_NUMBER: {
      return { ...state, textInputNumber: action.payload };
    }
    case types.TEXT_INPUT_ADD_MESSAGE: {
      return { ...state, textAddMessage: action.payload };
    }
    case types.AJIVAR_GUIDE_SHOW_OR_NOT: {
      return { ...state, AjivarGuideEnable: action.payload };
    }
    case types.OOZ_CHALLENGE_SHOW:
      return {
        ...state,
        ooZChallengeShow: action.payload.ooZChallengeShow
      };
    case types.TEXT_INPUT_CHAT_CLOSE_ALL: {
      return {
        ...state,
        textInput: false,
        textInputTenNumber: false,
        textInputNumber: false,
        textAddMessage: false
      };
    }
    case types.LOADING: {
      return { ...state, loading: action.payload };
    }
    case types.SELECTED_TAB: {
      return { ...state, selectedtab: action.selectedtab };
    }
    case types.SELECTED_SCREEN: {
      return {
        ...state,
        selectedScreen: action.componentId
      };
    }
    case types.CHALLENGE_TAB_PUSHED: {
      return { ...state, tabPushed: action.tabPushed };
    }
    case types.END_OF_VALIDATION_TIMESTAMP: {
      return {
        ...state,
        endOfValidationTimestamp: action.endOfValidationTimestamp
      };
    }
    case types.SET_FCM_DEVICE_TOKEN: {
      return { ...state, fcm_token: action.payload };
    }
    case "LOGOUT":
      return {
        ...state,
        root: "login",
        textInput: false,
        textInputTenNumber: false,
        textInputNumber: false,
        textAddMessage: false,
        loading: false,
        tabPushed: false,
        endOfValidationTimestamp: null,
        AjivarGuideEnable: true,
        ooZChallengeShow: 0
      };
    default:
      return state;
  }
}
