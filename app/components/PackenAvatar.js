import React from "react";

import { View, Image } from "react-native";

import * as AvatarStyles from "../styles/components/PackenAvatar";

const PackenAvatar = props => {
  const { size, src } = props;

  return (
    <View style={AvatarStyles.container[size]}>
      <Image source={src} style={{
        height: "100%",
        width: "100%",
        borderRadius: AvatarStyles.container[size].borderRadius
      }}/>
    </View>
  );
}

export default PackenAvatar;