import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

import Typography from "../styles/abstracts/typography";
import Colors from "../styles/abstracts/colors";

import PackenUiText from "./PackenUiText";

class PackenUiTag extends Component {
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
      style: this.props.style ? { ...this.props.style } : {},
      boxStyles: this.props.style ? { ...this.props.style } : {},
      children: this.props.children ? this.props.children : null,
      backgroundColor: this.props.backgroundColor ? this.props.backgroundColor : Colors.brand.primary.snw,
      textColor: this.props.textColor ? this.props.textColor : Colors.basic.independence.dft
    };
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
    return (
      <View style={{
        ...this.getStyles().box.base,
        ...this.state.boxStyles
      }}>
        <PackenUiText preset="c1" style={{ ...this.getStyles().label.base, ...this.state.style }}>{this.state.children}</PackenUiText>
      </View>
    );
  }

  getStyles = () => {
    return {
      box: {
        base: {
          borderRadius: 3,
          paddingVertical: 0,
          paddingHorizontal: 7,
          textAlign: "center",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: this.state.backgroundColor,
          alignSelf: "flex-start"
        }
      },
      label: {
        base: {
          color: this.state.textColor,
          fontFamily: Typography.family.regular,
          fontSize: Typography.size.tiny_alt,
          lineHeight: Typography.lineheight.medium_alt
        }
      }
    };
  }
}

PackenUiTag.propTypes = {
  style: PropTypes.object,
  children: PropTypes.node.isRequired
};

export default PackenUiTag;