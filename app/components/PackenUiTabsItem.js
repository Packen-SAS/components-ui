import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, TouchableWithoutFeedback } from "react-native";

import Icon from "react-native-vector-icons/dist/Feather";

import Colors from "../styles/abstracts/colors";
import Typography from "../styles/abstracts/typography";

import PackenUiText from "./PackenUiText";

class PackenUiTabsItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.setPropsToState(),
      itemStyles: this.getItemStyles()
    }
  }

  setPropsToState = () => {
    return {
      updateActiveTabIndex: this.props.updateActiveTabIndex ? this.props.updateActiveTabIndex : false,
      selfIndex: this.props.selfIndex ? this.props.selfIndex : 0,
      activeTabIndex: this.props.activeTabIndex ? this.props.activeTabIndex : 0,
      callback: this.props.callback ? this.props.callback : false,
      icon: this.props.icon ? this.props.icon : false,
      label: this.props.label ? this.props.label : "",
      styling: this.props.styling ? { ...this.props.styling } : {
        shape: {},
        iconWrapper: {},
        iconCharacter: {},
        iconSize: {},
        iconColor: {},
        label: {}
      }
    };
  }

  componentDidMount() {
    this.checkIfActive();
    
    if (typeof this.props.instance === "function") {
      this.props.instance(this);
    }
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
    if (this.state.updateActiveTabIndex) {
      this.state.updateActiveTabIndex(this.state.selfIndex);
    }
    if (this.state.callback) {
      this.state.callback();
    }
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
      ...this.setPropsToState()
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
        <View style={{
          marginRight: 10,
          ...this.state.styling.iconWrapper
        }}>
          {
            this.state.icon === "»" ? (
              <PackenUiText style={{
                ...this.state.itemStyles.icon,
                ...this.state.styling.iconCharacter
              }}>»</PackenUiText>
            ) : (
                <Icon
                  name={this.state.icon}
                  color={this.state.styling.iconColor ? this.state.styling.iconColor : this.state.itemStyles.icon.color}
                  size={this.state.styling.iconSize ? this.state.styling.iconSize : this.state.itemStyles.icon.fontSize * 0.6}
                />
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
        <View style={{
          ...this.state.itemStyles.shape,
          ...this.state.styling.shape
        }}>
          {this.getIcon()}
          <PackenUiText style={{
            ...this.state.itemStyles.label,
            ...this.state.styling.label
          }}>{this.state.label}</PackenUiText>
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
            color: Colors.basic.gray.dft
          },
          icon: {
            color: Colors.basic.gray.dft
          }
        },
        active: {
          shape: {
            backgroundColor: Colors.ghost.default,
            borderBottomColor: Colors.brand.primary.drk
          },
          label: {
            color: Colors.brand.primary.drk
          },
          icon: {
            color: Colors.brand.primary.drk
          }
        }
      }
    };
  }
}

PackenUiTabsItem.propTypes = {
  updateActiveTabIndex: PropTypes.func.isRequired,
  activeTabIndex: PropTypes.number.isRequired,
  selfIndex: PropTypes.number.isRequired,
  callback: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.string,
  styling: PropTypes.object
};

export default PackenUiTabsItem;