import React, { Component } from "react";
import { TouchableWithoutFeedback, View } from "react-native"

import Icon from "react-native-vector-icons/dist/Feather";

import Color from "../styles/abstracts/colors";
import PackenUiText from "./PackenUiText";
import * as ButtonStyles from "../styles/components/PackenUiButton";

class PackenUiButton extends Component {
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
      styles: this.getStyles(0, 0, 0, 0),
      children: props.children
    }
  }

  getInitialIcon = () => {
    return this.props.icon ? this.props.icon : undefined
  }

  getStyles = (shapeHeight, shapeWidth, iconHeight, iconWidth) => {
    /* console.log("------------------");
    console.log(shapeHeight, shapeWidth, iconHeight, iconWidth);
    console.log("------------------"); */
    let type, size, level, icon, isDisabled;
    if (this.state) {
      type = this.state.type;
      size = this.state.size;
      level = this.state.level;
      icon = this.state.icon;
      isDisabled = this.state.isDisabled;
    } else {
      type = this.props.type;
      size = this.props.size;
      level = this.props.level;
      icon = this.props.icon;
      isDisabled = this.props.isDisabled;
    }

    let styles = {
      shape: {
        ...ButtonStyles.base.shape,
        ...ButtonStyles[type][size].shape,
        ...ButtonStyles[level].shape
      },
      content: {
        position: "relative"
      },
      icon: {
        ...ButtonStyles.base.icon,
        ...ButtonStyles[type][size].icon,
        ...ButtonStyles[level].icon
      }
    };

    switch (type) {
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
            ...ButtonStyles[type][size].label,
            ...ButtonStyles[level].label
          },
          iconWrapper: {
            position: "absolute",
            top: (shapeHeight/2) - (iconHeight/2),
            right: icon ? icon.position === "left" ? "auto" : -(ButtonStyles[type][size].label.marginHorizontal + (iconWidth/2)) : 0,
            left: icon ? icon.position === "right" ? "auto" : -(ButtonStyles[type][size].label.marginHorizontal + (iconWidth/2)) : 0
          }
        };
        break;
    }

    /* Custom styles depending on the level */
    switch (level) {
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
    if (isDisabled) {
      styles.shape.backgroundColor = Color.base.disabled;
      styles.icon.color = Color.base.white;

      if (styles.label) {
        styles.label.color = Color.base.white;
      }

      if (styles.shape.borderWidth) {
        styles.shape.borderWidth = 0;
      }

      if (level === "ghost") {
        styles.shape.backgroundColor = Color.base.transparent;
        styles.icon.color = Color.base.disabled_alt;

        if (styles.label) {
          styles.label.color = Color.base.disabled_alt;
        }
      }
    }

    return styles;
  }

  checkStyles = () => {
    this.setState({
      styles: this.getStyles(this.state.shapeHeight, this.state.shapeWidth, this.state.iconHeight, this.state.iconWidth)
    });
  }

  updateState = () => {
    this.setState({
      type: this.props.type,
      level: this.props.level,
      size: this.props.size,
      icon: this.getInitialIcon(),
      isDisabled: this.props.isDisabled,
      children: this.props.children
    }, this.checkStyles);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.updateState();
    }
  }

  getShapeDimensions = e => {
    this.setState({
      shapeHeight: Math.floor(e.height),
      shapeWidth: Math.floor(e.width)
    }, this.checkStyles);
  }

  getIconDimensions = e => {
    this.setState({
      iconHeight: Math.floor(e.height),
      iconWidth: Math.floor(e.width)
    }, this.checkStyles);
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
          <View style={{ ...this.state.styles.shape, ...this.props.style }}>
            <View style={this.state.styles.shape__content} onLayout={e => { this.getShapeDimensions(e.nativeEvent.layout); }}>
              <PackenUiText style={this.state.styles.label}>{this.state.children}</PackenUiText>
              {
                this.state.icon ? (
                  <View style={this.state.styles.iconWrapper} onLayout={e => { this.getIconDimensions(e.nativeEvent.layout); }}>
                    <Icon name={this.state.icon.name} size={this.state.styles.icon.fontSize} color={this.state.styles.icon.color}/>
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

export default PackenUiButton;