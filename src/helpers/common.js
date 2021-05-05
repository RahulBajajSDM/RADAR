/* eslint-disable */
"use strict";
//import Toast from "react-native-root-toast";
import { Alert, Platform } from "react-native";
// import moment from "moment";
import Constants from "../constants";

var Common = {
  timeSince: date => {
    if (!date) {
      date = new Date();
    } else {
      date = new Date(date);
      // console.log(
      //   "datdatadtadta",
      //   date,
      //   date.toLocaleString(),
      //   date.toString()
      // );
    }
    // var seconds = (new Date().getTime() - date.getTime()) / 1000
    // var seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    // var seconds = Math.floor(moment.duration(date).asSeconds());
    var seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

    var interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
      return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  },
  Dialog: (msg, buttons) => {
    if (Platform.OS !== "web") {
      Alert.alert(Constants.AppConstants.AppName, msg, buttons, {
        cancelable: true
      });
    }
  },
  dateFilter: (startDate, endDate, collection) => {
    let filteredData = collection.filter(function(obj) {
      let date = new Date(obj.date);
      return date >= startDate && date <= endDate;
    });
    let dates = filteredData.map(a => a.date);
    let price = filteredData.map(a => parseInt(a.price));
    return { dates, price };
  },
  formatedAddress: collection => {
    let street_number = "";
    let sublocality_level_1 = "";
    let sublocality_level_2 = "";
    let sublocality_level_3 = "";
    let city = "";
    let country = "";
    let postal_code = "";
    collection.forEach(address_component => {
      if (address_component.types[0] == "sublocality_level_3") {
        sublocality_level_3 = address_component.long_name;
      }
      if (address_component.types[0] == "sublocality_level_2") {
        sublocality_level_2 = address_component.long_name;
      }
      if (address_component.types[0] == "sublocality_level_1") {
        sublocality_level_1 = address_component.long_name;
      }

      if (address_component.types[0] == "locality") {
        city = address_component.long_name;
      }

      if (address_component.types[0] == "country") {
        country = address_component.long_name;
      }

      if (address_component.types[0] == "postal_code") {
        postal_code = address_component.long_name;
      }

      if (address_component.types[0] == "street_number") {
        street_number = address_component.long_name;
      }
    });
    return {
      street_number,
      sublocality_level_1,
      sublocality_level_2,
      sublocality_level_3,
      city,
      country,
      postal_code
    };
  },
  checkEmptyAddress: val => {
    if (val != "") {
      return val + ",";
    } else {
      return "";
    }
  },
  roundOffValue: num => {
    if (num) {
      return parseFloat(num).toFixed(2);
    } else {
      return 0;
    }
  }
};

module.exports = Common;
