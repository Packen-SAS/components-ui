import React, { Component } from "react";
import { TouchableWithoutFeedback, View } from "react-native";

import Colors from "../styles/abstracts/colors";
import ListStyles from "../styles/components/PackenList";

class PackenListItem extends Component {
  constructor(props) {
    super(props);

    const initialState = this.props.mainContent.isSelected ? "active" : "default";

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
    }
  }

  get_right_content = () => {
    if (!this.props.mainContent.right) {
      return null;
    }
  }

  get_item_height = ({ height }) => {
    this.props.getItemHeight(height);
  }

  check_main_content_styles = () => {
    if (this.props.mainContent.isSelected) {
      this.props.mainContent.main.props.style.color = Colors.basic.white.dft;
    } else {
      this.props.mainContent.main.props.style.color = this.state.originalStyles.color;
    }
  }

  render() {
    this.check_main_content_styles();

    return (
      <TouchableWithoutFeedback
        onPressIn={this.pressIn_handler}
        onPressOut={this.pressOut_handler}
        onPress={this.press_handler}
        onLayout={e => { this.get_item_height(e.nativeEvent.layout); }}
      >
        <View
          style={{ ...ListStyles.box.base, ...this.get_active_styles(), ...this.get_focus_styles() }}
        >
          { this.get_left_content() }
          { this.props.mainContent.main }
          { this.get_right_content() }
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default PackenListItem;