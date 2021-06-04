import * as types from "../../actionTypes";
import RestClient from "../../helpers/RestClient";
import Connection from "../../config/Connection";
import { handleLoader } from "../app";
import { ShowToast } from "../../components/common/show_toast_custom_module/showToast";
import Constants from "../../constants";
import { goToAuth } from "../../config/navigation";
import { pop } from "../../actions";

export const getEmployeesData = (id, fn = null) => {
  return (dispatch, getState) => {
    let {
      user: { userData },
    } = getState();
    dispatch({ type: types.GET_EMPLOYEEDATA_REQUEST, isLoading: true });

    RestClient.getCall(
      Connection.getResturl() + "employees/getData/" + id,
      "Bearer " + userData.myToken
    )
      .then((res) => {
        if (res.status === 401) {
          goToAuth("SignIn");
          dispatch({
            type: types.LOGOUT,
          });
          dispatch({
            type: "RESET",
          });
          setTimeout(() => {
            ShowToast({
              background: Constants.Colors.PastelBlue,
              message: res.message,
            });
          }, 100);
        } else if (res.status !== 200) {
          ShowToast({
            background: Constants.Colors.PastelBlue,
            message: res.message,
          });
          dispatch({ type: types.GET_EMPLOYEEDATA_FAILED, isLoading: false });
        } else {
          let employeeData = res.data;
          let resp = { ...userData };
          resp.firstName = employeeData.firstName;
          resp.lastName = employeeData.lastName;
          resp.empId = employeeData.empId;
          resp.mobile = employeeData.mobile;
          dispatch({
            type: types.GET_EMPLOYEEDATA_SUCCESS,
            payload: resp,
            isLoading: false,
          });
          fn(res.data);
        }
      })
      .catch((e) => {
        console.log("error error error********", e);
        dispatch({ type: types.GET_EMPLOYEEDATA_FAILED, isLoading: false });
        ShowToast({
          background: Constants.Colors.PastelBlue,
          message: "Something went wrong",
        });
      });
  };
};

export const editProfile = (param, fn = null) => {
  return (dispatch, getState) => {
    let {
      user: { userData },
    } = getState();
    dispatch({ type: types.EDIT_PROFILE_REQUEST, isLoading: true });

    RestClient.restCall(
      Connection.getResturl() + "employees/edit",
      param,
      userData.myToken,
      "PUT"
    )
      .then((res) => {
        if (res.status === 401) {
          goToAuth("SignIn");
          dispatch({
            type: types.LOGOUT,
          });
          dispatch({
            type: "RESET",
          });
          setTimeout(() => {
            ShowToast({
              background: Constants.Colors.PastelBlue,
              message: res.message,
            });
          }, 100);
        } else if (res.status !== 200) {
          ShowToast({
            background: Constants.Colors.PastelBlue,
            message: res.message,
          });
          dispatch({ type: types.EDIT_PROFILE_FAILED, isLoading: false });
        } else {
          let employeeData = param;
          let resp = { ...userData };
          resp.firstName = employeeData.firstName;
          resp.lastName = employeeData.lastName;
          resp.empId = employeeData.empId;
          resp.mobile = employeeData.mobile;
          dispatch({
            type: types.GET_EMPLOYEEDATA_SUCCESS,
            payload: resp,
            isLoading: false,
          });
          dispatch({
            type: types.EDIT_PROFILE_SUCCESS,
            isLoading: false,
          });
          fn(res.data);
        }
      })
      .catch((e) => {
        console.log("error error error********", e);
        dispatch({ type: types.EDIT_PROFILE_FAILED, isLoading: false });
        ShowToast({
          background: Constants.Colors.PastelBlue,
          message: "Something went wrong",
        });
      });
  };
};

