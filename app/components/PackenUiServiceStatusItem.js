import React, { Component } from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/dist/Feather";

import ServiceStatusStyles from "../styles/components/PackenUiServiceStatus";
import PackenUiText from "./PackenUiText";

class PackenUiServiceStatusItem extends Component {
  constructor(props) {
    super(props);

    this.spaceBetweenItems = 25;

    this.state = {
      state: this.getInitialState(),
      time: this.getInitialTime(),
      dimensions: {
        box: {
          height: 0
        },
        line: {
          height: 0,
          bottom: 0
        }
      }
    }
  }

  getInitialState = () => {
    let initialState = "default";

    if (this.props.data.isComplete) {
      initialState = "completed";
    } else if (this.props.data.isCurrent) {
      initialState = "active";
    }

    return initialState;
  }

  getInitialTime = () => {
    let time = null;

    if (this.props.data.time) {
      time = (
        <PackenUiText
          style={ServiceStatusStyles.time}
        >{this.props.data.time}</PackenUiText>
      );
    }

    return time;
  }

  setCurrentTime = date => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    const strTime = `${hours}:${minutes} ${ampm}`;

    this.setState({
      time: (
        <PackenUiText
          style={ServiceStatusStyles.time}
        >{strTime}</PackenUiText>
      )
    });
  }

  getSubtitle = () => {
    let subtitle = null;

    if (this.props.data.subtitle) {
      subtitle = (
        <PackenUiText
          style={{
            ...ServiceStatusStyles.subtitle.base,
            ...ServiceStatusStyles.subtitle.state[this.state.state]
          }}
        >{this.props.data.subtitle}</PackenUiText>
      );
    }

    return subtitle;
  }

  getLinePositioning = () => {
    return {
      height: this.state.dimensions.line.height,
      bottom: this.state.dimensions.line.bottom
    };
  }

  getLine = () => {
    let line = (
      <View style={{
        ...ServiceStatusStyles.line.base,
        ...ServiceStatusStyles.line.state[this.state.state],
        ...this.getLinePositioning()
      }}></View>
    );

    if (this.props.index === 0) {
      line = null;
    }

    return line;
  }

  getBoxStyles = () => {
    return {
      marginTop: this.props.index === 0 ? 0 : this.spaceBetweenItems,
      zIndex: this.props.itemsHeights.length - this.props.index
    };
  }

  getDotIcon = () => {
    let icon = null;

    if (this.state.state === "completed") {
      icon = (
        <Icon
          name="check"
          size={ServiceStatusStyles.icon.size}
          color={ServiceStatusStyles.icon.color} />
      );
    }

    return icon;
  }

  getPreviousBoxHeight = () => {
    if (this.props.index > 0) {
      return this.props.itemsHeights[this.props.index - 1];
    } else {
      return 0;
    }
  }

  setBoxDimensions = e => {
    const { height } = e.nativeEvent.layout;

    this.setState({
      dimensions: {
        box: {
          height: height
        },
        line: {
          height: (height / 2) + this.spaceBetweenItems + (this.getPreviousBoxHeight() / 2),
          bottom: height / 2
        }
      }
    });

    this.props.setItemsHeights(this.props.index, height);
  }

  updateState = () => {
    if (this.props.currentStepIndex === this.props.index) {
      this.setState({
        state: "active"
      });
      this.setCurrentTime(new Date());
    } else if (this.props.index < this.props.currentStepIndex) {
      this.setState({
        state: "completed"
      });
    } else {
      this.setState({
        state: "default",
        time: null
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.currentStepIndex !== this.props.currentStepIndex) {
      this.updateState();
    }
  }

  render() {
    return (
      <View
        style={[ServiceStatusStyles.item, this.getBoxStyles()]}
        onLayout={e => { this.setBoxDimensions(e); }}
      >
        <View style={ServiceStatusStyles.sub}>
          {this.state.time}
        </View>
        <View style={ServiceStatusStyles.spacer}>
          {this.getLine()}
          <View style={{
            ...ServiceStatusStyles.dot.base,
            ...ServiceStatusStyles.dot.state[this.state.state]
          }}>
            {this.getDotIcon()}
          </View>
        </View>
        <View style={ServiceStatusStyles.main}>
          <PackenUiText
            style={ServiceStatusStyles.title.state[this.state.state]}
          >{this.props.data.title}</PackenUiText>
          {this.getSubtitle()}
        </View>
      </View>
    );
  }
}

export default PackenUiServiceStatusItem;