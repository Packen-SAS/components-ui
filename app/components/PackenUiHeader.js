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

  componentDidMount() {
    if (typeof this.props.instance === "function") {
      this.props.instance(this);
    }
  }

  setPropsToState = () => {
    return {
      children: this.props.children || "",
      icon: this.props.icon || "arrow-left",
      onBackPress: this.props.onBackPress || false,
      customStyle: this.props.style || {},
      styling: this.props.styling ? { ...this.props.styling } : {
        box: {},
        iconSize: undefined,
        iconColor: undefined,
        title: {}
      }
    };
  }

  onPressHandler = () => {
    if (this.state.onBackPress) {
      this.state.onBackPress();
    } else {
      return false;
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
      <View style={{
        ...this.getStyles().box,
        ...this.state.customStyle,
        ...this.state.styling.box
      }}>
        <TouchableWithoutFeedback onPress={this.onPressHandler}>
          <Icon
            name={this.state.icon}
            size={this.state.styling.iconSize ? this.state.styling.iconSize : 20}
            color={this.state.styling.iconColor ? this.state.styling.iconColor : Colors.brand.primary.drk}
          />
        </TouchableWithoutFeedback>
        <PackenUiText preset="h6" style={{
          ...this.getStyles().title,
          ...this.state.styling.title
        }}>
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
  onBackPress: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]).isRequired,
  customStyle: PropTypes.object,
  styling: PropTypes.object
};

export default PackenUiHeader;