export const createEmployeesActivitiesApi = (param, componentId, fn) => {
  return (dispatch, getState) => {
    let {
      user: { userData },
    } = getState();

    console.log("param of reduce is ", param);
    // dispatch({ type: types.EMPLOYEES_ACTIVITIES_REQUEST, isLoading: true });
    RestClient.restCall(
      Connection.getResturl() + "employeeActivities/create",
      param,
      userData.myToken
    )
      .then((res) => {
        console.log("Response of reducer is ", res);
        if (res.status === 401) {
          goToAuth("SignIn");
          dispatch({
            type: types.LOGOUT,
          });
          dispatch({
            type: "RESET",
          });
          setTimeout(() => {
            ShowToast({
              background: Constants.Colors.PastelBlue,
              message: res.message,
            });
          }, 100);
        } else if (res.status !== 200) {
          ShowToast({
            background: Constants.Colors.PastelBlue,
            message: res.message,
          });
          dispatch({
            type: types.EMPLOYEES_ACTIVITIES_FAILED,
            isLoading: false,
          });
        } else {
          // dispatch({
          //   type: types.EMPLOYEES_ACTIVITIES_SUCCESS,
          //   payload: res.data,
          //   isLoading: false,
          // });
          fn(res.data);
        }
      }) // eslint-disable-next-line
      .catch((e) => {
        // eslint-disable-line
        console.log("error error error********", e);
        dispatch({ type: types.EMPLOYEES_ACTIVITIES_FAILED, isLoading: false });
        dispatch(handleLoader(false));
        ShowToast({
          background: Constants.Colors.PastelBlue,
          message: "Something went wrong",
        });
      });
  };
};

export const employeesLastActiveApi = (param, componentId) => {
  return (dispatch, getState) => {
    let {
      user: { userData },
    } = getState();
    dispatch({ type: types.EMPLOYEES_LASTACTIVE_REQUEST, isLoading: true });
    RestClient.restCall(
      Connection.getResturl() + "employees/lastActive",
      param,
      userData.myToken
    )
      .then((res) => {
        console.log("Response", res);
        if (res.status === 401) {
          goToAuth("SignIn");
          dispatch({
            type: types.LOGOUT,
          });
          dispatch({
            type: "RESET",
          });
          setTimeout(() => {
            ShowToast({
              background: Constants.Colors.PastelBlue,
              message: res.message,
            });
          }, 100);
        } else if (res.status !== 200) {
          ShowToast({
            background: Constants.Colors.PastelBlue,
            message: res.message,
          });
          dispatch({
            type: types.EMPLOYEES_LASTACTIVE_FAILED,
            isLoading: false,
          });
        } else {
          dispatch({
            type: types.EMPLOYEES_LASTACTIVE_SUCCESS,
            isLoading: false,
          });
        }
      }) // eslint-disable-next-line
      .catch((e) => {
        // eslint-disable-line
        console.log("error error error********", e);
        dispatch({ type: types.EMPLOYEES_LASTACTIVE_FAILED, isLoading: false });
        dispatch(handleLoader(false));
        ShowToast({
          background: Constants.Colors.PastelBlue,
          message: "Something went wrong",
        });
      });
  };
};

