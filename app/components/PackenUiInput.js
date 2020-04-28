import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, TextInput, TouchableWithoutFeedback, Keyboard } from "react-native";
import Icon from "react-native-vector-icons/dist/Feather";

import Colors from "../styles/abstracts/colors";
import Typography from "../styles/abstracts/typography";

import PackenUiText from "./PackenUiText";

class PackenUiInput extends Component {
  constructor(props) {
    super(props);

    this.state = { ...this.setInitialState() }
  }

  setPropsToState = () => {
    return {
      state: this.props.disabled ? "disabled" : "default",
      icon: this.props.icon ? { ...this.props.icon } : false,
      size: this.props.size ? this.props.size : "medium",
      theme: this.props.theme ? this.props.theme : "default",
      multiline: this.props.multiline ? this.props.multiline : false,
      name: this.props.name ? this.props.name : "",
      disabled: this.props.disabled ? this.props.disabled : false,
      nonEditable: this.props.nonEditable ? this.props.nonEditable : false,
      isDropdown: this.props.isDropdown ? this.props.isDropdown : false,
      isOpen: this.props.isOpen ? this.props.isOpen : false,
      help: this.props.help ? typeof this.props.help === "string" ? this.props.help : { ...this.props.help } : undefined,
      message: this.props.message ? { ...this.props.message } : false,
      keyboardType: this.props.keyboardType ? this.props.keyboardType : "default",
      isFocused: this.props.isFocused ? this.props.isFocused : false,
      isPassword: this.props.isPassword ? this.props.isPassword : false,
      label: this.props.label ? this.props.label : "",
      placeholder: this.props.placeholder,
      placeholderTextColor: this.props.placeholderTextColor ? this.props.placeholderTextColor : this.getStyles().placeholder.color,
      maxLength: this.props.maxLength,
      style: this.props.style ? { ...this.props.style } : {},
      onChangeText: this.props.onChangeText ? this.props.onChangeText : this.mockCallback,
      eventHandlers: this.props.eventHandlers ? this.props.eventHandlers : false
    };
  }

