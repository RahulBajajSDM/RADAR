import BackgroundGeolocation from "@mauron85/react-native-background-geolocation";
import { Alert } from "react-native";
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import GeoFencing from "react-native-geo-fencing";

export const configureLocationTracker = (locationsCb) => {
  BackgroundGeolocation.configure({
    desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
    stationaryRadius: 50,
    distanceFilter: 50,
    notificationTitle: "Background tracking",
    notificationText: "enabled",
    // debug: true,
    startOnBoot: false,
    stopOnTerminate: true,
    locationProvider: BackgroundGeolocation.DISTANCE_FILTER_PROVIDER,
    interval: 10000,
    fastestInterval: 5000,
    activitiesInterval: 10000,
    stopOnStillActivity: false,
    url: "http://192.168.81.15:3000/location",
    httpHeaders: {
      "X-FOO": "bar",
    },
    // customize post properties
    postTemplate: {
      lat: "@latitude",
      lon: "@longitude",
      foo: "bar", // you can also add your own properties
    },
  });

  // configureBackgroundLocationTracker();

  BackgroundGeolocation.getCurrentLocation(
    (lastLocation) => {
      console.log("last location getCurrent ", lastLocation);

      let region;
      const latitudeDelta = 0.01;
      const longitudeDelta = 0.01;
      region = Object.assign({}, lastLocation, {
        latitudeDelta,
        longitudeDelta,
      });
      console.log("locationData get Current Location", [lastLocation], region);
      locationsCb([lastLocation]);
      // this.setState({ locations: [lastLocation], region });
    },
    (error) => {
      // locationsCb([{
      //     latitude: 37,
      //     longitude: 72
      // }])
      console.log("error while fetching location", error);
      locationsCb(false);
      setTimeout(() => {
        // configureLocationStateHandler()
        // Alert.alert("Error obtaining current location", JSON.stringify(error));
      }, 100);
    }
  );

  BackgroundGeolocation.on("location", (location) => {
    // handle your locations here
    // to perform long running operation on iOS
    // you need to create background task
    console.log("onLocation", location);
    let region;
    const latitudeDelta = 0.01;
    const longitudeDelta = 0.01;
    region = Object.assign({}, location, {
      latitudeDelta,
      longitudeDelta,
    });
    console.log("locationData on ", [location]);
    locationsCb([location]);
    // this.setState({ locations: [location], region });
    BackgroundGeolocation.startTask((taskKey) => {
      // execute long running task
      // eg. ajax post location
      // IMPORTANT: task has to be ended by endTask
      BackgroundGeolocation.endTask(taskKey);
    });
  });

  BackgroundGeolocation.on("stationary", (stationaryLocation) => {
    // handle stationary locations here
    console.log(stationaryLocation);
    // Actions.sendLocation(stationaryLocation);
  });

  BackgroundGeolocation.on("error", (error) => {
    console.log("[ERROR] BackgroundGeolocation error:", error);
    locationsCb(false);
  });

  BackgroundGeolocation.on("start", () => {
    console.log("[INFO] BackgroundGeolocation service has been started");
  });

  BackgroundGeolocation.on("stop", () => {
    console.log("[INFO] BackgroundGeolocation service has been stopped");
  });

  // BackgroundGeolocation.on("authorization", status => {
  //   console.log("[INFO] BackgroundGeolocation authorization status: " + status);
  //   if (status !== BackgroundGeolocation.AUTHORIZED) {
  //     // we need to set delay or otherwise alert may not be shown
  //     setTimeout(
  //       () =>
  //       // configureLocationStateHandler(),
  //         // Alert.alert(
  //         //   "App requires location tracking permission",
  //         //   "Would you like to open app settings?",
  //         //   [
  //         //     {
  //         //       text: "Yes",
  //         //       onPress: () => BackgroundGeolocation.showAppSettings()
  //         //     },
  //         //     {
  //         //       text: "No",
  //         //       onPress: () => console.log("No Pressed"),
  //         //       style: "cancel"
  //         //     }
  //         //   ]
  //         // ),
  //       1000
  //     );
  //   }
  // });

  BackgroundGeolocation.on("background", () => {
    console.log("[INFO] App is in background");
  });

  BackgroundGeolocation.on("foreground", () => {
    console.log("[INFO] App is in foreground");
  });

  BackgroundGeolocation.on("abort_requested", () => {
    console.log("[INFO] Server responded with 285 Updates Not Required");

    // Here we can decide whether we want stop the updates or not.
    // If you've configured the server to return 285, then it means the server does not require further update.
    // So the normal thing to do here would be to `BackgroundGeolocation.stop()`.
    // But you might be counting on it to receive location updates in the UI, so you could just reconfigure and set `url` to null.
  });

  BackgroundGeolocation.on("http_authorization", () => {
    console.log("[INFO] App needs to authorize the http requests");
  });

  BackgroundGeolocation.checkStatus((status) => {
    console.log(
      "[INFO] BackgroundGeolocation service is running",
      status.isRunning
    );
    console.log(
      "[INFO] BackgroundGeolocation services enabled",
      status.locationServicesEnabled
    );
    console.log(
      "[INFO] BackgroundGeolocation auth status: " + status.authorization
    );

    // you don't need to check status before start (this is just the example)
    if (!status.isRunning) {
      BackgroundGeolocation.start(); //triggers start on start event
    }
  });

  // you can also just start without checking for status
  // BackgroundGeolocation.start();
};

