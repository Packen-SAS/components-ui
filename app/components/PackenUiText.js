import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";

import Icon from "react-native-vector-icons/dist/Feather";
import Colors from "../styles/abstracts/colors";
import Typography from "../styles/abstracts/typography";

class PackenUiText extends Component {
  constructor(props) {
    super(props);

    this.state = { ...this.setPropsToState() }
  }

  setPropsToState = () => {
    return {
      preset: this.props.preset ? this.props.preset : false,
      touchable: this.props.touchable ? { ...this.props.touchable } : false,
      children: this.props.children ? this.props.children : null,
      icon: this.props.icon ? { ...this.props.icon } : false,
      presetStyle: this.props.preset ? Typography[this.props.preset] : {},
      touchableStyles: this.getTouchableStyles()
    };
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
    if (this.state.touchable) {
      this.state.touchable.callback();
    } else {
      return false;
    }
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
    this.setState({ ...this.setPropsToState() });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps !== this.props) {
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

PackenUiText.propTypes = {
  preset: PropTypes.string,
  touchable: PropTypes.object,
  children: PropTypes.node.isRequired,
  icon: PropTypes.object
};

export default PackenUiText;