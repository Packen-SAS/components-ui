import React, { Component, ReactNode } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import * as UTIL from "../utils";

import Colors from "../styles/abstracts/colors";

interface MarginPropShape {
  top: number;
  bottom: number;
}

interface PackenUiDividerProps {
  type: string;
  size: number;
  margin?: MarginPropShape;
  width?: number;
  color?: string;
  instance?: Function;
}

interface PackenUiDividerState {
  type: string;
  size: number;
  width: string | number;
  margin: MarginPropShape | boolean;
  color: string;
}

/**
 * Component for rendering a horizontal line
 */
class PackenUiDivider extends Component<PackenUiDividerProps, PackenUiDividerState> {
  /**
   * Initializes the component
   * @type {function}
   * @param {object} props Props passed to the component
   */
  constructor(props: PackenUiDividerProps) {
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
   * @property {string} [type="light"] The theme of the divider - "light" or "dark"
   * @property {number} [size=1] The height of the line
   * @property {string|number} [width="100%"] The width of the line
   * @property {object} [margin=false] The optional margin top and bottom styles
   * @property {string} color The background color for the line
   * @return {object} The props mapped to the state keys
   */
  setPropsToState: Function = (): PackenUiDividerState => {
    return {
      type: this.props.type ? this.props.type : "light",
      size: this.props.size ? this.props.size : 1,
      width: this.props.width ? this.props.width : "100%",
      margin: this.props.margin ? { ...this.props.margin } : false,
      color: this.props.color ? this.props.color : this.props.type ? this.getStyles().type[this.props.type].backgroundColor : this.getStyles().type.light.backgroundColor
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
  componentDidUpdate(prevProps: PackenUiDividerProps) {
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
      <View style={{
        height: this.state.size,
        marginTop: typeof this.state.margin === "object" ? this.state.margin.top : 0,
        marginBottom: typeof this.state.margin === "object" ? this.state.margin.bottom : 0,
        ...this.getStyles().base,
        ...{ backgroundColor: this.state.color }
      }}></View>
    );
  }

  /**
   * Returns the current styles object
   * @type {function}
   * @return {object} The current styles object
   */
  getStyles: Function = (): object => {
    return {
      base: {
        width: this.props.width ? this.props.width : "100%",
        alignItems: "stretch"
      },
      type: {
        light: {
          backgroundColor: Colors.basic.gray.dft
        },
        dark: {
          backgroundColor: Colors.basic.independence.lgt
        }
      }
    };
  }

  /**
   * Defines prop-types for the component
   * @type {object}
   */
  static propTypes: object = {
    type: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    margin: PropTypes.object,
    width: PropTypes.number,
    color: PropTypes.string,
    instance: PropTypes.func
  };
}

export default PackenUiDivider;