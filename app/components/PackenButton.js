import React, { useState } from "react";
import { TouchableWithoutFeedback, View } from "react-native"

import PackenText from "./PackenText";
import * as ButtonStyles from "../styles/components/PackenButton";

PackenButton = props => {
  const [styles, setStyles] = useState([ButtonStyles.base]);

  const { type, level, size } = props;

  if (type === "ICON") {
    setStyles([...styles, ButtonStyles.icon]);
  } else {
    setStyles([...styles, ButtonStyles.regular]);
  }

  const execute_callback = () => {
    props.callback();
  }

  const get_label = () => {
    return props.label;
  }

  return (
    <TouchableWithoutFeedback onPress={execute_callback}>
      <View style={styles}>
        <PackenText>{get_label}</PackenText>
      </View>
    </TouchableWithoutFeedback>
  );

}

export default PackenButton;