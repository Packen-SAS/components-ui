import React, { Component } from "react";
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
      callback: props.callback,
      name: props.name,
      isDisabled: props.isDisabled,
      input: {...props.input},
      list: {...props.list},
      size: props.size,
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
    let customStyles = {
      bottom: -(this.state.dimensions.menu.height + 8)
    };

    this.setState({
      styles: {
        ...this.state.styles,
        menu: customStyles
      }
    });
  }

  toggleMenu = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  getFinalSelection = selectedItems => {
    this.setState({
      finalSelection: selectedItems
    }, this.composeFinalSelectionString);

    this.state.callback(this.state.name, selectedItems);
  }

  composeFinalSelectionString = () => {
    let finalSelectionString = "";

    this.state.finalSelection.forEach(item => {
      finalSelectionString += `${item}, `;
    });
    finalSelectionString = finalSelectionString.slice(0, -2);

    this.setState({
      finalSelectionString: finalSelectionString
    });

    return finalSelectionString;
  }

  updateState = () => {
    this.setState({
      callback: this.props.callback,
      name: this.props.name,
      isDisabled: this.props.isDisabled,
      input: {...this.props.input},
      list: {...this.props.list},
      size: this.props.size
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
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

  render() {
    return (
      <View
        style={this.getStyles().wrapper}
        pointerEvents={this.state.isDisabled ? "none" : "auto"}
      >
        <TouchableWithoutFeedback style={this.getStyles().input} onPress={this.toggleMenu}>
          <View pointerEvents="box-only">
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
              style={this.getCustomStyle()}
            />
            <View
              pointerEvents="none"
              style={{
                ...this.getStyles().contentSizer.wrapper.base,
                ...this.getStyles().contentSizer.wrapper.size[this.state.size],
                ...this.getStyles().contentSizer.wrapper.padding[this.state.input.icon.position][this.state.size]
              }}
            >
              <View
                onLayout={this.getContentSizerDimensions}
                style={{
                  ...this.getStyles().contentSizer.inner.base,
                  ...this.getStyles().contentSizer.inner.size[this.state.size]
                }}
              >
                <PackenUiText
                  style={{
                    ...this.getStyles().contentSizer.text.base,
                    ...this.getStyles().contentSizer.text.size[this.state.size]
                  }}
                >{this.state.finalSelectionString}</PackenUiText>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View
          onLayout={e => { this.getMenuDimensions(e.nativeEvent.layout) }}
          style={[
            this.getStyles().menu,
            this.state.styles.menu,
            {
              opacity: this.state.isOpen ? 1 : 0
            }
          ]}
          pointerEvents={this.state.isOpen ? "auto" : "none"}
        >
          <PackenUiDropdownList
            items={this.state.list.items}
            config={{ size: this.state.size, ...this.state.list.config }}
            numShownRows={4}
            getFinalSelection={this.getFinalSelection}
            finalSelectionArray={this.state.finalSelection}
            toggleMenu={this.toggleMenu}
          />
        </View>
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
          }
        }
      },
      menu: {
        backgroundColor: Colors.basic.white.dft,
        shadowColor: Colors.basic.black.dft,
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: Shadows.md.elevation,
        position: "absolute",
        zIndex: 10,
        left: 0,
        width: "100%",
        opacity: 0
      }
    };
  }
}

export default PackenUiDropdown;