import { Platform } from "react-native";
import RNFetchBlob from "rn-fetch-blob";
import PermissionApi from "./Permissions";

export const downloadPermissions = (url, cb) => {
  if (Platform.OS == "android") {
    PermissionApi.requestStoragePermission().then(() => {
      downloadImage(url, cb);
    });
  } else {
    downloadImage(url, cb);
  }
};

export const downloadImage = (url, cb) => {
  var ext = extention(url);
  ext = "." + ext[0];
  const { config } = RNFetchBlob;
  // if (Platform.OS == "ios") {
  //   PictureDir = fs.dirs.DocumentDir;
  // } else {
  //   PictureDir = fs.dirs.PictureDir;
  // }
  let options = {
    fileCache: true,
    // path: PictureDir + datePath + "/botImage" + ext,
    appendExt: ext
    // addAndroidDownloads: {
    //     useDownloadManager: true,
    //     notification: true,
    //     path: PictureDir + "/botImage" + ext,
    //     description: 'Image'
    // }
  };
  config(options)
    .fetch("GET", url)
    .then(async res => {
      // console.log("resssssssssss", res);
      if (cb) {
        cb(res);
      }
    });
};

export const extention = filename => {
  return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
};
