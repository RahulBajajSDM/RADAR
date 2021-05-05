import SocketIOClient from "socket.io-client";
import Connection from "../config/Connection";
import { updateAHotspot } from "../actions/Home/index";
import * as types from "../actionTypes";

let client;
export const initsocket = (dispatch, getState) => {
  client = SocketIOClient(Connection.getSOCKETBaseUrl());
  client.on("connect", function() {
    console.log("socket coonected");
  });
  client.on("disconnect", function() {
    console.log("Disconnected");
  });
  client.on("add_hotspot", data => {
    console.log("socketListenerCalled", "add_hotspot", data);
  });
  client.on("update_hotspot", data => {
    console.log("socketListenerCalled", "update_hotspot", data);
  });
  client.on("delete_hotspot", data => {
    console.log("socketListenerCalled", "delete_hotspot", data);
  });
  client.on("update_employee", data => {
    console.log("socketListenerCalled", "update_employee", data);
    let {
      user: { userData }
    } = getState();
    console.log("userData22", userData);
    let resp = { ...userData };
    if (resp.id === data._id) {
      resp.isLocationAdmin = data.isLocationAdmin;
      dispatch({
        type: types.LOGIN,
        payload: resp,
        isLoading: false
      });
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
