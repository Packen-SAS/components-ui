import React, { Component, ReactNode } from "react";
import PropTypes from "prop-types";
import { View, TouchableNativeFeedback } from "react-native";
import * as UTIL from "../utils";

import colors from "../styles/abstracts/colors";
import PackenUiSvgIcon from "./PackenUiSvgIcon";
import PackenUiText from "./PackenUiText";

interface StylingPropShape {
  box: object;
  svgWidth: number | undefined;
  svgHeight: number | undefined;
  text: object;
}

interface PackenUiWhatsAppLinkProps {
  style?: object;
  text: string;
  trigger: Function;
  visible?: boolean;
  inverted?: boolean;
  color?: string;
  styling?: StylingPropShape;
  instance?: Function;
}

interface PackenUiWhatsAppLinkState {
  style: object;
  text: string;
  trigger: Function | boolean;
  visible: boolean;
  inverted: boolean;
  color: string;
  styling: StylingPropShape;
}

/**
 * Component for rendering a WhatsApp link
 */
class PackenUiWhatsAppLink extends Component<PackenUiWhatsAppLinkProps, PackenUiWhatsAppLinkState> {
  /**
   * Initializes the component
   * @param {object} props Props passed to the component
   */
  constructor(props: PackenUiWhatsAppLinkProps) {
    super(props);

    /**
     * Variable that stores the state
     * @type {object}
     */
    this.state = { ...this.setPropsToState() };
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
   * @property {object} [style={}] The optional custom styles specifically applied to the inner wrapper element
   * @property {string} [text="¿Necesitas ayuda?"] The label to display alongside the WhatsApp icon
   * @property {function} [trigger=false] The bacllback function to be called when pressing on the component
   * @property {boolean} [visible=false] Determines the visibility of the component
   * @property {boolean} [inverted=false] Determines whether to use the predefined alernative styles
   * @property {string} [color=Colors.basic.independence.drk_alt] The text color
   * @property {object} [styling={ box: {}, svgWidth: undefined, svgHeight: undefined, text: {} }] The optional custom styling props
   * @return {object} The props mapped to the state keys
   */
  setPropsToState: Function = (): PackenUiWhatsAppLinkState => {
    return {
      style: this.props.style ? { ...this.props.style } : {},
      text: this.props.text ? this.props.text : "¿Necesitas ayuda?",
      trigger: this.props.trigger ? this.props.trigger : false,
      visible: this.props.visible ? this.props.visible : false,
      inverted: this.props.inverted ? this.props.inverted : false,
      color: this.props.color ? this.props.color : colors.basic.independence.drk_alt,
      styling: this.props.styling ? { ...this.props.styling } : {
        box: {},
        svgWidth: undefined,
        svgHeight: undefined,
        text: {}
      }
    }
  }

  /**
   * Triggers the provided callback function when pressing the component
   * @type {function}
   */
  trigger: VoidFunction = () => {
    if (typeof this.state.trigger === "function") {
      this.state.trigger();
    }
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
  componentDidUpdate(prevProps: PackenUiWhatsAppLinkProps) {
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
      <React.Fragment>
        {
          this.props.visible ? (
            <TouchableNativeFeedback
              onPress={this.trigger}>
              <View style={{
                ...this.getStyles().box,
                ...this.state.style,
                ...this.state.styling.box
              }}>
                <PackenUiSvgIcon
                  name={!this.state.inverted ? "whatsapp" : "whatsapp_inverted"}
                  width={this.state.styling.svgWidth ? this.state.styling.svgWidth : 18}
                  height={this.state.styling.svgHeight ? this.state.styling.svgHeight : 18} />
                <PackenUiText
                  style={{
                    ...this.getStyles().label,
                    ...this.state.styling.text
                  }}>
                  {this.state.text}
                </PackenUiText>
              </View>
            </TouchableNativeFeedback>
          ) : null
        }
      </React.Fragment>
    )
  };

  /**
   * Returns the current styles object
   * @type {function}
   * @return {object} The current styles object
   */
  getStyles: Function = (): object => ({
    box: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      flexDirection: "row",
      width: "auto",
      height: "auto",
      padding: 5
    },
    label: {
      textDecorationStyle: "solid",
      textDecorationLine: "underline",
      textTransform: "uppercase",
      fontSize: 12,
      color: this.state.color,
      textDecorationColor: this.state.color
    }
  })

  /**
   * Defines prop-types for the component
   * @type {object}
   */
  static propTypes: object = {
    style: PropTypes.object,
    text: PropTypes.string.isRequired,
    trigger: PropTypes.func.isRequired,
    visible: PropTypes.bool,
    inverted: PropTypes.bool,
    color: PropTypes.string,
    styling: PropTypes.object,
    instance: PropTypes.func
  };
}

export default PackenUiWhatsAppLink;