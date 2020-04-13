import React, { Component } from "react";
import { View, TouchableWithoutFeedback } from "react-native";

import Icon from "react-native-vector-icons/dist/Feather";

import Colors from "../styles/abstracts/colors";
import Typography from "../styles/abstracts/typography";

import PackenUiText from "./PackenUiText";

class PackenUiTabItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      updateActiveTabIndex: props.updateActiveTabIndex,
      selfIndex: props.selfIndex,
      activeTabIndex: props.activeTabIndex,
      callback: props.callback,
      icon: props.icon,
      label: props.label,
      itemStyles: this.getItemStyles()
    }
  }

  componentDidMount() {
    this.checkIfActive();
  }

  getItemStyles = () => {
    const styles = {
      shape: {
        ...this.getStyles().item.base.shape,
        ...this.getStyles().item.default.shape
      },
      label: {
        ...this.getStyles().item.base.label,
        ...this.getStyles().item.default.label
      },
      icon: {
        ...this.getStyles().item.base.icon,
        ...this.getStyles().item.default.icon
      }
    };
    return styles;
  }

  setActiveTab = () => {
    this.setActiveStyles();
    this.state.updateActiveTabIndex(this.state.selfIndex);
    this.state.callback();
  }

  setActiveStyles = () => {
    let activeStyles = { ...this.state.itemStyles };
    activeStyles.shape = {
      ...activeStyles.shape,
      ...this.getStyles().item.active.shape
    };
    activeStyles.label = {
      ...activeStyles.label,
      ...this.getStyles().item.active.label
    };
    activeStyles.icon = {
      ...activeStyles.icon,
      ...this.getStyles().item.active.icon
    };

    this.setState({
      itemStyles: activeStyles
    });

    return activeStyles;
  }

  checkIfActive = () => {
    if (this.state.activeTabIndex === this.state.selfIndex) {
      this.setActiveStyles();
    } else {
      this.setState({
        itemStyles: this.getItemStyles()
      });
    }
  }

  updateState = (prevProps) => {
    this.setState({
      updateActiveTabIndex: this.props.updateActiveTabIndex,
      selfIndex: this.props.selfIndex,
      activeTabIndex: this.props.activeTabIndex,
      callback: this.props.callback,
      icon: this.props.icon,
      label: this.props.label
    }, () => {
      if (prevProps.activeTabIndex !== this.state.activeTabIndex) {
        this.checkIfActive();
      }
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.updateState(prevProps);
    }
  }

  pressInHandler = () => {
    let newStyles = { ...this.state.itemStyles };

    newStyles.shape = {
      ...newStyles.shape,
      ...this.getStyles().item.focus.shape
    };
    newStyles.label = {
      ...newStyles.label,
      ...this.getStyles().item.focus.label
    };
    newStyles.icon = {
      ...newStyles.icon,
      ...this.getStyles().item.focus.icon
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

    if (this.state.icon) {
      icon = (
        <View style={{ marginRight: 10 }}>
          {
            this.state.icon === "»" ? (
              <PackenUiText style={this.state.itemStyles.icon}>»</PackenUiText>
            ) : (
                <Icon name={this.state.icon} color={this.state.itemStyles.icon.color} size={this.state.itemStyles.icon.fontSize * 0.6} />
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
          <PackenUiText style={this.state.itemStyles.label}>{this.state.label}</PackenUiText>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  getStyles = () => {
    return {
      item: {
        base: {
          shape: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            flexGrow: 1,
            borderBottomWidth: 4,
            borderBottomStyle: "solid",
            paddingTop: 12,
            paddingBottom: 8
          },
          label: {
            textAlign: "center",
            fontFamily: Typography.family.semibold,
            fontSize: Typography.size.medium,
            lineHeight: Typography.lineheight.huge
          },
          icon: {
            textAlign: "center",
            fontFamily: Typography.family.semibold,
            fontSize: Typography.size.medium,
            lineHeight: Typography.lineheight.huge,
            fontSize: Typography.size.medium * 1.65
          }
        },
        default: {
          shape: {
            borderBottomColor: Colors.base.disabled_alt
          },
          label: {
            color: Colors.base.disabled_alt_drk
          },
          icon: {
            color: Colors.base.disabled_alt_drk
          }
        },
        focus: {
          shape: {
            backgroundColor: Colors.ghost.focus,
            borderBottomColor: Colors.base.disabled_alt_drk
          },
          label: {
            color: Colors.secondary.focus
          },
          icon: {
            color: Colors.secondary.focus
          }
        },
        active: {
          shape: {
            backgroundColor: Colors.base.transparent,
            borderBottomColor: Colors.primary.default
          },
          label: {
            color: Colors.primary.default
          },
          icon: {
            color: Colors.primary.default
          }
        }
      }
    };
  }
}

export default PackenUiTabItem;