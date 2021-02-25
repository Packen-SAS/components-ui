import { PanGestureHandler } from "react-native-gesture-handler";
import { View, Animated } from "react-native";
import React, { Component } from "react";

import colors from "../styles/abstracts/colors";

export default class PackenUiPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      panel: {
        gotOriginal: false,
        originalHeight: null,
        height: this.props.initialHeight || 90
      },
      onPanelReady: this.props.onPanelReady || this.ignoreAction
    };
  }

  ignoreAction = () => true;

  getPanelHeight = (e) => {
    if (!this.state.panel.gotOriginal) {
      const { height } = e.nativeEvent.layout;
      this.setState({
        panel: {
          height: new Animated.Value(height),
          originalHeight: height,
          gotOriginal: true
        }
      }, this.state.onPanelReady);
    }
  }

  panHandler = (e) => {
    const delta = e.nativeEvent.translationY * -1;
    const newHeight = this.state.panel.height.__getValue() + delta;
    if (
      newHeight >= this.state.panel.originalHeight
      && newHeight <= (this.props.windowHeight / this.props.windowFraction)
    ) {
      this.state.panel.height.setValue(newHeight);
    }
  }

  render() {
    if (this.props.isHidden) { return null; }
    return (
      <View>
        <PanGestureHandler onGestureEvent={this.panHandler}>
          <View style={this.getStyles().handleWrapper}>
            <View style={this.getStyles().handle} />
          </View>
        </PanGestureHandler>
        <Animated.View
          onLayout={this.getPanelHeight}
          style={{
            ...this.getStyles().panel,
            height: this.state.panel.height
          }}
        >
          {this.props.children}
        </Animated.View>
      </View>
    );
  }

  getStyles = () => ({
    handleWrapper: {
      paddingVertical: 8,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.basic.white.dft
    },
    handle: {
      width: 46,
      height: 4,
      borderRadius: 4,
      backgroundColor: colors.basic.gray.lgt
    },
    panel: {
      backgroundColor: colors.basic.white.dft
    }
  });
}