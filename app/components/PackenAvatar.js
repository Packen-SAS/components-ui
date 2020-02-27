import React from "react";

import { ImageBackground } from "react-native";

import * as AvatarStyles from "../styles/components/PackenAvatar";

const PackenAvatar = props => {
  const get_styles = () => {
    return {
      height: AvatarStyles[props.size].size,
      width: AvatarStyles[props.size].size
    };
  }

  const get_src = () => {
    const path = `../../assets/images/${props.src}`;
    return require(path);
  }

  return (
    <ImageBackground source={get_src} style={get_styles}></ImageBackground>
  );
}

export default PackenAvatar;