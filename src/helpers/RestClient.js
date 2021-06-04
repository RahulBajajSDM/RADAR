/*
 * @file: RestClient.js
 * @description: Rest Client
 * @date: 14.12.2017
 * @author: Suraj Sanwal
 * */
/* eslint-disable */

"use strict";

import Connection from "../config/Connection";
import NetInfo from "@react-native-community/netinfo";
import Constants from "../constants";
import { goToAuth } from "../config/navigation";
import { logOut } from "../actions/auth/loginActions";
import axios from "axios";
class RestClient {
  static getURLString = (url, queryParam = {}) => {
    return (
      url +
      (this.objToQueryString(queryParam) !== ""
        ? "?" + this.objToQueryString(queryParam)
        : "")
    );
  };

  static objToQueryString = (obj) => {
    const keyValuePairs = [];
    for (let i = 0; i < Object.keys(obj).length; i += 1) {
      keyValuePairs.push(
        `${encodeURIComponent(Object.keys(obj)[i])}=${encodeURIComponent(
          Object.values(obj)[i]
        )}`
      );
    }
    return keyValuePairs.join("&");
  };

  static isConnected() {
    let context = this;
    return new Promise(function(fulfill, reject) {
      // if (Platform.OS === "android") {
      //   fulfill(true);
      // }
      NetInfo.fetch().then((state) => {
        if (state.isConnected) {
          fulfill(state.isConnected);
        } else {
          reject(state.isConnected);
        }
      });
    });
  }
  static restCall(url, params, token = null, type = "POST") {
    let context = this;
    console.log(type, " call", url, params, token);
    return new Promise(function(fulfill, reject) {
      context
        .isConnected()
        .then(() => {
          fetch(url, {
            method: type,
            timeout: 1000 * 1 * 60,
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              // "Cache-Control": "no-cache",
              Authorization: "Bearer " + token,
            },
            body: JSON.stringify(params),
          })
            .then((response) => {
              console.log("responseresponse", response);
              if (response.status === 401) {
                logOut();
                fulfill({ message: "Session Expired.", status: 401 });
                return;
              } else {
                return response.text();
              }
            })
            .then((responseText) => {
              console.log("POST responseText*****", responseText);
              if (responseText) {
                fulfill(JSON.parse(responseText));
              } else {
                fulfill(null);
              }
            })
            .catch((error) => {
              fulfill({
                message: Constants.AppConstants.Error.internetConnectivity,
              });
              console.warn("eroro", error);
            });
        })
        .catch((error) => {
          console.log("eroro ********* ", error);
          fulfill({
            message: "Please check your internet connectivity.",
          });
        });
    });
  }

  static restAarogyaSetuCall(url, params, token = null, type = "POST") {
    let context = this;
    console.log(type, " call", url, params, token);
    return new Promise(function(fulfill, reject) {
      context
        .isConnected()
        .then(() => {
          fetch(url, {
            method: type,
            timeout: 1000 * 1 * 60,
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              // "Cache-Control": "no-cache",
              Authorization: token,
              "x-api-key": Connection.getAarogyaSetuApiKey(),
            },
            body: JSON.stringify(params),
          })
            .then((response) => {
              // console.log("responseresponse", response);
              // if (response.status === 401) {
              //   // reject("Session Expired.");
              //   return "Session Expired.";
              // } else {
              return response.text();
              // }
            })
            .then((responseText) => {
              console.log("POST responseText*****", responseText);
              if (responseText) {
                fulfill(JSON.parse(responseText));
              } else {
                fulfill(null);
              }
            })
            .catch((error) => {
              fulfill({
                message: Constants.AppConstants.Error.internetConnectivity,
              });
              console.warn("eroro", error);
            });
        })
        .catch((error) => {
          console.log("eroro ********* ", error);
          fulfill({
            message: "Please check your internet connectivity.",
          });
        });
    });
  }

  static restInfermedicaCall(url, type, params, headers) {
    let context = this;

    console.log(url, "\n", type, "\n", params, "\n", headers);
    return new Promise(function(fulfill, reject) {
      context
        .isConnected()
        .then(() => {
          fetch(url, {
            method: type,
            timeout: 1000 * 1 * 60,
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              // "Cache-Control": "no-cache",
              ...headers,
            },
            body: JSON.stringify(params),
          })
            .then((response) => {
              return response.text();
            })
            .then((responseText) => {
              console.log("Infermedica url ", url);
              console.log("response -------", responseText);
              if (responseText) {
                fulfill(JSON.parse(responseText));
              } else {
                fulfill(null);
              }
            })
            .catch((error) => {
              reject({
                message: Constants.AppConstants.Error.serverError,
              });
            });
        })
        .catch((error) => {
          reject({
            message: Constants.AppConstants.Error.internetConnectivity,
          });
        });
    });
  }
  static getCalll(url, token = null) {
    let context = this;
    const options = {
      headers: { Authorization: token, authorization: token },
    };
    return new Promise(function(fullfill, reject) {
      axios
        .get(url, options)
        .then(function(response) {
          console.log("Resp12", response);
          fullfill(response.data);
        })
        .catch(function(error) {
          // reject(error);
          reject("Netowrk Error. Try again after sometime.");
          console.log(error, "errror");
        });
    });
  }

  static getCall(url, token = null) {
    let context = this;
    console.log("get call", url, token);
    return new Promise(function(fulfill, reject) {
      context
        .isConnected()
        .then(() => {
          fetch(url, {
            method: "GET",
            mode: "cors",
            credentials: "include",
            timeout: 1000 * 1 * 60,
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: token,
            },
          })
            .then((response) => {
              if (response._bodyInit == "") {
                return response._bodyInit;
              }
              return response.text();
            })
            .then((responseText) => {
              console.log("responseTextresponseText", responseText);
              // fulfill(responseText);
              if (responseText) {
                fulfill(JSON.parse(responseText));
              } else {
                fulfill(responseText);
              }
            })
            .catch((error) => {
              fulfill({
                message: Constants.AppConstants.Error.internetConnectivity,
              });
              console.warn("eroro", error);
            });
        })
        .catch((error) => {
          console.log("eroro ********* ", error);
          fulfill({
            message: "Please check your internet connectivity.",
          });
        });
    });
  }
  static delCall(url, body, token = null) {
    let context = this;
    console.log("delete call", url, token);
    return new Promise(function(fulfill, reject) {
      context
        .isConnected()
        .then(() => {
          fetch(url, {
            method: "Delete",
            timeout: 1000 * 1 * 60,
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              // "Cache-Control": "no-cache",
              Authorization: "Bearer " + token,
            },
            body,
          })
            .then((response) => {
              return response.text();
            })
            .then((responseText) => {
              console.log("Del responseText*****", responseText);
              fulfill(JSON.parse(responseText));
            })
            .catch((error) => {
              fulfill({
                message: Constants.AppConstants.Error.internetConnectivity,
              });
              console.warn("eroro", error);
            });
        })
        .catch((error) => {
          console.log("eroro ********* ", error);
          fulfill({
            message: "Please check your internet connectivity.",
          });
        });
    });
  }
  static post(url, params, deviceToken = null, deviceType = null) {
    let context = this;
    console.log("login details->", url, params, deviceToken, deviceType);
    return new Promise(function(fulfill, reject) {
      context
        .isConnected()
        .then(() => {
          console.log("url=> ", url, " requestObject=> ", params);
          fetch(url, {
            method: "POST",
            timeout: 1000 * 1 * 60,
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              // "Cache-Control": "no-cache",
              "device-token": deviceToken,
              "device-type": deviceType,
            },
            body: JSON.stringify(params),
          })
            .then((response) => {
              return response.text();
            })
            .then((responseText) => {
              console.log("POST responseText*****", responseText);
              fulfill(JSON.parse(responseText));
            })
            .catch((error) => {
              //   debugger;
              fulfill({
                message: Constants.AppConstants.Error.internetConnectivity,
              });
              console.warn("eroro", error);
            });
        })
        .catch((error) => {
          console.log("eroro ********* ", error);
          fulfill({
            message: "Please check your internet connectivity.",
          });
        });
    });
  }
}

export default RestClient;
