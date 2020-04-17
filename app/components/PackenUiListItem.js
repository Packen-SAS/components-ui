import React, { Component } from "react";
import { View, TouchableWithoutFeedback } from "react-native";

import Icon from "react-native-vector-icons/dist/Feather";
import Colors from "../styles/abstracts/colors";

import PackenUiText from "./PackenUiText";

class PackenUiListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: { ...props.data }
    }
  }

  onPressHandler = () => {
    this.state.data.callback();
  }

  getMedia = () => {
    let media = null;

    if (this.state.data.media) {
      media = (
        <View style={this.getStyles().media}>
          {this.state.data.media}
        </View>
      );
    }

    return media;
  }

  getMainContent = () => {
    return (
      <View style={[this.getStyles().main]}>
        <PackenUiText preset="p1">{this.state.data.title}</PackenUiText>
        {this.state.data.subtitle ?  (
          <PackenUiText style={{ color: "rgba(48, 77, 109, 0.4)" }} preset="c1">{this.state.data.subtitle}</PackenUiText>
        ) : null}
      </View>
    );
  }

  getSubContent = () => {
    return (
      <View style={this.getStyles().sub}>
        {
          this.state.data.label ? (
            <PackenUiText style={{ color: this.state.data.label.color }} preset="c1">{this.state.data.label.text}</PackenUiText>
          ) : null
        }
        <View style={this.getStyles().icon}>
          <Icon name={this.state.data.icon.name} color={this.state.data.icon.color} size={14} />
        </View>
      </View>
    )
  }

  updateState = () => {
    this.setState({
      data: { ...this.props.data }
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps !== this.props) {
      this.updateState();
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.onPressHandler}>
        <View style={[
          this.getStyles().wrapper.base,
          this.getStyles().wrapper.size[this.state.data.size],
          { ...this.state.data.customWrapperStyle }]}>
          {this.getMedia()}
          {this.getMainContent()}
          {this.getSubContent()}
        </View>
      </TouchableWithoutFeedback>
    );
  }

  getStyles = () => {
    return {
      wrapper: {
        base: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingVertical: 12,
          paddingHorizontal: 24,
          backgroundColor: Colors.basic.white.dft
        },
        size: {
          default: {
            height: 48
          },
          large: {
            height: 56
          }
        }
      },
      media: {
        marginRight: 15
      },
      main: {
        flex: 1
      },
      sub: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end"
      },
      icon: {
        marginLeft: 10
      }
    };
  }
}

export default PackenUiListItem;