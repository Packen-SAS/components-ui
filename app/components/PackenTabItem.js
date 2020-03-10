import React, { Component } from "react";

import { View, TouchableWithoutFeedback } from "react-native";

import Icon from "react-native-vector-icons/dist/Feather";

import TabsStyles from "../styles/components/PackenTabs";
import PackenText from "./PackenText";

class PackenTabItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemStyles: this.get_item_styles()
    }
  }

  componentDidMount() {
    this.check_if_active();
  }

  get_item_styles = () => {
    const styles = {
      shape: {
        ...TabsStyles.item.base.shape,
        ...TabsStyles.item.default.shape
      },
      label: {
        ...TabsStyles.item.base.label,
        ...TabsStyles.item.default.label
      },
      icon: {
        ...TabsStyles.item.base.icon,
        ...TabsStyles.item.default.icon
      }
    };
    return styles;
  }

  set_active_tab = () => {
    this.set_active_styles();
    this.props.updateActiveTabIndex(this.props.selfIndex);
    this.props.callback();
  }

  set_active_styles = () => {
    let activeStyles = { ...this.state.itemStyles }
    activeStyles.shape = {
      ...activeStyles.shape,
      ...TabsStyles.item.active.shape
    };
    activeStyles.label = {
      ...activeStyles.label,
      ...TabsStyles.item.active.label
    };
    activeStyles.icon = {
      ...activeStyles.icon,
      ...TabsStyles.item.active.icon
    };

    this.setState({
      itemStyles: activeStyles
    });
  }

  check_if_active = () => {
    if (this.props.activeTabIndex === this.props.selfIndex) {
      this.set_active_styles();
    } else {
      this.setState({
        itemStyles: this.get_item_styles()
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.activeTabIndex !== this.props.activeTabIndex) {
      this.check_if_active();
    }
  }

  pressIn_handler = () => {
    let newStyles = { ...this.state.itemStyles };

    newStyles.shape = {
      ...newStyles.shape,
      ...TabsStyles.item.focus.shape
    };
    newStyles.label = {
      ...newStyles.label,
      ...TabsStyles.item.focus.label
    };
    newStyles.icon = {
      ...newStyles.icon,
      ...TabsStyles.item.focus.icon
    };

    this.setState({
      itemStyles: newStyles
    });
  }

  pressOut_handler = () => {
    this.set_active_tab();
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => { this.set_active_tab(); }} onPressIn={this.pressIn_handler} onPressOut={this.pressOut_handler}>
        <View style={this.state.itemStyles.shape}>
          {
            this.props.icon ? (
              <View style={{ marginRight: 10 }}>
                {
                  this.props.icon === "»" ? (
                    <PackenText style={this.state.itemStyles.icon}>»</PackenText>
                  ) : (
                    <Icon name={this.props.icon} color={this.state.itemStyles.icon.color} size={this.state.itemStyles.icon.fontSize * 0.6}/>
                  )
                }
              </View>
            ) : null
          }
          <PackenText style={this.state.itemStyles.label}>{this.props.label}</PackenText>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default PackenTabItem;