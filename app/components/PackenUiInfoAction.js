import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, TouchableWithoutFeedback } from "react-native";

import Icon from "react-native-vector-icons/dist/Feather";
import Colors from "../styles/abstracts/colors";
import Typography from "../styles/abstracts/typography";
import Shadows from "../styles/abstracts/shadows";

import PackenUiText from "./PackenUiText";
import PackenUiSvgIcon from "./PackenUiSvgIcon";

/**
 * Component for rendering an action's current state and its trigger to change it
 */
class PackenUiInfoAction extends Component {
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
   * Placeholder function that does nothing
   * @type {function}
   */
  mockCallback = () => false;

  /**
   * Centralizes the received props assignment to set them to the state, determining default values in case any is not provided
   * @type {function}
   * @property {string} [theme="primary"] The theme for styles - "primary"; "success"; "danger"
   * @property {string} [title=""] The main title
   * @property {string} [caption=false] The small text between parentheses next to the title
   * @property {string} [subtitle=false] The subtitle text below the main title
   * @property {function} [callback=() => false] The callbak function to trigger when pressing on the component
   * @property {object} [boxStyle={}] The optional styles specifically applied to the box element
   * @property {string} [img=""] The name idenfier for the {@link PackenUiSvgIcon} component
   * @property {object} [icon={ name: "play", size: 14 }] The configuration object for the component's icon
   * @property {object} [styling={ box: {}, main: {}, mainTop: {}, title: {}, svgWidth: undefined, svgHeight: undefined, iconSize: undefined, iconColor: undefined, caption: {}, subtitle: {}, subtitleIconColor: undefined, subtitleIconSize: undefined }] The optional custom styling props
   * @return {object} The props mapped to the state keys
   */
  setPropsToState = () => {
    return {
      theme: this.props.theme ? this.props.theme : "primary",
      title: this.props.title ? this.props.title : "",
      caption: this.props.caption ? this.props.caption : false,
      subtitle: this.props.subtitle ? this.props.subtitle : false,
      callback: this.props.callback ? this.props.callback : this.mockCallback,
      boxStyle: this.props.style ? { ...this.props.style } : {},
      img: this.props.img ? this.props.img : "",
      icon: this.props.icon ? { ...this.props.icon } : {
        name: "play",
        size: 14
      },
      styling: this.props.styling ? { ...this.props.styling } : {
        box: {},
        main: {},
        mainTop: {},
        title: {},
        svgWidth: undefined,
        svgHeight: undefined,
        iconSize: undefined,
        iconColor: undefined,
        caption: {},
        subtitle: {},
        subtitleIconSize: undefined,
        subtitleIconColor: undefined
      }
    };
  }

  /**
   * Returns the caption element
   * @type {function}
   * @return {node|null} JSX for the caption or null
   */
  getCaption = () => {
    let caption = null;

    if (this.state.caption) {
      caption = (
        <PackenUiText
          preset="c1"
          style={{
            ...this.getStyles().caption,
            ...this.state.styling.caption
          }}
        >{this.state.caption}</PackenUiText>
      );
    }

    return caption;
  }

  /**
   * Returns the subtitle element
   * @type {function}
   * @return {node|null} JSX for the subtitle or null
   */
  getSubtitle = () => {
    let subtitle = null;

    if (this.state.subtitle) {
      let icon = undefined;
      if (this.state.theme !== "primary") {
        let name = "";
        if (this.state.theme === "success") {
          name = "check-circle";
        } else {
          name = "x-circle";
        }

        icon = {
          name: name,
          position: "right",
          color: this.state.styling.subtitleIconColor ? this.state.styling.subtitleIconColor : Colors[this.state.theme].default,
          size: this.state.styling.subtitleIconSize ? this.state.styling.subtitleIconSize : Typography.c1.fontSize
        }
      }

      subtitle = (
        <PackenUiText
          preset="c1"
          icon={icon}
          style={{
            ...this.getStyles().subtitle.theme[this.state.theme],
            ...this.state.styling.subtitle
          }}
        >{this.state.subtitle}</PackenUiText>
      );
    }

    return subtitle;
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
      <TouchableWithoutFeedback onPress={this.state.callback}>
        <View style={{
          ...this.getStyles().box.base,
          ...this.getStyles().box.theme[this.state.theme],
          ...this.state.boxStyle,
          ...this.state.styling.box
        }}>
          <PackenUiSvgIcon name={this.state.img} width={this.state.styling.svgWidth ? this.state.styling.svgWidth : 20} height={this.state.styling.svgHeight ? this.state.styling.svgHeight : 20} />
          <View style={{
            ...this.getStyles().main,
            ...this.state.styling.main
          }}>
            <View style={{
              ...this.getStyles().mainTop,
              ...this.state.styling.mainTop
            }}>
              <PackenUiText preset="p1" style={{
                ...this.getStyles().title,
                ...this.state.styling.title
              }}>{this.state.title}</PackenUiText>
              {this.getCaption()}
            </View>
            {this.getSubtitle()}
          </View>
          <Icon
            name={this.state.icon.name}
            size={this.state.styling.iconSize ? this.state.styling.iconSize : this.state.icon.size}
            color={this.state.styling.iconColor ? this.state.styling.iconColor : this.getStyles().icon.theme[this.state.theme].color} />
        </View>
      </TouchableWithoutFeedback>
    );
  }

  /**
   * Returns the current styles object
   * @type {function}
   * @return {object} The current styles object
   */
  getStyles = () => {
    return {
      box: {
        base: {
          height: 56,
          borderWidth: 1,
          borderStyle: "solid",
          paddingRight: 20,
          paddingLeft: 15,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: Colors.basic.white.dft,
          ...Shadows.sm
        },
        theme: {
          primary: {
            borderColor: Colors.brand.primary.drk
          },
          success: {
            borderColor: Colors.success.default
          },
          danger: {
            borderColor: Colors.danger.default
          }
        }
      },
      main: {
        flex: 1,
        paddingHorizontal: 10
      },
      mainTop: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start"
      },
      title: {
        marginRight: 3,
        color: Colors.basic.independence.dft
      },
      caption: {
        color: Colors.basic.independence.dft
      },
      subtitle: {
        theme: {
          primary: {
            color: Colors.basic.gray.drk
          },
          success: {
            color: Colors.success.default
          },
          danger: {
            color: Colors.danger.default
          }
        }
      },
      icon: {
        theme: {
          primary: {
            color: Colors.brand.primary.drk
          },
          success: {
            color: Colors.success.default
          },
          danger: {
            color: Colors.danger.default
          }
        }
      }
    };
  }
}

PackenUiInfoAction.propTypes = {
  theme: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  caption: PropTypes.string,
  subtitle: PropTypes.string,
  callback: PropTypes.func.isRequired,
  style: PropTypes.object,
  img: PropTypes.string.isRequired,
  icon: PropTypes.object,
  styling: PropTypes.object
};

export default PackenUiInfoAction;