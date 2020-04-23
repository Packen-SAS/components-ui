import React, { Component } from "react";
import PropTypes from "prop-types";
import { TouchableWithoutFeedback, View } from "react-native";

import Colors from "../styles/abstracts/colors";
import Typography from "../styles/abstracts/typography";

import PackenUiText from "./PackenUiText";

class PackenUiRadioControl extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.setPropsToState(),
      state: this.setInitialState()
    }
  }

  setPropsToState = () => {
    return {
      updateCheckedIndex: this.props.updateCheckedIndex ? this.props.updateCheckedIndex : false,
      selfIndex: this.props.selfIndex ? this.props.selfIndex : 0,
      isDisabled: this.props.isDisabled ? this.props.isDisabled : false,
      checkedIndex: this.props.checkedIndex === 0 ? 0 : this.props.checkedIndex ? this.props.checkedIndex : -1,
      label: this.props.label ? this.props.label : ""
    };
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

    if (this.state.updateCheckedIndex) {
      this.state.updateCheckedIndex(this.state.selfIndex);
    }
  }

  checkIfDisabled = () => {
    if (this.state.isDisabled) {
      if (this.state.checkedIndex !== this.state.selfIndex) {
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
    if (this.state.checkedIndex !== this.state.selfIndex) {
      this.setState({
        state: "default"
      });
    } else {
      this.setState({
        state: "checked"
      });
    }
  }

  updateState = () => {
    this.setState({
      ...this.setPropsToState()
    }, () => {
      this.checkIfChecked();
      this.checkIfDisabled();
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.updateState();
    }
  }

  getLabel = () => {
    let label = null;

    if (this.state.label) {
      label = (
        <PackenUiText style={{ ...this.getStyles().label.base, ...this.getStyles().label[this.state.state] }}>{this.state.label}</PackenUiText>
      );
    }

    return label;
  }

  render() {
    return (
      <View pointerEvents={this.state.isDisabled ? "none" : "auto"}>
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

PackenUiRadioControl.propTypes = {
  updateCheckedIndex: PropTypes.func.isRequired,
  selfIndex: PropTypes.number.isRequired,
  isDisabled: PropTypes.bool,
  checkedIndex: PropTypes.number,
  label: PropTypes.string.isRequired
};

export default PackenUiRadioControl;