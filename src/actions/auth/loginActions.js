import * as types from "../../actionTypes";

import { goHome, goToAuth } from "../../config/navigation";
import RestClient from "../../helpers/RestClient";
import Connection from "../../config/Connection";
import { handleLoader } from "../app";
import { ShowToast } from "../../components/common/show_toast_custom_module/showToast";
import Constants from "../../constants";
import { initsocket } from "../../helpers/AppSocket";

export const isIntroScreensWatched = () => {
  return (dispatch) => {
    dispatch({ type: types.IS_INTROSCREEN_WATHCED });
  };
};

export const loginUserWithSDEI = (param, cb) => {
  console.log("params are ", param);
  // console.log("loginActin cb", cb);
  return (dispatch, getState) => {
    console.log("getState Login Api ", getState);

    dispatch({ type: types.LOGINBYSDEI_REQUEST, isLoading: true });
    RestClient.getCalll(
      RestClient.getURLString(Connection.getSDEIBaseURL(), param),
      Connection.getSDEIApiKey()
    )
      .then((res) => {
        console.log("Response", res);
        if (res.error) {
          // ShowToast({
          //   background: Constants.Colors.PastelBlue,
          //   message: res.message,
          // });
          dispatch({ type: types.LOGINBYSDEI_FAIL, isLoading: false });
          cb(res.data);
        } else {
          dispatch({
            type: types.LOGINBYSDEI_SUCCESS,
            payload: res.data,
            isLoading: false,
          });
          cb(res.data);
          // goHome();
          // // initsocket();
          // initsocket(dispatch, getState);
        }
      }) // eslint-disable-next-line
      .catch((e) => {
        // eslint-disable-line
        console.log("error error error********", e);
        dispatch({ type: types.LOGINBYSDEI_FAIL, isLoading: false });
        dispatch(handleLoader(false));
      });
  };
};

export const loginUserAsSDEI = (param, deviceToken, deviceType) => {
  return (dispatch, getState) => {
    dispatch({ type: types.LOGIN_REQUEST, isLoading: true });
    RestClient.post(
      Connection.getResturl() + "employees/loginAsSDEI",
      param,
      deviceToken,
      deviceType
    )
      .then((res) => {
        console.log("Response", res);
        if (res.status !== 200) {
          ShowToast({
            background: Constants.Colors.PastelBlue,
            message: res.message,
          });
          dispatch({ type: types.LOGIN_REQUEST_FAIL, isLoading: false });
        } else {
          dispatch({
            type: types.LOGIN,
            payload: res.userInfo,
            isLoading: false,
          });
          // cb(res.data);
          goHome();
          initsocket(dispatch, getState);
        }
      }) // eslint-disable-next-line
      .catch((e) => {
        // eslint-disable-line
        console.log("error error error********", e);
        dispatch({ type: types.LOGIN_REQUEST_FAIL, isLoading: false });
        dispatch(handleLoader(false));
      });
  };
};

export const loginUserAsVendor_SS = (param, deviceToken, deviceType) => {
  return (dispatch, getState) => {
    dispatch({ type: types.LOGIN_REQUEST, isLoading: true });
    //http://localhost:6073/auth/employee
    RestClient.post(
      Connection.getResturl() + "auth/employee",
      param,
      deviceToken,
      deviceType
    )
      .then((res) => {
        console.log("Response as Vendor or SS", res);
        if (res.status !== 200) {
          ShowToast({
            background: Constants.Colors.PastelBlue,
            message: res.message,
          });
          dispatch({ type: types.LOGIN_REQUEST_FAIL, isLoading: false });
        } else {
          dispatch({
            type: types.LOGIN,
            payload: res.userInfo,
            isLoading: false,
          });
          // cb(res.data);
          goHome();
          initsocket(dispatch, getState);
        }
      }) // eslint-disable-next-line
      .catch((e) => {
        // eslint-disable-line
        console.log("error error error********", e);
        dispatch({ type: types.LOGIN_REQUEST_FAIL, isLoading: false });
        dispatch(handleLoader(false));
      });
  };
};

//eslint-disable-next-line
export const loginUser = (param, componentId, deviceToken, deviceType) => {
  return (dispatch, getState) => {
    console.log("getState Login Api ", getState);
    dispatch({ type: types.LOGIN_REQUEST, isLoading: true });
    RestClient.post(
      Connection.getResturl() + "auth/employee",
      param,
      deviceToken,
      deviceType
    )
      .then((res) => {
        console.log("Response", res);
        if (res.status !== 200) {
          ShowToast({
            background: Constants.Colors.PastelBlue,
            message: res.message,
          });
          dispatch({ type: types.LOGIN_REQUEST_FAIL, isLoading: false });
        } else {
          dispatch({
            type: types.LOGIN,
            payload: res.userInfo,
            isLoading: false,
          });
          // cb(res.data);
          goHome();
          initsocket(dispatch, getState);
        }
      }) // eslint-disable-next-line
      .catch((e) => {
        // eslint-disable-line
        console.log("error error error********", e);
        dispatch({ type: types.LOGIN_REQUEST_FAIL, isLoading: false });
        dispatch(handleLoader(false));
      });
  };
};

