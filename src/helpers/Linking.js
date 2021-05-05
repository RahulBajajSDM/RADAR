/*
 * @file: Linking.js
 * @description:  linking related module
 * @date: 07.Jan.2019
 * @author: Suraj Sanwal
 * */
"use strict";
import { Linking } from "react-native";

export function openLinkingURL(checkone, url) {
  let appendOne;
  if (checkone == "tel") {
    appendOne = "tel:";
  } else if (checkone == "email") {
    appendOne = "mailto:";
  }
  Linking.canOpenURL(appendOne + url)
    .then(supported => {
      if (!supported) {
        // console.log("Cant handle => + ", appendOne + url);
      } else {
        return Linking.openURL(appendOne + url);
      }
    })
    .catch(err => {
      console.log(err); // eslint-disable-line
    });
}
