import React, { Component } from "react";
import { TouchableWithoutFeedback, View } from "react-native";

import Colors from "../styles/abstracts/colors";
import Typography from "../styles/abstracts/typography";

import PackenUiText from "./PackenUiText";

class PackenUiRadioControl extends Component {
  constructor(props) {
    super(props);

    this.state = {
      state: this.setInitialState()
    }
  }

  setInitialState = () => {
    return this.props.isDisabled ? "default_disabled" : "default";
  }

  componentDidMount() {
    this.checkIfChecked();
    this.checkIfDisabled();
  }

  onPressHandler = () => {
    this.setState({
      state: "checked"
    });

    this.props.updateCheckedIndex(this.props.selfIndex);
  }

  checkIfDisabled = () => {
    if (this.props.isDisabled) {
      if (this.props.checkedIndex !== this.props.selfIndex) {
        this.setState({
          state: "default_disabled"
        });
      } else {
        this.setState({
          state: "checked_disabled"
        });
      }
    } else {
      return false;
    }
  }

  checkIfChecked = () => {
    if (this.props.checkedIndex !== this.props.selfIndex) {
      this.setState({
        state: "default"
      });
    } else {
      this.setState({
        state: "checked"
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.checkedIndex !== this.props.checkedIndex) {
      this.checkIfChecked();
      this.checkIfDisabled();
    }
  }

  getLabel = () => {
    let label = null;

    if (this.props.label) {
      label = (
        <PackenUiText style={{ ...this.getStyles().label.base, ...this.getStyles().label[this.state.state] }}>{this.props.label}</PackenUiText>
      );
    }

    return label;
  }

  render() {
    return (
      <View pointerEvents={this.props.isDisabled ? "none" : "auto"}>
        <TouchableWithoutFeedback onPress={this.onPressHandler}>
          <View style={this.getStyles().shape.base}>
            <View style={{ ...this.getStyles().control.base, ...this.getStyles().control[this.state.state] }}></View>
            {this.getLabel()}
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  getStyles = () => {
    return {
      shape: {
        base: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          flexWrap: "nowrap"
        }
      },
      control: {
        base: {
          height: 18,
          width: 18,
          borderRadius: 18,
          borderWidth: 2,
          borderStyle: "solid",
          borderColor: Colors.primary.default
        },
        checked: {
          borderWidth: 6,
          backgroundColor: Colors.base.white
        },
        default_disabled: {
          borderColor: Colors.base.disabled_alt
        },
        checked_disabled: {
          borderWidth: 6,
          backgroundColor: Colors.base.white,
          borderColor: Colors.base.disabled_alt
        }
      },
      label: {
        base: {
          marginLeft: 8,
          color: Colors.basic.independence.drk,
          fontSize: Typography.size.medium,
          lineHeight: Typography.lineheight.medium_alt
        },
        default_disabled: {
          color: Colors.base.disabled_alt
        },
        checked_disabled: {
          color: Colors.base.disabled_alt
        }
      }
    };
  }
}

export default PackenUiRadioControl;