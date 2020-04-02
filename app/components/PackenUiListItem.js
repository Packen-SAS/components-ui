import React, { Component, createRef } from "react";
import { TouchableWithoutFeedback, View } from "react-native";

import Icon from "react-native-vector-icons/dist/Feather";

import Colors from "../styles/abstracts/colors";
import ListStyles from "../styles/components/PackenUiList";
import { arraysEqual } from "../utils";

import PackenUiAvatar from "./PackenUiAvatar";
import PackenUiRadio from "./PackenUiRadio";
import PackenUiCheckbox from "./PackenUiCheckbox";

class PackenUiListItem extends Component {
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
          if (this.props.mainContent.main.type.displayName !== "PackenUiRadio" && this.props.mainContent.main.type.displayName !== "PackenUiCheckbox") {
            originalStyles.push({ color: child.props.style.color });
          }
        });
      } else {
        if (this.props.mainContent.main.type.displayName !== "PackenUiRadio" && this.props.mainContent.main.type.displayName !== "PackenUiCheckbox") {
          originalStyles = { ...this.props.mainContent.main.props.style };
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
    if (this.props.mainContent.main.control) {
      if (this.props.config.selectionType === "radio") {
        if (this.props.currentRadiosState.checkedValue !== this.props.mainContent.value) {
          this.radioRef.setCheckedIndex(undefined);
        }
      }
      if (this.props.config.selectionType === "checkbox") {
        this.props.currentCheckboxesState.checkedValues.forEach(checkedValue => {
          if (checkedValue !== this.props.mainContent.value) {
            this.checkboxRef.setCheckedState(this.props.mainContent.value, false, this.props.currentCheckboxesState.finalSelectionArray);
          }
        });
      }
    }
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
        activeStyles = { ...ListStyles.box.state.active };
      } else {
        activeStyles = { ...ListStyles.box.state.default };
      }
    }

    return activeStyles;
  }

  getFocusStyles = () => {
    let focusStyles = {};

    if (this.props.config.selectionType !== "radio" && this.props.config.selectionType !== "checkbox") {
      if (this.props.mainContent.isSelected) {
        focusStyles = { ...ListStyles.box.state.active }
      } else {
        focusStyles = this.state.state === "focus" ? { ...ListStyles.box.state.focus } : { ...ListStyles.box.state.default }
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
              color={ListStyles.icon.state[this.state.state].color}
              size={ListStyles.icon.size[this.props.config.size].size * iconSizeMultiplier}
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
              color={ListStyles.icon.state[this.state.state].color}
              size={ListStyles.icon.size[this.props.config.size].size * iconSizeMultiplier}
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
        <View style={{ ...ListStyles.content.left.base, ...ListStyles.content.left.state[this.state.state] }}>
          {leftContent}
        </View>
      );
    }

    if (rightContent !== null) {
      rightContent = (
        <View style={{ ...ListStyles.content.right.base, ...ListStyles.content.right.state[this.state.state] }}>
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
            />
          );
        } break;
        case "checkbox": {
          mainContent = (
            <PackenUiCheckbox
              layout="dropdown"
              items={this.props.mainContent.main.control.items}
              callback={this.props.mainContent.main.control.notifyParent}
              ref={this.setCheckboxRef}
            />
          );
        } break;
        default:
          return false;
      }
    } else {
      mainContent = (
        <View style={ListStyles.content.main}>
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
          ...ListStyles.box.state.disabled
        },
        content: {
          wrapper: {
            ...ListStyles.content.wrapper.state.disabled
          }
        }
      };
    }

    return disabledStyles;
  }

  checkMainContentStyles = () => {
    const mainContent = this.props.mainContent;

    if (mainContent.isDisabled) {
      if (Array.isArray(mainContent.main.props.children)) {
        mainContent.main.props.children.forEach(child => {
          if (child.type.displayName !== "PackenUiRadio" && child.type.displayName !== "PackenUiCheckbox") {
            child.props.style.color = Colors.basic.gray.lgt;
            return 1;
          } else {
            return false;
          }
        });
      } else {
        if (mainContent.main.type.displayName !== "PackenUiRadio" && mainContent.main.type.displayName !== "PackenUiCheckbox") {
          mainContent.main.props.style.color = Colors.basic.gray.lgt;
          return 2;
        } else {
          return false;
        }
      }
    } else {
      if (mainContent.isSelected) {
        if (Array.isArray(mainContent.main.props.children)) {
          mainContent.main.props.children.forEach(child => {
            if (child.type.displayName !== "PackenUiRadio" && child.type.displayName !== "PackenUiCheckbox") {
              child.props.style.color = Colors.basic.white.dft;
              return 3;
            } else {
              return false;
            }
          });
        } else {
          if (mainContent.main.type.displayName !== "PackenUiRadio" && mainContent.main.type.displayName !== "PackenUiCheckbox") {
            mainContent.main.props.style.color = Colors.basic.white.dft;
            return 4;
          } else {
            return false;
          }
        }
      } else {
        if (Array.isArray(mainContent.main.props.children)) {
          mainContent.main.props.children.forEach((child, i) => {
            if (child.type.displayName !== "PackenUiRadio" && child.type.displayName !== "PackenUiCheckbox") {
              child.props.style.color = this.state.originalStyles[i].color;
              return 5;
            } else {
              return false;
            }
          });
        } else {
          if (mainContent.main.type.displayName !== "PackenUiRadio" && mainContent.main.type.displayName !== "PackenUiCheckbox") {
            mainContent.main.props.style.color = this.state.originalStyles.color;
            return 6;
          } else {
            return false;
          }
        }
      }
    }

    return 7;
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
              ...ListStyles.box.base,
              ...this.getActiveStyles(),
              ...this.getFocusStyles(),
              ...ListStyles.box.selection[this.props.config.selectionType],
              ...this.getDisabledStyles().box
            }}
          >
            <View style={{ ...ListStyles.content.wrapper.base, ...this.getDisabledStyles().content.wrapper }}>
              {this.getLeftContent()}
              {this.state.mainContent}
              {this.getRightContent()}
              {
                this.props.mainContent.isSelected && this.props.config.checkedIcon ? (
                  <Icon
                    name={this.props.config.checkedIcon}
                    size={ListStyles.icon.size[this.props.config.size].size * 1.2}
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
}

export default PackenUiListItem;