import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";

const MyIcon = props => {
  let { innerref, name, size, color } = props;
  return (
    <Icon
      ref={ref => (innerref ? innerref(ref) : null)}
      name={name}
      size={size}
      color={color}
    />
  );
};

export default MyIcon;