export const checkMobile = (param, componentId, cb) => {
  return (dispatch, getState) => {
    dispatch({ type: types.CHECK_MOBILE_REQUEST, isLoading: true });
    RestClient.post(Connection.getResturl() + "employees/checkMobile", param)
      .then((res) => {
        console.log("Response", res);
        if (res.status !== 200) {
          ShowToast({
            background: Constants.Colors.PastelBlue,
            message: res.message,
          });
          dispatch({ type: types.CHECK_MOBILE_FAIL, isLoading: false });
        } else {
          dispatch({
            type: types.CHECK_MOBILE_SUCCESS,
            payload: res.userInfo,
            isLoading: false,
          });
          cb(res);
        }
      }) // eslint-disable-next-line
      .catch((e) => {
        // eslint-disable-line
        console.log("error error error********", e);
        dispatch({ type: types.CHECK_MOBILE_FAIL, isLoading: false });
        dispatch(handleLoader(false));
      });
  };
};
export const getAarogyaToken = (param, componentId, cb) => {
  return (dispatch, getState) => {
    dispatch({ type: types.GET_AAROGYA_TOKEN_REQUEST, isLoading: true });
    RestClient.restAarogyaSetuCall(
      Connection.getAarogyaBaseUrl() + "token",
      param,
      null
    )
      .then((res) => {
        console.log("Response11", res);
        dispatch({
          type: types.GET_AAROGYA_TOKEN_SUCCESS,
          payload: res,
          isLoading: false,
        });
        cb(res);
      }) // eslint-disable-next-line
      .catch((e) => {
        // eslint-disable-line
        console.log("error error error********", e);
        dispatch({ type: types.GET_AAROGYA_TOKEN_FAIL, isLoading: false });
        dispatch(handleLoader(false));
        ShowToast({
          background: Constants.Colors.PastelBlue,
          message: "Something went wrong",
        });
      });
  };
};

export const getCodeInfo = (param, componentId, cb) => {
  return (dispatch, getState) => {
    dispatch({ type: types.GET_CODE_INFO_REQUEST, isLoading: true });
    RestClient.post(Connection.getResturl() + "employees/getCodeInfo", param)
      .then((res) => {
        console.log("Response", res);
        if (res.status !== 200) {
          ShowToast({
            background: Constants.Colors.PastelBlue,
            message: res.message,
          });
          dispatch({
            type: types.GET_CODE_INFO_REQUEST_FAIL,
            isLoading: false,
          });
        } else {
          dispatch({
            type: types.GET_CODE_INFO,
            payload: res.data,
            isLoading: false,
          });
          cb(res.data);
        }
      }) // eslint-disable-next-line
      .catch((e) => {
        // eslint-disable-line
        console.log("error error error********", e);
        dispatch({ type: types.GET_CODE_INFO_REQUEST_FAIL, isLoading: false });
        dispatch(handleLoader(false));
      });
  };
};
export const sendVerificationCode = (param, componentId, cb) => {
  return (dispatch, getState) => {
    dispatch({ type: types.GET_CODE_INFO_REQUEST, isLoading: true });
    RestClient.post(
      Connection.getResturl() + "employees/sendVerificationCode",
      param
    )
      .then((res) => {
        console.log("Response", res);
        if (res.status !== 200) {
          ShowToast({
            background: Constants.Colors.PastelBlue,
            message: res.message,
          });
          dispatch({
            type: types.GET_CODE_INFO_REQUEST_FAIL,
            isLoading: false,
          });
        } else {
          ShowToast({
            background: Constants.Colors.PastelBlue,
            message: res.message,
          });
          dispatch({
            type: types.GET_CODE_INFO,
            payload: res.data,
            isLoading: false,
          });
          cb(res.data);
        }
      }) // eslint-disable-next-line
      .catch((e) => {
        // eslint-disable-line
        console.log("error error error********", e);
        dispatch({ type: types.GET_CODE_INFO_REQUEST_FAIL, isLoading: false });
        dispatch(handleLoader(false));
      });
  };
};

export const registerUser = (param, componentId) => {
  return (dispatch, getState) => {
    dispatch({ type: types.REGISTER_REQUEST, isLoading: true });
    RestClient.post(Connection.getResturl() + "employees/signup", param)
      .then((res) => {
        console.log("Response", res);
        if (res.status !== 200) {
          ShowToast({
            background: Constants.Colors.PastelBlue,
            message: res.message,
          });
          dispatch({ type: types.REGISTER_REQUEST_FAIL, isLoading: false });
        } else {
          dispatch({
            type: types.REGISTER_REQUEST_SUCCESS,
            payload: res.data,
            isLoading: false,
          });
          // cb(res.data);
          goToAuth("SignIn");
          setTimeout(() => {
            ShowToast({
              background: Constants.Colors.PastelBlue,
              message: res.message,
            });
          }, 100);
        }
      }) // eslint-disable-next-line
      .catch((e) => {
        // eslint-disable-line
        console.log("error error error********", e);
        dispatch({ type: types.REGISTER_REQUEST_FAIL, isLoading: false });
        dispatch(handleLoader(false));
      });
  };
};

