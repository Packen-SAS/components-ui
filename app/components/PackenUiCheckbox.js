import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, TouchableWithoutFeedback } from "react-native";

import PackenUiCheckboxControl from "./PackenUiCheckboxControl";

class PackenUiCheckbox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.setPropsToState(),
      checkedItems: [],
      selectedIndex: null
    };
  }

  componentDidMount() {
    if (typeof this.props.instance === "function") {
      this.props.instance(this);
    }
  }

  setPropsToState = () => {
    return {
      layout: this.props.layout ? this.props.layout : "column",
      items: this.props.items ? [...this.props.items] : [],
      callback: this.props.callback ? this.props.callback : false,
      name: this.props.name ? this.props.name : ""
    };
  }

  pressHandler = selectedIndex => {
    this.setState({
      selectedIndex: selectedIndex
    }, this.updateCheckedItems);
  }

  filterUpdatedItems = item => item.isChecked;

  mapNewCheckedItems = item => item.value;

  updateCheckedItems = () => {
    if (this.state.selectedIndex !== null) {
      const updatedItems = [...this.state.items];
      updatedItems[this.state.selectedIndex].isChecked = !updatedItems[this.state.selectedIndex].isChecked;
      let newCheckedItems = updatedItems.filter(this.filterUpdatedItems);
      newCheckedItems = newCheckedItems.map(this.mapNewCheckedItems);

      this.setState({
        checkedItems: newCheckedItems
      }, () => {
        if (this.state.callback) {
          this.state.callback(this.state.name, newCheckedItems);
        } else {
          return false;
        }
      });
    } else {
      return false;
    }
  }

  mapUpdatedCheckedItems = item => ({ label: item, isChecked: newState, isDisabled: false });

  findMatchedItemToCheck = (item, valueToSearch) => item.label === valueToSearch;

  setCheckedState = (valueToSearch, newState, finalSelectionArray) => {
    let updatedCheckedItems = [...finalSelectionArray];
    updatedCheckedItems = updatedCheckedItems.map(this.mapUpdatedCheckedItems);

    const foundItem = updatedCheckedItems.find(item => this.findMatchedItemToCheck(item, valueToSearch));
    if (foundItem) {
      foundItem.isChecked = newState;
      this.setState({
        checkedItems: updatedCheckedItems
      });
    } else {
      return false;
    }
  }

  mapRenderedControls = (item, i) => (
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
  )

  updateState = () => {
    this.setState({ ...this.setPropsToState() });
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
          this.state.items.map(this.mapRenderedControls)
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

PackenUiCheckbox.propTypes = {
  layout: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  callback: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
};

export default PackenUiCheckbox;