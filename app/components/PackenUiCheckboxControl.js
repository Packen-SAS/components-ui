import React, { Component } from "react";
import { View } from "react-native";

import Icon from "react-native-vector-icons/dist/Feather";

import CheckboxStyles from "../styles/components/PackenUiCheckbox";

import PackenUiText from "./PackenUiText";

class PackenUiCheckboxControl extends Component {
  constructor(props) {
    super(props);

    this.state = {
      label: props.label,
      isChecked: props.isChecked,
      isDisabled: props.isDisabled,
      styles: {
        disabled: {}
      }
    }
  }

  componentDidMount = () => {
    this.setDisabledStyles();
  }

  setActiveStyles = () => {
    if (this.props.layout === "dropdown") {
      const newCheckedItems = [...this.props.checkedItems];
      const foundItem = newCheckedItems.find(item => item.label === this.state.label);
      this.setState({
        isChecked: foundItem.isChecked
      });
      return foundItem.isChecked;
    } else {
      if (this.props.checkedItems.includes(this.state.label)) {
        this.setState({
          isChecked: true
        });
        return true;
      } else {
        this.setState({
          isChecked: false
        });
        return false;
      }
    }
  }

  setDisabledStyles = () => {
    let disabledStyles = {};

    if (this.state.isDisabled) {
      const correctStyles = CheckboxStyles.iconBox.state.disabled[this.state.isChecked ? "active" : "inactive"];
      this.setState({
        styles: {
          ...this.state.styles,
          disabled: { ...correctStyles }
        }
      });
      disabledStyles = correctStyles
    }

    return disabledStyles;
  }

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (prevProps.checkedItems !== this.props.checkedItems) {
      this.setActiveStyles();
    }
    if (prevProps.isDisabled !== this.props.isDisabled) {
      this.setDisabledStyles();
    }
  }

  render() {
    return (
      <View style={CheckboxStyles.inner.base}>
        <View
          style={{
            ...CheckboxStyles.iconBox.base,
            ...CheckboxStyles.iconBox.state[this.state.isChecked ? "active" : "inactive"],
            ...this.state.styles.disabled
          }}
        >
          {
            this.state.isChecked ? (
              <Icon
                name="check"
                size={CheckboxStyles.icon.base.size}
                color={CheckboxStyles.icon.base.color}
              />
            ) : null
          }
        </View>
        <PackenUiText
          style={{
            ...CheckboxStyles.label.base,
            ...CheckboxStyles.label.state[this.props.isDisabled ? "disabled" : "default"]
          }}
        >{this.state.label}</PackenUiText>
      </View>
    );
  }
}

export default PackenUiCheckboxControl;