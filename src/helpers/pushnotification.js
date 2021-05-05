/*
 * @file: PushNotification.js
 * @description: Contains all function related push notification.
 * @date: 9.Oct.2018
 * @author:Parshant Nagpal
 * */
/* eslint-disable */
import { Platform } from "react-native";
// import firebase from "react-native-firebase";
import firebase from "@react-native-firebase/app";
import messaging from "@react-native-firebase/messaging";
import * as types from "../actionTypes";

// eslint-disable-next-line no-console
// import type { Notification, NotificationOpen } from "react-native-firebase";
// import { setFcmDeviceToken } from "../actions/user";
/*
Get the Fcm token of the device
*/
// const getToken = async store => {
//   const fcmToken = await firebase.messaging().getToken();
//   if (fcmToken) {
//     console.log("fcmToken", fcmToken);
//     store.dispatch(setFcmDeviceToken(fcmToken));
//   } else {
//     // user doesn't have a device token yet
//   }
// };

// /*
// All Listeners related to Firebase
// */
// export const listeners = () => {
//   this.notificationDisplayedListener = firebase
//     .notifications()
//     .onNotificationDisplayed(notification => {
//       console.log("onNotificationDisplayed", notification);
//     });
//   this.notificationListener = firebase
//     .notifications()
//     .onNotification(notification => {
//       // When app is in forground  and push come immedialtely show (Without Touch)
//       console.log("onNotification", notification);
//     });
//   this.notificationOpenedListener = firebase
//     .notifications()
//     .onNotificationOpened((notificationOpen: NotificationOpen) => {
//       //when app is in background (not killed ) tapping on the push notification call that
//       console.log("notificationOpen", notificationOpen);
//     });
// };
// /*
// when app is killed or not in memory push noptification come then cick on the push notification will call that function
// */
// const getInitialNotification = async () => {
//   const notificationOpen: NotificationOpen = await firebase
//     .notifications()
//     .getInitialNotification();
//   if (notificationOpen) {
//     //When the app is killed and tapping on the push will call this function
//     console.log("getInitialNotification", notificationOpen);
//   }
// };
// /**
//  * Checking the app has permission for using firebase in ios
//  */
// const checkPermission = async store => {
//   const enabled = await firebase.messaging().hasPermission();
//   if (enabled) {
//     trigerAllEvents(store);
//   } else {
//     requestpermission(store);
//   }
// };
// /**
//  * Requesting the app permission for firebase in ios
//  */
// const requestpermission = async store => {
//   try {
//     const enabled = await firebase.messaging().requestPermission();
//     if (enabled) {
//       trigerAllEvents();
//     } else {
//       requestpermission();
//     }
//   } catch (error) {
//     // User has rejected permissions
//   }
// };

// const trigerAllEvents = store => {
//   getToken(store);
//   getInitialNotification();
//   listeners();
// };
// /*
// Remove All Listeners
// */
// export const removeListeners = () => {
//   this.notificationDisplayedListener();
//   this.notificationListener();
//   this.notificationOpenedListener();
// };
// /**
//  It loads the fcm
//  */
// export const pushNotifificationInit = async store => {
//   if (Platform.OS === "ios") {
//     checkPermission(store);
//   } else {
//     trigerAllEvents(store);
//   }
// };

export const pushNotifificationInit = async store => {
  messaging()
    .getToken()
    .then(token => {
      console.log("firebase_token", token);
      store.dispatch({
        type: types.SET_FCM_DEVICE_TOKEN,
        payload: token
      });
      requestUserPermission();
      registerListeners(store);
    });
};

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log("Authorization status:", authStatus);
  }
}

async function registerListeners(store) {
  messaging().onMessage(async remoteMessage => {
    console.log("MESSAGING :::::::::::", remoteMessage);
  });
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      "Notification caused app to open from background state:",
      remoteMessage.notification
    );
    // navigation.navigate(remoteMessage.data.type);
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          "Notification caused app to open from quit state:",
          remoteMessage.notification
        );
        // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
      }
      // setLoading(false);
    });
}

class FCMService {
  register = (onRegister, onNotification, onOpenNotification) => {
    this.checkPermission(onRegister);
    this.createNotificationListeners(
      onRegister,
      onNotification,
      onOpenNotification
    );
  };

  registerAppWithFCM = async () => {
    if (Platform.OS === "ios") {
      await messaging().registerDeviceForRemoteMessages();
      await messaging().setAutoInitEnabled(true);
    }
  };

  checkPermission = onRegister => {
    messaging()
      .hasPermission()
      .then(enabled => {
        if (enabled) {
          // User has permissions
          this.getToken(onRegister);
        } else {
          // User doesn't have permission
          this.requestPermission(onRegister);
        }
      })
      .catch(error => {
        console.log("[FCMService] Permission rejected ", error);
      });
  };

  getToken = onRegister => {
    messaging()
      .getToken()
      .then(fcmToken => {
        if (fcmToken) {
          onRegister(fcmToken);
        } else {
          console.log("[FCMService] User does not have a device token");
        }
      })
      .catch(error => {
        console.log("[FCMService] getToken rejected ", error);
      });
  };

  requestPermission = onRegister => {
    messaging()
      .requestPermission()
      .then(() => {
        this.getToken(onRegister);
      })
      .catch(error => {
        console.log("[FCMService] Request Permission rejected ", error);
      });
  };

  deleteToken = () => {
    console.log("[FCMService] deleteToken ");
    messaging()
      .deleteToken()
      .catch(error => {
        console.log("[FCMService] Delete token error ", error);
      });
  };

  createNotificationListeners = (
    onRegister,
    onNotification,
    onOpenNotification
  ) => {
    // When the application is running, but in the background
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        "[FCMService] onNotificationOpenedApp Notification caused app to open from background state:",
        remoteMessage
      );
      if (remoteMessage) {
        const notification = remoteMessage.notification;
        onOpenNotification(remoteMessage, 1);
        // this.removeDeliveredNotification(notification.notificationId)
      }
    });

    // When the application is opened from a quit state.
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        console.log(
          "[FCMService] getInitialNotification Notification caused app to open from quit state:",
          remoteMessage
        );

        if (remoteMessage) {
          const notification = remoteMessage.notification;
          onOpenNotification(notification, 2);
          //  this.removeDeliveredNotification(notification.notificationId)
        }
      });

    // Foreground state messages
    this.messageListener = messaging().onMessage(async remoteMessage => {
      console.log("[FCMService] A new FCM message arrived!", remoteMessage);
      if (remoteMessage) {
        let notification = null;
        if (Platform.OS === "ios") {
          // notification = remoteMessage.data.notification
          notification = remoteMessage;
        } else {
          notification = remoteMessage;
        }
        onNotification(notification);
      }
    });

    // Triggered when have new token
    messaging().onTokenRefresh(fcmToken => {
      console.log("[FCMService] New token refresh: ", fcmToken);
      onRegister(fcmToken);
    });
  };

  unRegister = () => {
    this.messageListener();
  };
}
export const fcmService = new FCMService();