export const changePassword = (param, componentId) => {
  return (dispatch, getState) => {
    let {
      user: { userData },
    } = getState();
    dispatch({ type: types.CHANGE_PASSWORD_REQUEST, isLoading: true });
    RestClient.restCall(
      Connection.getResturl() + "auth/changePassword",
      param,
      userData.myToken
    )
      .then((res) => {
        console.log("Response", res);
        if (res.status !== 200) {
          ShowToast({
            background: Constants.Colors.PastelBlue,
            message: res.message,
          });
          dispatch({ type: types.CHANGE_PASSWORD_FAIL, isLoading: false });
        } else {
          dispatch({
            type: types.CHANGE_PASSWORD_SUCCESS,
            payload: res.data,
            isLoading: false,
          });
          dispatch({
            type: "RESET",
          });
          goToAuth("SignIn");
          setTimeout(() => {
            ShowToast({
              background: Constants.Colors.PastelBlue,
              message: res.message,
            });
          }, 100);
        }
      }) // eslint-disable-next-line
      .catch((e) => {
        // eslint-disable-line
        console.log("error error error********", e);
        dispatch({ type: types.CHANGE_PASSWORD_FAIL, isLoading: false });
        dispatch(handleLoader(false));
      });
  };
};

export const forgotPassword = (param, componentId, cb) => {
  return (dispatch, getState) => {
    let {
      user: { userData },
    } = getState();
    dispatch({ type: types.FORGOT_PASSWORD_REQUEST, isLoading: true });
    RestClient.post(
      Connection.getResturl() + "auth/forgotPasswordEmployee",
      param
    )
      .then((res) => {
        console.log("Response", res);
        if (res.status !== 200) {
          ShowToast({
            background: Constants.Colors.PastelBlue,
            message: res.message,
          });
          dispatch({ type: types.FORGOT_PASSWORD_FAIL, isLoading: false });
        } else {
          dispatch({
            type: types.FORGOT_PASSWORD_SUCCESS,
            payload: res.data,
            isLoading: false,
          });
          setTimeout(() => {
            ShowToast({
              background: Constants.Colors.PastelBlue,
              message: res.message,
            });
          }, 100);
          cb(res.data);
        }
      }) // eslint-disable-next-line
      .catch((e) => {
        // eslint-disable-line
        console.log("error error error********", e);
        dispatch({ type: types.FORGOT_PASSWORD_FAIL, isLoading: false });
        dispatch(handleLoader(false));
      });
  };
};

export const resetPassword = (param, componentId) => {
  return (dispatch, getState) => {
    let {
      user: { userData },
    } = getState();
    dispatch({ type: types.RESET_PASSWORD_REQUEST, isLoading: true });
    RestClient.post(
      Connection.getResturl() + "auth/resetPasswordEmployee",
      param
    )
      .then((res) => {
        console.log("Response", res);
        if (res.status !== 200) {
          ShowToast({
            background: Constants.Colors.PastelBlue,
            message: res.message,
          });
          dispatch({ type: types.RESET_PASSWORD_FAIL, isLoading: false });
        } else {
          dispatch({
            type: types.RESET_PASSWORD_SUCCESS,
            payload: res.data,
            isLoading: false,
          });
          goToAuth("SignIn");
          setTimeout(() => {
            ShowToast({
              background: Constants.Colors.PastelBlue,
              message: res.message,
            });
          }, 100);
        }
      }) // eslint-disable-next-line
      .catch((e) => {
        // eslint-disable-line
        console.log("error error error********", e);
        dispatch({ type: types.RESET_PASSWORD_FAIL, isLoading: false });
        dispatch(handleLoader(false));
      });
  };
};

export const logOut = () => {
  return (dispatch, getState) => {
    let {
      user: { userData },
    } = getState();
    dispatch({ type: types.LOGOUT_REQUEST, isLoading: true });
    RestClient.restCall(
      Connection.getResturl() + "auth/logout",
      {},
      userData.myToken
    )
      .then((res) => {
        console.log("Response", res);
        if (res.status !== 200) {
          ShowToast({
            background: Constants.Colors.PastelBlue,
            message: res.message,
          });
          dispatch({ type: types.LOGOUT_FAIL, isLoading: false });
        } else {
          goToAuth("SignIn");
          dispatch({
            type: types.LOGOUT,
          });
          dispatch({
            type: "RESET",
          });
        }
      }) // eslint-disable-next-line
      .catch((e) => {
        // eslint-disable-line
        goToAuth("SignIn");
        dispatch({
          type: types.LOGOUT,
        });
        dispatch({
          type: "RESET",
        });
      });
  };
};
