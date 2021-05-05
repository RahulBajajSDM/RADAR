/*
 * @file: BackButtonHandling.js
 * @description: Function for handling back preess function.
 * @date: 24.Apr.2018
 * @author: Suraj Sanwal
 * */

"use strict";

import { BackHandler } from "react-native";
import { Dialog } from "../helpers/common";
/**
 * Function for handling back preess function
 */
export function handleBackPress() {
  Dialog(
    "Are you sure you want to exit",
    [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel"
      },
      {
        text: "OK",
        onPress: () => {
          BackHandler.exitApp();
        }
      }
    ],
    { cancelable: false }
  );
  return true;
}
