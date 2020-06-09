import React, { Component } from "react";
import PropTypes from "prop-types";
import { Animated } from "react-native";

import PackenUiButton from "./PackenUiButton";

/**
 * Component that wraps {@link PackenUiButton} for rendering a loader animation in it
 */
class PackenUiLoaderButton extends Component {
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
  mockCallback = () => false;

  /**
   * Centralizes the received props assignment to set them to the state, determining default values in case any is not provided
   * @type {function}
   * @property {string} [children=null] The actual text for the button
   * @property {string} [type="regular"] The type of button - "regular" or "icon"
   * @property {string} [level="primary"] The theme for the styling - "primary"; "secondary"; "tertiary"; "ghost"; "danger"
   * @property {string} [size="medium"] The size for the styling of elements - "tiny"; "small"; "medium"; "large"; "giant"
   * @property {function} [callback=this.mockCallback] The callback function to be called when pressing the button once it loads
   * @property {boolean} [isDone=false] Determines if the animation should stop and the pointer events be enabled
   * @property {object} [styling={}] The optional custom styling props to be passed to the {@link PackenUiButton} component
   * @return {object} The props mapped to the state keys
   */
  setPropsToState = () => {
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

  /**
   * Returns the correct icon name depending on the current status
   * @type {function}
   * @return {string} The icon name to be used
   */
  getIconName = () => {
    return this.state.isDone ? "check" : "loader";
  }

  /**
   * Updates the state with new props
   * @type {function}
   */
  updateState = () => {
    this.setState({ ...this.setPropsToState() });
  }

  /**
   * Compares props to determine if the component should update its state with new props
   * @type {function}
   * @param {object} prevProps Previous props
   */
  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
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
  getStyles = () => {
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
}

PackenUiLoaderButton.propTypes = {
  children: PropTypes.node,
  type: PropTypes.string.isRequired,
  level: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
  isDone: PropTypes.bool,
  styling: PropTypes.object
};

export default PackenUiLoaderButton;