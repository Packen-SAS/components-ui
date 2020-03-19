import React, { Component } from "react";

import { TouchableWithoutFeedback, View } from "react-native";

import RadioStyles from "../styles/components/PackenRadio";
import PackenText from "../components/PackenText";

class PackenRadioControl extends Component {
  constructor(props) {
    super(props);

    this.state = {
      state: props.isDisabled ? "default_disabled" : "default"
    }
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
        <PackenText style={{ ...RadioStyles.label.base, ...RadioStyles.label[this.state.state] }}>{this.props.label}</PackenText>
      );
    }

    return label;
  }

  render() {
    return (
      <View pointerEvents={this.props.isDisabled ? "none" : "auto"}>
        <TouchableWithoutFeedback onPress={this.onPressHandler}>
          <View style={RadioStyles.shape.base}>
            <View style={{ ...RadioStyles.control.base, ...RadioStyles.control[this.state.state] }}></View>
            {this.getLabel()}
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

export default PackenRadioControl;