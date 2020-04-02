import React, { Component } from "react";
import { TouchableWithoutFeedback, View } from "react-native"

import Icon from "react-native-vector-icons/dist/Feather";

import Color from "../styles/abstracts/colors";
import PackenText from "./PackenText";
import * as ButtonStyles from "../styles/components/PackenButton";

class PackenButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: props.type,
      level: props.level,
      size: props.size,
      icon: this.getInitialIcon(),
      isDisabled: props.isDisabled,
      shapeHeight: 0,
      shapeWidth: 0,
      iconHeight: 0,
      iconWidth: 0,
      styles: this.getStyles(0, 0, 0, 0)
    }
  }

  getInitialIcon = () => {
    return this.props.icon ? this.props.icon : undefined
  }

  getStyles = (shapeHeight, shapeWidth, iconHeight, iconWidth) => {
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
            top: (shapeHeight/2) - (iconHeight/2),
            left: (shapeWidth/2) - (iconWidth/2)
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
            top: (shapeHeight/2) - (iconHeight/2),
            right: this.props.icon ? this.props.icon.position === "left" ? "auto" : -(ButtonStyles[this.props.type][this.props.size].label.marginHorizontal + (iconWidth/2)) : 0,
            left: this.props.icon ? this.props.icon.position === "right" ? "auto" : -(ButtonStyles[this.props.type][this.props.size].label.marginHorizontal + (iconWidth/2)) : 0
          }
        };
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
        styles: this.getStyles(this.state.shapeHeight, this.state.shapeWidth, this.state.iconHeight, this.state.iconWidth)
      });
    }
  }

  getShapeDimensions = e => {
    this.setState({
      shapeHeight: Math.floor(e.height),
      shapeWidth: Math.floor(e.width)
    });
  }

  getIconDimensions = e => {
    this.setState({
      iconHeight: Math.floor(e.height),
      iconWidth: Math.floor(e.width)
    });
  }

  executeCallback = () => {
    this.props.callback();
  }

  pressInHandler = () => {
    let newStyles = {...this.getStyles(this.state.shapeHeight, this.state.shapeWidth, this.state.iconHeight, this.state.iconWidth)}
    newStyles.shape.backgroundColor = Color[this.state.level].focus;

    /* Custom focus styles */
    switch (this.state.level) {
      case "secondary":
        newStyles.shape.borderColor = Color.secondary.focus;
        break;
    }

    this.setState({
      styles: newStyles
    });
  }

  pressOutHandler = () => {
    const newStyles = {...this.getStyles(this.state.shapeHeight, this.state.shapeWidth, this.state.iconHeight, this.state.iconWidth)}
    newStyles.shape.backgroundColor = Color[this.state.level].default;
    this.setState({
      styles: newStyles
    });
  }

  render() {
    return (
      <View pointerEvents={this.state.isDisabled ? "none" : "auto"}>
        <TouchableWithoutFeedback onPress={this.executeCallback} onPressIn={this.pressInHandler} onPressOut={this.pressOutHandler}>
          <View style={this.state.styles.shape}>
            <View style={this.state.styles.shape__content} onLayout={e => { this.getShapeDimensions(e.nativeEvent.layout); }}>
              <PackenText style={this.state.styles.label}>{this.props.children}</PackenText>
              {
                this.props.icon ? (
                  <View style={this.state.styles.iconWrapper} onLayout={e => { this.getIconDimensions(e.nativeEvent.layout); }}>
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