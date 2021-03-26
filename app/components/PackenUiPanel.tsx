import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import { View, Animated, LayoutChangeEvent } from "react-native";
import React, { Component, ReactNode } from "react";

import colors from "../styles/abstracts/colors";

interface PackenUiPanelProps {
  isHidden: boolean;
  initialHeight: number;
  onPanelReady: VoidFunction;
  windowHeight: number;
  windowFraction: number;
  children: ReactNode | undefined | null;
}

interface PackenUiPanelState {
  onPanelReady: VoidFunction;
  panel: {
    gotOriginal: boolean;
    originalHeight: number | null;
    height: number | Animated.AnimatedValue;
  };
}

type panHandlerType = (e: PanGestureHandlerGestureEvent) => void;

/**
 * Component for rendering a vertical sliding panel with custom children inside
 */
export default class PackenUiPanel extends Component<PackenUiPanelProps, PackenUiPanelState> {
  /**
   * Initializes the component
   * @type {function}
   * @param {object} props Props passed to the component
   */
  constructor(props: PackenUiPanelProps) {
    super(props);

    /**
     * Variable that stores the state
     * @type {object}
     * @property {boolean} [panel.gotOriginal=false] Whether the initial height was stored
     * @property {number|null} [originalHeight=number|null] The initial height value
     * @property {function} [onPanelReady=this.ignoreAction] The optional function to trigger when component has finished loading
     */
    this.state = {
      panel: {
        gotOriginal: false,
        originalHeight: null,
        height: this.props.initialHeight || 90
      },
      onPanelReady: this.props.onPanelReady || this.ignoreAction
    };
  }

  /**
   * Placeholder function
   * @type {function}
   * @return {boolean} Returns true
   */
  ignoreAction: Function = (): boolean => true;

  /**
   * Sets the initial animated height value for the panel
   * @type {function}
   * @param {object} e The event data object
   */
  getPanelHeight: Function = (e: LayoutChangeEvent) => {
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

  /**
   * Handles the pan event on the handler element
   * @type {function}
   * @param {object} e The event data object
   */
  panHandler: panHandlerType = (e: PanGestureHandlerGestureEvent) => {
    if (typeof this.state.panel.height !== "number") {
      const delta = e.nativeEvent.translationY * -1;
      const newHeight = this.state.panel.height.__getValue() + delta;
      if (
        this.state.panel.originalHeight
        && newHeight >= this.state.panel.originalHeight
        && newHeight <= (this.props.windowHeight / this.props.windowFraction)
      ) {
        this.state.panel.height.setValue(newHeight);
      }
    }
  }

  /**
   * Renders the component
   * @type {function}
   * @return {node} JSX for the component
   */
  render(): ReactNode {
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

  /**
   * Returns the current styles object
   * @type {function}
   * @return {object} The styles object
   */
  getStyles: Function = (): object => ({
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