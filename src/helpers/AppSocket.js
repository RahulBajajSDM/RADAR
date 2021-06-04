import SocketIOClient from "socket.io-client";
import Connection from "../config/Connection";
import { updateAHotspot } from "../actions/Home/index";
import * as types from "../actionTypes";
import { ShowToast } from "../components/common/show_toast_custom_module/showToast";
import Constants from "../constants";
import { goToAuth } from "../config/navigation";

let client;
export const initsocket = (dispatch, getState) => {
  console.log("socketurl", Connection.getSOCKETBaseUrl());
  client = SocketIOClient("https://www.radarappsdei.org/", {
    secure: true,
    rejectUnauthorized: false,
    transports: ["websocket"],
    path: "/api/socket.io",
  });
  client.connect();
  console.log("client socket", client);

  client.on("connect", function() {
    console.log("socket coonected");
  });
  client.on("disconnect", function() {
    console.log("Disconnected");
  });
  client.on("add_hotspot", (data) => {
    console.log("socketListenerCalled", "add_hotspot", data);
  });
  client.on("update_hotspot", (data) => {
    console.log("socketListenerCalled", "update_hotspot", data);
  });
  client.on("delete_hotspot", (data) => {
    console.log("socketListenerCalled", "delete_hotspot", data);
  });
  client.on("update_employee", (data) => {
    console.log("socketListenerCalled", "update_employee", data);
    let {
      user: { userData },
    } = getState();
    console.log("userData22", userData);
    let resp = { ...userData };
    if (resp.id === data._id) {
      resp.isLocationAdmin = data.isLocationAdmin;

      let { isDeleted, status } = data;
      if (isDeleted == true || status == false) {
        console.log("perform logout ");
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
            message: "Session Expired",
          });
        }, 100);
      } else {
        console.log("continue -----------------");
        dispatch({
          type: types.LOGIN,
          payload: resp,
          isLoading: false,
        });
      }

      //status = false || isDelted true , logout
    }
  });
  return client;
};

export const getSocket = () => {
  return client;
};

export const emitSocket = (eventName, params) => {
  let myClient = getSocket();
  console.log("socketEmitterCalled", eventName, params);
  myClient.emit(eventName, params);
};
