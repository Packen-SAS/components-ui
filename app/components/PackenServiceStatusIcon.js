import React, { Component } from "react";
import { View } from "react-native";

import Icon from "react-native-vector-icons/dist/Feather";

import ServiceStatusStyles from "../styles/components/PackenServiceStatus";

class PackenServiceStatusIcon extends Component {
  constructor(props) {
    super(props);

    this.state = {
      state: "default",
      isCurrent: false
    }
  }

  componentDidMount() {
    this.checkIfActive();
  }

  getIcon = () => {
    let stateIcon = this.props.activeIcon;

    if (!this.state.isCurrent) {
      stateIcon = "minus-circle";
      if (this.props.isComplete) {
        stateIcon = "check-circle";
      }
    }

    return stateIcon;
  }

  checkIfCurrent = () => {
    if (this.props.activeIndex === this.props.selfIndex) {
      this.setState({
        state: "active"
      });
      return true;
    } else {
      this.setState({
        state: "default"
      });
      return false;
    }
  }

  checkIfActive = () => {
    const newState = this.checkIfCurrent();
    this.setState({
      isCurrent: newState
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.activeIndex !== this.props.activeIndex) {
      this.checkIfActive();
    }
  }

  getDivider = () => {
    let divider = null;

    if (this.props.selfIndex !== this.props.stepsLength - 1) {
      divider = <View style={ServiceStatusStyles.timeline__divider}></View>;
    }

    return divider;
  }

  render() {
    return (
      <View style={ServiceStatusStyles.timeline__item}>
        <View style={ServiceStatusStyles.timeline__icon_wrapper}>
          <Icon name={this.getIcon()} size={ServiceStatusStyles.icon[this.state.state].fontSize} color={ServiceStatusStyles.icon[this.state.state].color} />
        </View>
        {this.getDivider()}
      </View>
    );
  }
}

export default PackenServiceStatusIcon;