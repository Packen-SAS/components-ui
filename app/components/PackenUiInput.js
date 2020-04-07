import React, { Component } from "react";
import { View, TextInput, TouchableWithoutFeedback } from "react-native";
import Icon from "react-native-vector-icons/dist/Feather";

import Colors from "../styles/abstracts/colors";
import Typography from "../styles/abstracts/typography";
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
      state: this.props.disabled ? "disabled" : "default",
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

  setIconPositionStyles = () => {
    let positionStyles = {};

    if (this.props.icon) {
      const verticalOffset = (this.state.dimensions.box.height / 2) - (this.state.dimensions.iconWrapper.height / 2);
      const horizontalOffset = this.getStyles().icon_wrapper.offset[this.props.size];

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
      paddingStyles = { ...this.getStyles().input.padding[this.props.icon.position][this.props.size] };
    }

    return paddingStyles;
  }

  getMultilineStyles = () => {
    let multilineStyles = {};

    if (this.props.multiline) {
      multilineStyles = {
        ...this.getStyles().textarea.base,
        ...this.getStyles().textarea.size[this.props.size]
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
    this.props.onChangeText(this.props.name, text);
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
              ...this.getStyles().help.base,
              ...this.getStyles().help.size[this.props.size]
            }}
          >{this.props.help}</PackenUiText>
        );
      } else if (this.props.help.touchable) {
        help = (
          <PackenUiText
            touchable={{
              color: Colors.brand.secondary.dft,
              underline: true,
              callback: this.triggerHelpCallback
            }}
            style={{
              ...this.getStyles().help.base,
              ...this.getStyles().help.size[this.props.size]
            }}
          >{this.props.help.text}</PackenUiText>
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
          size={this.getStyles().message.icon.size[this.props.size].size}
          color={this.getStyles().message.icon.theme[this.props.theme].color}
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

    if (this.props.message) {
      message = (
        <View style={this.getStyles().message.box}>
          {this.getMessageIcon()}
          <PackenUiText style={{
            ...this.getStyles().message.text.size[this.props.size],
            ...this.getStyles().message.text.theme[this.props.theme],
            ...this.getStyles().message.text.state[this.state.state]
          }}>{this.props.message.text}</PackenUiText>
        </View>
      );
    }

    return message;
  }

  getKeyboardType = () => {
    return this.props.keyboardType ? this.props.keyboardType : "default";
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
    if (this.props.isFocused) {
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

    if (this.props.icon) {
      const inner = (
        <Icon
          name={this.getIconName()}
          size={this.getStyles().icon.size[this.props.size].size}
          color={this.getStyles().icon.base.color}
          style={{
            ...this.getStyles().icon.theme[this.props.theme],
            ...this.getStyles().icon.state[this.state.state],
            ...this.props.icon.style
          }}
        />
      );

      if (this.props.icon.callback) {
        icon = this.getIconWrapper((
          <TouchableWithoutFeedback onPress={this.props.icon.callback}>
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
    return this.props.isPassword ? true : false;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.value !== this.props.value) {
      this.setState({
        value: this.props.value
      });
    }
    if (prevProps.isFocused !== this.props.isFocused) {
      this.checkFocus();
    }
  }

  render() {
    return (
      <View style={this.getStyles().container} pointerEvents={this.state.state === "disabled" ? "none" : "auto"}>
        <View style={this.getStyles().header}>
          <PackenUiText style={{
            ...this.getStyles().label.base,
            ...this.getStyles().label.size[this.props.size],
            ...this.getStyles().label.state[this.state.state]
          }}>{this.props.label.toUpperCase()}</PackenUiText>
          {this.getHelp()}
        </View>
        <View style={this.getStyles().box} onLayout={e => { this.getBoxDimensions(e.nativeEvent.layout); }}>
          {this.getMainIcon()}
          <TouchableWithoutFeedback onPressIn={this.handlePressIn} onPressOut={this.handlePressOut}>
            <TextInput
              style={{
                ...this.getStyles().input.base,
                ...this.getStyles().input.size[this.props.size],
                ...this.getStyles().input.theme[this.props.theme],
                ...this.getStyles().input.state[this.state.state],
                ...this.getPaddingStyles(),
                ...this.getMultilineStyles()
              }}
              ref={this.getRef}
              secureTextEntry={this.getSecureEntryType()}
              keyboardType={this.getKeyboardType()}
              value={this.state.value}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              onChangeText={this.handleChangeText}
              placeholder={this.props.placeholder}
              placeholderTextColor={this.getStyles().placeholder.color}
              multiline={this.props.multiline ? true : false}
              editable={this.setEditable()}
            />
          </TouchableWithoutFeedback>
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
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between"
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
            lineHeight:Typography.lineheight.medium
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
          hover: {},
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
        marginTop: 5
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
          color: Colors.basic.independence.dft
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
          }
        },
        state: {
          default: {},
          hover: {},
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
          }
        },
        state: {
          default: {},
          hover: {
            backgroundColor: Colors.basic.white.drk
          },
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
          paddingHorizontal: 16,
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
            }
          },
          state: {
            default: {},
            hover: {},
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
            }
          },
          state: {
            default: {},
            hover: {},
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

export default PackenUiInput;