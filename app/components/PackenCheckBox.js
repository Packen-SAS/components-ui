import React, { Component } from "react";
import { View, TouchableWithoutFeedback, StyleSheet } from "react-native";

<<<<<<< HEAD
export default class PackecnCheckBox extends React.Component {
  constructor(props) {
    super(props);
  }

  changeState = async (index, disabled, checked) => {
    if (!disabled) {
      this.props.notifyParent(index, !checked);
    }
  }


  state = {
    items: []
=======
import Icon from "react-native-vector-icons/dist/Feather";

import CheckBoxStyles from "../styles/components/PackenCheckBox";
import PackenText from "../components/PackenText";

class PackenCheckBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: []
    }
  }

  changeState = async (index, disabled, checked) => {
    if (!disabled) {
      this.props.notifyParent(index, !checked);
    }
>>>>>>> Initial integration with Checkbox, Input and Textarea components
  }

  componentWillMount() {
    this.setState({ items: this.props.items });
  }

  getStylesCheckBox = (disabled, checked) => {
    if (disabled) {
      if (checked !== true && checked !== false) {
        return CheckBoxStyles.content.disabledCheckUnChecked;
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
<<<<<<< HEAD
        <TouchableOpacity onPress={() => this.changeState(index, check.disabled, check.checked)} >
=======
        <TouchableWithoutFeedback onPress={() => this.changeState(index, check.disabled, check.checked)} >
>>>>>>> Initial integration with Checkbox, Input and Textarea components
          <View style={PackenCheckBoxStyle.contentCheckTitle} >
            <View style={this.getStylesCheckBox(check.disabled, check.checked)} >
              {check.checked === true ? <Icon style={CheckBoxStyles.icon} name="check" /> : null}
              {check.checked === false ? <Icon style={CheckBoxStyles.icon} name="minus" /> : null}
            </View>
            {check.title ?
              <PackenText style={CheckBoxStyles.title}>{check.title}</PackenText>
              : null}
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
          {this.get_items()}
        </View>
      </View>
    )
  }
}

const PackenCheckBoxStyle = StyleSheet.create({
  contentView: {
    marginRight: 10,
    marginBottom: 10
  },
  contentCheckTitle: {
<<<<<<< HEAD
    flexDirection: 'row',
=======
    flexDirection: "row",
>>>>>>> Initial integration with Checkbox, Input and Textarea components
    marginLeft: 10
  }
});

export default PackenCheckBox;