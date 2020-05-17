import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Animated } from "react-native";

class PackenUiProgressbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.setPropsToState(),
      progress: this.getProgress(),
      progressLeft: new Animated.Value(0)
    }
  }

  setPropsToState = () => {
    return {
      wrapperStyle: this.props.wrapperStyle ? this.props.wrapperStyle : {},
      type: this.props.type ? this.props.type : "indeterminate",
      height: this.props.height ? new Animated.Value(this.props.height) : 5,
      radius: this.props.radius ? this.props.radius : 0,
      isComplete: this.props.isComplete ? this.props.isComplete : false,
      colors: {
        track: this.props.trackColor ? this.props.trackColor : "#E6E6E6",
        indicator: this.props.indicatorColor ? this.props.indicatorColor : "#20D292"
      }
    };
  };

  getProgress = () => {
    return this.props.type === "determinate" ? new Animated.Value(this.props.progress) : new Animated.Value(1);
  }

  componentDidMount() {
    this.checkAnimToStart();

    if (typeof this.props.instance === "function") {
      this.props.instance(this);
    }
  }

  setCompleteAnim = () => {
    if (typeof this.state.height !== "number") {
      Animated.timing(this.state.height, {
        toValue: 0,
        duration: 250
      }).start();
      this.setState({
        isComplete: true
      });
    }
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
      ...this.setPropsToState()
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
        width: "100%"
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

PackenUiProgressbar.propTypes = {
  wrapperStyle: PropTypes.object,
  type: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  radius: PropTypes.number,
  isComplete: PropTypes.bool,
  trackColor: PropTypes.string.isRequired,
  indicatorColor: PropTypes.string.isRequired
};

export default PackenUiProgressbar;