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
    this.check_if_active();
  }

  get_icon = () => {
    let stateIcon = this.props.activeIcon;
    
    if (!this.state.isCurrent) {
      stateIcon = "minus-circle";
      if (this.props.isComplete) {
        stateIcon = "check-circle";
      }
    }

    return stateIcon;
  }

  check_if_current = () => {
    if (this.props.activeIndex === this.props.selfIndex) {
      this.setState({
        state: "active"
      });
    } else {
      this.setState({
        state: "default"
      });
    }
  }

  check_if_active = () => {
    const newState = this.check_if_current();
    this.setState({
      isCurrent: newState
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.activeIndex !== this.props.activeIndex) {
      this.check_if_active();
    }
  }

  render() {
    return (
      <View style={ServiceStatusStyles.timeline__item}>
        <View style={ServiceStatusStyles.timeline__icon_wrapper}>
          <Icon name={this.get_icon()} size={ServiceStatusStyles.icon[this.state.state].fontSize} color={ServiceStatusStyles.icon[this.state.state].color} />
        </View>
        {
          this.props.selfIndex !== this.props.stepsLength - 1 ? (
            <View style={ServiceStatusStyles.timeline__divider}></View>
          ) : null
        }
      </View>
    );
  }
}

export default PackenServiceStatusIcon;