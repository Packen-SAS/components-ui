import React, { Component, ReactNode } from "react";
import PropTypes from "prop-types";
import { Animated } from "react-native";
import * as UTIL from "../utils";

import PackenUiButton from "./PackenUiButton";

interface AnimStateShape {
  start: Function,
  stop: Function
}

interface StylingPropShape {
  shape: object;
  shapeContent: object;
  label: object;
  iconWrapper: object;
  iconSize: number | undefined;
  iconColor: string | undefined;
}

interface PackenUiLoaderButtonProps {
  children?: ReactNode;
  type: string;
  level: string;
  size: string;
  callback: VoidFunction;
  isDone: boolean;
  styling?: StylingPropShape;
  instance?: Function;
}

interface PackenUiLoaderButtonState {
  children: ReactNode;
  type: string;
  level: string;
  size: string;
  callback: VoidFunction;
  isDone: boolean;
  styling: StylingPropShape | {};
  anim: AnimStateShape;
  rotate: Animated.AnimatedValue;
}

/**
 * Component that wraps {@link PackenUiButton} for rendering a loader animation in it
 */
class PackenUiLoaderButton extends Component<PackenUiLoaderButtonProps, PackenUiLoaderButtonState> {
  /**
   * Initializes the component
   * @type {function}
   * @param {object} props Props passed to the component
   */
  constructor(props: PackenUiLoaderButtonProps) {
    super(props);

    /**
     * Variable that stores the state
     * @type {object}
     * @property {object} anim The animation configuration object
     * @property {object} rotate The Animated.Value instance for the rotation animation
     */
    this.state = {
      ...this.setPropsToState(),
      anim: null,
      rotate: new Animated.Value(0)
    }
  }

  /**
   * Placeholder function that does nothing
   * @type {function}
   */
  mockCallback: VoidFunction = (): boolean => false;

  /**
   * Centralizes the received props assignment to set them to the state, determining default values in case any is not provided
   * @type {function}
   * @property {node} [children=null] The actual text for the button
   * @property {string} [type="regular"] The type of button - "regular" or "icon"
   * @property {string} [level="primary"] The theme for the styling - "primary"; "secondary"; "tertiary"; "ghost"; "danger"
   * @property {string} [size="medium"] The size for the styling of elements - "tiny"; "small"; "medium"; "large"; "giant"
   * @property {function} [callback=this.mockCallback] The callback function to be called when pressing the button once it loads
   * @property {boolean} [isDone=false] Determines if the animation should stop and the pointer events be enabled
   * @property {object} [styling={}] The optional custom styling props to be passed to the {@link PackenUiButton} component
   * @return {object} The props mapped to the state keys
   */
  setPropsToState: Function = (): object => {
    return {
      children: this.props.children ? this.props.children : null,
      type: this.props.type ? this.props.type : "regular",
      level: this.props.level ? this.props.level : "primary",
      size: this.props.size ? this.props.size : "medium",
      callback: this.props.callback ? this.props.callback : this.mockCallback,
      isDone: this.props.isDone ? this.props.isDone : false,
      styling: this.props.styling ? { ...this.props.styling } : {}
    };
  }

  /**
   * Propagates the component instance if a callback is provided via props and initializes the animation
   * @type {function}
   */
  componentDidMount() {
    this.setAnim();

    if (typeof this.props.instance === "function") {
      this.props.instance(this);
    }
  }

  /**
   * Configures the animation and sets it to the state
   * @type {function}
   */
  setAnim: Function = () => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.rotate, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false
        })
      ])
    );
    this.setState({
      anim: anim
    });
  }

  /**
   * Returns the correct icon name depending on the current status
   * @type {function}
   * @return {string} The icon name to be used
   */
  getIconName: Function = (): string => {
    return this.state.isDone ? "check" : "loader";
  }

  /**
   * Updates the state with new props
   * @type {function}
   */
  updateState: Function = () => {
    this.setState({ ...this.setPropsToState() });
  }

  /**
   * Compares props to determine if the component should update its state with new props
   * @type {function}
   * @param {object} prevProps Previous props
   */
  componentDidUpdate(prevProps: PackenUiLoaderButtonProps) {
    if (!UTIL.objectsEqual(prevProps, this.props)) {
      this.updateState();
    }
  }

  /**
   * Renders the component
   * @type {function}
   * @return {node} JSX for the component
   */
  render(): ReactNode {
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
        styling={this.state.styling}
        nonTouchable={this.state.isDone ? false : true}
      >{this.state.children}</PackenUiButton>
    );
  }

  /**
   * Returns the current styles object
   * @type {function}
   * @return {object} The current styles object
   */
  getStyles: Function = (): object => {
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

  /**
   * Defines prop-types for the component
   * @type {object}
   */
  static propTypes: object = {
    children: PropTypes.string,
    type: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    callback: PropTypes.func.isRequired,
    isDone: PropTypes.bool,
    styling: PropTypes.object,
    instance: PropTypes.func
  };
}

export default PackenUiLoaderButton;