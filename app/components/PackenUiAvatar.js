import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Image, TouchableWithoutFeedback } from "react-native";

import Icon from "react-native-vector-icons/dist/Feather";

import Colors from "../styles/abstracts/colors";

class PackenUiAvatar extends Component {
  constructor(props) {
    super(props);

    this.state = { ...this.setPropsToState() }
  }

  setPropsToState = () => {
    return {
      src: this.props.src ? this.props.src : false,
      size: this.props.size ? this.props.size : "medium",
      callback: this.props.callback ? this.props.callback : false
    };
  }

  getInner = () => {
    let inner = null;

    if (this.state.src) {
      inner = (
        <Image
          source={this.state.src}
          style={{
            height: "100%",
            width: "100%",
            borderRadius: 100
          }}
        />
      );
    } else {
      inner = (
        <Icon
          name="camera"
          size={this.getStyles().container.size[this.state.size].width / 3}
          color={Colors.basic.independence.lgt}
        />
      );
    }

    return inner;
  }

  getContent = () => {
    let content = null;

    if (this.state.callback) {
      content = (
        <TouchableWithoutFeedback onPress={this.state.callback} >
          <View
            style={[
              this.getStyles().touchable,
              {
                height: this.getStyles().container.size[this.state.size.height],
                width: this.getStyles().container.size[this.state.size.width]
              }
            ]}
          >
            {this.getInner()}
          </View>
        </TouchableWithoutFeedback>
      )
    } else {
      content = this.getInner();
    }

    return content;
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
      <View style={[
        this.getStyles().container.base,
        this.getStyles().container.size[this.state.size]
      ]}>
        {this.getContent()}
      </View>
    );
  }

  getStyles = () => {
    return {
      container: {
        base: {
          borderRadius: 100,
          overflow: "hidden",
          backgroundColor: Colors.basic.gray.lgt
        },
        size: {
          xtiny: {
            height: 24,
            width: 24
          },
          tiny: {
            height: 32,
            width: 32
          },
          small: {
            height: 40,
            width: 40
          },
          medium: {
            height: 64,
            width: 64
          },
          large: {
            height: 80,
            width: 80
          },
          giant: {
            height: 96,
            width: 96
          }
        }
      },
      touchable: {
        flex: 1,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center"
      }
    };
  }
}

PackenUiAvatar.propTypes = {
  src: Image.propTypes.source,
  size: PropTypes.string.isRequired,
  callback: PropTypes.func
};

export default PackenUiAvatar;