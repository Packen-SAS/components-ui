import React, { Component } from "react";
import { View, Animated } from "react-native";

class PackenUiProgressbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wrapperStyle: props.wrapperStyle,
      radius: props.radius,
      type: this.getDeterminate(),
      heightVal: props.height,
      height: new Animated.Value(props.height),
      progress: this.getProgress(),
      progressLeft: new Animated.Value(0),
      isComplete: false,
      colors: {
        track: props.trackColor,
        indicator: props.indicatorColor
      }
    }
  }

  getProgress = () => {
    return this.props.type === "determinate" ? new Animated.Value(this.props.progress) : new Animated.Value(1);
  }

  getDeterminate = () => {
    return this.props.type === "determinate" ? "determinate" : "indeterminate";
  }

  componentDidMount() {
    this.checkAnimToStart();
  }

  setCompleteAnim = () => {
    Animated.timing(this.state.height, {
      toValue: 0,
      duration: 250
    }).start();
    this.setState({
      isComplete: true
    });
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

  setIndeterminateAnim = () => {
    if (this.state.isComplete) {
      this.setCompleteAnim();
    }

    Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.progressLeft, {
          toValue: 1,
          duration: 1000
        })
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.progress, {
          toValue: 0,
          duration: 500
        }),
        Animated.timing(this.state.progress, {
          toValue: 1,
          duration: 250
        }),
        Animated.timing(this.state.progress, {
          toValue: 0,
          duration: 500
        })
      ])
    ).start();
  }

  checkAnimToStart = () => {
    if (this.state.type === "determinate") {
      this.setProgressAnim();
    } else {
      this.setIndeterminateAnim();
    }
  }

  updateState = () => {
    this.setState({
      wrapperStyle: this.props.wrapperStyle,
      type: this.getDeterminate(),
      heightVal: this.props.height,
      radius: this.props.radius,
      isComplete: this.props.isComplete,
      colors: {
        track: this.props.trackColor,
        indicator: this.props.indicatorColor
      }
    }, this.checkAnimToStart);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.updateState();
    }
  }

  render() {
    return (
      <View style={[this.getStyles().wrapper, this.state.wrapperStyle]}>
        <Animated.View style={this.getStyles().track}>
          <Animated.View
            style={[
              this.getStyles().indicator.base,
              this.getStyles().indicator.type[this.state.type]
            ]}
          ></Animated.View>
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
        base: {
          height: this.state.height,
          borderRadius: this.state.radius,
          backgroundColor: this.state.colors.indicator
        },
        type: {
          determinate: {
            width: this.state.progress.interpolate({
              inputRange: [0, 1],
              outputRange: ["0%", "100%"]
            })
          },
          indeterminate: {
            width: this.state.progress.interpolate({
              inputRange: [0, 1],
              outputRange: ["25%", "100%"]
            }),
            left: this.state.progressLeft.interpolate({
              inputRange: [0, 1],
              outputRange: ["-100%", "100%"]
            })
          }
        }
      }
    };
  }
}

export default PackenUiProgressbar;