export const getHotspotsApi = (param, componentId, hotspotsArr, fn) => {
  return (dispatch, getState) => {
    let {
      user: { userData },
    } = getState();
    dispatch({ type: types.GET_HOTSPOTS_REQUEST, isLoading: true });
    RestClient.restCall(
      Connection.getResturl() + "hotspots/activeList",
      param,
      userData.myToken
    )
      .then((res) => {
        console.log("Response of getHotspot", res);
        if (res.status === 401) {
          goToAuth("SignIn");
          dispatch({
            type: types.LOGOUT,
          });
          dispatch({
            type: "RESET",
          });
          setTimeout(() => {
            ShowToast({
              background: Constants.Colors.PastelBlue,
              message: res.message,
            });
          }, 100);
        } else if (res.status !== 200) {
          ShowToast({
            background: Constants.Colors.PastelBlue,
            message: res.message,
          });
          dispatch({ type: types.GET_HOTSPOTS_FAILED, isLoading: false });
        } else {
          let response = { ...res };

          let array = [];
          response.data.forEach((hotspotVal) => {
            var dis = hotspotVal.dis;
            var isEntered = hotspotVal.isEntered;
            const hotspot = hotspotsArr.filter(function(e) {
              return e._id === hotspotVal._id;
            });
            if (hotspot.length > 0) {
              dis = hotspot[0].dis;
              isEntered = hotspot[0].isEntered;
            }
            array.push({
              ...hotspotVal,
              dis: dis || 0,
              isEntered: typeof isEntered !== "undefined" ? isEntered : null,
            });
          });
          dispatch({
            type: types.GET_HOTSPOTS_SUCCESS,
            payload: array,
            isLoading: false,
          });
          fn(array);
        }
      }) // eslint-disable-next-line
      .catch((e) => {
        // eslint-disable-line
        console.log("error error error********", e);
        dispatch({ type: types.GET_HOTSPOTS_FAILED, isLoading: false });
        dispatch(handleLoader(false));
        ShowToast({
          background: Constants.Colors.PastelBlue,
          message: "Something went wrong",
        });
      });
  };
};

export const updateHotspots = (hotspotsArray) => {
  return (dispatch, getState) => {
    console.log("hotspotsArray", hotspotsArray);
    dispatch({
      type: types.GET_HOTSPOTS_SUCCESS,
      payload: hotspotsArray,
      isLoading: false,
    });
  };
};

export const updateAHotspot = (hotspot) => {
  console.log("UpdateAhotspotVal", hotspot);
  return (dispatch, getState) => {
    dispatch({
      type: types.UPDATE_HOTSPOT_SUCCESS,
      payload: data,
      isLoading: false,
    });
  };
};

export const getMyActivities = (param, componentId, fn) => {
  return (dispatch, getState) => {
    let {
      user: { userData },
    } = getState();
    dispatch({ type: types.MY_ACTIVITIES_REQUEST, isLoading: true });
    RestClient.restCall(
      Connection.getResturl() + "employeeActivities/myActivities",
      param,
      userData.myToken
    )
      .then((res) => {
        console.log("Response", res);
        if (res.status === 401) {
          goToAuth("SignIn");
          dispatch({
            type: types.LOGOUT,
          });
          dispatch({
            type: "RESET",
          });
          setTimeout(() => {
            ShowToast({
              background: Constants.Colors.PastelBlue,
              message: res.message,
            });
          }, 100);
        } else if (res.status !== 200) {
          ShowToast({
            background: Constants.Colors.PastelBlue,
            message: res.message,
          });
          dispatch({ type: types.MY_ACTIVITIES_FAILED, isLoading: false });
        } else {
          dispatch({
            type: types.MY_ACTIVITIES_SUCCESS,
            payload: res.data,
            isLoading: false,
          });
          fn(res.data);
        }
      }) // eslint-disable-next-line
      .catch((e) => {
        // eslint-disable-line
        console.log("error error error********", e);
        dispatch({ type: types.MY_ACTIVITIES_FAILED, isLoading: false });
        dispatch(handleLoader(false));
        ShowToast({
          background: Constants.Colors.PastelBlue,
          message: "Something went wrong",
        });
      });
  };
};
export const getQuestionsListtttt = (componentId, fn) => {
  return (dispatch, getState) => {
    let {
      user: { userData },
    } = getState();
    dispatch({ type: types.QUESTIONS_LIST_REQUEST, isLoading: true });
    RestClient.restCall(
      Connection.getResturl() + "questions/activeList",
      {},
      userData.myToken
    )
      .then((res) => {
        console.log("Response", res);
        if (res.status === 401) {
          goToAuth("SignIn");
          dispatch({
            type: types.LOGOUT,
          });
          dispatch({
            type: "RESET",
          });
          setTimeout(() => {
            ShowToast({
              background: Constants.Colors.PastelBlue,
              message: res.message,
            });
          }, 100);
        } else if (res.status !== 200) {
          ShowToast({
            background: Constants.Colors.PastelBlue,
            message: res.message,
          });
          dispatch({ type: types.QUESTIONS_LIST_FAILED, isLoading: false });
        } else {
          dispatch({
            type: types.QUESTIONS_LIST_SUCCESS,
            payload: res.data,
            isLoading: false,
          });
          fn(res.data);
        }
      }) // eslint-disable-next-line
      .catch((e) => {
        // eslint-disable-line
        console.log("error error error********", e);
        dispatch({ type: types.QUESTIONS_LIST_FAILED, isLoading: false });
        dispatch(handleLoader(false));
        ShowToast({
          background: Constants.Colors.PastelBlue,
          message: "Something went wrong",
        });
      });
  };
};
export const getQuestionsList = (id, componentId, fn) => {
  return (dispatch, getState) => {
    let {
      user: { userData },
    } = getState();
    dispatch({ type: types.QUESTIONS_LIST_REQUEST, isLoading: true });
    RestClient.getCall(
      Connection.getResturl() + "questionnaires/getData/" + id,
      "Bearer " + userData.myToken
    )
      .then((res) => {
        console.log("Response", res);
        if (res.status === 401) {
          goToAuth("SignIn");
          dispatch({
            type: types.LOGOUT,
          });
          dispatch({
            type: "RESET",
          });
          setTimeout(() => {
            ShowToast({
              background: Constants.Colors.PastelBlue,
              message: res.message,
            });
          }, 100);
        } else if (res.status !== 200) {
          ShowToast({
            background: Constants.Colors.PastelBlue,
            message: res.message,
          });
          dispatch({ type: types.QUESTIONS_LIST_FAILED, isLoading: false });
        } else {
          dispatch({
            type: types.QUESTIONS_LIST_SUCCESS,
            payload: res.data,
            isLoading: false,
          });
          fn(res.data);
        }
      }) // eslint-disable-next-line
      .catch((e) => {
        // eslint-disable-line
        console.log("error error error********", e);
        dispatch({ type: types.QUESTIONS_LIST_FAILED, isLoading: false });
        dispatch(handleLoader(false));
        ShowToast({
          background: Constants.Colors.PastelBlue,
          message: "Something went wrong",
        });
      });
  };
};

