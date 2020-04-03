import React, { Component } from "react";
import { View, TextInput, TouchableWithoutFeedback } from "react-native";
import Icon from "react-native-vector-icons/dist/Feather";

import Colors from "../styles/abstracts/colors";
import InputStyles from "../styles/components/PackenUiInput";
import PackenUiText from "./PackenUiText";

class PackenUiInput extends Component {
  constructor(props) {
    super(props);

    this.state = { ...this.setInitialState() }
  }

  setInitialState = () => {
    let initialState = {
      value: this.props.value ? this.props.value : "",
      state: this.props.disabled ? "disabled" : "default"
    };

    if (this.props.icon) {
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

    return initialState;
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

  setEditable = () => {
    let isEditable = true;

    if (this.props.disabled || this.props.nonEditable) {
      isEditable = false;
    }

    return isEditable;
  }

  getIconName = () => {
    let name = "";

    if (this.props.isDropdown) {
      if (this.props.isOpen) {
        name = "chevron-up";
      } else {
        name = "chevron-down";
      }
    } else {
      name = this.props.icon.name;
    }

    return name;
  }

  triggerHelpCallback = () => {
    this.props.help.callback();
  }

  getHelp = () => {
    let help = null;

    if (this.props.help) {
      if (typeof this.props.help === "string") {
        help = (
          <PackenUiText
            style={{
              ...InputStyles.help.base,
              ...InputStyles.help.size[this.props.size]
            }}
          >{this.props.help}</PackenUiText>
        );
      } else if (this.props.help.touchable) {
        help = (
          <TouchableWithoutFeedback onPress={this.triggerHelpCallback}>
            <View>
              <PackenUiText
                touchable={{
                  color: Colors.brand.secondary.dft,
                  underline: true
                }}
                style={{
                  ...InputStyles.help.base,
                  ...InputStyles.help.size[this.props.size]
                }}
              >{this.props.help.text}</PackenUiText>
            </View>
          </TouchableWithoutFeedback>
        );
      }
    }

    return help;
  }

  getMessageIcon = () => {
    let icon = null;

    if (this.props.message.icon) {
      icon = (
        <Icon
          name={this.props.message.icon}
          size={InputStyles.message.icon.size[this.props.size].size}
          color={InputStyles.message.icon.theme[this.props.theme].color}
          style={{
            ...InputStyles.message.icon.base,
            ...InputStyles.message.icon.state[this.state.state]
          }}
        />
      );
    }

    return icon;
  }

  getMessage = () => {
    let message = null;

    if (this.props.message) {
      message = (
        <View style={InputStyles.message.box}>
          {this.getMessageIcon()}
          <PackenUiText style={{
            ...InputStyles.message.text.size[this.props.size],
            ...InputStyles.message.text.theme[this.props.theme],
            ...InputStyles.message.text.state[this.state.state]
          }}>{this.props.message.text}</PackenUiText>
        </View>
      );
    }

    return message;
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
          <PackenUiText style={{
            ...InputStyles.label.base,
            ...InputStyles.label.size[this.props.size],
            ...InputStyles.label.state[this.state.state]
          }}>{this.props.label.toUpperCase()}</PackenUiText>
          {this.getHelp()}
        </View>
        <View style={InputStyles.box} onLayout={e => { this.getBoxDimensions(e.nativeEvent.layout); }}>
          {
            this.props.icon ? (
              <View style={{ ...InputStyles.icon_wrapper.base, ...this.setIconPositionStyles() }} onLayout={e => { this.getIconWrapperDimensions(e.nativeEvent.layout); }}>
                <Icon
                  name={this.getIconName()}
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
              editable={this.setEditable()}
            />
          </TouchableWithoutFeedback>
        </View>
        {this.getMessage()}
      </View>
    );
  }
}

export default PackenUiInput;