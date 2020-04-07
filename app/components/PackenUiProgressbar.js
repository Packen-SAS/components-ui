import React, { Component } from "react";
import { View, Animated } from "react-native";

class PackenUiProgressbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      radius: props.radius,
      determinate: props.determinate,
      heightVal: props.height,
      height: new Animated.Value(props.height),
      progress: new Animated.Value(props.progress),
      colors: {
        track: props.trackColor,
        indicator: props.indicatorColor
      }
    }
  }

  componentDidMount() {
    this.setProgressAnim();
  }

  setCompleteAnim = () => {
    Animated.timing(this.state.height, {
      toValue: 0,
      duration: 250
    }).start();
  }

  setProgressAnim = () => {
    Animated.timing(this.state.progress, {
      toValue: this.props.progress,
      duration: 250
    }).start(() => {
      this.setState({
        progress: new Animated.Value(this.props.progress)
      });
      if (this.props.progress === 1) {
        this.setCompleteAnim();
      }
    });
  }

  updateState = () => {
    this.setProgressAnim();
    this.setState({
      determinate: this.props.determinate,
      heightVal: this.props.height,
      radius: this.props.radius,
      colors: {
        track: this.props.trackColor,
        indicator: this.props.indicatorColor
      }
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.updateState();
    }
  }

  render() {
    return (
      <View style={this.getStyles().wrapper}>
        <Animated.View style={this.getStyles().track}>
          <Animated.View style={this.getStyles().indicator}></Animated.View>
        </Animated.View>
      </View>
    );
  }

  getStyles = () => {
    return {
      wrapper: {
        flex: 1,
        width: "100%",
        height: this.state.heightVal
      },
      track: {
        overflow: "hidden",
        width: "100%",
        height: this.state.height,
        borderRadius: this.state.radius,
        backgroundColor: this.state.colors.track
      },
      indicator: {
        width: this.state.progress.interpolate({
          inputRange: [0, 1],
          outputRange: ["0%", "100%"]
        }),
        height: this.state.height,
        borderRadius: this.state.radius,
        backgroundColor: this.state.colors.indicator
      }
    };
  }
}

export default PackenUiProgressbar;