export const addQuestionnaireeeee = (param, componentId) => {
  return (dispatch, getState) => {
    let {
      user: { userData },
    } = getState();
    dispatch({ type: types.ADD_QUESTIONS_REQUEST, isLoading: true });
    RestClient.restCall(
      Connection.getResturl() + "questionaire/add",
      param,
      userData.myToken
    )
      .then((res) => {
        console.log("Response", res);
        if (res.status === 401) {
          goToAuth("SignIn");
          dispatch({
            type: types.LOGOUT,
          });
          dispatch({
            type: "RESET",
          });
          setTimeout(() => {
            ShowToast({
              background: Constants.Colors.PastelBlue,
              message: res.message,
            });
          }, 100);
        } else if (res.status !== 200) {
          ShowToast({
            background: Constants.Colors.PastelBlue,
            message: res.message,
          });
          dispatch({ type: types.ADD_QUESTIONS_FAILED, isLoading: false });
        } else {
          dispatch({
            type: types.ADD_QUESTIONS_SUCCESS,
            payload: res.data,
            isLoading: false,
          });
          ShowToast({
            background: Constants.Colors.PastelBlue,
            message: "Questionnaire Submitted Successfully",
          });
          setTimeout(() => {
            dispatch(pop(componentId));
          }, 500);
        }
      }) // eslint-disable-next-line
      .catch((e) => {
        // eslint-disable-line
        console.log("error error error********", e);
        dispatch({ type: types.ADD_QUESTIONS_FAILED, isLoading: false });
        dispatch(handleLoader(false));
        ShowToast({
          background: Constants.Colors.PastelBlue,
          message: "Something went wrong",
        });
      });
  };
};

