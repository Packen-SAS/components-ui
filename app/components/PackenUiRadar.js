import React, { Component } from "react";
import { View, Animated } from "react-native";

import Colors from "../styles/abstracts/colors";

class PackenUiRadar extends Component {
  constructor(props) {
    super(props);

    this.shadowAnim = null;

    this.state = {
      theme: props.theme,
      animated: props.animated,
      isAnimating: this.getInitialAnimatingState(),
      transforms: {
        shadow: {
          transform: this.getInitialShadowTransform()
        }
      }
    }
  }

  getInitialAnimatingState = () => {
    return this.props.animated ? this.props.isAnimating : false;
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
    if (this.state.animated && this.state.isAnimating) {
      this.startShadowAnimation();
    } else {
      return false;
    }
  }

  updateState = () => {
    this.setState({
      theme: this.props.theme,
      animated: this.props.animated,
      isAnimating: this.getInitialAnimatingState()
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
      <View style={this.getStyles().wrapper}>
        <Animated.View style={{
          ...this.getStyles().shadow.base,
          ...this.getStyles().shadow.theme[this.state.theme],
          ...this.state.transforms.shadow
        }}></Animated.View>
        <View style={{
          ...this.getStyles().dot.base,
          ...this.getStyles().dot.theme[this.state.theme]
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

export default PackenUiRadar;