import React, { Component } from "react";
import { View, TouchableWithoutFeedback, StyleSheet } from "react-native";

import Icon from "react-native-vector-icons/dist/Feather";

import CheckBoxStyles from "../styles/components/PackenCheckBox";
import PackenText from "../components/PackenText";

class PackenCheckBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [...props.items]
    }
  }

  change_state = (index, disabled, checked) => {
    if (!disabled) {
      this.props.notifyParent(index, !checked);
    }
  }

  get_styles_checkbox = (disabled, checked) => {
    if (disabled) {
      if (checked !== true && checked !== false) {
        return CheckBoxStyles.content.disabledCheckUnChecked;
      }
      if (!checked) {
        return CheckBoxStyles.content.disabledUnChecked;
      }
      return CheckBoxStyles.content.disabled;
    }
    if (checked === true || checked === false) {
      return CheckBoxStyles.content.active;
    } else {
      return CheckBoxStyles.content.default;
    }
  }

  map_items = (check, index) => {
    return (
      <View key={index} style={PackenCheckBoxStyle.contentView}>
        <TouchableWithoutFeedback onPress={() => this.change_state(index, check.disabled, check.checked)}>
          <View style={PackenCheckBoxStyle.contentCheckTitle}>
            <View style={this.get_styles_checkbox(check.disabled, check.checked)} >
              {check.checked === true ? <Icon style={CheckBoxStyles.icon} name="check" /> : null}
              {check.checked === false ? <Icon style={CheckBoxStyles.icon} name="minus" /> : null}
            </View>
            {
              check.title ? (
                <PackenText style={CheckBoxStyles.title}>{check.title}</PackenText>
              ) : null
            }
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }

  get_items = () => this.state.items.map(this.map_items);

  render() {
    return (
      <View>
        <View style={{ flexDirection: this.props.layout, flexWrap: "wrap" }}>
          { this.get_items() }
        </View>
      </View>
    )
  }
}

const PackenCheckBoxStyle = StyleSheet.create({
  contentView: {
    marginRight: 15,
    marginBottom: 10
  },
  contentCheckTitle: {
    alignSelf: "flex-start",
    flexDirection: "row"
  }
});

export default PackenCheckBox;