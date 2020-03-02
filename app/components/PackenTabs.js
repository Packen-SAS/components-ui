import React, { useState } from "react";

import { View } from "react-native";

import TabsStyles from "../styles/components/PackenTabs";
import PackenTabItem from "./PackenTabItem";

const PackenTabs = props => {
  const { items, activeIndex } = props;
  const [activeTabIndex, setActiveTabIndex] = useState(activeIndex);

  update_active_index = newActiveIndex => {
    setActiveTabIndex(newActiveIndex);
  }

  return (
    <View style={TabsStyles.container}>
      {
        items.map((item, i) => (
          <PackenTabItem
            key={`${item.label}-${i}`}
            activeTabIndex={activeTabIndex}
            selfIndex={i}
            label={item.label}
            updateActiveTabIndex={update_active_index}
            callback={item.callback}/>
        ))
      }
    </View>
  );
}

export default PackenTabs;