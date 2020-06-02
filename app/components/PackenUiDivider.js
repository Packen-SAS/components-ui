import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

import Colors from "../styles/abstracts/colors";

class PackenUiDivider extends Component {
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
      type: this.props.type ? this.props.type : "light",
      size: this.props.size ? this.props.size : 1,
      width: this.props.width ? this.props.width : "100%",
      margin: this.props.margin ? { ...this.props.margin } : false,
      color: this.props.color ? this.props.color : this.getStyles().type[this.props.type].backgroundColor
    };
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
        height: this.state.size,
        marginTop: this.state.margin ? this.state.margin.top : 0,
        marginBottom: this.state.margin ? this.state.margin.bottom : 0,
        ...this.getStyles().base,
        ...{ backgroundColor: this.state.color }
      }}></View>
    );
  }

  getStyles = () => {
    return {
      base: {
        width: this.props.width,
        alignItems: "stretch"
      },
      type: {
        light: {
          backgroundColor: Colors.basic.gray.dft
        },
        dark: {
          backgroundColor: Colors.basic.independence.lgt
        }
      }
    };
  }
}

PackenUiDivider.propTypes = {
  type: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  margin: PropTypes.object,
  styling: PropTypes.object
};

export default PackenUiDivider;