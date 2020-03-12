import React, { Component, createRef } from "react";
import { TouchableWithoutFeedback, View } from "react-native";

import Icon from "react-native-vector-icons/dist/Feather";

import Colors from "../styles/abstracts/colors";
import ListStyles from "../styles/components/PackenList";

import PackenAvatar from "./PackenAvatar";
import PackenRadio from "./PackenRadio";
import PackenCheckbox from "./PackenCheckbox";

class PackenListItem extends Component {
  constructor(props) {
    super(props);

    const initialState = this.props.mainContent.isDisabled ? "disabled" : this.props.mainContent.isSelected ? "active" : "default";

    let originalStyles = {};
    if (!this.props.mainContent.main.control) {
      if (Array.isArray(this.props.mainContent.main.props.children)) {
        originalStyles = [];
        this.props.mainContent.main.props.children.forEach(child => {
          if (this.props.mainContent.main.type.displayName !== "PackenRadio" && this.props.mainContent.main.type.displayName !== "PackenCheckbox") {
            originalStyles.push({ color: child.props.style.color });
          }
        });
      } else {
        if (this.props.mainContent.main.type.displayName !== "PackenRadio" && this.props.mainContent.main.type.displayName !== "PackenCheckbox") {
          originalStyles = { ...this.props.mainContent.main.props.style };
        }
      }
    } else {
      this.radioRef = createRef();
      this.checkboxRef = createRef();
    }

    this.state = {
      prevState: initialState,
      state: initialState,
      originalStyles: originalStyles,
      mainContent: null
    }
  }

  componentDidMount() {
    this.set_main_content();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.checkIfUnselected();
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
            this.checkboxRef.setCheckedState(this.props.mainContent.value, false);
          } else {
            this.checkboxRef.setCheckedState(this.props.mainContent.value, true);
          }
        });
      }
    }
  }

  pressIn_handler = () => {
    const prevState = this.state.state;
    this.setState({
      prevState: prevState,
      state: this.props.mainContent.isSelected ? "active" : "focus"
    });
  }

  pressOut_handler = () => {
    this.setState({
      state: this.state.prevState
    });
  }

  press_handler = () => {
    switch (this.props.config.selectionType) {
      case "single":
      case "radio": {
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
      } break;
      case "multiple":
      case "checkbox": {
        const newState = this.state.prevState === "default" ? "active" : "default";
        this.setState({
          prevState: newState,
          state: newState
        });
        const newSelectedState = newState === "active" ? true : false;
        if (this.checkboxRef) {
          this.checkboxRef.setCheckedState(this.props.mainContent.value, newSelectedState);
          this.props.updateSelectedItems(this.props.mainContent.value, newSelectedState, {
            checkedType: "checkbox",
            checkedValue: this.props.mainContent.value
          });
        } else {
          this.props.updateSelectedItems(this.props.mainContent.value, newSelectedState);
        }
      } break;
      default:
        break;
    }
  }

  get_active_styles = () => {
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

  get_focus_styles = () => {
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

    if (!this.props.mainContent.left) {
      leftContent = null;
    } else {
      switch (this.props.mainContent.left.type) {
        case "icon":
          leftContent = (
            <Icon
              name={this.props.mainContent.left.config.name}
              color={ListStyles.icon.state[this.state.state].color}
              size={ListStyles.icon.size[this.props.config.size].size * 1.5}
            />
          );
          break;
        case "avatar":
          leftContent = (
            <PackenAvatar
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
              size={ListStyles.icon.size[this.props.config.size].size * 1.2}
            />
          );
          break;
        case "avatar":
          rightContent = (
            <PackenAvatar
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

  get_left_content = () => {
    return this.getSidesContent().left;
  }

  get_right_content = () => {
    return this.getSidesContent().right;
  }

  set_main_content = () => {
    let mainContent;

    if (this.props.mainContent.main.control) {
      switch (this.props.mainContent.main.control.type) {
        case "radio": {
          mainContent = (
            <PackenRadio
              layout="dropdown"
              items={[{
                label: this.props.mainContent.main.control.label,
                isDisabled: this.props.mainContent.main.control.isDisabled
              }]}
              ref={radio => { this.radioRef = radio; }}
            />
          );
        } break;
        case "checkbox": {
          mainContent = (
            <PackenCheckbox
              layout="dropdown"
              items={this.props.mainContent.main.control.items}
              callback={this.props.mainContent.main.control.notifyParent}
              ref={checkbox => { this.checkboxRef = checkbox; }}
            />
          );
        } break;
        default:
          break;
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

  get_item_height = ({ height }) => {
    this.props.getItemHeight(height);
  }

  get_disabled_styles = () => {
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

  check_main_content_styles = () => {
    if (this.props.mainContent.isDisabled) {
      if (Array.isArray(this.props.mainContent.main.props.children)) {
        this.props.mainContent.main.props.children.forEach(child => {
          if (child.type.displayName !== "PackenRadio" && child.type.displayName !== "PackenCheckbox") {
            child.props.style.color = Colors.basic.gray.lgt;
          }
        });
      } else {
        if (this.props.mainContent.main.type.displayName !== "PackenRadio" && this.props.mainContent.main.type.displayName !== "PackenCheckbox") {
          this.props.mainContent.main.props.style.color = Colors.basic.gray.lgt;
        }
      }
    } else {
      if (this.props.mainContent.isSelected) {
        if (Array.isArray(this.props.mainContent.main.props.children)) {
          this.props.mainContent.main.props.children.forEach(child => {
            if (child.type.displayName === "PackenText") {
              if (child.type.displayName !== "PackenRadio" && child.type.displayName !== "PackenCheckbox") {
                child.props.style.color = Colors.basic.white.dft;
              }
            }
          });
        } else {
          if (this.props.mainContent.main.type.displayName !== "PackenRadio" && this.props.mainContent.main.type.displayName !== "PackenCheckbox") {
            this.props.mainContent.main.props.style.color = Colors.basic.white.dft;
          }
        }
      } else {
        if (Array.isArray(this.props.mainContent.main.props.children)) {
          this.props.mainContent.main.props.children.forEach((child, i) => {
            if (child.type.displayName === "PackenText") {
              child.props.style.color = this.state.originalStyles[i].color;
            }
          });
        } else {
          if (this.props.mainContent.main.type.displayName !== "PackenRadio" && this.props.mainContent.main.type.displayName !== "PackenCheckbox") {
            this.props.mainContent.main.props.style.color = this.state.originalStyles.color;
          }
        }
      }
    }
  }

  render() {
    if (!this.props.mainContent.main.control) {
      this.check_main_content_styles();
    }

    return (
      <View pointerEvents={this.props.mainContent.isDisabled ? "none" : "auto"}>
        <TouchableWithoutFeedback
          onPressIn={this.pressIn_handler}
          onPressOut={this.pressOut_handler}
          onPress={this.press_handler}
          onLayout={e => { this.get_item_height(e.nativeEvent.layout); }}
        >
          <View
            style={{
              ...ListStyles.box.base,
              ...this.get_active_styles(),
              ...this.get_focus_styles(),
              ...ListStyles.box.selection[this.props.config.selectionType],
              ...this.get_disabled_styles().box
            }}
          >
            <View style={{ ...ListStyles.content.wrapper.base, ...this.get_disabled_styles().content.wrapper }}>
              {this.get_left_content()}
              {this.state.mainContent}
              {this.get_right_content()}
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

export default PackenListItem;