export const addQuestionnaire = (param, componentId) => {
  return (dispatch, getState) => {
    let {
      user: { userData },
    } = getState();
    dispatch({ type: types.ADD_QUESTIONS_REQUEST, isLoading: true });
    RestClient.restCall(
      Connection.getResturl() + "questionaire/submit",
      param,
      userData.myToken
    )
      .then((res) => {
        console.log("Response", res);
        if (res.status === 401) {
          goToAuth("SignIn");
          dispatch({
            type: types.LOGOUT,
          });
          dispatch({
            type: "RESET",
          });
          setTimeout(() => {
            ShowToast({
              background: Constants.Colors.PastelBlue,
              message: res.message,
            });
          }, 100);
        } else if (res.status !== 200) {
          ShowToast({
            background: Constants.Colors.PastelBlue,
            message: res.message,
          });
          dispatch({ type: types.ADD_QUESTIONS_FAILED, isLoading: false });
        } else {
          dispatch({
            type: types.ADD_QUESTIONS_SUCCESS,
            payload: res.data,
            isLoading: false,
          });
          ShowToast({
            background: Constants.Colors.PastelBlue,
            message: "Questionnaire Submitted Successfully",
          });
          setTimeout(() => {
            dispatch(pop(componentId));
          }, 500);
        }
      }) // eslint-disable-next-line
      .catch((e) => {
        // eslint-disable-line
        console.log("error error error********", e);
        dispatch({ type: types.ADD_QUESTIONS_FAILED, isLoading: false });
        dispatch(handleLoader(false));
        ShowToast({
          background: Constants.Colors.PastelBlue,
          message: "Something went wrong",
        });
      });
  };
};

export const getAlertActivities = (param, componentId, fn) => {
  return (dispatch, getState) => {
    let {
      user: { userData },
    } = getState();
    dispatch({ type: types.ALERT_ACTIVITIES_REQUEST, isLoading: true });
    RestClient.restCall(
      Connection.getResturl() + "dashboardalerts/list",
      param,
      userData.myToken
    )
      .then((res) => {
        console.log("Response", res);
        if (res.status === 401) {
          goToAuth("SignIn");
          dispatch({
            type: types.LOGOUT,
          });
          dispatch({
            type: "RESET",
          });
          setTimeout(() => {
            ShowToast({
              background: Constants.Colors.PastelBlue,
              message: res.message,
            });
          }, 100);
        } else if (res.status !== 200) {
          ShowToast({
            background: Constants.Colors.PastelBlue,
            message: res.message,
          });
          dispatch({ type: types.ALERT_ACTIVITIES_FAILED, isLoading: false });
        } else {
          dispatch({
            type: types.ALERT_ACTIVITIES_SUCCESS,
            payload: res.data,
            isLoading: false,
          });
          fn(res.data);
        }
      }) // eslint-disable-next-line
      .catch((e) => {
        // eslint-disable-line
        console.log("error error error********", e);
        dispatch({ type: types.ALERT_ACTIVITIES_FAILED, isLoading: false });
        dispatch(handleLoader(false));
        ShowToast({
          background: Constants.Colors.PastelBlue,
          message: "Something went wrong",
        });
      });
  };
};

/**
 * new Api for get user status from rogya Setu
 * @param {*} param
 * @param {*} componentId
 * @param {*} aarogyaSetuToken
 * @param {*} cb
 */

