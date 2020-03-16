import React, { Component } from "react";
import { View, TextInput, TouchableWithoutFeedback } from "react-native";

import Icon from "react-native-vector-icons/dist/Feather";

import InputStyles from "../styles/components/PackenInput";

import PackenText from "../components/PackenText";

class PackenInput extends Component {
  constructor(props) {
    super(props);

    let initialState = {
      value: props.value ? props.value : "",
      state: props.disabled ? "disabled" : "default"
    };

    if (props.icon) {
      initialState = {
        ...initialState,
        dimensions: {
          box: {
            width: 0,
            height: 0
          },
          iconWrapper: {
            width: 0,
            height: 0
          }
        }
      }
    }

    this.state = { ...initialState }
  }

  setIconPositionStyles = () => {
    let positionStyles = {};

    if (this.props.icon) {
      const verticalOffset = (this.state.dimensions.box.height / 2) - (this.state.dimensions.iconWrapper.height / 2);
      const horizontalOffset = InputStyles.icon_wrapper.offset[this.props.size];

      if (this.props.icon.position === "left") {
        positionStyles = {
          top: verticalOffset,
          left: horizontalOffset
        }
      } else {
        positionStyles = {
          top: verticalOffset,
          right: horizontalOffset
        }
      }
    }

    return positionStyles;
  }

  getBoxDimensions = ({ width, height }) => {
    this.setState({
      dimensions: {
        ...this.state.dimensions,
        box: {
          width: width,
          height: height
        }
      }
    }, this.setIconPositionStyles);
  }

  getIconWrapperDimensions = ({ width, height }) => {
    this.setState({
      dimensions: {
        ...this.state.dimensions,
        iconWrapper: {
          width: width,
          height: height
        }
      }
    }, this.setIconPositionStyles);
  }

  getPaddingStyles = () => {
    let paddingStyles = {};

    if (this.props.icon) {
      paddingStyles = { ...InputStyles.input.padding[this.props.icon.position][this.props.size] };
    }

    return paddingStyles;
  }

  getMultilineStyles = () => {
    let multilineStyles = {};

    if (this.props.multiline) {
      multilineStyles = {
        ...InputStyles.textarea.base,
        ...InputStyles.textarea.size[this.props.size]
      }
    }

    return multilineStyles;
  }

  handlePressIn = () => {
    this.setState({
      state: "hover"
    });
  }

  handlePressOut = () => {
    this.setState({
      state: "default"
    });
  }

  handleFocus = () => {
    this.setState({
      state: "focus"
    });
  }

  handleBlur = () => {
    this.setState({
      state: "default"
    });
  }

  handleChangeText = text => {
    this.setState({
      value: text
    });
    this.props.onChangeText(text);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.value !== this.props.value) {
      this.setState({
        value: this.props.value
      });
    }
  }

  render() {
    return (
      <View style={InputStyles.container} pointerEvents={this.state.state === "disabled" ? "none" : "auto"}>
        <View style={InputStyles.header}>
          <PackenText style={{
            ...InputStyles.label.base,
            ...InputStyles.label.size[this.props.size],
            ...InputStyles.label.state[this.state.state]
          }}>{this.props.label.toUpperCase()}</PackenText>
          {
            this.props.help ? (
              <PackenText style={{ ...InputStyles.help.base, ...InputStyles.help.size[this.props.size] }}>{this.props.help}</PackenText>
            ) : null
          }
        </View>
        <View style={InputStyles.box} onLayout={e => { this.getBoxDimensions(e.nativeEvent.layout); }}>
          {
            this.props.icon ? (
              <View style={{ ...InputStyles.icon_wrapper.base, ...this.setIconPositionStyles() }} onLayout={e => { this.getIconWrapperDimensions(e.nativeEvent.layout); }}>
                <Icon
                  name={this.props.icon.name}
                  size={InputStyles.icon.size[this.props.size].size}
                  color={InputStyles.icon.base.color}
                  style={{
                    ...InputStyles.icon.theme[this.props.theme],
                    ...InputStyles.icon.state[this.state.state],
                    ...this.props.icon.style
                  }}
                />
              </View>
            ) : null
          }
          <TouchableWithoutFeedback onPressIn={this.handlePressIn} onPressOut={this.handlePressOut}>
            <TextInput
              style={{
                ...InputStyles.input.base,
                ...InputStyles.input.size[this.props.size],
                ...InputStyles.input.theme[this.props.theme],
                ...InputStyles.input.state[this.state.state],
                ...this.getPaddingStyles(),
                ...this.getMultilineStyles()
              }}
              value={this.state.value}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              onChangeText={this.handleChangeText}
              placeholder={this.props.placeholder}
              placeholderTextColor={InputStyles.placeholder.color}
              multiline={this.props.multiline ? true : false}
              editable={this.props.disabled || this.props.nonEditable ? false : true}
            />
          </TouchableWithoutFeedback>
        </View>
        {
          this.props.message ? (
            <View style={InputStyles.message.box}>
              {
                this.props.message.icon ? (
                  <Icon
                    name={this.props.message.icon}
                    size={InputStyles.message.icon.size[this.props.size].size}
                    color={InputStyles.message.icon.theme[this.props.theme].color}
                    style={{
                      ...InputStyles.message.icon.base,
                      ...InputStyles.message.icon.state[this.state.state]
                    }}
                  />
                ) : null
              }
              <PackenText style={{
                ...InputStyles.message.text.size[this.props.size],
                ...InputStyles.message.text.theme[this.props.theme],
                ...InputStyles.message.text.state[this.state.state]
              }}>{this.props.message.text}</PackenText>
            </View>
          ) : null
        }
      </View>
    );
  }
}

export default PackenInput;