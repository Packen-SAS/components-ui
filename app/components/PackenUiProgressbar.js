import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Animated } from "react-native";
import * as UTIL from "../utils";

import Colors from "../styles/abstracts/colors";

import PackenUiText from "./PackenUiText";

/**
 * Component for rendering a progressbar
 */
class PackenUiProgressbar extends Component {
  /**
   * Initializes the component
   * @type {function}
   * @param {object} props Props passed to the component
   */
  constructor(props) {
    super(props);

    /**
     * Variable that stores the state
     * @type {object}
     * @property {object} progress The Animated.Value instance to setup the correct animation configuration depending on the type of progressbar
     * @property {object} progressLeft The Animated.Value instance to setup the correct animation if the progressbar's type is "indeterminate"
     */
    this.state = {
      ...this.setPropsToState(),
      progress: this.getProgress(),
      progressLeft: new Animated.Value(0)
    }
  }

  /**
   * Centralizes the received props assignment to set them to the state, determining default values in case any is not provided
   * @type {function}
   * @property {object} [wrapperStyle={}] The optional custom styles object specifically applied to the wrapper element
   * @property {string} [type="indeterminate"] The type of animation to be applied - "determinate"; "indeterminate"
   * @property {object} [height=5] The Animated.Value instance to set and animate the height of the progressbar
   * @return {object} The props mapped to the state keys
   */
  setPropsToState = () => {
    return {
      wrapperStyle: this.props.wrapperStyle ? this.props.wrapperStyle : {},
      type: this.props.type ? this.props.type : "indeterminate",
      height: this.props.height ? new Animated.Value(this.props.height) : new Animated.Value(5),
      radius: this.props.radius ? this.props.radius : 0,
      isComplete: this.props.isComplete ? this.props.isComplete : false,
      label: this.props.label ? this.props.label : false,
      colors: {
        track: this.props.trackColor ? this.props.trackColor : Colors.base.default_alt,
        indicator: this.props.indicatorColor ? this.props.indicatorColor : Colors.success.default
      },
      styling: this.props.styling ? { ...this.props.styling } : {
        wrapper: {},
        label: {},
        track: {},
        indicator: {}
      }
    };
  };

  /**
   * Returns the correct Animated.Value instance configuration depending on the type
   * @type {function}
   * @return {object} The Animated.Value instance
   */
  getProgress = () => {
    return this.props.type === "determinate" ? new Animated.Value(this.props.progress) : new Animated.Value(1);
  }

  /**
   * Propagates the component instance if a callback is provided via props and determines which animation to initialize
   * @type {function}
   */
  componentDidMount() {
    this.checkAnimToStart();

    if (typeof this.props.instance === "function") {
      this.props.instance(this);
    }
  }

  /**
   * Hides the progressbar by animating its height to zero, and sets the state accordingly
   * @type {function}
   */
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

  /**
   * Initializes the animation for "determinate" types
   * @type {function}
   */
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

  /**
   * Initializes the animation for "indeterminate" types
   * @type {function}
   */
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
        })
      ])
    ).start();
  }

  /**
   * Determines which type of animation is set to initialize its handler
   * @type {function}
   */
  checkAnimToStart = () => {
    if (this.state.type === "determinate") {
      this.setProgressAnim();
    } else {
      this.setIndeterminateAnim();
    }
  }

  /**
   * Returns the label element if provided
   * @type {function}
   * @return {node|null} JSX for the label or null
   */
  getLabel = () => {
    let label = null;

    if (this.state.label) {
      label = (
        <PackenUiText style={{
          color: this.props.indicatorColor,
          width: "100%",
          textAlign: "center",
          paddingBottom: 10,
          ...this.state.styling.label
        }}>
          {this.state.label}
        </PackenUiText>
      );
    }

    return label;
  }

  /**
   * Updates the state with new props and checks which animation to run
   * @type {function}
   */
  updateState = () => {
    this.setState({
      ...this.setPropsToState()
    }, this.checkAnimToStart);
  }

  /**
   * Compares props to determine if the component should update its state with new props
   * @type {function}
   * @param {object} prevProps Previous props
   */
  componentDidUpdate(prevProps) {
    if (!UTIL.objectsEqual(prevProps, this.props)) {
      this.updateState();
    }
  }

  /**
   * Renders the component
   * @type {function}
   * @return {node} JSX for the component
   */
  render() {
    return (
      <View style={{
        ...this.getStyles().wrapper,
        ...this.state.wrapperStyle,
        ...this.state.styling.wrapper
        }}>
        {this.getLabel()}
        <Animated.View style={{
          ...this.getStyles().track,
          ...this.state.styling.track
        }}>
          <Animated.View
            style={{
              ...this.getStyles().indicator.base,
              ...this.getStyles().indicator.type[this.state.type],
              ...this.state.styling.indicator
            }}
          ></Animated.View>
        </Animated.View>
      </View>
    );
  }

  /**
   * Returns the current styles object
   * @type {function}
   * @return {object} The current styles object
   */
  getStyles = () => {
    return {
      wrapper: {
        width: "100%"
      },
      track: {
        overflow: "hidden",
        width: "100%",
        height: "auto",
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
  indicatorColor: PropTypes.string.isRequired,
  styling: PropTypes.object
};

export default PackenUiProgressbar;