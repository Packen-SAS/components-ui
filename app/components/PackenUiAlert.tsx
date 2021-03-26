import React, { Component, ReactNode } from "react";
import PropTypes from "prop-types";
import { View, TouchableWithoutFeedback } from "react-native";
import * as UTIL from "../utils";

import Icon from "react-native-vector-icons/Feather";
import Colors from "../styles/abstracts/colors";
import Shadows from "../styles/abstracts/shadows";
import Typography from "../styles/abstracts/typography";

import PackenUiText from "./PackenUiText";

interface TextPropShape {
  title: string;
  main: string;
  preset: string | undefined;
}

interface StylingPropShape {
  box: object;
  text: object;
  iconSize: number | undefined;
  iconColor: string | undefined;
  iconWrapper: object;
}

interface PackenUiAlertProps {
  type: string;
  theme: string;
  text: TextPropShape;
  onClose: Function | boolean;
  dismiss?: Function;
  countdown?: number | boolean;
  visible?: boolean;
  position?: string;
  styling?: StylingPropShape;
  instance?: Function;
}

interface PackenUiAlertState {
  type: string;
  theme: string;
  text: TextPropShape,
  onClose: Function | boolean;
  countdown: number | boolean;
  visible: boolean;
  position: string;
  styling: StylingPropShape;
}

/**
 * Component for displaying general alert banners
 */
class PackenUiAlert extends Component<PackenUiAlertProps, PackenUiAlertState> {
  /**
   * Initializes the component
   * @type {function}
   * @param {object} props Props passed to the component
   */
  constructor(props: PackenUiAlertProps) {
    super(props);

    /**
     * Variable that stores the state
     * @type {object}
     */
    this.state = { ...this.setPropsToState() }
  }

  /**
   * Centralizes the received props assignment to set them to the state, determining default values in case any is not provided
   * @type {function}
   * @property {string} [type="static"] The type of alert to display - "static" for alerts without a time limit; "timed" for alerts with a countdown
   * @property {string} [theme="default"] The theme to apply the correct styles - "default"; "primary"; "info"; "warning"; "danger"; "success"
   * @property {object} [text={ title: "", main: "", preset: undefined }] The configuration object for the text to display - "title": the initial label in bold; "main": the actual message; "preset": 
   * @property {function} [onClose=false] Optional callback to be triggered when closing the alert
   * @property {number} [countdown=false] Number of milliseconds for "timed" alerts
   * @property {boolean} [visible=false] Whether the alert should be visible
   * @property {string} [position="bottom"] The position for the alert
   * @property {object} [styling={ box: {}, text: {}, iconSize: undefined, iconColor: undefined, iconWrapper: {} }] The optional custom styling props
   * @return {object} The props mapped to the state keys
   */
  setPropsToState: Function = (): PackenUiAlertState => {
    return {
      type: this.props.type ? this.props.type : "static",
      theme: this.props.theme ? this.props.theme : "default",
      text: this.props.text ? { ...this.props.text } : {
        title: "",
        main: "",
        preset: undefined
      },
      onClose: this.props.onClose ? this.props.onClose : false,
      countdown: this.props.countdown ? this.props.countdown : false,
      visible: this.props.visible ? this.props.visible : false,
      position: this.props.position ? this.props.position : "bottom",
      styling: this.props.styling ? { ...this.props.styling } : {
        box: {},
        text: {},
        iconSize: undefined,
        iconColor: undefined,
        iconWrapper: {}
      }
    };
  }

  /**
   * Checks if the alert should be "timed", and propagates the componet instance via props callback
   * @type {function}
   */
  componentDidMount() {
    this.checkIfTimed();

    if (typeof this.props.instance === "function") {
      this.props.instance(this);
    }
  }

  /**
   * Validates whether the alert should have a countdown
   * @type {function}
   * @return {boolean} Flag used only for testing purposes
   */
  checkIfTimed: VoidFunction = (): boolean | void => {
    if (this.state.type === "timed" && this.state.countdown) {
      const timeout = setTimeout(() => {
        this.close();
        clearTimeout(timeout);
      }, this.state.countdown);
    } else {
      return false;
    }
  }

  /**
   * Triggers the provided callbacks
   * @type {function}
   * @return {boolean} Flag used for testing
   */
  close: VoidFunction = (): boolean => {
    let flag = true;
    if (typeof this.state.onClose === "function") {
      this.state.onClose();
    } else {
      flag = false;
    }
    if (typeof this.props.dismiss === "function") {
      this.props.dismiss();
    } else {
      flag = false;
    }
    return flag;
  }

  /**
   * Returns the correct icon name depending on the provided theme
   * @type {function}
   * @return {string} The icon name to be used
   */
  getIconName: Function = (): string => {
    let iconName = "info";

    switch (this.state.theme) {
      case "success":
        iconName = "check-circle";
        break;
      case "warning":
      case "danger":
        iconName = "alert-triangle";
        break;
    }

    return iconName;
  }

  /**
   * Returns the title
   * @type {function}
   * @return {string} The formatted title
   */
  getTitle: Function = (): string => {
    let title = "";

    if (this.state.text.title) {
      title = `${this.state.text.title}: `;
    }

    return title;
  }

