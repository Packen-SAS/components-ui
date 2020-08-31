import React, { Component, ReactNode } from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import PropTypes from "prop-types";
import * as UTIL from "../utils";

import Icon from "react-native-vector-icons/Feather";
import Colors from "../styles/abstracts/colors";

import PackenUiText from "./PackenUiText";

interface StylingPropShape {
  box: object;
  iconWrapper: object;
  iconSize: number | undefined;
  iconColor: string | undefined;
  title: object;
}

interface PackenUiHeaderProps {
  children: ReactNode;
  titlePreset?: string;
  icon?: string;
  noIcon?: boolean;
  onBackPress: Function;
  style?: object;
  styling?: StylingPropShape;
  instance?: Function;
}

interface PackenUiHeaderState {
  children: ReactNode;
  titlePreset: string;
  icon: string;
  noIcon: boolean;
  onBackPress: Function | boolean;
  customStyle: object;
  styling: StylingPropShape;
}

/**
 * Component for rendering header layouts with a touchable icon on the left
 */
class PackenUiHeader extends Component<PackenUiHeaderProps, PackenUiHeaderState> {
  /**
   * Initializes the component
   * @type {function}
   * @param {object} props Props passed to the component
   */
  constructor(props: PackenUiHeaderProps) {
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
   * @property {node} [children=null] The title text
   * @property {string} [titlePreset="h6"] The style preset for the title
   * @property {string} [icon="arrow-left"] The icon name to be displayed
   * @property {function} [onBackPress=false] The callback function to be called when pressing the icon
   * @property {object} [customStyle={}] Custom styles object to be applied specifically to the wrapping box element
   * @property {object} [styling={ box: {}, iconSize: undefined, iconColor: undefined, title: {} }] The theme of the divider - "light" or "dark"
   * @return {object} The props mapped to the state keys
   */
  setPropsToState: Function = (): PackenUiHeaderState => {
    return {
      children: this.props.children || null,
      titlePreset: this.props.titlePreset || 'h6',
      icon: this.props.icon || "arrow-left",
      noIcon: this.props.noIcon || false,
      onBackPress: this.props.onBackPress || false,
      customStyle: this.props.style || {},
      styling: this.props.styling ? { ...this.props.styling } : {
        box: {},
        iconWrapper: {},
        iconSize: undefined,
        iconColor: undefined,
        title: {}
      }
    };
  }

  /**
   * Handles the onPress event on the icon
   * @type {function}
   * @return {boolean} Flag used only for testing purposes
   */
  onPressHandler: VoidFunction = (): boolean | void => {
    if (typeof this.state.onBackPress === "function") {
      this.state.onBackPress();
    } else {
      return false;
    }
  }

  /**
   * Updates the state with new props
   * @type {function}
   */
  updateState: VoidFunction = () => {
    this.setState({ ...this.setPropsToState() });
  }

  /**
   * Compares props to determine if the component should update its state with new props
   * @type {function}
   * @param {object} prevProps Previous props
   */
  componentDidUpdate(prevProps: PackenUiHeaderProps) {
    if (!UTIL.objectsEqual(prevProps, this.props)) {
      this.updateState();
    }
  }

  /**
   * Returns the icon element for the component or null if set so
   * @type {function}
   * @return {node|null} JSX for the icon element or null
   */
  getIcon: Function = (): ReactNode | null => {
    if (this.state.noIcon) { return null; }
    return (
      <View style={{
        ...this.getStyles().iconWrapper,
        ...this.state.styling.iconWrapper
      }}
      >
        <TouchableWithoutFeedback onPress={this.onPressHandler}>
          <Icon
            name={this.state.icon}
            size={this.state.styling.iconSize ? this.state.styling.iconSize : 20}
            color={this.state.styling.iconColor ? this.state.styling.iconColor : Colors.brand.primary.drk}
          />
        </TouchableWithoutFeedback>
      </View>
    );
  }

  /**
   * Renders the component
   * @type {function}
   * @return {node} JSX for the component
   */
  render(): ReactNode {
    return (
      <View style={{
        ...this.getStyles().box,
        ...this.state.customStyle,
        ...this.state.styling.box
      }}>
        {this.getIcon()}
        <PackenUiText
          preset={this.state.titlePreset}
          style={{
            ...this.getStyles().title,
            ...this.state.styling.title
          }}
        >
          {this.state.children}
        </PackenUiText>
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
      box: {
        width: "100%",
        padding: 20,
        paddingBottom: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: Colors.basic.white.dft
      },
      iconWrapper: {
        paddingRight: 15
      },
      title: {
        color: Colors.brand.primary.drk
      }
    }
  }

  /**
   * Defines prop-types for the component
   * @type {object}
   */
  static propTypes: object = {
    children: PropTypes.node.isRequired,
    titlePreset: PropTypes.string,
    icon: PropTypes.string,
    noIcon: PropTypes.bool,
    onBackPress: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]).isRequired,
    customStyle: PropTypes.object,
    styling: PropTypes.object,
    instance: PropTypes.func
  };
}

export default PackenUiHeader;