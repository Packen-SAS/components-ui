import React, { Component, createRef } from "react";
import PropTypes from "prop-types";
import { TouchableWithoutFeedback, View } from "react-native";

import Icon from "react-native-vector-icons/dist/Feather";

import Colors from "../styles/abstracts/colors";
import Typography from "../styles/abstracts/typography";
import { arraysEqual } from "../utils";

import PackenUiAvatar from "./PackenUiAvatar";
import PackenUiRadio from "./PackenUiRadio";
import PackenUiCheckbox from "./PackenUiCheckbox";

class PackenUiDropdownListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prevState: this.setInitialState(),
      state: this.setInitialState(),
      originalStyles: this.getOriginalStyles(),
      mainContent: null,
      newSelectedState: false
    }

    this.createRefs();
  }

  createRefs = () => {
    if (this.props.mainContent.main.control) {
      this.radioRef = createRef();
      this.checkboxRef = createRef();
    } else {
      return false;
    }
  }

  setInitialState = () => {
    return this.props.mainContent.isDisabled ? "disabled" : this.props.mainContent.isSelected ? "active" : "default";
  }

  getOriginalStyles = () => {
    let originalStyles = [];

    if (!this.props.mainContent.main.control) {
      if (Array.isArray(this.props.mainContent.main.props.children)) {
        this.props.mainContent.main.props.children.forEach(child => {
          if (child.type.displayName !== "PackenUiRadio" && child.type.displayName !== "PackenUiCheckbox") {
            originalStyles.push({ color: child.props.style.color });
          } else {
            originalStyles = [];
          }
        });
      } else {
        if (this.props.mainContent.main.type.displayName !== "PackenUiRadio" && this.props.mainContent.main.type.displayName !== "PackenUiCheckbox") {
          originalStyles = { ...this.props.mainContent.main.props.style };
        } else {
          originalStyles = {};
        }
      }
    } else {
      originalStyles = {};
    }

    return originalStyles;
  }

  componentDidMount() {
    this.setMainContent();
  }

  mockCallback = () => true;

  checkSelectedItems = prevProps => {
    if (!arraysEqual(prevProps.selectedItems, this.props.selectedItems)) {
      if (!this.props.mainContent.isDisabled && Array.isArray(this.props.selectedItems)) {
        const found = this.props.selectedItems.find(item => item === this.props.mainContent.value);
        if (!found) {
          this.setState({
            prevState: "default",
            state: "default"
          });
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  checkCheckbox = () => {
    if (this.checkboxRef && this.checkboxRef.setCheckedState) {
      this.checkboxRef.setCheckedState(this.props.mainContent.value, this.state.newSelectedState, this.props.currentCheckboxesState.finalSelectionArray);
    } else {
      return false;
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.checkIfUnselected();
    this.checkSelectedItems(prevProps);
    this.checkCheckbox();
  }

  checkIfUnselected = () => {
    let flag = true;

    if (this.props.mainContent.main.control) {
      if (this.props.config.selectionType === "radio") {
        if (this.props.currentRadiosState.checkedValue !== this.props.mainContent.value) {
          this.radioRef.setCheckedIndex(undefined);
        } else {
          flag = false;
        }
      }
      if (this.props.config.selectionType === "checkbox") {
        this.props.currentCheckboxesState.checkedValues.forEach(checkedValue => {
          if (checkedValue !== this.props.mainContent.value) {
            this.checkboxRef.setCheckedState(this.props.mainContent.value, false, this.props.currentCheckboxesState.finalSelectionArray);
          } else {
            flag = false;
          }
        });
      }
    }

    return flag;
  }

  pressInHandler = () => {
    const prevState = this.state.state;
    this.setState({
      prevState: prevState,
      state: this.props.mainContent.isSelected ? "active" : "focus"
    });
  }

  pressOutHandler = () => {
    this.setState({
      state: this.state.prevState
    });
  }

  pressHandler = () => {
    switch (this.props.config.selectionType) {
      case "single":
      case "radio":
        this.setState({
          prevState: "active",
          state: "active"
        });
        if (this.radioRef) {
          this.radioRef.setCheckedIndex(0);
          this.props.updateSelectedItems(this.props.mainContent.value, true, {
            checkedType: "radio",
            checkedValue: this.props.mainContent.value
          });
        } else {
          this.props.updateSelectedItems(this.props.mainContent.value, true);
        }
        break;
      case "multiple":
      case "checkbox":
        const newState = this.state.prevState === "default" ? "active" : "default";
        const newSelectedState = newState === "active" ? true : false;
        this.setState({
          prevState: newState,
          state: newState,
          newSelectedState: newSelectedState
        });
        if (this.checkboxRef) {
          this.props.updateSelectedItems(this.props.mainContent.value, newSelectedState, {
            checkedType: "checkbox",
            checkedValue: this.props.mainContent.value
          });
        } else {
          this.props.updateSelectedItems(this.props.mainContent.value, newSelectedState);
        }
      default:
        return false;
    }
  }

  getActiveStyles = () => {
    let activeStyles = {};

    if (this.props.config.selectionType !== "radio" && this.props.config.selectionType !== "checkbox") {
      if (this.props.mainContent.isSelected) {
        activeStyles = { ...this.getStyles().box.state.active };
      } else {
        activeStyles = { ...this.getStyles().box.state.default };
      }
    }

    return activeStyles;
  }

  getFocusStyles = () => {
    let focusStyles = {};

    if (this.props.config.selectionType !== "radio" && this.props.config.selectionType !== "checkbox") {
      if (this.props.mainContent.isSelected) {
        focusStyles = { ...this.getStyles().box.state.active }
      } else {
        focusStyles = this.state.state === "focus" ? { ...this.getStyles().box.state.focus } : { ...this.getStyles().box.state.default }
      }
    }

    return focusStyles;
  }

  getSidesContent = () => {
    let leftContent, rightContent;
    const iconSizeMultiplier = 1.5;

    if (!this.props.mainContent.left) {
      leftContent = null;
    } else {
      switch (this.props.mainContent.left.type) {
        case "icon":
          leftContent = (
            <Icon
              name={this.props.mainContent.left.config.name}
              color={this.getStyles().icon.state[this.state.state].color}
              size={this.getStyles().icon.size[this.props.config.size].size * iconSizeMultiplier}
            />
          );
          break;
        case "avatar":
          leftContent = (
            <PackenUiAvatar
              size={this.props.mainContent.left.config.size}
              src={this.props.mainContent.left.config.src}
            />
          );
          break;
        default:
          leftContent = null;
          break;
      }
    }

    if (!this.props.mainContent.right) {
      rightContent = null;
    } else {
      switch (this.props.mainContent.right.type) {
        case "icon":
          rightContent = (
            <Icon
              name={this.props.mainContent.right.config.name}
              color={this.getStyles().icon.state[this.state.state].color}
              size={this.getStyles().icon.size[this.props.config.size].size * iconSizeMultiplier}
            />
          );
          break;
        case "avatar":
          rightContent = (
            <PackenUiAvatar
              size={this.props.mainContent.right.config.size}
              src={this.props.mainContent.right.config.src}
            />
          );
          break;
        default:
          rightContent = null;
          break;
      }
    }

    if (leftContent !== null) {
      leftContent = (
        <View style={{ ...this.getStyles().content.left.base, ...this.getStyles().content.left.state[this.state.state] }}>
          {leftContent}
        </View>
      );
    }

    if (rightContent !== null) {
      rightContent = (
        <View style={{ ...this.getStyles().content.right.base, ...this.getStyles().content.right.state[this.state.state] }}>
          {rightContent}
        </View>
      );
    }

    return {
      left: leftContent,
      right: rightContent
    };
  }

  getLeftContent = () => {
    return this.getSidesContent().left;
  }

  getRightContent = () => {
    return this.getSidesContent().right;
  }

  setRadioRef = radio => {
    this.radioRef = radio;
  }

  setCheckboxRef = checkbox => {
    this.checkboxRef = checkbox;
  }

  setMainContent = () => {
    let mainContent;

    if (this.props.mainContent.main.control) {
      switch (this.props.mainContent.main.control.type) {
        case "radio": {
          mainContent = (
            <PackenUiRadio
              layout="dropdown"
              items={[{
                label: this.props.mainContent.main.control.label,
                isDisabled: this.props.mainContent.main.control.isDisabled
              }]}
              ref={this.setRadioRef}
              name="dropdownItemRadio"
              initialIndex={-1}
              callback={this.mockCallback}
            />
          );
        } break;
        case "checkbox": {
          mainContent = (
            <PackenUiCheckbox
              layout="dropdown"
              items={this.props.mainContent.main.control.items}
              callback={this.props.mainContent.main.control.handleNotify}
              ref={this.setCheckboxRef}
              name="dropdownItemCheckbox"
            />
          );
        } break;
        default:
          return false;
      }
    } else {
      mainContent = (
        <View style={this.getStyles().content.main}>
          {this.props.mainContent.main}
        </View>
      );
    }

    this.setState({
      mainContent: mainContent
    });
  }

  getItemHeight = ({ height }) => {
    this.props.getItemHeight(height);
  }

  getDisabledStyles = () => {
    let disabledStyles = {
      box: {},
      content: { wrapper: {} }
    };

    if (this.props.mainContent.isDisabled) {
      disabledStyles = {
        box: {
          ...this.getStyles().box.state.disabled
        },
        content: {
          wrapper: {
            ...this.getStyles().content.wrapper.state.disabled
          }
        }
      };
    }

    return disabledStyles;
  }

  checkMainContentStyles = () => {
    let flag = true;
    const mainContent = this.props.mainContent;

    if (mainContent.isDisabled) {
      if (Array.isArray(mainContent.main.props.children)) {
        mainContent.main.props.children.forEach(child => {
          if (child.type.displayName !== "PackenUiRadio" && child.type.displayName !== "PackenUiCheckbox") {
            child.props.style.color = Colors.basic.gray.lgt;
          } else {
            flag = false;
          }
        });
      } else {
        if (mainContent.main.type.displayName !== "PackenUiRadio" && mainContent.main.type.displayName !== "PackenUiCheckbox") {
          mainContent.main.props.style.color = Colors.basic.gray.lgt;
        } else {
          flag = false;
        }
      }
    } else {
      if (mainContent.isSelected) {
        if (Array.isArray(mainContent.main.props.children)) {
          mainContent.main.props.children.forEach(child => {
            if (child.type.displayName !== "PackenUiRadio" && child.type.displayName !== "PackenUiCheckbox") {
              child.props.style.color = Colors.basic.white.dft;
            } else {
              flag = false;
            }
          });
        } else {
          if (mainContent.main.type.displayName !== "PackenUiRadio" && mainContent.main.type.displayName !== "PackenUiCheckbox") {
            mainContent.main.props.style.color = Colors.basic.white.dft;
          } else {
            flag = false;
          }
        }
      } else {
        if (Array.isArray(mainContent.main.props.children)) {
          mainContent.main.props.children.forEach((child, i) => {
            if (child.type.displayName !== "PackenUiRadio" && child.type.displayName !== "PackenUiCheckbox") {
              child.props.style.color = this.state.originalStyles[i].color;
            } else {
              flag = false;
            }
          });
        } else {
          if (mainContent.main.type.displayName !== "PackenUiRadio" && mainContent.main.type.displayName !== "PackenUiCheckbox") {
            mainContent.main.props.style.color = this.state.originalStyles.color;
          } else {
            flag = false;
          }
        }
      }
    }

    return flag;
  }

  render() {
    if (!this.props.mainContent.main.control) {
      this.checkMainContentStyles();
    }

    return (
      <View pointerEvents={this.props.mainContent.isDisabled ? "none" : "auto"}>
        <TouchableWithoutFeedback
          onPressIn={this.pressInHandler}
          onPressOut={this.pressOutHandler}
          onPress={this.pressHandler}
          onLayout={e => { this.getItemHeight(e.nativeEvent.layout); }}
        >
          <View
            style={{
              ...this.getStyles().box.base,
              ...this.getActiveStyles(),
              ...this.getFocusStyles(),
              ...this.getStyles().box.selection[this.props.config.selectionType],
              ...this.getDisabledStyles().box
            }}
          >
            <View style={{ ...this.getStyles().content.wrapper.base, ...this.getDisabledStyles().content.wrapper }}>
              {this.getLeftContent()}
              {this.state.mainContent}
              {this.getRightContent()}
              {
                this.props.mainContent.isSelected && this.props.config.checkedIcon ? (
                  <Icon
                    name={this.props.config.checkedIcon}
                    size={this.getStyles().icon.size[this.props.config.size].size * 1.2}
                    color={Colors.basic.white.dft}
                  />
                ) : null
              }
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  getStyles = () => {
    return {
      box: {
        base: {
          paddingVertical: 10,
          paddingHorizontal: 16,
          borderBottomWidth: 1,
          borderBottomStyle: "solid",
          borderBottomColor: Colors.basic.white.drk
        },
        state: {
          default: {
            backgroundColor: Colors.basic.white.dft
          },
          focus: {
            backgroundColor: Colors.brand.primary.snw
          },
          active: {
            backgroundColor: Colors.brand.primary.drk
          },
          disabled: {
            backgroundColor: Colors.basic.white.dft
          }
        },
        selection: {
          single: {},
          multiple: {},
          radio: {
            padding: 0
          },
          checkbox: {
            padding: 0
          }
        }
      },
      content: {
        wrapper: {
          base: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
          },
          state: {
            default: {},
            focus: {},
            active: {},
            disabled: {}
          }
        },
        left: {
          base: {
            marginRight: 12,
          },
          state: {
            default: {},
            focus: {},
            active: {},
            disabled: {
              opacity: 0.2
            }
          }
        },
        main: {
          flex: 1
        },
        right: {
          base: {
            marginLeft: 12
          },
          state: {
            default: {},
            focus: {},
            active: {},
            disabled: {
              opacity: 0.2
            }
          }
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
          default: {
            color: Colors.basic.independence.dft
          },
          focus: {
            color: Colors.basic.independence.dft
          },
          active: {
            color: Colors.basic.white.dft
          },
          disabled: {
            color: Colors.basic.gray.dft
          }
        }
      }
    };
  }
}

PackenUiDropdownListItem.propTypes = {
  config: PropTypes.object.isRequired,
  mainContent: PropTypes.object.isRequired,
  getItemHeight: PropTypes.func.isRequired,
  selectedItems: PropTypes.array.isRequired,
  updateSelectedItems: PropTypes.func.isRequired,
  currentRadiosState: PropTypes.object,
  currentCheckboxesState: PropTypes.object
};

export default PackenUiDropdownListItem;