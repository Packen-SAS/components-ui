import React, { Component } from "react";
import { TouchableWithoutFeedback, View } from "react-native";

import Icon from "react-native-vector-icons/dist/Feather";

import Colors from "../styles/abstracts/colors";
import ListStyles from "../styles/components/PackenList";

class PackenListItem extends Component {
  constructor(props) {
    super(props);

    const initialState = this.props.mainContent.isDisabled ? "disabled" : this.props.mainContent.isSelected ? "active" : "default";

    this.state = {
      prevState: initialState,
      state: initialState,
      originalStyles: { ...this.props.mainContent.main.props.style }
    }
  }

  pressIn_handler = () => {
    this.setState({
      state: this.props.mainContent.isSelected ? "active" : "focus"
    });
  }

  pressOut_handler = () => {
    this.setState({
      state: this.state.prevState
    });
  }

  press_handler = () => {
    if (this.props.config.selectionType === "single") {
      this.setState({
        prevState: "active",
        state: "active"
      });
      this.props.updateSelectedItems(this.props.mainContent.value, true);
    } else {

    }
  }

  get_active_styles = () => {
    let activeStyles = {};

    if (this.props.mainContent.isSelected) {
      activeStyles = { ...ListStyles.box.state.active };
    } else {
      activeStyles = { ...ListStyles.box.state.default };
    }

    return activeStyles;
  }

  get_focus_styles = () => {
    let focusStyles = {};

    if (this.props.mainContent.isSelected) {
      focusStyles = { ...ListStyles.box.state.active }
    } else {
      focusStyles = this.state.state === "focus" ? { ...ListStyles.box.state.focus } : { ...ListStyles.box.state.default }
    }

    return focusStyles;
  }

  get_left_content = () => {
    if (!this.props.mainContent.left) {
      return null;
    } else {
      return (
        <View style={ListStyles.content.left}>

        </View>
      );
    }
  }

  get_right_content = () => {
    if (!this.props.mainContent.right) {
      return null;
    } else {
      return (
        <View style={ListStyles.content.right}>

        </View>
      );
    }
  }

  get_item_height = ({ height }) => {
    this.props.getItemHeight(height);
  }

  check_main_content_styles = () => {
    if (this.props.mainContent.isDisabled) {
      this.props.mainContent.main.props.style.color = Colors.basic.gray.lgt;
    } else {
      if (this.props.mainContent.isSelected) {
        this.props.mainContent.main.props.style.color = Colors.basic.white.dft;
      } else {
        this.props.mainContent.main.props.style.color = this.state.originalStyles.color;
      }
    }
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

  render() {
    this.check_main_content_styles();

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
              ...this.get_disabled_styles().box
            }}
          >
            <View style={{ ...ListStyles.content.wrapper.base, ...this.get_disabled_styles().content.wrapper }}>
              {this.get_left_content()}
              <View style={ListStyles.content.main}>
                {this.props.mainContent.main}
              </View>
              {this.get_right_content()}
              {
                this.props.mainContent.isSelected && this.props.config.checkedIcon ? (
                  <View style={ListStyles.checkedIcon}>
                    <Icon
                      name={this.props.config.checkedIcon}
                      size={ListStyles.icon.size[this.props.config.size].size * 1.2}
                      color={Colors.basic.white.dft}
                    />
                  </View>
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