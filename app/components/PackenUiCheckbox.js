import React, { Component } from "react";
import { View, TouchableWithoutFeedback } from "react-native";

import Colors from "../styles/abstracts/colors";
import Typography from "../styles/abstracts/typography";

import PackenUiCheckboxControl from "./PackenUiCheckboxControl";

class PackenUiCheckbox extends Component {
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
      newCheckedItems = newCheckedItems.map(item => item.value);

      this.setState({
        checkedItems: newCheckedItems
      }, () => {
        this.props.callback(this.props.name, newCheckedItems);
      });
    } else {
      return false;
    }
  }

  setCheckedState = (valueToSearch, newState, finalSelectionArray) => {
    let updatedCheckedItems = [...finalSelectionArray];
    updatedCheckedItems = updatedCheckedItems.map(item => ({ label: item, isChecked: newState, isDisabled: false }))

    const foundItem = updatedCheckedItems.find(item => item.label === valueToSearch);
    if (foundItem) {
      foundItem.isChecked = newState;
      this.setState({
        checkedItems: updatedCheckedItems
      });
    } else {
      return false;
    }
  }

  render() {
    return (
      <View
        style={this.getStyles().wrapper.layout[this.props.layout]}
        pointerEvents={this.props.layout === "dropdown" ? "none" : "auto"}
      >
        {
          this.state.items.map((item, i) => (
            <View
              key={i}
              pointerEvents={item.isDisabled ? "none" : "auto"}
              style={this.getStyles().content.layout[this.props.layout]}
            >
              <TouchableWithoutFeedback onPress={() => { this.pressHandler(i); }} >
                <View style={{ alignSelf: "flex-start" }}>
                  <PackenUiCheckboxControl
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

  getStyles = () => {
    return {
      wrapper: {
        layout: {
          column: {
            flexDirection: "column"
          },
          row: {
            flexWrap: "wrap",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start"
          },
          dropdown: {
            flexDirection: "column"
          }
        }
      },
      content: {
        layout: {
          column: {
            marginBottom: 10
          },
          row: {
            marginRight: 15,
            marginBottom: 10
          },
          dropdown: {
            marginRight: 0,
            marginBottom: 0
          }
        }
      }
    };
  }
}

export default PackenUiCheckbox;