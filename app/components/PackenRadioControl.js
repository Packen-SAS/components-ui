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
    this.check_if_checked();
    this.check_if_disabled();
  }

  onPress_handler = () => {
    this.setState({
      state: "checked"
    });

    this.props.updateCheckedIndex(this.props.selfIndex);
  }

  check_if_disabled = () => {
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

  check_if_checked = () => {
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
      this.check_if_checked();
      this.check_if_disabled();
    }
  }

  render() {
    return (
      <View pointerEvents={this.props.isDisabled ? "none" : "auto"}>
        <TouchableWithoutFeedback onPress={this.onPress_handler}>
          <View style={RadioStyles.shape.default}>
            <View style={RadioStyles.control[this.state.state]}></View>
            {
              this.props.label ? <PackenText style={RadioStyles.label.default}>{this.props.label}</PackenText> : null
            }
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

export default PackenRadioControl;