export const removeLocationTracker = (_) => {
  // unregister all event listeners
  BackgroundGeolocation.removeAllListeners();
};

export function getDistanceFromLatLonInKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}
function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

export const configureLocationStateHandler = () => {
  return new Promise((resolve, reject) => {
    LocationServicesDialogBox.checkLocationServicesIsEnabled({
      message:
        "<h2>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS for location<br/><br/>",
      ok: "YES",
      cancel: "NO",
      enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => GPS OR NETWORK PROVIDER
      showDialog: true, // false => Opens the Location access page directly
      openLocationServices: true, // false => Directly catch method is called if location services are turned off
      preventOutSideTouch: true, //true => To prevent the location services popup from closing when it is clicked outside
      preventBackClick: true, //true => To prevent the location services popup from closing when it is clicked back button
      providerListener: true, // true ==> Trigger "locationProviderStatusChange" listener when the location state changes
    })
      .then((success) => {
        // success => {alreadyEnabled: true, enabled: true, status: "enabled"}
        console.log("success response10", success);
        resolve(success);
      })
      .catch((error) => {
        reject(error);
        console.log("error from loc", error.message);
      });
  });
};

export const configureBackgroundLocationTracker = async () => {
  BackgroundGeolocation.configure({
    desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
    stationaryRadius: 50,
    distanceFilter: 50,
    notificationTitle: "Background tracking",
    notificationText: "enabled",
    debug: true,
    startOnBoot: false,
    stopOnTerminate: true,
    locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
    interval: 10000,
    fastestInterval: 5000,
    activitiesInterval: 10000,
    stopOnStillActivity: false,
    // url: 'http://192.168.81.15:3000/location',
    httpHeaders: {
      "X-FOO": "bar",
    },
    // customize post properties
    postTemplate: {
      lat: "@latitude",
      lon: "@longitude",
      foo: "bar", // you can also add your own properties
    },
  });
};

export const removeLocationStateListener = () => {
  LocationServicesDialogBox.stopListener();
};

export const calculateUserinPolygon = (polygon_arr, current_location) => {
  console.log(polygon_arr);
  console.log(current_location);

  return new Promise((resolve, reject) => {
    GeoFencing.containsLocation(current_location, polygon_arr)
      .then(() => {
        console.log("point is within polygon");
        resolve(true);
      })
      .catch(() => {
        console.log("point is NOT within polygon");
        resolve(false);
      });
  });
};
