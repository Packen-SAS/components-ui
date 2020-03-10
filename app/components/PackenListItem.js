import React, { Component } from "react";
import { TouchableWithoutFeedback, View } from "react-native";

import ListStyles from "../styles/components/PackenList";

class PackenListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prevState: "default",
      state: "default"
    }
  }

  pressIn_handler = () => {
    this.setState({
      state: "focus"
    });
  }

  pressOut_handler = () => {
    this.setState({
      state: "default"
    });
  }

  press_handler = () => {
    this.setState({
      state: "active"
    });
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

  render() {
    return (
      <TouchableWithoutFeedback
        onPressIn={this.pressIn_handler}
        onPressOut={this.pressOut_handler}
        onPress={this.press_handler}
        onLayout={e => { this.get_item_height(e.nativeEvent.layout); }}
      >
        <View
          style={{ ...ListStyles.box.base, ...ListStyles.box.state[this.state.state] }}
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