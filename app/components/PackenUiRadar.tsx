import React, { Component, ReactNode } from "react";
import PropTypes from "prop-types";
import { View, Animated } from "react-native";
import * as UTIL from "../utils"

import Colors from "../styles/abstracts/colors";

interface StylingPropShape {
  wrapper: object;
  shadow: object;
  dot: object;
}

interface PackenUiRadarProps {
  theme: string;
  animated: boolean;
  isAnimating?: boolean;
  styling?: StylingPropShape;
  instance?: Function;
}

interface PackenUiRadarState {
  theme: string;
  animated: boolean;
  isAnimating: boolean;
  styling: StylingPropShape;
  transforms: {
    shadow: {
      transform: TransformType;
    };
  };
}

interface ShadowAnimShape {
  start: Function;
  stop: Function;
}

type TransformType = { scale: number | Animated.Value }[];

/**
 * Component for rendering an animated, pulsing radar circle to be overlaid on maps
 */
class PackenUiRadar extends Component<PackenUiRadarProps, PackenUiRadarState> {
  /**
   * Variable that stores the animation data object
   * @type {object}
   */
  shadowAnim: ShadowAnimShape | null = null;
  
  /**
   * Initializes the componenmt
   * @type {function}
   * @param {object} props Props passed to the component
   */
  constructor(props: PackenUiRadarProps) {
    super(props);

    /**
     * Variable that stores the state
     * @type {object}
     * @property {object} transforms Holds the transform animations
     */
    this.state = {
      ...this.setPropsToState(),
      transforms: {
        shadow: {
          transform: this.getInitialShadowTransform()
        }
      }
    }
  }

  /**
   * Centralizes the received props assignment to set them to the state, determining default values in case any is not provided
   * @type {function}
   * @property {string} [theme="wait"] The theme to apply correct styles - "wait"; "search"; "alert"
   * @property {boolean} [animated=false] Determines if an animation should be applied or if it should be a static radar
   * @property {boolean} [isAnimating=false] Determines if the animation should be running in case it's an animated radar
   * @property {object} [styling={ wrapper: {}, shadow: {}, dot: {} }] The optional custom styling props
   * @return {object} The props mapped to the state keys
   */
  setPropsToState: Function = (): PackenUiRadarProps => {
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

  /**
   * Returns the correct transform depending on whether the radar is animated
   * @type {function}
   * @return {object[]} The transforms array
   */
  getInitialShadowTransform: Function = (): TransformType => {
    let transform: TransformType = [{ scale: 1 }];

    if (this.props.animated) {
      transform = [{ scale: new Animated.Value(0.2) }];
      this.setShadowAnimation(transform);
    }

    return transform;
  }

  /**
   * Configures the animation and sets it to the global variable
   * @type {function}
   * @param {object[]} transform The transform array to animate
   */
  setShadowAnimation: Function = (transform: TransformType) => {
    if (typeof transform[0].scale !== "number") {
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
  }

  /**
   * Starts the animation
   * @type {function}
   */
  startShadowAnimation: Function = () => {
    this.setShadowAnimation(this.state.transforms.shadow.transform);
    if (this.shadowAnim) { this.shadowAnim.start(); }
  }

  /**
   * Stops the animation
   * @type {function}
   */
  stopShadowAnimation: Function = () => {
    if (this.shadowAnim) { this.shadowAnim.stop(); }
  }

  /**
   * Determines whether to stop or start the animation
   * @type {function}
   */
  checkAnimationState: VoidFunction = () => {
    if (this.state.isAnimating) {
      this.startShadowAnimation();
    } else {
      this.stopShadowAnimation();
    }
  }

  /**
   * Propagates the component instance if a callback is provided via props and determines whether to initialize the animation
   * @type {function}
   * @return {boolean} Flag used only for testing purposes
   */
  componentDidMount(): boolean | void {
    if (typeof this.props.instance === "function") {
      this.props.instance(this);
    }
    if (this.state.animated && this.state.isAnimating) {
      this.startShadowAnimation();
    } else {
      return false;
    }
  }

  /**
   * Updates the state with new props and checks the animation status
   * @type {function}
   */
  updateState: Function = () => {
    this.setState({ ...this.setPropsToState() }, this.checkAnimationState);
  }

  /**
   * Compares props to determine if the component should update its state with new props
   * @type {function}
   * @param {object} prevProps Previous props
   * @return {boolean} Flag used only for testing purposes
   */
  componentDidUpdate(prevProps: PackenUiRadarProps): boolean | void {
    if (!UTIL.objectsEqual(prevProps, this.props)) {
      this.updateState();
    } else {
      return false;
    }
  }

  /**
   * Renders the component
   * @type {function}
   * @return {node} JSX for the component
   */
  render(): ReactNode {
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

  /**
   * Returns the current styles object
   * @type {function}
   * @return {object} The current styles object
   */
  getStyles: Function = (): object => {
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

  /**
   * Defines prop-types for the component
   * @type {object}
   */
  static propTypes: object = {
    theme: PropTypes.string.isRequired,
    animated: PropTypes.bool.isRequired,
    isAnimating: PropTypes.bool,
    styling: PropTypes.object,
    instance: PropTypes.func
  };
}

export default PackenUiRadar;