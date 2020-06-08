import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, TouchableWithoutFeedback } from "react-native";

import Colors from "../styles/abstracts/colors";
import Shadows from "../styles/abstracts/shadows";
import Typography from "../styles/abstracts/typography";

import PackenUiText from "./PackenUiText";
import PackenUiInput from "./PackenUiInput";
import PackenUiDropdownList from "./PackenUiDropdownList";

class PackenUiDropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.setPropsToState(),
      flag: true,
      contentSizerHeight: 0,
      isOpen: false,
      dimensions: {
        menu: {
          height: 0
        }
      },
      styles: {
        menu: {}
      },
      finalSelection: [],
      finalSelectionString: ""
    }
  }

  openMenu = () => this.setState({ isOpen: true });

  closeMenu = () => this.setState({ isOpen: false });

  toggleMenu = () => this.setState({ isOpen: !this.state.isOpen });

  componentDidMount = () => {
    if (typeof this.props.instance === "function") {
      this.props.instance(this);
    }
  }

  mockCallback = () => false;

  setPropsToState = () => {
    return {
      callback: this.props.callback ? this.props.callback : this.mockCallback,
      name: this.props.name ? this.props.name : "",
      isDisabled: this.props.isDisabled ? this.props.isDisabled : false,
      input: this.props.input ? { ...this.props.input } : {
        placeholder: "",
        onChangeText: this.mockCallback,
        onOpenStateChange: this.mockCallback,
        icon: { name: "chevron-down", position: "right" },
        message: false,
        label: "",
        help: undefined,
        theme: "default",
        isDropdown: true,
        nonEditable: true,
        disabled: false,
        isOpen: false,
        multiline: true,
        name: "",
        style: {}
      },
      list: this.props.list ? { ...this.props.list } : { items: [], config: {} },
      size: this.props.size ? this.props.size : "medium",
      styling: this.props.styling ? { ...this.props.styling, contentSizer: { ...this.props.styling.contentSizer } } : {
        wrapper: {},
        inputWrapper: {},
        contentSizer: {
          wrapper: {},
          inner: {},
          text: {}
        },
        menu: {},
        list: {},
        input: {}
      }
    };
  }

  getMenuDimensions = ({ height }) => {
    this.setState({
      dimensions: {
        ...this.state.dimensions,
        menu: {
          height: height
        }
      }
    }, this.setCustomStyles);
  }

  setCustomStyles = () => {
    let customStyles = {};
    if (this.state.input && this.state.input.theme === "list") {
      customStyles = {
        bottom: 0
      };
    } else {
      customStyles = {
        bottom: -(this.state.dimensions.menu.height + 8)
      };
    }

    this.setState({
      styles: {
        ...this.state.styles,
        menu: customStyles
      }
    });
  }

  onOpenStateChange = () => {
    if (this.state.input.onOpenStateChange) {
      this.state.input.onOpenStateChange(this.state.isOpen, this.state.dimensions.menu.height);
    }
  }

  toggleMenu = () => {
    this.setState({
      isOpen: !this.state.isOpen
    }, this.onOpenStateChange);
  }

  getFinalSelection = selectedItems => {
    this.setState({
      finalSelection: selectedItems
    }, this.composeFinalSelectionString);

    this.state.callback(this.state.name, selectedItems);
  }

  concatFinalSelectionString = (item, finalSelectionString) => finalSelectionString += `${item}, `;

  composeFinalSelectionString = () => {
    let finalSelectionString = "";

    this.state.finalSelection.forEach(item => finalSelectionString = this.concatFinalSelectionString(item, finalSelectionString));
    finalSelectionString = finalSelectionString.slice(0, -2);

    this.setState({
      finalSelectionString: finalSelectionString
    });

    return finalSelectionString;
  }

  updateState = () => {
    const newFlagState = this.state.list.items.length > 0 ? true : !this.state.flag;
    if (this.state.list.items.length <= 0) { this.getFinalSelection([]); }
    this.setState({ ...this.setPropsToState(), flag: newFlagState });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps !== this.props) {
      this.updateState();
    }
  }

  getPlaceholderConfig = () => {
    let config = {
      text: this.state.input.placeholder,
      color: Colors.basic.gray.dft
    };

    if (this.state.finalSelectionString !== "" && this.state.finalSelectionString !== undefined && this.state.finalSelectionString !== null) {
      config = {
        text: this.state.finalSelectionString,
        color: Colors.basic.independence.drk
      }
    }

    return config;
  }

  getContentSizerDimensions = ({ nativeEvent }) => {
    let { height } = nativeEvent.layout;
    const minHeight = this.getStyles().contentSizer.wrapper.size[this.state.size].minHeight;

    if (height < minHeight) {
      height = minHeight;
    }

    this.setState({
      contentSizerHeight: height
    });
  }

  getCustomStyle = () => {
    let styles = {};

    if (this.state.contentSizerHeight !== 0) {
      styles = {
        height: this.state.contentSizerHeight
      }
    }

    return styles;
  }

  getInput = () => (
    <PackenUiInput
      size={this.state.size}
      placeholder={this.getPlaceholderConfig().text}
      placeholderTextColor={this.getPlaceholderConfig().color}
      onChangeText={this.state.input.onChangeText}
      icon={this.state.input.icon}
      message={this.state.input.message}
      label={this.state.input.label}
      help={this.state.input.help}
      theme={this.state.input.theme}
      isDropdown={true}
      nonEditable={this.state.input.nonEditable}
      disabled={this.state.isDisabled}
      isOpen={this.state.isOpen}
      multiline
      style={{
        ...this.getCustomStyle(),
        ...this.state.input.style,
        ...this.getStyles().input
      }}
      name="dropdownInput"
      styling={this.state.styling.input}
    />
  )

  getContentSizer = () => (
    <View
      pointerEvents="none"
      style={{
        ...this.getStyles().contentSizer.wrapper.base,
        ...this.getStyles().contentSizer.wrapper.size[this.state.size],
        ...this.getStyles().contentSizer.wrapper.padding[this.state.input.icon.position][this.state.size],
        ...this.getStyles().contentSizer.wrapper.theme[this.state.input.theme],
        ...this.state.styling.contentSizer.wrapper
      }}
    >
      <View
        onLayout={this.getContentSizerDimensions}
        style={{
          ...this.getStyles().contentSizer.inner.base,
          ...this.getStyles().contentSizer.inner.size[this.state.size],
          ...this.getStyles().contentSizer.inner.theme[this.state.input.theme],
          ...this.state.styling.contentSizer.inner
        }}
      >
        <PackenUiText
          style={{
            ...this.getStyles().contentSizer.text.base,
            ...this.getStyles().contentSizer.text.size[this.state.size],
            ...this.getStyles().contentSizer.text.theme[this.state.input.theme],
            ...this.state.styling.contentSizer.text
          }}
        >{this.state.finalSelectionString}</PackenUiText>
      </View>
    </View>
  )

  getMenu = () => (
    <View
      onLayout={e => { this.getMenuDimensions(e.nativeEvent.layout) }}
      style={[
        this.getStyles().menu.base,
        this.getStyles().menu.theme[this.state.input.theme],
        this.state.styles.menu,
        this.state.styling.menu,
        { opacity: this.state.isOpen ? 1 : 0 }
      ]}
      pointerEvents={this.state.isOpen ? "auto" : "none"}
    >
      <PackenUiDropdownList
        key={this.state.flag}
        items={this.state.list.items}
        config={{ size: this.state.size, ...this.state.list.config }}
        numShownRows={4}
        getFinalSelection={this.getFinalSelection}
        finalSelectionArray={this.state.finalSelection}
        toggleMenu={this.toggleMenu}
        styling={this.state.styling.list}
      />
    </View>
  )

  render() {
    return (
      <View
        style={{
          ...this.getStyles().wrapper,
          ...this.state.styling.wrapper,
          ...{ paddingBottom: this.state.input && this.state.input.theme === "list" ? this.state.isOpen ? this.state.dimensions.menu.height : 0 : 0 }
        }}
        pointerEvents={this.state.isDisabled ? "none" : "auto"}
      >
        <TouchableWithoutFeedback onPress={this.toggleMenu}>
          <View style={{ ...this.getStyles().input, ...this.state.styling.inputWrapper }} pointerEvents={this.state.input.nonEditable ? "box-only" : "auto"}>
            {this.getInput()}
            {this.getContentSizer()}
          </View>
        </TouchableWithoutFeedback>
        {this.getMenu()}
      </View>
    );
  }

  getStyles = () => {
    return {
      wrapper: {},
      input: {},
      contentSizer: {
        wrapper: {
          base: {
            position: "absolute",
            height: "100%",
            width: "100%",
            opacity: 0
          },
          size: {
            tiny: {
              minHeight: 32,
              paddingHorizontal: 8,
              backgroundColor: "red"
            },
            small: {
              minHeight: 40,
              paddingHorizontal: 16
            },
            medium: {
              minHeight: 48,
              paddingHorizontal: 16
            },
            large: {
              minHeight: 56,
              paddingHorizontal: 16
            },
            giant: {
              minHeight: 72,
              paddingHorizontal: 16
            }
          },
          theme: {
            default: {},
            success: {},
            danger: {},
            list: {
              minHeight: 48,
              paddingHorizontal: 0
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
        inner: {
          base: {
            width: "100%",
            backgroundColor: "red"
          },
          size: {
            tiny: { paddingVertical: 7 },
            small: { paddingVertical: 10 },
            medium: { paddingVertical: 13 },
            large: { paddingVertical: 17 },
            giant: { paddingVertical: 23 }
          },
          theme: {
            default: {},
            success: {},
            danger: {},
            list: { paddingVertical: 0 }
          }
        },
        text: {
          base: {
            fontFamily: Typography.family.regular
          },
          size: {
            tiny: {
              fontSize: Typography.size.small,
              lineHeight: Typography.lineheight.small
            },
            small: {
              fontSize: Typography.size.medium,
              lineHeight: Typography.lineheight.medium_alt
            },
            medium: {
              fontSize: Typography.size.large,
              lineHeight: Typography.lineheight.large
            },
            large: {
              fontSize: Typography.size.large,
              lineHeight: Typography.lineheight.large
            },
            giant: {
              fontSize: Typography.size.giant_alt,
              lineHeight: Typography.lineheight.huge
            }
          },
          theme: {
            default: {},
            success: {},
            danger: {},
            list: {
              fontSize: Typography.size.large,
              lineHeight: Typography.lineheight.large
            }
          }
        }
      },
      menu: {
        base: {
          backgroundColor: Colors.basic.white.dft,
          position: "absolute",
          zIndex: 10,
          left: 0,
          width: "100%",
          opacity: 0,
          ...Shadows.md
        },
        theme: {
          default: {},
          success: {},
          danger: {},
          list: {
            transform: [{ translateY: 20 }],
            ...Shadows.xs
          }
        }
      }
    };
  }
}

PackenUiDropdown.propTypes = {
  callback: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
  input: PropTypes.object.isRequired,
  list: PropTypes.object.isRequired,
  size: PropTypes.string.isRequired,
  styling: PropTypes.object
};

export default PackenUiDropdown;