  setInitialState = () => {
    let initialState = {
      ...this.setPropsToState(),
      ref: null
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

  mockCallback = () => false;

  setIconPositionStyles = () => {
    let positionStyles = {};

    if (this.state.icon) {
      const verticalOffset = (this.state.dimensions.box.height / 2) - (this.state.dimensions.iconWrapper.height / 2);
      const horizontalOffset = this.getStyles().icon_wrapper.offset[this.state.size];

      if (this.state.icon.position === "left") {
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

    if (this.state.icon) {
      paddingStyles = { ...this.getStyles().input.padding[this.state.icon.position][this.state.size] };
    }

    return paddingStyles;
  }

  getMultilineStyles = () => {
    let multilineStyles = {};

    if (this.state.multiline) {
      multilineStyles = {
        ...this.getStyles().textarea.base,
        ...this.getStyles().textarea.isDropdown[this.state.isDropdown].base,
        ...this.getStyles().textarea.isDropdown[this.state.isDropdown].size[this.state.size]
      }
    }

    return multilineStyles;
  }

  handleFocus = () => {
    if (this.state.theme !== "list") {
      this.setState({
        state: "focus"
      }, this.addKeyboardEvents);
      if (this.state.eventHandlers && this.state.eventHandlers.onFocus) {
        this.state.eventHandlers.onFocus(this.state.name);
      } 
    }
  }

  handleBlur = () => {
    this.setState({
      state: "default"
    }, this.removeKeyboardEvents);
    if (this.state.eventHandlers && this.state.eventHandlers.onBlur) {
      this.state.eventHandlers.onBlur(this.state.name);
    }
  }

  handleSubmitEditing = () => {
    this.blur();
    if (this.state.eventHandlers && this.state.eventHandlers.onSubmitEditing) {
      this.state.eventHandlers.onSubmitEditing(this.state.name);
    }
  }

  handleChangeText = text => {
    this.state.onChangeText(this.state.name, text);
  }

  addKeyboardEvents = () => {
    Keyboard.addListener("keyboardDidShow", this.focus);
    Keyboard.addListener("keyboardDidHide", this.blur);
  }

  removeKeyboardEvents = () => {
    Keyboard.removeAllListeners("keyboardDidShow");
    Keyboard.removeAllListeners("keyboardDidHide");
  }

  setEditable = () => {
    let isEditable = true;

    if (this.state.disabled || this.state.nonEditable) {
      isEditable = false;
    }

    return isEditable;
  }

  getIconName = () => {
    let name = "";

    if (this.state.isDropdown) {
      if (this.state.isOpen) {
        name = "chevron-up";
      } else {
        name = "chevron-down";
      }
    } else {
      name = this.state.icon.name;
    }

    return name;
  }

  triggerHelpCallback = () => {
    if (this.state.help && this.state.help.callback) {
      this.state.help.callback();
    }
  }

  getHelp = () => {
    let help = null;

    if (this.state.help) {
      if (typeof this.state.help === "string") {
        help = (
          <PackenUiText
            style={{
              ...this.getStyles().help.base,
              ...this.getStyles().help.size[this.state.size]
            }}
          >{this.state.help}</PackenUiText>
        );
      } else if (this.state.help.touchable) {
        help = (
          <PackenUiText
            touchable={{
              color: Colors.brand.secondary.dft,
              underline: true,
              callback: this.triggerHelpCallback
            }}
            style={{
              ...this.getStyles().help.base,
              ...this.getStyles().help.size[this.state.size]
            }}
          >{this.state.help.text}</PackenUiText>
        );
      }
    }

    return help;
  }

  getMessageIcon = () => {
    let icon = null;

    if (this.state.message.icon) {
      icon = (
        <Icon
          name={this.state.message.icon}
          size={this.getStyles().message.icon.size[this.state.size].size}
          color={this.getStyles().message.icon.theme[this.state.theme].color}
          style={{
            ...this.getStyles().message.icon.base,
            ...this.getStyles().message.icon.state[this.state.state]
          }}
        />
      );
    }

    return icon;
  }

  getMessage = () => {
    let message = null;

    if (this.state.message) {
      message = (
        <View style={this.getStyles().message.box}>
          {this.getMessageIcon()}
          <PackenUiText style={{
            ...this.getStyles().message.text.size[this.state.size],
            ...this.getStyles().message.text.theme[this.state.theme],
            ...this.getStyles().message.text.state[this.state.state]
          }}>{this.state.message.text}</PackenUiText>
        </View>
      );
    }

    return message;
  }

  getKeyboardType = () => {
    return this.state.keyboardType ? this.state.keyboardType : "default";
  }

  getRef = input => {
    this.setState({
      ref: input
    }, this.checkFocus);
  }

  focus = () => {
    if (this.state.ref) {
      this.state.ref.focus();
    } else {
      return false;
    }
  }

  blur = () => {
    if (this.state.ref) {
      this.state.ref.blur();
    } else {
      return false;
    }
  }

  checkFocus = () => {
    if (this.state.isFocused) {
      this.focus();
    } else {
      this.blur();
    }
  }

  getIconWrapper = child => {
    return (
      <View
        style={{ ...this.getStyles().icon_wrapper.base, ...this.setIconPositionStyles() }}
        onLayout={e => { this.getIconWrapperDimensions(e.nativeEvent.layout); }}
      >
        {child}
      </View>
    );
  }

  getMainIcon = () => {
    let icon = null;

    if (this.state.icon) {
      const inner = (
        <Icon
          name={this.getIconName()}
          size={this.getStyles().icon.size[this.state.size].size}
          color={this.getStyles().icon.base.color}
          style={{
            ...this.getStyles().icon.theme[this.state.theme],
            ...this.getStyles().icon.state[this.state.state],
            ...this.state.icon.style
          }}
        />
      );

      if (this.state.icon.callback) {
        icon = this.getIconWrapper((
          <TouchableWithoutFeedback onPress={this.state.icon.callback}>
            {inner}
          </TouchableWithoutFeedback>
        ));
      } else {
        icon = this.getIconWrapper(inner);
      }
    }

    return icon;
  }

  getSecureEntryType = () => {
    return this.state.isPassword ? true : false;
  }

  updateState = () => {
    this.setState({
      ...this.setPropsToState()
    }, () => {
      this.checkFocus();
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.updateState();
    }
  }

  render() {
    return (
      <View style={this.getStyles().container} pointerEvents={this.state.state === "disabled" ? "none" : "auto"}>
        <View style={[
          this.getStyles().header.base,
          this.getStyles().header.theme[this.state.theme]
        ]}>
          <PackenUiText style={{
            ...this.getStyles().label.base,
            ...this.getStyles().label.size[this.state.size],
            ...this.getStyles().label.state[this.state.state]
          }}>{this.state.label.toUpperCase()}</PackenUiText>
          {this.getHelp()}
        </View>
        <View style={[
          this.getStyles().box.base,
          this.getStyles().box.theme[this.state.theme]
        ]} onLayout={e => { this.getBoxDimensions(e.nativeEvent.layout); }}>
          {this.getMainIcon()}
          <TextInput
            style={{
              ...this.getStyles().input.base,
              ...this.getStyles().input.size[this.state.size],
              ...this.getStyles().input.theme[this.state.theme],
              ...this.getStyles().input.state[this.state.state],
              ...this.getPaddingStyles(),
              ...this.getMultilineStyles(),
              ...this.state.style
            }}
            ref={this.getRef}
            secureTextEntry={this.getSecureEntryType()}
            keyboardType={this.getKeyboardType()}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onChangeText={this.handleChangeText}
            onSubmitEditing={this.handleSubmitEditing}
            placeholder={this.state.placeholder}
            placeholderTextColor={this.state.placeholderTextColor}
            multiline={this.state.multiline ? true : false}
            editable={this.setEditable()}
            maxLength={this.state.maxLength}
          />
        </View>
        {this.getMessage()}
      </View>
    );
  }

  getStyles = () => {
    const heights = {
      tiny: 32,
      small: 40,
      medium: 48,
      large: 56,
      giant: 72
    };
    return {
      container: {},
      header: {
        base: {
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "space-between"
        },
        theme: {
          default: {},
          danger: {},
          success: {},
          primary: {},
          list: {
            display: "none"
          }
        }
      },
      label: {
        base: {
          letterSpacing: 1,
          fontFamily: Typography.family.bold,
          color: Colors.basic.independence.dft
        },
        size: {
          tiny: {
            fontSize: Typography.size.tiny,
            lineHeight: Typography.lineheight.tiny
          },
          small: {
            fontSize: Typography.size.small,
            lineHeight: Typography.lineheight.small
          },
          medium: {
            fontSize: Typography.size.small,
            lineHeight: Typography.lineheight.medium
          },
          large: {
            fontSize: Typography.size.medium,
            lineHeight: Typography.lineheight.medium
          },
          giant: {
            fontSize: Typography.size.large,
            lineHeight: Typography.lineheight.large
          }
        },
        state: {
          default: {},
          focus: {},
          disabled: {
            color: Colors.basic.gray.dft
          }
        }
      },
      help: {
        base: {
          textAlign: "right",
          color: Colors.basic.gray.dft
        },
        size: {
          tiny: {
            fontSize: Typography.size.xtiny,
            lineHeight: Typography.lineheight.xtiny
          },
          small: {
            fontSize: Typography.size.tiny,
            lineHeight: Typography.lineheight.tiny
          },
          medium: {
            fontSize: Typography.size.tiny,
            lineHeight: Typography.lineheight.small
          },
          large: {
            fontSize: Typography.size.small,
            lineHeight: Typography.lineheight.small
          },
          giant: {
            fontSize: Typography.size.small,
            lineHeight: Typography.lineheight.small
          }
        }
      },
      box: {
        base: {
          marginTop: 5
        },
        theme: {
          default: {},
          danger: {},
          success: {},
          primary: {},
          list: {
            marginTop: 0
          }
        }
      },
      icon_wrapper: {
        base: {
          position: "absolute",
          zIndex: 1
        },
        offset: {
          tiny: 11,
          small: 13,
          medium: 21,
          large: 21,
          giant: 24
        }
      },
      icon: {
        base: {
          color: Colors.basic.independence.dft,
        },
        size: {
          tiny: {
            size: Typography.size.small
          },
          small: {
            size: Typography.size.medium
          },
          medium: {
            size: Typography.size.medium
          },
          large: {
            size: Typography.size.medium
          },
          giant: {
            size: Typography.size.xhuge
          },
          list: {
            size: Typography.size.medium
          }
        },
        state: {
          default: {},
          focus: {},
          disabled: {
            color: Colors.basic.gray.dft
          }
        },
        theme: {
          default: {
            color: Colors.basic.independence.dft
          },
          danger: {
            color: Colors.danger.default
          },
          success: {
            color: Colors.success.default
          },
          primary: {
            color: Colors.primary.default
          },
          list: {
            marginTop: 12,
            marginRight: -15,
            transform: [{ translateX: 10 }],
            color: Colors.primary.default
          }
        }
      },
      placeholder: {
        color: Colors.basic.gray.dft
      },
      input: {
        base: {
          padding: 0,
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: Colors.basic.independence.drk,
          backgroundColor: Colors.basic.white.dft,
          color: Colors.basic.independence.drk,
          fontFamily: Typography.family.regular
        },
        size: {
          tiny: {
            paddingHorizontal: 8,
            height: heights.tiny,
            fontSize: Typography.size.small,
            lineHeight: Typography.lineheight.small
          },
          small: {
            paddingHorizontal: 16,
            height: heights.small,
            fontSize: Typography.size.medium,
            lineHeight: Typography.lineheight.medium_alt
          },
          medium: {
            paddingHorizontal: 16,
            height: heights.medium,
            fontSize: Typography.size.large,
            lineHeight: Typography.lineheight.large
          },
          large: {
            paddingHorizontal: 16,
            height: heights.large,
            fontSize: Typography.size.large,
            lineHeight: Typography.lineheight.large
          },
          giant: {
            paddingHorizontal: 16,
            height: heights.giant,
            fontSize: Typography.size.giant_alt,
            lineHeight: Typography.lineheight.huge
          }
        },
        theme: {
          default: {
            borderColor: Colors.basic.independence.drk
          },
          danger: {
            borderColor: Colors.danger.default,
            borderWidth: 2
          },
          success: {
            borderColor: Colors.success.default,
            borderWidth: 2
          },
          primary: {
            borderColor: Colors.brand.primary.drk,
            borderWidth: 2
          },
          list: {
            height: "auto",
            borderWidth: 0,
            paddingVertical: 0,
            paddingHorizontal: 0,
            backgroundColor: "transparent"
          }
        },
        state: {
          default: {},
          focus: {
            borderWidth: 2
          },
          disabled: {
            borderColor: Colors.basic.gray.lgt,
            backgroundColor: Colors.basic.white.drk
          }
        },
        padding: {
          left: {
            tiny: {
              paddingLeft: 32
            },
            small: {
              paddingLeft: 40
            },
            medium: {
              paddingLeft: 48
            },
            large: {
              paddingLeft: 48
            },
            giant: {
              paddingLeft: 62
            }
          },
          right: {
            tiny: {
              paddingRight: 32
            },
            small: {
              paddingRight: 40
            },
            medium: {
              paddingRight: 48
            },
            large: {
              paddingRight: 48
            },
            giant: {
              paddingRight: 62
            }
          }
        }
      },
      textarea: {
        base: {
          paddingVertical: 8,
          paddingHorizontal: 16
        },
        isDropdown: {
          true: {
            base: {
              textAlignVertical: "center"
            },
            size: {
              tiny: {
                height: heights.tiny
              },
              small: {
                height: heights.small
              },
              medium: {
                height: heights.medium
              },
              large: {
                height: heights.large
              },
              giant: {
                height: heights.giant
              }
            }
          },
          false: {
            base: {
              textAlignVertical: "top"
            },
            size: {
              tiny: {
                height: 96
              },
              small: {
                height: 104
              },
              medium: {
                height: 104
              },
              large: {
                height: 104
              },
              giant: {
                height: 104
              }
            }
          }
        }
      },
      message: {
        box: {
          width: "100%",
          marginTop: 5,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start"
        },
        icon: {
          base: {
            marginRight: 5
          },
          size: {
            tiny: {
              size: Typography.size.tiny
            },
            small: {
              size: Typography.size.small
            },
            medium: {
              size: Typography.size.small
            },
            large: {
              size: Typography.size.medium
            },
            giant: {
              size: Typography.size.medium
            }
          },
          theme: {
            default: {
              color: Colors.basic.gray.drk
            },
            danger: {
              color: Colors.danger.default
            },
            success: {
              color: Colors.success.default
            },
            primary: {
              color: Colors.brand.primary.drk
            },
            list: {}
          },
          state: {
            default: {},
            focus: {},
            disabled: {
              color: Colors.basic.gray.dft
            }
          }
        },
        text: {
          size: {
            tiny: {
              fontSize: Typography.size.tiny
            },
            small: {
              fontSize: Typography.size.small
            },
            medium: {
              fontSize: Typography.size.small
            },
            large: {
              fontSize: Typography.size.medium
            },
            giant: {
              fontSize: Typography.size.medium
            }
          },
          theme: {
            default: {
              color: Colors.basic.gray.drk
            },
            danger: {
              color: Colors.danger.default
            },
            success: {
              color: Colors.success.default
            },
            primary: {
              color: Colors.brand.primary.drk
            },
            list: {}
          },
          state: {
            default: {},
            focus: {},
            disabled: {
              color: Colors.basic.gray.dft
            }
          }
        }
      }
    };
  }
}

PackenUiInput.propTypes = {
  disabled: PropTypes.bool,
  icon: PropTypes.object,
  size: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
  multiline: PropTypes.bool,
  name: PropTypes.string.isRequired,
  nonEditable: PropTypes.bool,
  isDropdown: PropTypes.bool,
  isOpen: PropTypes.bool,
  help: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  message: PropTypes.object,
  keyboardType: PropTypes.string,
  isFocused: PropTypes.bool,
  isPassword: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  onChangeText: PropTypes.func.isRequired,
  eventHandlers: PropTypes.object
};

export default PackenUiInput;