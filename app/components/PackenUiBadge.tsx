import React, { Component, ReactNode } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import * as UTIL from "../utils";

import colors from "../styles/abstracts/colors";
import PackenUiText from "./PackenUiText";

interface StylingPropShape {
  outer: object,
  content: object;
  dotWrapper: object;
  wrapper: object;
  label: object;
}

interface PackenUiBadgeProps {
  label?: string;
  children?: ReactNode;
  width?: number;
  height?: number;
  color?: string;
  fontSize?: number;
  borderRadius?: number;
  backgroundColor?: string;
  styling?: StylingPropShape;
  instance?: Function;
}

interface PackenUiBadgeState {
  label: string,
  children: ReactNode | boolean,
  width: number,
  height: number,
  color: string,
  fontSize: number,
  borderRadius: number | undefined,
  backgroundColor: string,
  styling: StylingPropShape
}

/**
 * Component for displaying notification badges as individual components or as wrappers in the upper right corner of its children
 */
class PackenUiBadge extends Component<PackenUiBadgeProps, PackenUiBadgeState> {
  /**
   * Initializes the component
   * @type {function}
   * @param {object} props Props passed to the component
   */
  constructor(props: PackenUiBadgeProps) {
    super(props);

    /**
     * Variable that stores the state
     * @type {object}
     */
    this.state = { ...this.setPropsToState() }
  }

  /**
   * Propagates the component instance if a callback is provided via props
   * @type {function}
   */
  componentDidMount() {
    if (typeof this.props.instance === "function") {
      this.props.instance(this);
    }
  }

  /**
   * Centralizes the received props assignment to set them to the state, determining default values in case any is not provided
   * @type {function}
   * @property {string} [label=""] The label to display inside the badge
   * @property {node} [children=false] The optional children to wrap the badge dot around
   * @property {number} [width=16] The width of the dot
   * @property {number} [height=16] The height of the dot
   * @property {string} [color=Colors.basic.white.dft] The color for the label
   * @property {number} [fontSize=12] The font size for the label
   * @property {number} [borderRadius=16] The border radius for the dot
   * @property {string} [backgroundColor=Colors.brand.primary.drk] The background color for the dot
   * @property {object} [styling={ outer: {}, content: {}, dotWrapper: {}, wrapper: {}, label: {} }] The optional custom styling props
   * @return {object} The props mapped to the state keys
   */
  setPropsToState: Function = (): PackenUiBadgeState => {
    return {
      label: this.props.label ? this.props.label.toString() : "",
      children: this.props.children ? this.props.children : false,
      width: this.props.width ? this.props.width : 16,
      height: this.props.height ? this.props.height : 16,
      color: this.props.color ? this.props.color : colors.basic.white.dft,
      fontSize: this.props.fontSize ? this.props.fontSize : 12,
      borderRadius: this.props.borderRadius ? this.props.borderRadius : this.props.height,
      backgroundColor: this.props.backgroundColor ? this.props.backgroundColor : colors.brand.primary.drk,
      styling: this.props.styling ? { ...this.props.styling } : {
        outer: {},
        content: {},
        dotWrapper: {},
        wrapper: {},
        label: {}
      }
    };
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
  componentDidUpdate(prevProps: PackenUiBadgeProps) {
    if (!UTIL.objectsEqual(prevProps, this.props)) {
      this.updateState();
    }
  }

  /**
   * Returns the main content depending on whether it's a standalone or wrapper component
   * @type {function}
   * @return {node} JSX for the main content
   */
  getContent: Function = (): ReactNode => {
    let content = (
      <View style={{ ...this.getStyle().wrapper, ...this.state.styling.wrapper }}>
        <PackenUiText preset="c2" style={{ ...this.getStyle().label, ...this.state.styling.label }}>{this.state.label}</PackenUiText>
      </View>
    );

    if (this.state.children) {
      content = (
        <View style={{ ...this.getStyle().outer, ...this.state.styling.outer }}>
          <View style={{ ...this.getStyle().content, ...this.state.styling.content }}>
            <View style={{ ...this.getStyle().dotWrapper, ...this.state.styling.dotWrapper }}>
              {content}
            </View>
            {this.state.children}
          </View>
        </View>
      );
    }

    return content;
  }

  /**
   * Renders the component
   * @type {function}
   * @return {node} JSX for the component
   */
  render(): ReactNode {
    return this.getContent();
  }

  /**
   * Returns the styles for the component
   * @type {function}
   * @return {object} The styles object
   */
  getStyle: Function = (): object => {
    return {
      outer: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-start"
      },
      dotWrapper: {
        top: -3,
        right: -3,
        zIndex: 1,
        position: "absolute",
        borderRadius: this.state.borderRadius
      },
      wrapper: {
        borderRadius: this.state.borderRadius,
        width: this.state.width,
        height: this.state.height,
        backgroundColor: this.state.backgroundColor,
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center"
      },
      label: {
        color: this.state.color,
        fontSize: this.state.fontSize
      },
      content: {}
    };
  }

  /**
   * Defines prop-types for the component
   * @type {object}
   */
  static propTypes: object = {
    label: PropTypes.string,
    children: PropTypes.node,
    width: PropTypes.number,
    height: PropTypes.number,
    color: PropTypes.string,
    fontSize: PropTypes.number,
    borderRadius: PropTypes.number,
    backgroundColor: PropTypes.string,
    styling: PropTypes.object,
    instance: PropTypes.func
  };
}

export default PackenUiBadge;