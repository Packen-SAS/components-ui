import React, { Component } from "react";
import { View, TouchableWithoutFeedback } from "react-native";

import CheckboxStyles from "../styles/components/PackenCheckbox";

import PackenCheckboxControl from "./PackenCheckboxControl";

class PackenCheckbox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [...props.items],
      checkedItems: [],
      selectedIndex: null
    };
  }

  pressHandler = selectedIndex => {
    this.setState({
      selectedIndex: selectedIndex
    }, this.updateCheckedItems);
  }

  updateCheckedItems = () => {
    if (this.state.selectedIndex !== null) {
      const updatedItems = [...this.state.items];
      updatedItems[this.state.selectedIndex].isChecked = !updatedItems[this.state.selectedIndex].isChecked;
      newCheckedItems = updatedItems.filter(item => item.isChecked);
      newCheckedItems = newCheckedItems.map(item => item.label);

      this.setState({
        checkedItems: newCheckedItems
      }, this.props.callback);
    }
  }

  setCheckedState = (valueToSearch, newState, finalSelectionArray) => {
    /* console.log("-----------------");
    console.log(valueToSearch, newState, finalSelectionArray);
    console.log("-----------------"); */

    let updatedCheckedItems = [...finalSelectionArray];
    updatedCheckedItems = updatedCheckedItems.map(item => ({ label: item, isChecked: newState, isDisabled: false }))
    /* let foundItem;

    updatedCheckedItems.forEach(item => {
      if (item.label === valueToSearch) {
        foundItem = item;
      }
    });

    console.log(founditem); */

    const foundItem = updatedCheckedItems.find(item => item.label === valueToSearch);
    if (foundItem) {
      foundItem.isChecked = newState;
      this.setState({
        checkedItems: updatedCheckedItems
      });
    }
  }

  render() {
    return (
      <View
        style={CheckboxStyles.wrapper.layout[this.props.layout]}
        pointerEvents={this.props.layout === "dropdown" ? "none" : "auto"}
      >
        {
          this.state.items.map((item, i) => (
            <View
              key={i}
              pointerEvents={item.isDisabled ? "none" : "auto"}
              style={CheckboxStyles.content.layout[this.props.layout]}
            >
              <TouchableWithoutFeedback onPress={() => { this.pressHandler(i); }} >
                <View style={{ alignSelf: "flex-start" }}>
                  <PackenCheckboxControl
                    label={item.label}
                    layout={this.props.layout}
                    isChecked={item.isChecked}
                    isDisabled={item.isDisabled}
                    checkedItems={this.state.checkedItems}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
          ))
        }
      </View>
    );
  }
}

export default PackenCheckbox;