import React, { useState, useEffect } from "react";

import { View, TouchableWithoutFeedback } from "react-native";

import TabsStyles from "../styles/components/PackenTabs";
import PackenText from "./PackenText";

const PackenTabItem = props => {
  const { label, callback, activeTabIndex, selfIndex, updateActiveTabIndex } = props;

  const get_item_styles = () => {
    const styles = {
      shape: {
        ...TabsStyles.item.base.shape,
        ...TabsStyles.item.default.shape
      },
      label: {
        ...TabsStyles.item.base.label,
        ...TabsStyles.item.default.label
      },
      icon: {
        ...TabsStyles.item.base.icon,
        ...TabsStyles.item.default.icon
      }
    };

    return styles;
  }

  const [itemStyles, setItemStyles] = useState(get_item_styles());

  const set_active_tab = () => {
    set_active_styles();
    updateActiveTabIndex(selfIndex);
    callback();
  }

  const set_active_styles = () => {
    let activeStyles = { ...itemStyles }
    activeStyles.shape = {
      ...activeStyles.shape,
      ...TabsStyles.item.active.shape
    };
    activeStyles.label = {
      ...activeStyles.label,
      ...TabsStyles.item.active.label
    };
    activeStyles.icon = {
      ...activeStyles.icon,
      ...TabsStyles.item.active.icon
    };
    setItemStyles(activeStyles);
  }

  const check_if_active = () => {
    if (activeTabIndex === selfIndex) {
      set_active_styles();
    } else {
      setItemStyles(get_item_styles());
    }
  }

  useEffect(() => {
    check_if_active();
  }, [activeTabIndex]);

  const pressIn_handler = () => {
    let newStyles = { ...itemStyles };

    newStyles.shape = {
      ...newStyles.shape,
      ...TabsStyles.item.focus.shape
    };
    newStyles.label = {
      ...newStyles.label,
      ...TabsStyles.item.focus.label
    };
    newStyles.icon = {
      ...newStyles.icon,
      ...TabsStyles.item.focus.icon
    };

    setItemStyles(newStyles);
  }

  const pressOut_handler = () => {
    setItemStyles(get_item_styles());
  }

  return (
    <TouchableWithoutFeedback onPress={() => { set_active_tab(); }} onPressIn={pressIn_handler} onPressOut={pressOut_handler}>
      <View style={itemStyles.shape}>
        <View style={{ marginRight: 10 }}><PackenText style={itemStyles.icon}>»</PackenText></View>
        <PackenText style={itemStyles.label}>{label}</PackenText>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default PackenTabItem;