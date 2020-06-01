import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Animated } from "react-native";

import Colors from "../styles/abstracts/colors";

class PackenUiRadar extends Component {
  constructor(props) {
    super(props);

    this.shadowAnim = null;

    this.state = {
      ...this.setPropsToState(),
      transforms: {
        shadow: {
          transform: this.getInitialShadowTransform()
        }
      }
    }
  }

  setPropsToState = () => {
    return {
      theme: this.props.theme ? this.props.theme : "wait",
      animated: this.props.animated ? this.props.animated : false,
      isAnimating: this.props.animated ? this.props.isAnimating ? this.props.isAnimating : false : false,
      styling: this.props.styling ? { ...this.props.styling } : {
        wrapper: {},
        shadow: {},
        dot: {}
      }
    };
  }

  getInitialShadowTransform = () => {
    let transform = [{ scale: 1 }];

    if (this.props.animated) {
      transform = [{ scale: new Animated.Value(0.2) }];
      this.setShadowAnimation(transform);
    }

    return transform;
  }

  setShadowAnimation = transform => {
    this.shadowAnim = Animated.loop(
      Animated.sequence([
        Animated.timing(transform[0].scale, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true
        }),
        Animated.timing(transform[0].scale, {
          toValue: 0.2,
          duration: 500,
          useNativeDriver: true
        })
      ])
    );
  }

  startShadowAnimation = () => {
    this.setShadowAnimation(this.state.transforms.shadow.transform);
    this.shadowAnim.start();
  }

  stopShadowAnimation = () => {
    this.shadowAnim.stop();
  }

  checkAnimationState = () => {
    if (this.state.isAnimating) {
      this.startShadowAnimation();
    } else {
      this.stopShadowAnimation();
    }
  }

  componentDidMount() {
    if (typeof this.props.instance === "function") {
      this.props.instance(this);
    }
    if (this.state.animated && this.state.isAnimating) {
      this.startShadowAnimation();
    } else {
      return false;
    }
  }

  updateState = () => {
    this.setState({
      ...this.setPropsToState()
    }, () => {
      this.checkAnimationState();
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.updateState();
    } else {
      return false;
    }
  }

  render() {
    return (
      <View style={{ ...this.getStyles().wrapper, ...this.state.styling.wrapper }}>
        <Animated.View style={{
          ...this.getStyles().shadow.base,
          ...this.getStyles().shadow.theme[this.state.theme],
          ...this.state.transforms.shadow,
          ...this.state.styling.shadow
        }}></Animated.View>
        <View style={{
          ...this.getStyles().dot.base,
          ...this.getStyles().dot.theme[this.state.theme],
          ...this.state.styling.dot
        }}></View>
      </View>
    );
  }

  getStyles = () => {
    return {
      wrapper: {
        height: 112,
        width: 112,
        borderRadius: 115,
        alignItems: "center",
        justifyContent: "center",
        position: "relative"
      },
      shadow: {
        base: {
          height: 112,
          width: 112,
          borderRadius: 115,
          position: "absolute",
          top: 0,
          left: 0
        },
        theme: {
          search: {
            backgroundColor: "rgba(32, 210, 146, 0.15)"
          },
          wait: {
            backgroundColor: "rgba(185, 247, 255, 0.4)"
          },
          alert: {
            backgroundColor: "rgba(254, 88, 96, 0.1)"
          }
        }
      },
      dot: {
        base: {
          height: 10,
          width: 10,
          borderRadius: 15,
          borderWidth: 2,
          borderColor: Colors.basic.white.dft
        },
        theme: {
          search: {
            backgroundColor: Colors.success.default
          },
          wait: {
            backgroundColor: Colors.brand.secondary.dft
          },
          alert: {
            backgroundColor: Colors.danger.default
          }
        }
      }
    };
  }
}

PackenUiRadar.propTypes = {
  theme: PropTypes.string.isRequired,
  animated: PropTypes.bool.isRequired,
  isAnimating: PropTypes.bool
};

export default PackenUiRadar;