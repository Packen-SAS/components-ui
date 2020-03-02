import React, { useState, useEffect } from "react";
import { View } from "react-native";

import Icon from "react-native-vector-icons/dist/Feather";

import ServiceStatusStyles from "../styles/components/PackenServiceStatus";

const PackenServiceStatusIcon = props => {
  const { activeIcon, stepsLength, activeIndex, selfIndex, isComplete } = props;
  const [state, setState] = useState("default");
  const [isCurrent, setIsCurrent] = useState(false);

  const get_icon = () => {
    let stateIcon = activeIcon;

    if (!isCurrent) {
      stateIcon = "minus-circle";
      if (isComplete) {
        stateIcon = "check-circle";
      }
    }

    return stateIcon;
  }

  const check_if_current = () => {
    if (activeIndex === selfIndex) {
      setState("active");
      return true;
    } else {
      setState("default");
      return false;
    }
  }

  useEffect(() => {
    const newState = check_if_current();
    setIsCurrent(newState);
  }, [activeIndex]);

  return (
    <View style={ServiceStatusStyles.timeline__item}>
      <View style={ServiceStatusStyles.timeline__icon_wrapper}>
        <Icon name={get_icon()} size={ServiceStatusStyles.icon[state].fontSize} color={ServiceStatusStyles.icon[state].color} />
      </View>
      {
        selfIndex !== stepsLength - 1 ? (
          <View style={ServiceStatusStyles.timeline__divider}></View>
        ) : null
      }
    </View>
  );
}

export default PackenServiceStatusIcon;