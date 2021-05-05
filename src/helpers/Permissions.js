/* eslint-disable */

import { PermissionsAndroid } from "react-native";

class PermissionApi {
  static requestStoragePermission = () => {
    return new Promise(async (resolve, reject) => {
      const checkPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );

      if (checkPermission === true) {
        resolve(true);
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: "Location Enable Permission",
              message: "Please give permission to location sevices"
            }
          );

          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            resolve(true);
          } else {
            // console.log("Location permission denied")
            alert("Location permission denied");
          }
        } catch (err) {
          reject(err);
        }
      }
    });
  };
}

export default PermissionApi;
