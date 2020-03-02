import React, { useState, useEffect } from "react";

import { View } from "react-native";

import RadioStyles from "../styles/components/PackenRadio";
import PackenRadioControl from "./PackenRadioControl";

const PackenRadio = props => {
  const { layout, items, initialIndex } = props;
  const [checkedIndex, setCheckedIndex] = useState(initialIndex || null);
  const [currentSelection, setCurrentSelection] = useState("");

  const update_checked_index = newCheckedIndex => {
    setCheckedIndex(newCheckedIndex);
  }

  const find_current_selection = () => {
    return items[checkedIndex];
  }

  const update_current_selection = newSelection => {
    setCurrentSelection(newSelection);
  }

  useEffect(() => {
    update_current_selection(find_current_selection());
  }, [checkedIndex]);

  useEffect(() => {
    /* Use the new, updated selection here */
    /* console.log(currentSelection); */
  }, [currentSelection]);

  return (
    <View style={RadioStyles.container[layout]}>
      {
        items.map((item, i) => (
          <View key={i} style={RadioStyles.item[layout]}>
            <PackenRadioControl
              checkedIndex={checkedIndex}
              selfIndex={i}
              label={item.label}
              isDisabled={item.isDisabled}
              updateCheckedIndex={update_checked_index}/>
          </View>
        ))
      }
    </View>
  );
}

export default PackenRadio;