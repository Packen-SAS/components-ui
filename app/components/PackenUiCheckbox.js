import React, { Component } from "react";
import { View, TouchableWithoutFeedback } from "react-native";

import PackenUiCheckboxControl from "./PackenUiCheckboxControl";

class PackenUiCheckbox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      layout: props.layout,
      items: [...props.items],
      callback: props.callback,
      name: props.name,
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
        this.state.callback(this.state.name, newCheckedItems);
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

  updateState = () => {
    this.setState({
      layout: this.props.layout,
      items: [...this.props.items],
      callback: this.props.callback,
      name: this.props.name
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.updateState();
    }
  }

  render() {
    return (
      <View
        style={this.getStyles().wrapper.layout[this.state.layout]}
        pointerEvents={this.state.layout === "dropdown" ? "none" : "auto"}
      >
        {
          this.state.items.map((item, i) => (
            <View
              key={i}
              pointerEvents={item.isDisabled ? "none" : "auto"}
              style={this.getStyles().content.layout[this.state.layout]}
            >
              <TouchableWithoutFeedback onPress={() => { this.pressHandler(i); }} >
                <View style={{ alignSelf: "flex-start" }}>
                  <PackenUiCheckboxControl
                    label={item.label}
                    layout={this.state.layout}
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