/*
Name : Suraj Sanwal  
File Name : index.js
Description : Contains all ios net event listeners
Date : 16 Jan 2019
*/

import { AppState } from "react-native";
import {
  handleBot,
  endOfValidationTimestamp,
  handleInputTextCloseAll,
  skipPromtSet,
  clearSteps
} from "../actions";
import { storeObj } from "../store/setup";

const _handleAppStateChange = nextAppState => {
  // eslint-disable-next-line no-console
  console.log("appstate,", nextAppState, storeObj);
  let { dispatch, getState } = storeObj.store;
  if (nextAppState === "active") {
    // console.log(
    //   "new Date(getState().app.endOfValidationTimestamp)",
    //   new Date().getTime() -
    //     new Date(Number(getState().app.endOfValidationTimestamp))
    // );
    if (
      getState().app.endOfValidationTimestamp &&
      new Date().getTime() -
        new Date(Number(getState().app.endOfValidationTimestamp)) >
        0
    ) {
      // console.log(
      //   "new Date(getState().app.endOfValidationTimestamp)",
      //   new Date(Number(getState().app.endOfValidationTimestamp)) -
      //     new Date().getTime() <
      //     0
      // );

      dispatch(clearSteps());
      dispatch(skipPromtSet(false));
      dispatch(handleBot("start"));
      dispatch(endOfValidationTimestamp(null));
      dispatch(handleInputTextCloseAll());
    }
  }
};

const handleFirstConnectivityChange = connectionInfo => {
  // eslint-disable-next-line no-console
  console.log(
    "First change, type: " +
      connectionInfo.type +
      ", effectiveType: " +
      connectionInfo.effectiveType
  );
};
export const addListeners = () => {
  AppState.addEventListener("change", _handleAppStateChange);
};
export const removeListeners = () => {
  AppState.removeEventListener("change", handleFirstConnectivityChange);
};
