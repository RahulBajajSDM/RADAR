import countries from "./countries";
import DeviceInfo from "react-native-device-info";
const deviceCountry = DeviceInfo.getDeviceCountry();
export const getCountry = () => {
  return countries[deviceCountry].name;
};

export const getCallingCode = () => {
  return countries[deviceCountry].callingCode;
};

export const getCountryCode = () => {
  return deviceCountry;
};
