import * as Types from "../../actionTypes";
export const login = () => ({
  type: Types.LOGIN
});

export const setFcmDeviceToken = token => {
  return {
    type: Types.SET_FCM_DEVICE_TOKEN,
    payload: token
  };
};