  /**
   * Returns the icon
   * @type {function}
   * @return {node} JSX for the icon
   */
  getIcon: Function = (): ReactNode => (
    <View style={[this.getStyles().iconWrapper, this.state.styling.iconWrapper]}>
      <Icon
        name={this.getIconName()}
        size={this.state.styling.iconSize ? this.state.styling.iconSize : this.getStyles().icon.base.size}
        color={this.state.styling.iconColor ? this.state.styling.iconColor : this.getStyles().icon.theme[this.state.theme].color}
      />
    </View>
  )

  /**
   * Returns the main content
   * @type {function}
   * @return {node} JSX for the main content
   */
  getMain: Function = (): ReactNode => (
    <View style={this.getStyles().main}>
      <PackenUiText
        preset={this.state.text.preset}
        style={{
          ...this.getStyles().text.theme[this.state.theme],
          ...this.state.styling.text
        }}
      >
        <PackenUiText
          preset={this.state.text.preset}
          style={{
            ...this.getStyles().text.theme[this.state.theme],
            ...this.state.styling.text,
            fontFamily: Typography.family.bold
          }}
        >{this.getTitle()}</PackenUiText>{this.state.text.main}</PackenUiText>
    </View>
  )

  /**
   * Returns the "close" icon
   * @type {function}
   * @return {node} JSX for the "close" icon
   */
  getClose: Function = (): ReactNode => (
    <TouchableWithoutFeedback onPress={this.close}>
      <View style={[this.getStyles().iconWrapper, this.state.styling.iconWrapper]}>
        <Icon
          name="x"
          size={this.state.styling.iconSize ? this.state.styling.iconSize : this.getStyles().icon.base.size}
          color={this.state.styling.iconColor ? this.state.styling.iconColor : this.getStyles().icon.theme[this.state.theme].color}
        />
      </View>
    </TouchableWithoutFeedback>
  )

  /**
   * Returns the correct positioning styles
   * @type {function}
   * @return {object} The positioning styles
   */
  getPositionAlert: Function = (): object => {
    const position = this.getStyles().box.position[this.state.position];
    if (!position) {
      return this.getStyles().box.position.bottom;
    }
    return position;
  }

  /**
   * Updates the state with new props and checks if it's now a "timed" alert
   * @type {function}
   */
  updateState: Function = () => {
    this.setState({
      ...this.setPropsToState()
    }, this.checkIfTimed);
  }

  /**
   * Compares props to determine if the component should update its state with new props
   * @type {function}
   * @param {object} prevProps Previous props
   */
  componentDidUpdate(prevProps: PackenUiAlertProps) {
    if (!UTIL.objectsEqual(prevProps, this.props)) {
      this.updateState();
    }
  }

  /**
   * Renders the component
   * @type {function}
   * @return {node} JSX for the component
   */
  render(): ReactNode | null {
    return (
      this.state.visible ? (
        <View style={[this.getStyles().box.main, this.getPositionAlert()]}>
          <View style={[
            this.getStyles().box.base,
            this.getStyles().box.theme[this.state.theme],
            this.state.styling.box
          ]}>
            {this.getIcon()}
            {this.getMain()}
            {this.getClose()}
          </View>
        </View>
      ) : null
    );
  }

  /**
   * Returns the styles for the component
   * @type {function}
   * @return {object} The styles object
   */
  getStyles: Function = (): object => {
    return {
      box: {
        main: {
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        },
        position: {
          top: { top: 0 },
          bottom: { bottom: 0 }
        },
        base: {
          width: "90%",
          position: "relative",
          padding: 16,
          borderWidth: 1,
          borderStyle: "solid",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: 4,
          ...Shadows.md
        },
        theme: {
          default: {
            borderColor: Colors.basic.independence.lgt,
            backgroundColor: Colors.basic.gray.lgt
          },
          primary: {
            borderColor: Colors.brand.primary.drk,
            backgroundColor: Colors.brand.primary.snw
          },
          info: {
            borderColor: Colors.info.drk,
            backgroundColor: Colors.info.lgt
          },
          warning: {
            borderColor: Colors.warning.drk,
            backgroundColor: Colors.warning.lgt
          },
          danger: {
            borderColor: Colors.danger.focus,
            backgroundColor: Colors.danger.lgt
          },
          success: {
            borderColor: Colors.success.drk,
            backgroundColor: Colors.success.lgt
          }
        }
      },
      iconWrapper: {
        width: 16
      },
      icon: {
        base: {
          size: 16
        },
        theme: {
          default: {
            color: Colors.basic.independence.lgt
          },
          primary: {
            color: Colors.brand.primary.drk
          },
          info: {
            color: Colors.info.default
          },
          warning: {
            color: Colors.warning.drk
          },
          danger: {
            color: Colors.danger.focus
          },
          success: {
            color: Colors.success.drk
          }
        }
      },
      main: {
        flex: 1,
        paddingHorizontal: 10
      },
      text: {
        theme: {
          default: {
            color: Colors.basic.independence.lgt
          },
          primary: {
            color: Colors.brand.primary.drk
          },
          info: {
            color: Colors.info.default
          },
          warning: {
            color: Colors.warning.drk
          },
          danger: {
            color: Colors.danger.focus
          },
          success: {
            color: Colors.success.drk
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
    type: PropTypes.string.isRequired,
    theme: PropTypes.string.isRequired,
    text: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    dismiss: PropTypes.func,
    countdown: PropTypes.number,
    visible: PropTypes.bool,
    position: PropTypes.string,
    styling: PropTypes.object,
    instance: PropTypes.func
  };
}

export default PackenUiAlert;