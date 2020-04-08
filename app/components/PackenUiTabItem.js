import React, { Component } from "react";

import { View, TouchableWithoutFeedback } from "react-native";

import Icon from "react-native-vector-icons/dist/Feather";

import TabsStyles from "../styles/components/PackenUiTabs";
import PackenUiText from "./PackenUiText";

class PackenUiTabItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemStyles: this.getItemStyles()
    }
  }

  componentDidMount() {
    this.checkIfActive();
  }

  getItemStyles = () => {
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

  setActiveTab = () => {
    this.setActiveStyles();
    this.props.updateActiveTabIndex(this.props.selfIndex);
    this.props.callback();
  }

  setActiveStyles = () => {
    let activeStyles = { ...this.state.itemStyles };
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

    this.setState({
      itemStyles: activeStyles
    });

    return activeStyles;
  }

  checkIfActive = () => {
    if (this.props.activeTabIndex === this.props.selfIndex) {
      this.setActiveStyles();
    } else {
      this.setState({
        itemStyles: this.getItemStyles()
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.activeTabIndex !== this.props.activeTabIndex) {
      this.checkIfActive();
    }
  }

  pressInHandler = () => {
    let newStyles = { ...this.state.itemStyles };

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

    this.setState({
      itemStyles: newStyles
    });
  }

  pressOutHandler = () => {
    this.setActiveTab();
  }

  getIcon = () => {
    let icon = null;

    if (this.props.icon) {
      icon = (
        <View style={{ marginRight: 10 }}>
          {
            this.props.icon === "»" ? (
              <PackenUiText style={this.state.itemStyles.icon}>»</PackenUiText>
            ) : (
                <Icon name={this.props.icon} color={this.state.itemStyles.icon.color} size={this.state.itemStyles.icon.fontSize * 0.6} />
              )
          }
        </View>
      );
    }

    return icon;
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => { this.setActiveTab(); }} onPressIn={this.pressInHandler} onPressOut={this.pressOutHandler}>
        <View style={this.state.itemStyles.shape}>
          {this.getIcon()}
          <PackenUiText style={this.state.itemStyles.label}>{this.props.label}</PackenUiText>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default PackenUiTabItem;