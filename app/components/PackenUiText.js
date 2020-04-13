import React, { Component } from "react";
import { View, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";

import Icon from "react-native-vector-icons/dist/Feather";
import Colors from "../styles/abstracts/colors";
import Typography from "../styles/abstracts/typography";

class PackenUiText extends Component {
  constructor(props) {
    super(props);

    this.state = {
      preset: props.preset,
      touchable: props.touchable,
      children: props.children,
      icon: { ...props.icon },
      presetStyle: props.preset ? Typography[this.props.preset] : {},
      touchableStyles: this.getTouchableStyles()
    }
  }

  getTouchableStyles = () => {
    let styles = {};

    if (this.props.touchable) {
      styles = {
        color: this.props.touchable.color,
        textDecorationLine: this.props.touchable.underline ? "underline" : "none"
      };
    }

    return styles;
  }

  triggerCallback = () => {
    this.state.touchable.callback();
  }

  getContent = () => {
    let content = (
      <Text style={{
        ...styles.base,
        ...this.state.presetStyle,
        ...this.props.style,
        ...this.state.touchableStyles
      }}>{this.state.children}</Text>
    );

    if (this.props.icon) {
      const { name, position, color, size } = this.state.icon;
      const icon = <Icon name={name} color={color} size={size} />;
      const marginStyle = position === "left" ? styles.iconLabelLeft : styles.iconLabelRight;

      content = (
        <View style={styles.iconWrapper}>
          {position === "left" ? icon : null}
          <View style={marginStyle}>{content}</View>
          {position === "right" ? icon : null}
        </View>
      );
    }

    if (this.state.touchable) {
      content = (
        <TouchableWithoutFeedback onPress={this.triggerCallback}>
          {content}
        </TouchableWithoutFeedback>
      )
    }

    return content;
  }

  updateState = () => {
    this.setState({
      preset: this.props.preset,
      touchable: this.props.touchable,
      customStyle: { ...this.props.style },
      children: this.props.children,
      icon: { ...this.props.icon },
      presetStyle: this.props.preset ? Typography[this.this.props.preset] : {},
      touchableStyles: this.getTouchableStyles()
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.updateState();
    }
  }

  render() {
    return this.getContent();
  }
}

const styles = StyleSheet.create({
  base: {
    fontFamily: Typography.family.regular,
    fontSize: Typography.size.medium,
    color: Colors.basic.independence.drk
  },
  iconWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  iconLabelLeft: {
    marginLeft: 5
  },
  iconLabelRight: {
    marginRight: 5
  }
});

export default PackenUiText;