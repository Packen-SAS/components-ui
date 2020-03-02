import React, { useState, useEffect } from "react";

import { TouchableWithoutFeedback, View } from "react-native";

import RadioStyles from "../styles/components/PackenRadio";
import PackenText from "../components/PackenText";

const PackenRadioControl = props => {
  const { label, checkedIndex, selfIndex, updateCheckedIndex, isDisabled } = props;
  const [state, setState] = useState("default");

  const onPress_handler = () => {
    setState("checked");
    updateCheckedIndex(selfIndex);
  }

  useEffect(() => {
    if (checkedIndex !== selfIndex) {
      setState("default");
    } else {
      setState("checked");
    }
  }, [checkedIndex]);

  useEffect(() => {
    console.log(label, isDisabled);
    if (isDisabled) {
      RadioStyles.control[state] = {
        ...RadioStyles.control[state],
        ...RadioStyles.control.disabled
      }
    }
  }, []);

  return (
    <View pointerEvents={isDisabled ? "none" : "auto"}>
      <TouchableWithoutFeedback onPress={onPress_handler}>
        <View style={RadioStyles.shape.default}>
          <View style={RadioStyles.control[state]}></View>
          {
            label ? <PackenText style={RadioStyles.label.default}>{label}</PackenText> : null
          }
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

export default PackenRadioControl;