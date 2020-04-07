import React, { Component } from "react";
import { View } from "react-native";

import Icon from "react-native-vector-icons/dist/Feather";

import Colors from "../styles/abstracts/colors";
import Typography from "../styles/abstracts/typography";

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
      const correctStyles = this.getStyles().iconBox.state.disabled[this.state.isChecked ? "active" : "inactive"];
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
      <View style={this.getStyles().inner.base}>
        <View
          style={{
            ...this.getStyles().iconBox.base,
            ...this.getStyles().iconBox.state[this.state.isChecked ? "active" : "inactive"],
            ...this.state.styles.disabled
          }}
        >
          {
            this.state.isChecked ? (
              <Icon
                name="check"
                size={this.getStyles().icon.base.size}
                color={this.getStyles().icon.base.color}
              />
            ) : null
          }
        </View>
        <PackenUiText
          style={{
            ...this.getStyles().label.base,
            ...this.getStyles().label.state[this.props.isDisabled ? "disabled" : "default"]
          }}
        >{this.state.label}</PackenUiText>
      </View>
    );
  }

  getStyles = () => {
    return {
      inner: {
        base: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          alignSelf: "flex-start"
        }
      },
      iconBox: {
        base: {
          height: 18,
          width: 18,
          borderWidth: 1,
          borderRadius: 3,
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center"
        },
        state: {
          active: {
            backgroundColor: Colors.brand.primary.drk,
            borderColor: Colors.brand.primary.drk
          },
          inactive: {
            backgroundColor: Colors.brand.primary.snw,
            borderColor: Colors.brand.primary.drk
          },
          disabled: {
            active: {
              backgroundColor: Colors.base.disabled_alt,
              borderColor: Colors.base.disabled_alt
            },
            inactive: {
              backgroundColor: Colors.ghost.focus,
              borderColor: Colors.base.disabled_alt
            }
          }
        }
      },
      icon: {
        base: {
          size: Typography.size.small,
          color: Colors.basic.white.dft
        }
      },
      label: {
        base: {
          color: Colors.basic.independence.drk,
          fontSize: Typography.size.medium,
          lineHeight: Typography.lineheight.medium_alt,
          marginLeft: 8
        },
        state: {
          default: {},
          disabled: {
            color: Colors.base.disabled_alt
          }
        }
      }
    };
  }
}

export default PackenUiCheckboxControl;