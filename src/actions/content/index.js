import Constants from "../../constants";
import * as types from "../../actionTypes";
import RestClient from "../../helpers/RestClient";
import Connection from "../../config/Connection";
import { handleLoader } from "../app";
import { ShowToast } from "../../components/common/show_toast_custom_module/showToast";

export const getContent = (url) => async (dispatch) => {
  dispatch({ type: types.GET_CONTENT_LOADER_REQUEST, isLoading: true });
  let content;
  try {
    await RestClient.getCall(Connection.getResturl() + url)
      .then((response) => {
        console.log("repsonse", response);
        dispatch({ type: types.GET_CONTENT_LOADER_SUCCESS, isLoading: false });
        // content = response;
        if (response.status == 200) {
          content = response.data;
        } else {
          content = false;
        }
      })
      .catch((error) => {
        console.log("error", error);
        dispatch({ type: types.GET_CONTENT_LOADER_ERROR, isLoading: false });
      });
  } catch (error) {
    console.log("error", error);
  }
  return content;
};
