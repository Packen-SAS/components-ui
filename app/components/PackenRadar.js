import React, { Component } from "react";
import { View, Animated } from "react-native";

import RadarStyles from "../styles/components/PackenRadar";

class PackenRadar extends Component {
  constructor(props) {
    super(props);

    this.shadowAnim = null;

    this.state = {
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
    if (this.props.isAnimating) {
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

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.isAnimating !== this.props.isAnimating) {
      this.checkAnimationState();
    } else {
      return false;
    }
  }

  render() {
    return (
      <View style={RadarStyles.wrapper}>
        <Animated.View style={{
          ...RadarStyles.shadow.base,
          ...RadarStyles.shadow.theme[this.props.theme],
          ...this.state.transforms.shadow
        }}></Animated.View>
        <View style={{
          ...RadarStyles.dot.base,
          ...RadarStyles.dot.theme[this.props.theme]
        }}></View>
      </View>
    );
  }
}

export default PackenRadar;