export const getArogyaUserStatus = (param, componentId, cb) => {
  return (dispatch, getState) => {
    let {
      user: { userData },
    } = getState();
    console.log("api url ", Connection.getResturl() + "sendRequestToArogya");
    console.log("param", param);
    dispatch({ type: types.AAROGYA_USERSTATUS_REQUEST, isLoading: true });
    RestClient.restCall(
      Connection.getResturl() + "sendRequestToArogya",
      param,
      userData.myToken
    )
      .then((res) => {
        console.log("Response of user Status from Api", res);
        if (
          res.data.error &&
          res.data.error.error_message &&
          res.data.error.error_message !== ""
        ) {
          console.log("ShowMessageeee");
          setTimeout(() => {
            ShowToast({
              background: Constants.Colors.PastelBlue,
              message: res.data.error.error_message,
            });
          }, 1000);
          dispatch({ type: types.AAROGYA_USERSTATUS_FAIL, isLoading: false });
        } else if (res.status === 401) {
          goToAuth("SignIn");
          dispatch({
            type: types.LOGOUT,
          });
          dispatch({
            type: "RESET",
          });
          setTimeout(() => {
            ShowToast({
              background: Constants.Colors.PastelBlue,
              message: res.message,
            });
          }, 100);
        } else if (res.status == 200) {
          dispatch({
            type: types.AAROGYA_USERSTATUS_SUCCESS,
            payload: res,
            isLoading: false,
          });
        }
        cb(res);
      }) // eslint-disable-next-line
      .catch((e) => {
        // eslint-disable-line
        console.log("error error error********", e);
        dispatch({ type: types.AAROGYA_USERSTATUS_FAIL, isLoading: false });
        dispatch(handleLoader(false));
        ShowToast({
          background: Constants.Colors.PastelBlue,
          message: "Something went wrong",
        });
      });
  };
};

/**
 *
 * @param {*} param
 * @param {*} componentId
 * @param {*} aarogyaSetuToken
 * @param {*} cb
 */
export const getArogyaUserStatusByRequestId = (param, cb) => {
  return (dispatch, getState) => {
    dispatch({ type: types.AAROGYA_USERSTATUSBYID_REQUEST, isLoading: true });
    console.log(
      "Api url",
      Connection.getResturl() + "requestIdGetData/" + param
    );
    RestClient.getCall(
      // Connection.getAarogyaBaseUrl() + "userstatusbyreqid",
      Connection.getResturl() + "requestIdGetData/" + param
    )
      .then((res) => {
        console.log("Response of user Status from Api 2 ", res);
        dispatch({
          type: types.AAROGYA_USERSTATUSBYID_SUCCESS,
          payload: res,
          isLoading: false,
        });
        cb(res);
      }) // eslint-dis
      .catch((e) => {
        // eslint-disable-line
        console.log("error error error********", e);
        dispatch({ type: types.AAROGYA_USERSTATUSBYID_FAIL, isLoading: false });
        dispatch(handleLoader(false));
        ShowToast({
          background: Constants.Colors.PastelBlue,
          message: "Something went wrong",
        });
      });
  };
};
export const getAarogyaUserStatus = (
  param,
  componentId,
  aarogyaSetuToken = null,
  cb
) => {
  return (dispatch, getState) => {
    dispatch({ type: types.AAROGYA_USERSTATUS_REQUEST, isLoading: true });
    RestClient.restAarogyaSetuCall(
      Connection.getAarogyaBaseUrl() + "userstatus",
      param,
      aarogyaSetuToken
    )
      .then((res) => {
        console.log("Response22111", res);
        if (res.error_message && res.error_message !== "") {
          console.log("ShowMessageeee");
          setTimeout(() => {
            ShowToast({
              background: Constants.Colors.PastelBlue,
              message: res.error_message,
            });
          }, 1000);
          dispatch({ type: types.AAROGYA_USERSTATUS_FAIL, isLoading: false });
        } else if (
          res.message &&
          res.message === "The incoming token has expired"
        ) {
          console.log("ShowMessageeee111");
          ShowToast({
            background: Constants.Colors.PastelBlue,
            message: res.message,
          });
          dispatch({ type: types.AAROGYA_USERSTATUS_FAIL, isLoading: false });
        } else {
          dispatch({
            type: types.AAROGYA_USERSTATUS_SUCCESS,
            payload: res,
            isLoading: false,
          });
        }
        cb(res);
      }) // eslint-disable-next-line
      .catch((e) => {
        // eslint-disable-line
        console.log("error error error********", e);
        dispatch({ type: types.AAROGYA_USERSTATUS_FAIL, isLoading: false });
        dispatch(handleLoader(false));
        ShowToast({
          background: Constants.Colors.PastelBlue,
          message: "Something went wrong",
        });
      });
  };
};

