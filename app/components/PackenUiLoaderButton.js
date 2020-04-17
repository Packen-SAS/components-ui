import React, { Component } from "react";
import { Animated } from "react-native";

import PackenUiButton from "./PackenUiButton";

class PackenUiLoaderButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      children: props.children,
      type: props.type,
      level: props.level,
      size: props.size,
      callback: props.callback,
      isDone: props.isDone,
      anim: null,
      rotate: new Animated.Value(0)
    }
  }

  componentDidMount() {
    this.setAnim();
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
    this.setState({
      children: this.props.children,
      level: this.props.level,
      size: this.props.size,
      callback: this.props.callback,
      isDone: this.props.isDone
    });
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
      done: {
        transform: [{ rotate: "0deg" }]
      },
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

export default PackenUiLoaderButton;