import React, { Component } from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import PropTypes from "prop-types";

import Icon from "react-native-vector-icons/dist/Feather";
import Colors from "../styles/abstracts/colors";

import PackenUiText from "./PackenUiText";

class PackenUiHeader extends Component {
  constructor(props) {
    super(props);

    this.state = { ...this.setPropsToState() }
  }

  setPropsToState = () => {
    return {
      children: this.props.children || "",
      onBackPress: this.props.onBackPress || false,
      customStyle: this.props.style || {}
    };
  }

  onPressHandler = () => {
    if (this.state.onBackPress) {
      this.state.onBackPress();
    }
  }

  updateState = () => {
    this.setState({ ...this.setPropsToState() });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.updateState();
    }
  }

  render() {
    return (
      <View style={[this.getStyles().box, this.state.customStyle]}>
        <TouchableWithoutFeedback onPress={this.onPressHandler}>
          <Icon name="arrow-left" size={20} color={Colors.brand.primary.drk} />
        </TouchableWithoutFeedback>
        <PackenUiText preset="h6" style={this.getStyles().title}>
          {this.state.children}
        </PackenUiText>
      </View>
    );
  }

  getStyles = () => {
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
      title: {
        paddingLeft: 15,
        color: Colors.brand.primary.drk
      }
    }
  }
}

PackenUiHeader.propTypes = {
  children: PropTypes.node.isRequired,
  onBackPress: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]).isRequired
};

export default PackenUiHeader;