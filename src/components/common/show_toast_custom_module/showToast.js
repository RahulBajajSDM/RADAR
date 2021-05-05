import Toast, { positions } from "./Toast";
import constants from "../../../constants";
export const ShowToast = props => {
  let {
    message = "",
    imageSrc = null,
    duration = 2000,
    position = positions.TOP,
    background = constants.Colors.messageBg,
    shadow = true
  } = props;
  Toast.show(message, imageSrc, {
    duration: duration ? duration : 3000,
    position,
    shadow,
    animation: true,
    hideOnPress: true,
    delay: duration,
    backgroundColor: background,
    containerStyle: {
      borderRadius: 30,
      alignItems: "center",
      justifyContent: "center"
    }
  });
};
