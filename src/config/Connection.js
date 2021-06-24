/*
 * @file: Connection.js
 * @description: Connection file for the application
 * @date: 13.12.2018
 * @author: Suraj Sanwal
 * */
/* eslint-disable */
"use strict";

// const apiServer = "7hyhccb00d.execute-api.us-east-1.amazonaws.com";
// const apiServer = "mean.stagingsdei.com:6067";
// const apiServer = "mean.stagingsdei.com:6073";
// const apiServer = "www.radarappsdei.org/api"; //working  url
const apiServer = "3f53db24a482.ngrok.io"; //testing url for supportStaff and Vendors
//https://www.radarappsdei.org/api
// const apiServer = "277ad79a96d9.ngrok.io"
//uncomment these four line for use staging
const aarogyaSetuApiServer = "api.aarogyasetu.gov.in";
const aarogyaSetuApiKey = "ko9qomBeGk82USQ62tWBI1090tXpH9V27igqjaK3";
const SDEiApiKey =
  "Basic QXV0aG9yaXphdGlvbjpCYXNpYyBkR0Y0YVRwaGNIQnNhV05oZEdsdmJnPT0=";
const SDEIApiServer = "www.sdeivp.com/apiLoginRadar.php";
//https://www.radarappsdei.org/api
const infermedicaApiUrl = "https://api.infermedica.com/covid19/";

const running_url = apiServer,
  http_url = `https//${running_url}`,
  SOCKET_BASE_URL = `https://${running_url}/`,
  apiBase_url = `https://${running_url}/`,
  aarogyaSetuApiBase_url = `https://${aarogyaSetuApiServer}/`,
  SDEIBaseURL = `https://${SDEIApiServer}`;

export default class Connection {
  static getResturl() {
    return apiBase_url;
  }
  static getCmsUrl() {
    return frontEndUrl;
  }
  static getBaseUrl() {
    return http_url;
  }
  static getSOCKETBaseUrl() {
    return SOCKET_BASE_URL;
  }
  static getAarogyaBaseUrl() {
    return aarogyaSetuApiBase_url;
  }
  static getAarogyaSetuApiKey() {
    return aarogyaSetuApiKey;
  }
  static getSDEIBaseURL() {
    return SDEIBaseURL;
  }
  static getSDEIApiKey() {
    return SDEiApiKey;
  }
  static getSuccessUrl() {
    return `${apiBase_url}success.html`;
  }
  static getErroUrl() {
    return `${apiBase_url}failure.html`;
  }

  static getInfermedicaUrl() {
    return infermedicaApiUrl;
  }
}