export const saveArogyaRequestIdApi = (param, componentId) => {
  return (dispatch, getState) => {
    let {
      user: { userData },
    } = getState();
    dispatch({ type: types.SAVE_AAROGYA_REQUESTID_REQUEST, isLoading: true });
    RestClient.restCall(
      Connection.getResturl() + "employees/saveArogyaRequestId",
      param,
      userData.myToken
    )
      .then((res) => {
        console.log("Response", res);
        if (res.status === 401) {
          goToAuth("SignIn");
          dispatch({
            type: types.LOGOUT,
          });
          dispatch({
            type: "RESET",
          });
          setTimeout(() => {
            ShowToast({
              background: Constants.Colors.PastelBlue,
              message: res.message,
            });
          }, 100);
        } else if (res.status !== 200) {
          ShowToast({
            background: Constants.Colors.PastelBlue,
            message: res.message,
          });
          dispatch({
            type: types.SAVE_AAROGYA_REQUESTID_FAILED,
            isLoading: false,
          });
        } else {
          dispatch({
            type: types.SAVE_AAROGYA_REQUESTID_SUCCESS,
            payload: res.data,
            isLoading: false,
          });
        }
      }) // eslint-disable-next-line
      .catch((e) => {
        // eslint-disable-line
        console.log("error error error********", e);
        dispatch({
          type: types.SAVE_AAROGYA_REQUESTID_FAILED,
          isLoading: false,
        });
        dispatch(handleLoader(false));
        ShowToast({
          background: Constants.Colors.PastelBlue,
          message: "Something went wrong",
        });
      });
  };
};
export const getAarogyaUserStatusByRequestId = (
  param,
  aarogyaSetuToken = null,
  cb
) => {
  return (dispatch, getState) => {
    dispatch({ type: types.AAROGYA_USERSTATUSBYID_REQUEST, isLoading: true });
    RestClient.restAarogyaSetuCall(
      // Connection.getAarogyaBaseUrl() + "userstatusbyreqid",
      Connection.getAarogyaBaseUrl() + "statusRequestByRequestId",
      param,
      aarogyaSetuToken
    )
      .then((res) => {
        console.log("Response2211 of new Api ", res);
        dispatch({
          type: types.AAROGYA_USERSTATUSBYID_SUCCESS,
          payload: res,
          isLoading: false,
        });
        cb(res);
      }) // eslint-disable-next-line
      .catch((e) => {
        // eslint-disable-line
        console.log("error error error********", e);
        dispatch({ type: types.AAROGYA_USERSTATUSBYID_FAIL, isLoading: false });
        dispatch(handleLoader(false));
        ShowToast({
          background: Constants.Colors.PastelBlue,
          message: "Something went wrong",
        });
      });
  };
};

export const careteDashboardAlerts = (param, cb) => {
  return (dispatch, getState) => {
    console.log("param", param);

    // dispatch({ type: types.AAROGYA_USERSTATUSBYID_REQUEST, isLoading: true });
    let {
      user: { userData },
    } = getState();
    RestClient.restCall(
      Connection.getResturl() + "dashboardalerts/create",
      param,
      userData.myToken
    )
      .then((res) => {
        console.log("Response2211", res);
        // dispatch({
        //   type: types.AAROGYA_USERSTATUSBYID_SUCCESS,
        //   payload: res,
        //   isLoading: false
        // });
        cb(res);
      }) // eslint-disable-next-line
      .catch((e) => {
        // eslint-disable-line
        console.log("error error error********", e);
        // dispatch({ type: types.AAROGYA_USERSTATUSBYID_FAIL, isLoading: false });
        // dispatch(handleLoader(false));
        // ShowToast({
        //   background: Constants.Colors.PastelBlue,
        //   message: "Something went wrong"
        // });
      });
  };
};
