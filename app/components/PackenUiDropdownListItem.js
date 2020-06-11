import React, { Component, createRef } from "react";
import PropTypes from "prop-types";
import { TouchableWithoutFeedback, View } from "react-native";

import Icon from "react-native-vector-icons/dist/Feather";

import Colors from "../styles/abstracts/colors";
import Typography from "../styles/abstracts/typography";
import * as UTIL from "../utils";

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

  getPropStyling = () => {
    return this.props.styling ? { ...this.props.styling } : {
      wrapper: {},
      box: {},
      contentWrapper: {},
      checkIconSize: undefined,
      checkIconColor: undefined,
      avatar: {},
      sideIconSize: undefined,
      sideIconColor: undefined,
      leftWrapper: {},
      mainWrapper: {},
      rightWrapper: {},
      checkbox: {},
      radio: {}
    };
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

  getOriginalChildrenStyles = (child, originalStyles) => {
    if (child.type.displayName !== "PackenUiRadio" && child.type.displayName !== "PackenUiCheckbox") {
      originalStyles.push({ color: child.props.style.color });
    } else {
      originalStyles = [];
    }
  }

  getOriginalStyles = () => {
    let originalStyles = [];

    if (!this.props.mainContent.main.control) {
      if (Array.isArray(this.props.mainContent.main.props.children)) {
        this.props.mainContent.main.props.children.forEach(child => this.getOriginalChildrenStyles(child, originalStyles));
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

    if (typeof this.props.instance === "function") {
      this.props.instance(this);
    }
  }

  mockCallback = () => true;

  findSelectedItem = item => item === this.props.mainContent.value;

  checkSelectedItems = prevProps => {
    if (!UTIL.arraysEqual(prevProps.selectedItems, this.props.selectedItems)) {
      if (!this.props.mainContent.isDisabled && Array.isArray(this.props.selectedItems)) {
        const found = this.props.selectedItems.find(this.findSelectedItem);
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

  checkUnselectedChildren = checkedValue => {
    if (checkedValue !== this.props.mainContent.value) {
      this.checkboxRef.setCheckedState(this.props.mainContent.value, false, this.props.currentCheckboxesState.finalSelectionArray);
    } else {
      return false;
    }
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
        this.props.currentCheckboxesState.checkedValues.forEach(this.checkUnselectedChildren);
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

  handleSingleRadioPress = () => {
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
  }

  handleMultipleCheckboxPress = () => {
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
  }

  pressHandler = () => {
    switch (this.props.config.selectionType) {
      case "single":
      case "radio":
        this.handleSingleRadioPress();
        break;
      case "multiple":
      case "checkbox":
        this.handleMultipleCheckboxPress();
        break;
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

  getLeftRender = (leftContent, iconSizeMultiplier) => {
    let leftRender = leftContent;
    switch (this.props.mainContent.left.type) {
      case "icon":
        leftRender = (
          <Icon
            name={this.props.mainContent.left.config.name}
            color={this.getPropStyling().sideIconColor ? this.getPropStyling().sideIconColor : this.getStyles().icon.state[this.state.state].color}
            size={this.getPropStyling().sideIconSize ? this.getPropStyling().sideIconSize : this.getStyles().icon.size[this.props.config.size].size * iconSizeMultiplier}
          />
        );
        break;
      case "avatar":
        leftRender = (
          <PackenUiAvatar
            size={this.props.mainContent.left.config.size}
            src={this.props.mainContent.left.config.src}
            styling={this.getPropStyling().avatar}
          />
        );
        break;
      default:
        leftRender = null;
        break;
    }
    return leftRender;
  }

  getRightRender = (rightContent, iconSizeMultiplier) => {
    let rightRender = rightContent;
    switch (this.props.mainContent.right.type) {
      case "icon":
        rightRender = (
          <Icon
            name={this.props.mainContent.right.config.name}
            color={this.getPropStyling().sideIconColor ? this.getPropStyling().sideIconColor : this.getStyles().icon.state[this.state.state].color}
            size={this.getPropStyling().sideIconSize ? this.getPropStyling().sideIconSize : this.getStyles().icon.size[this.props.config.size].size * iconSizeMultiplier}
          />
        );
        break;
      case "avatar":
        rightRender = (
          <PackenUiAvatar
            size={this.props.mainContent.right.config.size}
            src={this.props.mainContent.right.config.src}
            styling={this.getPropStyling().avatar}
          />
        );
        break;
      default:
        rightRender = null;
        break;
    }
    return rightRender;
  }

  getSidesContent = () => {
    let leftContent, rightContent;
    const iconSizeMultiplier = 1.5;

    if (!this.props.mainContent.left) {
      leftContent = null;
    } else {
      leftContent = this.getLeftRender(leftContent, iconSizeMultiplier);
    }

    if (!this.props.mainContent.right) {
      rightContent = null;
    } else {
      rightContent = this.getRightRender(rightContent, iconSizeMultiplier);
    }

    if (leftContent !== null) {
      leftContent = (
        <View style={{ ...this.getStyles().content.left.base, ...this.getStyles().content.left.state[this.state.state], ...this.getPropStyling().leftWrapper }}>
          {leftContent}
        </View>
      );
    }

    if (rightContent !== null) {
      rightContent = (
        <View style={{ ...this.getStyles().content.right.base, ...this.getStyles().content.right.state[this.state.state], ...this.getPropStyling().rightWrapper }}>
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

  getMainControl = mainContent => {
    let mainControl = mainContent;
    switch (this.props.mainContent.main.control.type) {
      case "radio": {
        mainControl = (
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
            styling={this.getPropStyling().radio}
          />
        );
      } break;
      case "checkbox": {
        mainControl = (
          <PackenUiCheckbox
            layout="dropdown"
            items={this.props.mainContent.main.control.items}
            callback={this.props.mainContent.main.control.handleNotify}
            ref={this.setCheckboxRef}
            name="dropdownItemCheckbox"
            styling={this.getPropStyling().checkbox}
          />
        );
      } break;
      default:
        return false;
    }
    return mainControl;
  }

  setMainContent = () => {
    let mainContent;

    if (this.props.mainContent.main.control) {
      mainContent = this.getMainControl();
    } else {
      mainContent = (
        <View style={{ ...this.getStyles().content.main, ...this.getPropStyling().mainWrapper }}>
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

  checkDisabledChildren = child => {
    if (child.type.displayName !== "PackenUiRadio" && child.type.displayName !== "PackenUiCheckbox") {
      child.props.style.color = Colors.basic.gray.lgt;
    } else {
      return false;
    }
  }

  checkDisabledStyles = mainContent => {
    if (Array.isArray(mainContent.main.props.children)) {
      mainContent.main.props.children.forEach(this.checkDisabledChildren);
    } else {
      if (mainContent.main.type.displayName !== "PackenUiRadio" && mainContent.main.type.displayName !== "PackenUiCheckbox") {
        mainContent.main.props.style.color = Colors.basic.gray.lgt;
      } else {
        return false;
      }
    }
  }

  checkSelectedChildren = child => {
    if (child.type.displayName !== "PackenUiRadio" && child.type.displayName !== "PackenUiCheckbox") {
      child.props.style.color = Colors.basic.white.dft;
    } else {
      return false;
    }
  }

  checkSelectedStyles = mainContent => {
    if (Array.isArray(mainContent.main.props.children)) {
      mainContent.main.props.children.forEach(this.checkSelectedChildren);
    } else {
      if (mainContent.main.type.displayName !== "PackenUiRadio" && mainContent.main.type.displayName !== "PackenUiCheckbox") {
        mainContent.main.props.style.color = Colors.basic.white.dft;
      } else {
        return false;
      }
    }
  }

  checkDefaultChildren = (child, i) => {
    if (child.type.displayName !== "PackenUiRadio" && child.type.displayName !== "PackenUiCheckbox") {
      child.props.style.color = this.state.originalStyles[i].color;
    }
  }

  checkDefaultStyles = mainContent => {
    if (Array.isArray(mainContent.main.props.children)) {
      mainContent.main.props.children.forEach(this.checkDefaultChildren);
    } else {
      if (mainContent.main.type.displayName !== "PackenUiRadio" && mainContent.main.type.displayName !== "PackenUiCheckbox") {
        mainContent.main.props.style.color = this.state.originalStyles.color;
      }
    }
  }

  checkMainContentStyles = () => {
    const mainContent = this.props.mainContent;

    if (mainContent.isDisabled) {
      this.checkDisabledStyles(mainContent);
    } else {
      if (mainContent.isSelected) {
        this.checkSelectedStyles(mainContent);
      } else {
        this.checkDefaultStyles(mainContent);
      }
    }
  }

  render() {
    if (!this.props.mainContent.main.control) {
      this.checkMainContentStyles();
    }
    const propStyling = this.getPropStyling();

    return (
      <View style={propStyling.wrapper} pointerEvents={this.props.mainContent.isDisabled ? "none" : "auto"}>
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
              ...this.getDisabledStyles().box,
              ...propStyling.box
            }}
          >
            <View style={{ ...this.getStyles().content.wrapper.base, ...this.getDisabledStyles().content.wrapper, ...propStyling.contentWrapper }}>
              {this.getLeftContent()}
              {this.state.mainContent}
              {this.getRightContent()}
              {
                this.props.mainContent.isSelected && this.props.config.checkedIcon ? (
                  <Icon
                    name={this.props.config.checkedIcon}
                    size={propStyling.checkIconSize ? propStyling.checkIconSize : this.getStyles().icon.size[this.props.config.size].size * 1.2}
                    color={propStyling.checkIconColor ? propStyling.checkIconColor : Colors.basic.white.dft}
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
  currentCheckboxesState: PropTypes.object,
  styling: PropTypes.object
};

export default PackenUiDropdownListItem;