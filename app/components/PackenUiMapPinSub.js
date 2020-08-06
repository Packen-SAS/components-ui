import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

import Icon from "react-native-vector-icons/dist/Feather";

import Typography from "../styles/abstracts/typography";
import Colors from "../styles/abstracts/colors";
import Shadows from "../styles/abstracts/shadows";

import PackenUiText from "./PackenUiText";

/**
 * Component for rendering the "sub" element of {@link PackenUiMapPin} components, and should not be used standalone
 */
class PackenUiMapPinSub extends Component {
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
   * Centralizes the received props assignment to set them to the state, determining default values in case any is not provided
   * @type {function}
   * @property {string} [theme="primary"] The theme to apply correct styles - "primary"; "white"; "white_primary"
   * @property {object} [icon=false] The configuration data in case the component should render an icon
   * @property {object} [label=false] The configuration data in case the component should render a label/character
   * @property {string} [dotPosition=false] The positioning for the dot in case it should render one
   * @property {string} [type="info"] The type of {@link PackenUiMapPin} component to apply correct styles - "info" or "icon"
   * @property {object} [styling={ box: {}, iconSize: undefined, iconColor: undefined, character: {}, dot: {} }] The optional custom styling props
   * @return {object} The props mapped to the state keys
   */
  setPropsToState = () => {
    return {
      theme: this.props.theme ? this.props.theme : "primary",
      icon: this.props.icon ? this.props.icon : false,
      label: this.props.label ? this.props.label : false,
      dotPosition: this.props.dotPosition ? this.props.dotPosition : false,
      type: this.props.type ? this.props.type : "info",
      styling: this.props.styling ? { ...this.props.styling } : {
        box: {},
        iconSize: undefined,
        iconColor: undefined,
        character: {},
        dot: {}
      }
    };
  }

  /**
   * Returns the correct color for the icon
   * @type {function}
   * @return {string} The color hex code value
   */
  getIconColor = () => {
    let color = this.getStyles().icon.type.icon.color;

    if (this.state.theme) {
      color = this.getStyles().icon.theme[this.state.theme].color;
    }

    return color;
  }

  /**
   * Returns the icon element if set so
   * @type {function}
   * @return {node|null} JSX for the icon or null
   */
  getIcon = () => {
    let icon = null;

    if (this.state.icon) {
      icon = (
        <Icon
          name={this.state.icon}
          color={this.state.styling.iconColor ? this.state.styling.iconColor : this.getIconColor()}
          size={this.state.styling.iconSize ? this.state.styling.iconSize : this.getStyles().icon.type.icon.fontSize}
        />
      );
    }

    return icon;
  }

  /**
   * Returns the label element if set so
   * @type {function}
   * @return {node|null} JSX for the label or null
   */
  getLabel = () => {
    let label = null;

    if (this.state.label) {
      label = (
        <PackenUiText
          style={{
            ...this.getStyles().character.base,
            ...this.getStyles().character.theme[this.state.theme],
            ...this.state.styling.character
          }}
        >
          {this.state.label.toUpperCase()}
        </PackenUiText>
      );
    }

    return label;
  }

  /**
   * Returns the dot element if set so
   * @type {function}
   * @return {node|null} JSX for the dot or null
   */
  getDot = () => {
    let dot = null;

    if (this.state.dotPosition) {
      dot = (
        <View
          style={{
            ...this.getStyles().dot.base,
            ...this.getStyles().dot.positioning.type[this.state.type][this.state.dotPosition],
            ...this.state.styling.dot
          }}
        ></View>
      );
    }

    return dot;
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
      <View
        style={{
          ...this.getStyles().sub.base,
          ...this.getStyles().sub.type[this.state.type],
          ...this.getStyles().sub.theme[this.state.theme],
          ...this.state.styling.box
        }}
      >
        {this.getIcon()}
        {this.getLabel()}
        {this.getDot()}
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
      dot: {
        base: {
          width: 6,
          height: 6,
          borderWidth: 2,
          borderRadius: 10,
          borderStyle: "solid",
          borderColor: Colors.basic.independence.drk,
          backgroundColor: Colors.brand.primary.dft,
          position: "absolute"
        },
        positioning: {
          type: {
            icon: {
              top: {
                top: -11,
                left: 13
              },
              right: {
                top: 13,
                right: -11
              },
              bottom: {
                left: 13,
                bottom: -11
              },
              left: {
                top: 13,
                left: -11
              }
            },
            info: {
              top: {
                top: -11,
                left: 9
              },
              right: {
                top: 9,
                right: -11
              },
              bottom: {
                left: 9,
                bottom: -11
              },
              left: {
                top: 9,
                left: -11
              }
            }
          }
        }
      },
      sub: {
        base: {
          position: "relative",
          zIndex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: Colors.basic.independence.drk,
          ...Shadows.lg
        },
        type: {
          icon: {
            height: 32,
            width: 32
          },
          info: {
            height: 24,
            width: 24
          }
        },
        theme: {
          primary: {
            backgroundColor: Colors.basic.independence.drk
          },
          white: {
            backgroundColor: Colors.basic.independence.drk
          },
          white_primary: {
            backgroundColor: Colors.brand.secondary.dft
          }
        }
      },
      icon: {
        type: {
          icon: {
            fontSize: Typography.size.medium,
            color: Colors.brand.primary.dft
          },
          info: {
            fontSize: Typography.size.tiny
          }
        },
        theme: {
          primary: {
            color: Colors.brand.primary.dft
          },
          white: {
            color: Colors.brand.primary.dft
          },
          white_primary: {
            color: Colors.basic.white.dft
          }
        }
      },
      character: {
        base: {
          fontFamily: Typography.family.bold,
          fontSize: Typography.size.large,
          lineHeight: Typography.lineheight.huge,
          paddingBottom: 3
        },
        theme: {
          primary: {
            color: Colors.brand.primary.dft
          },
          white: {
            color: Colors.brand.primary.dft
          },
          white_primary: {
            color: Colors.basic.white.dft
          }
        }
      }
    };
  }
}

PackenUiMapPinSub.propTypes = {
  theme: PropTypes.string.isRequired,
  icon: PropTypes.string,
  label: PropTypes.string,
  dotPosition: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  type: PropTypes.string.isRequired,
  styling: PropTypes.object
};

export default PackenUiMapPinSub;