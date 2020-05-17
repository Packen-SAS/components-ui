import React, { Component } from "react";
import PropTypes from "prop-types";
import { Animated } from "react-native";

import PackenUiButton from "./PackenUiButton";

class PackenUiLoaderButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.setPropsToState(),
      anim: null,
      rotate: new Animated.Value(0)
    }
  }

  mockCallback = () => false;

  setPropsToState = () => {
    return {
      children: this.props.children ? this.props.children : null,
      type: this.props.type ? this.props.type : "regular",
      level: this.props.level ? this.props.level : "primary",
      size: this.props.size ? this.props.size : "medium",
      callback: this.props.callback ? this.props.callback : this.mockCallback,
      isDone: this.props.isDone ? this.props.isDone : false
    };
  }

  componentDidMount() {
    this.setAnim();

    if (typeof this.props.instance === "function") {
      this.props.instance(this);
    }
  }

  setAnim = () => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.rotate, {
          toValue: 1,
          duration: 1000
        })
      ])
    );
    this.setState({
      anim: anim
    });
  }

  getIconName = () => {
    return this.state.isDone ? "check" : "loader";
  }

  updateState = () => {
    this.setState({ ...this.setPropsToState() });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.updateState();
    }
  }

  render() {
    return (
      <PackenUiButton
        icon={{
          position: "left",
          name: this.getIconName(),
          styles: this.getStyles(),
          anim: {
            state: this.state.isDone ? "done" : "loading",
            controller: this.state.anim
          }
        }}
        type={this.state.type}
        level={this.state.level}
        size={this.state.size}
        callback={this.state.callback}
        nonTouchable={this.state.isDone ? false : true}
      >{this.state.children}</PackenUiButton>
    );
  }

  getStyles = () => {
    return {
      done: {},
      loading: {
        transform: [{
          rotate: this.state.rotate.interpolate({
            inputRange: [0, 1],
            outputRange: ["0deg", "360deg"]
          })
        }]
      }
    };
  }
}

PackenUiLoaderButton.propTypes = {
  children: PropTypes.node,
  type: PropTypes.string.isRequired,
  level: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
  isDone: PropTypes.bool
};

export default PackenUiLoaderButton;