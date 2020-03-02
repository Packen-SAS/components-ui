import React, { useState, useEffect } from "react";

import { TouchableWithoutFeedback, View } from "react-native";

import RadioStyles from "../styles/components/PackenRadio";
import PackenText from "../components/PackenText";

const PackenRadioControl = props => {
  const { label, checkedIndex, selfIndex, updateCheckedIndex, isDisabled } = props;
  const initialState = isDisabled ? "default_disabled" : "default";
  const [state, setState] = useState(initialState);

  const onPress_handler = () => {
    setState("checked");
    updateCheckedIndex(selfIndex);
  }

  const check_if_disabled = () => {
    if (isDisabled) {
      if (checkedIndex !== selfIndex) {
        setState("default_disabled");
      } else {
        setState("checked_disabled");
      }
    }
  }

  useEffect(() => {
    if (checkedIndex !== selfIndex) {
      setState("default");
    } else {
      setState("checked");
    }
    check_if_disabled();
  }, [checkedIndex]);

  useEffect(() => {
    check_if_disabled();
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