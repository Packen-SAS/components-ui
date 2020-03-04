import React, { Component } from "react";
import { TouchableWithoutFeedback, View } from "react-native"

import Icon from "react-native-vector-icons/Feather";
import Color from "../styles/abstracts/colors";
import PackenText from "./PackenText";
import * as ButtonStyles from "../styles/components/PackenButton";

class PackenButton extends Component {
  constructor(props) {
    super(props);

    styles = {
      shape: {
        ...ButtonStyles.base.shape,
        ...ButtonStyles[props.type][props.size].shape,
        ...ButtonStyles[props.level].shape
      },
      content: {
        position: "relative"
      },
      icon: {
        ...ButtonStyles.base.icon,
        ...ButtonStyles[props.type][props.size].icon,
        ...ButtonStyles[props.level].icon
      }
    };

    switch (props.type) {
      case "icon":
        styles = {
          ...styles,
          iconWrapper: {
            position: "absolute",
            top: 0,
            left: 0
          }
        };
        break;
      case "regular":
        styles = {
          ...styles,
          label: {
            ...ButtonStyles.base.label,
            ...ButtonStyles[props.type][props.size].label,
            ...ButtonStyles[props.level].label
          },
          iconWrapper: {
            position: "absolute",
            top: 0,
            right: props.icon ? props.icon.position === "left" ? "auto" : -(ButtonStyles[props.type][props.size].label.marginHorizontal + 0) : 0,
            left: props.icon ? props.icon.position === "right" ? "auto" : -(ButtonStyles[props.type][props.size].label.marginHorizontal + 0) : 0
          }
        };
        break;
      default:
        break;
    }

    switch (props.level) {
      case "secondary":
        styles.shape = {
          ...styles.shape,
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: Color.secondary.default_drk
        }
        break;
      default:
      case "ghost":
      case "primary":
      case "tertiary":
      case "danger":
        break;
    }

    if (props.isDisabled) {
      styles.shape.backgroundColor = Color.base.disabled;
      styles.icon.color = Color.base.white;

      if (styles.label) {
        styles.label.color = Color.base.white;
      }

      if (styles.shape.borderWidth) {
        styles.shape.borderWidth = 0;
      }

      if (props.level === "ghost") {
        styles.shape.backgroundColor = Color.base.transparent;
        styles.icon.color = Color.base.disabled_alt;

        if (styles.label) {
          styles.label.color = Color.base.disabled_alt;
        }
      }
    }

    this.state = {
      type: props.type,
      level: props.level,
      size: props.size,
      icon: props.icon ? props.icon : undefined,
      isDisabled: props.isDisabled,
      shapeHeight: 0,
      shapeWidth: 0,
      iconHeight: 0,
      iconWidth: 0,
      styles: styles
    }
  }

  get_styles = () => {
    let styles = {
      shape: {
        ...ButtonStyles.base.shape,
        ...ButtonStyles[this.props.type][this.props.size].shape,
        ...ButtonStyles[this.props.level].shape
      },
      content: {
        position: "relative"
      },
      icon: {
        ...ButtonStyles.base.icon,
        ...ButtonStyles[this.props.type][this.props.size].icon,
        ...ButtonStyles[this.props.level].icon
      }
    };

    switch (this.props.type) {
      case "icon":
        styles = {
          ...styles,
          iconWrapper: {
            position: "absolute",
            top: (this.state.shapeHeight/2) - (this.state.iconHeight/2),
            left: (this.state.shapeWidth/2) - (this.state.iconWidth/2)
          }
        };
        break;
      case "regular":
        styles = {
          ...styles,
          label: {
            ...ButtonStyles.base.label,
            ...ButtonStyles[this.props.type][this.props.size].label,
            ...ButtonStyles[this.props.level].label
          },
          iconWrapper: {
            position: "absolute",
            top: (this.state.shapeHeight/2) - (this.state.iconHeight/2),
            right: this.props.icon ? this.props.icon.position === "left" ? "auto" : -(ButtonStyles[this.props.type][this.props.size].label.marginHorizontal + (this.state.iconWidth/2)) : 0,
            left: this.props.icon ? this.props.icon.position === "right" ? "auto" : -(ButtonStyles[this.props.type][this.props.size].label.marginHorizontal + (this.state.iconWidth/2)) : 0
          }
        };
        break;
      default:
        break;
    }

    /* Custom styles depending on the level */
    switch (this.props.level) {
      case "secondary":
        styles.shape = {
          ...styles.shape,
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: Color.secondary.default_drk
        }
        break;
      default:
      case "ghost":
      case "primary":
      case "tertiary":
      case "danger":
        break;
    }

    /* Custom styles for isDisabled states */
    if (this.props.isDisabled) {
      styles.shape.backgroundColor = Color.base.disabled;
      styles.icon.color = Color.base.white;

      if (styles.label) {
        styles.label.color = Color.base.white;
      }

      if (styles.shape.borderWidth) {
        styles.shape.borderWidth = 0;
      }

      if (this.props.level === "ghost") {
        styles.shape.backgroundColor = Color.base.transparent;
        styles.icon.color = Color.base.disabled_alt;

        if (styles.label) {
          styles.label.color = Color.base.disabled_alt;
        }
      }
    }

    return styles;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.shapeHeight !== this.state.shapeHeight || prevState.iconHeight !== this.state.iconHeight || prevState.iconWidth !== this.state.iconWidth) {
      this.setState({
        styles: this.get_styles()
      });
    }
  }

  get_shape_dimensions = e => {
    this.setState({
      shapeHeight: Math.floor(e.height),
      shapeWidth: Math.floor(e.width)
    });
  }

  get_icon_dimensions = e => {
    this.setState({
      iconHeight: Math.floor(e.height),
      iconWidth: Math.floor(e.width)
    });
  }

  execute_callback = () => {
    this.props.callback();
  }

  pressIn_handler = () => {
    let newStyles = {...this.get_styles()}
    newStyles.shape.backgroundColor = Color[this.state.level].focus;

    /* Custom focus styles */
    switch (this.state.level) {
      case "secondary":
        newStyles.shape.borderColor = Color.secondary.focus;
        break;
      default:
      case "primary":
      case "tertiary":
      case "ghost":
      case "danger":
        break;
    }

    this.setState({
      styles: newStyles
    });
  }

  pressOut_handler = () => {
    const newStyles = {...this.get_styles()}
    newStyles.shape.backgroundColor = Color[this.state.level].default;
    this.setState({
      styles: newStyles
    });
  }

  render() {
    return (
      <View pointerEvents={this.state.isDisabled ? "none" : "auto"}>
        <TouchableWithoutFeedback onPress={this.execute_callback} onPressIn={this.pressIn_handler} onPressOut={this.pressOut_handler}>
          <View style={this.state.styles.shape}>
            <View style={this.state.styles.shape__content} onLayout={e => { this.get_shape_dimensions(e.nativeEvent.layout); }}>
              <PackenText style={this.state.styles.label}>{this.props.children}</PackenText>
              {
                this.props.icon ? (
                  <View style={this.state.styles.iconWrapper} onLayout={e => { this.get_icon_dimensions(e.nativeEvent.layout); }}>
                    <Icon name={this.props.icon.name} size={this.state.styles.icon.fontSize} color={this.state.styles.icon.color}/>
                  </View>
                ) : null
              }
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

export default PackenButton;