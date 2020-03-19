import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/dist/Feather';
import CheckBoxStyles from '../styles/components/PackenCheckBox';
import PackenText from '../components/PackenText';
import Colors from '../styles/abstracts/colors';
import Typography from '../styles/abstracts/typography';

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
        <TouchableOpacity onPress={() => this.changeState(index, check.disabled, check.checked)} >
          <View style={PackenCheckBoxStyle.contentCheckTitle} >
            <View style={this.getStylesCheckBox(check.disabled, check.checked)} >
              {check.checked === true ? <Icon style={CheckBoxStyles.icon} name="check" /> : null}
              {check.checked === false ? <Icon style={CheckBoxStyles.icon} name="minus" /> : null}
            </View>
            {check.title ?
              <PackenText style={CheckBoxStyles.title}>{check.title}</PackenText>
              : null}
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  get_items = () => this.state.items.map(this.map_items)

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
    flexDirection: 'row',
    marginLeft: 10
  }
});