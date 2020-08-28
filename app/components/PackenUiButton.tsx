import React, { Component, ReactNode } from "react";
import PropTypes from "prop-types";
import { TouchableWithoutFeedback, View, Animated, PanResponder, PanResponderGestureState, GestureResponderEvent } from "react-native"
import * as UTIL from "../utils";

import Icon from "react-native-vector-icons/Feather";
import Color from "../styles/abstracts/colors";
import Typography from "../styles/abstracts/typography";

import PackenUiSvgIcon from "./PackenUiSvgIcon";
import PackenUiText from "./PackenUiText";

interface InnerStylesShape {
  shape: {
    backgroundColor: string;
    borderWidth: number;
    borderStyle: string;
    borderColor: string;
  };
  shapeContent: object;
  icon: {
    color: string;
  };
  label: {
    color: string;
  };
}

interface StylingPropShape {
  shape: object;
  shapeContent: object;
  label: object;
  iconWrapper: object;
  iconSize: number | undefined;
  iconColor: string | undefined;
}

interface IconPropShape {
  anim: {
    state: string;
    controller: {
      stop: Function;
      start: Function;
    }
  };
  styles: object;
  name: string;
  position: string;
}

interface StylesIconPropShape {
  fontSize: number;
  color: string;
}

interface StylesPropShape {
  icon: StylesIconPropShape;
  label: object;
  shape: object;
  shapeContent: object;
}

interface PackenUiButtonProps {
  type: string;
  level: string;
  size: string;
  icon?: IconPropShape;
  callback?: Function;
  isOutline?: boolean;
  isDisabled?: boolean;
  nonTouchable?: boolean;
  children?: ReactNode;
  style?: object;
  styling?: StylingPropShape | {};
  panned?: boolean;
  instance?: Function;
}

interface PackenUiButtonState {
  type: string;
  level: string;
  size: string;
  icon: IconPropShape | undefined;
  callback: Function;
  isOutline: boolean;
  isDisabled: boolean;
  nonTouchable: boolean;
  children: ReactNode | undefined;
  panned: boolean;
  styling: StylingPropShape;
  styles: StylesPropShape;
  fade: Animated.AnimatedValue;
  translateX: Animated.AnimatedValue;
  swipeOpacity: Animated.AnimatedValue;
  swipeAnimation: Animated.AnimatedValue;
  called: boolean;
  swt: number;
  swo: number;
}

type PanResponderFunctionNull = (evt: GestureResponderEvent, gestureState: PanResponderGestureState) => void;
type PanResponderFunctionBoolean = (evt: GestureResponderEvent, gestureState: PanResponderGestureState) => boolean;
type GestureResponderFunction = (evt: GestureResponderEvent) => void;

/**
 * Component for displaying all types of buttons
 */
class PackenUiButton extends Component<PackenUiButtonProps, PackenUiButtonState> {
  /**
   * Initializes the component
   * @type {function}
   * @param {object} props Props passed to the component
   */
  constructor(props: PackenUiButtonProps) {
    super(props);

    /**
     * Variable that stores the state
     * @type {function}
     * @property {object} styles The currently applied styles object
     * @property {object} fade The Animated.Value instance for controlling the opacity for panned buttons
     * @property {object} translateX The Animated.Value instance for controlling the translateX for panned buttons
     * @property {object} swipeOpacity The Animated.Value instance for controlling the swipeOpacity for panned buttons
     * @property {object} swipeAnimation The Animated.Value instance for controlling the swipeAnimation for panned buttons
     * @property {boolean} called Flag to determine whether the callback has already been called for panned buttons
     * @property {number} swt The current swipe transform for panned buttons
     * @property {number} swo The current swipe opacity for panned buttons
     */
    this.state = {
      ...this.setPropsToState(),
      styles: this.getStyles(),
      fade: new Animated.Value(1),
      translateX: new Animated.Value(5),
      swipeOpacity: new Animated.Value(1),
      swipeAnimation: new Animated.Value(0),
      called: false,
      swt: 0,
      swo: 1
    }
  }

  /**
   * Propagates the component instance if a callback is provided via props, and initializes the panned animations if set so
   * @type {function}
   */
  componentDidMount() {
    if (typeof this.props.instance === "function") {
      this.props.instance(this);
    }
    if (this.state.panned) {
      this.animateHandler();
    }
  }

  /**
   * Centralizes the received props assignment to set them to the state, determining default values in case any is not provided
   * @type {function}
   * @property {string} [type="regular"] The type of button - "regular" for buttons with a label and optional icon; "icon" for squared buttons with just an icon
   * @property {string} [level="primary"] The theme for the styles - "primary"; "secondary"; "tertiary"; "ghost"; "danger"
   * @property {string} [size="medium"] The size for the styles - "tiny"; "small"; "medium"; "large"; "giant"
   * @property {object} [icon=undefined] The optional icon configuration object
   * @property {function} [callback=() => true] The callback to be triggered when pressing the button
   * @property {boolean} [isOutline=false] Determines if outline styles should be applied
   * @property {boolean} [isDisabled=false] Determines if disabled styles should be applied
   * @property {boolean} [nonTouchable=false] Determines if the button should not register any pointer events
   * @property {node} [children=undefined] The actual text content for the button
   * @property {boolean} [panned=false] Determines if the panned styles and animations should be applied
   * @property {object} [styling={ shape: {}, shapeContent: {}, label: {}, iconWrapper: {}, iconSize: undefined, iconColor: undefined }] The optional custom styling props
   * @return {object} The props mapped to the state keys
   */
  setPropsToState: Function = (): object => {
    return {
      type: this.props.type ? this.props.type : "regular",
      level: this.props.level ? this.props.level : "primary",
      size: this.props.size ? this.props.size : "medium",
      icon: this.props.icon ? this.props.icon : undefined,
      callback: this.props.callback ? this.props.callback : this.mockFunction,
      isOutline: this.props.isOutline ? this.props.isOutline : false,
      isDisabled: this.props.isDisabled ? this.props.isDisabled : false,
      nonTouchable: this.props.nonTouchable ? this.props.nonTouchable : false,
      children: this.props.children ? this.props.children : undefined,
      panned: this.props.panned ? this.props.panned : false,
      styling: this.props.styling ? { ...this.props.styling } : {
        shape: {},
        shapeContent: {},
        label: {},
        iconWrapper: {},
        iconSize: undefined,
        iconColor: undefined
      }
    };
  }

  /**
   * Placeholder function that does nothing
   * @type {function}
   * @return {boolean} Flag used only for testing purposes
   */
  mockFunction: Function = (): boolean => true;

  /**
   * Initializes the panned animations
   * @type {function}
   */
  animateHandler: Function = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.translateX, {
          toValue: 19,
          duration: 600,
          useNativeDriver: false
        }),
        Animated.timing(this.state.fade, {
          toValue: 0,
          duration: 600,
          useNativeDriver: false
        })
      ])
    ).start();
  }

  /**
   * Creates the special props to be passed for panned buttons
   * @type {function}
   * @return {object} The new PanResponder instance
   */
  createPanResponder: Function = (): object => (
    PanResponder.create({
      onMoveShouldSetPanResponderCapture: this.onMoveShouldPanResponder,
      onPanResponderGrant: this.onPanResponderGrant,
      onShouldBlockNativeResponder: this.onShouldNativeResponder,
      onPanResponderTerminationRequest: this.onPanResponderRequest,
      onPanResponderMove: this.onPanResponderMove,
      onPanResponderRelease: this.onPanResponderRelease,
    })
  );

  /**
   * onMoveShouldPanResponder event handler for panned buttons
   * @type {function}
   */
  onMoveShouldPanResponder: PanResponderFunctionBoolean = (): boolean => true;

  /**
   * onPanResponderGrant event handler for panned buttons
   * @type {function}
   * @param {object} evt The event data object
   * @param {object} gestureState The gesture data object
   */
  onPanResponderGrant: PanResponderFunctionNull = (_evt: object, _gestureState: object) => null;

  /**
   * onShouldNativeResponder event handler for panned buttons
   * @type {function}
   * @param {object} evt The event data object
   * @param {object} gestureState The gesture data object
   */
  onShouldNativeResponder: PanResponderFunctionBoolean = (_evt: object, _gestureState: object) => true;

  /**
   * onPanResponderRequest event handler for panned buttons
   * @type {function}
   * @param {object} evt The event data object
   * @param {object} gestureState The gesture data object
   */
  onPanResponderRequest: PanResponderFunctionBoolean = (_evt: object, _gestureState: object) => true;

  /**
   * onPanResponderMove event handler for panned buttons
   * @type {function}
   * @param {object} evt The event data object
   * @param {object} mov The movement data object
   */
  onPanResponderMove: PanResponderFunctionNull = (_evt: object, mov: PanResponderGestureState) => {
    const { swipeAnimation, swipeOpacity, swt, swo, called } = this.state;
    if (mov.dx <= 0) { return 0; }
    if (swt >= 85) {
      if (called === false) {
        return this.setState({ called: true }, this.executeCallback);
      }
    } else {
      const _swt = (((mov.moveX - 85) - mov.dx));
      const _swo = swo - (mov.vx - 0.020)
      swipeAnimation.setValue(_swt);
      swipeOpacity.setValue(_swo);
      return this.setState({ swt: _swt, swo: _swo })
    }
  }

  /**
   * onPanResponderRelease event handler for panned buttons
   * @type {function}
   * @param {object} evt The event data object
   * @param {object} gestureState The gesture data object
   */
  onPanResponderRelease: PanResponderFunctionNull = (_evt: object, _gestureState: object) => {
    const { swipeAnimation, swipeOpacity } = this.state;
    swipeAnimation.setValue(0);
    swipeOpacity.setValue(1);
    return this.setState({ called: false, swt: 0, swo: 1 });
  }

  /**
   * Returns the correct base styles
   * @type {function}
   * @param {string} type The button's type for styling
   * @param {string} size The button's size for styling
   * @param {string} level The button's level for styling
   * @return {object} The base styles object
   */
  getBaseStyles: Function = (type: string, size: string, level: string): object => {
    return {
      shape: {
        ...this.createStyles().shape.base,
        ...this.createStyles().shape.type[type][size],
        ...this.createStyles().shape.level[level]
      },
      shapeContent: {
        ...this.createStyles().shapeContent
      },
      icon: {
        ...this.createStyles().icon.level[level],
        ...this.createStyles().icon.size[size]
      }
    };
  }

  /**
   * Returns the correct type styles
   * @type {function}
   * @param {object} styles The current styles object to update
   * @param {string} type The button's type for styling
   * @param {string} size The button's size for styling
   * @param {string} level The button's level for styling
   * @return {object} The type styles object
   */
  getTypeStyles: Function = (styles: InnerStylesShape, type: string, size: number, level: string): object => {
    switch (type) {
      case "icon":
        styles = {
          ...styles
        };
        break;
      case "regular":
        styles = {
          ...styles,
          label: {
            ...this.createStyles().label.base,
            ...this.createStyles().label.level[level],
            ...this.createStyles().label.size[size]
          }
        };
        break;
    }
    return styles;
  }

  /**
   * Returns the correct level styles
   * @type {function}
   * @param {object} styles The current styles object to update
   * @param {string} level The button's level for styling
   * @return {object} The level styles object
   */
  getLevelStyles: Function = (styles: InnerStylesShape, level: string): object => {
    switch (level) {
      case "secondary":
        styles.shape = {
          ...styles.shape,
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: Color.basic.independence.dft
        }
        break;
    }
    return styles;
  }

  /**
   * Returns the correct outline styles
   * @type {function}
   * @param {object} styles The current styles object to update
   * @param {boolean} isOutline Flag that determines whether the buttons is outline
   * @param {string} level The button's level for styling
   * @return {object} The outline styles object
   */
  getOutlineStyles: Function = (styles: InnerStylesShape, isOutline: Boolean, level: string): object => {
    if (isOutline) {
      styles = {
        ...styles,
        shape: { ...styles.shape, ...this.createStyles().shape.outline[level] },
        label: { ...styles.label, ...this.createStyles().label.outline[level] },
        icon: { ...styles.icon, ...this.createStyles().icon.outline[level] }
      }
    }
    return styles;
  }

  /**
   * Returns the correct disabled styles
   * @type {function}
   * @param {object} styles The current styles object to update
   * @param {boolean} isDisabled Flag that determines whether the buttons is disabled
   * @param {string} level The button's level for styling
   * @return {object} The disabled styles object
   */
  getDisabledStyles: Function = (styles: InnerStylesShape, isDisabled: Boolean, level: string): object => {
    if (isDisabled) {
      styles.shape.backgroundColor = Color.ghost.focus;
      styles.icon.color = Color.basic.white.dft;

      if (styles.label) {
        styles.label.color = Color.basic.white.dft;
      }

      if (styles.shape.borderWidth) {
        styles.shape.borderWidth = 0;
      }

      if (level === "ghost") {
        styles.shape.backgroundColor = Color.ghost.default;
        styles.icon.color = Color.base.disabled_alt;

        if (styles.label) {
          styles.label.color = Color.base.disabled_alt;
        }
      }
    }
    return styles;
  }

  /**
   * Returns the current styles object
   * @type {function}
   * @return {object} The current styles object
   */
  getStyles: Function = (): object => {
    const { type, size, level, isOutline, isDisabled } = this.state ? this.state : this.setPropsToState();
    let styles = this.getBaseStyles(type, size, level);
    styles = this.getTypeStyles(styles, type, size, level);
    styles = this.getLevelStyles(styles, level);
    styles = this.getOutlineStyles(styles, isOutline, level);
    styles = this.getDisabledStyles(styles, isDisabled, level);
    return styles;
  }

  /**
   * Sets the current styles
   * @type {function}
   */
  checkStyles: Function = () => {
    this.setState({
      styles: this.getStyles()
    });
  }

  /**
   * Checks the current icon animation state to start/stop it
   * @type {function}
   */
  checkIconAnimState: Function = () => {
    if (this.state.icon && this.state.icon.anim) {
      const { state, controller } = this.state.icon.anim;
      if (state === "done") {
        controller.stop();
      } else {
        controller.start();
      }
    }
  }

  /**
   * Updates the state with new props, and checks the styles and icon animation state
   * @type {function}
   */
  updateState: Function = () => {
    this.setState({
      ...this.setPropsToState()
    }, () => {
      this.checkStyles();
      this.checkIconAnimState();
    });
  }

  /**
   * Compares props to determine if the component should update its state with new props
   * @type {function}
   * @param {object} prevProps Previous props
   */
  componentDidUpdate(prevProps: PackenUiButtonProps) {
    if (!UTIL.objectsEqual(prevProps, this.props)) {
      this.updateState();
    }
  }

  /**
   * Triggers the button callback
   * @type {function}
   * @return {boolean} Flag used for testing
   */
  executeCallback: VoidFunction = (): boolean | void => {
    if (this.state.callback) {
      this.state.callback();
    } else {
      return false;
    }
  }

  /**
   * Event handler for pressIn, setting the appropriate styles
   * @type {function}
   * @return {object} The new styles object
   */
  pressInHandler: GestureResponderFunction = (): object => {
    let newStyles = { ...this.getStyles() }
    newStyles.shape.backgroundColor = Color[this.state.level].focus;
    if (this.state.level !== "ghost" && this.state.level !== "secondary") {
      if (this.state.type === "regular") {
        newStyles.label.color = Color.basic.white.dft;
      }
      if (this.state.icon) {
        newStyles.icon.color = Color.basic.white.dft;
      }
      if (this.state.isOutline) {
        newStyles.shape.borderColor = Color[this.state.level].focus;
      }
    }

    /* Custom focus styles */
    switch (this.state.level) {
      case "secondary":
        newStyles.shape.borderColor = Color.basic.gray.dft;
        break;
    }

    this.setState({
      styles: newStyles
    });

    return newStyles;
  }

  /**
   * Event handler for pressOut, setting the appropriate styles
   * @type {function}
   * @return {object} The new styles object
   */
  pressOutHandler: GestureResponderFunction = (): object => {
    let newStyles = { ...this.getStyles() }
    newStyles.shape.backgroundColor = Color[this.state.level].default;
    if (this.state.level !== "ghost" && this.state.level !== "secondary") {
      if (this.state.type === "regular") {
        newStyles.label.color = Color.basic.white.dft;
      }
      if (this.state.icon) {
        newStyles.icon.color = Color.basic.white.dft;
      }
      if (this.state.isOutline) {
        newStyles = this.getOutlineStyles(newStyles, true, this.state.level);
      }
    }

    this.setState({
      styles: newStyles
    });

    return newStyles;
  }

  /**
   * Returns an icon if provided (animated or static)
   * @type {function}
   * @return {node} JSX for the icon
   */
  getIcon: Function = (): ReactNode | null => {
    let icon = null;
    
    if (this.state.icon) {
      icon = (
        <View style={{ ...this.state.icon.styles, ...this.state.styling.iconWrapper }}>
          <Icon name={this.state.icon.name} size={this.state.styling.iconSize ? this.state.styling.iconSize : this.state.styles.icon.fontSize} color={this.state.styling.iconColor ? this.state.styling.iconColor : this.state.styles.icon.color} />
        </View>
      );
  
      if (this.state.icon.anim) {
        icon = (
          <Animated.View style={{ ...this.state.icon.styles[this.state.icon.anim.state], ...this.state.styling.iconWrapper }}>
            <Icon name={this.state.icon.name} size={this.state.styling.iconSize ? this.state.styling.iconSize : this.state.styles.icon.fontSize} color={this.state.styling.iconColor ? this.state.styling.iconColor : this.state.styles.icon.color} />
          </Animated.View>
        );
      }
    }

    return icon;
  }

  /**
   * Returns the inner content of a button
   * @type {function}
   * @return {node} JSX for the inner content
   */
  getContent: Function = (): ReactNode => {
    let content = null;

    if (this.state.type === "icon") {
      content = this.getIcon();
    } else if (this.state.type === "regular") {
      content = (
        <React.Fragment>
          {this.state.icon && this.state.icon.position === "left" ? this.getIcon() : null}
          <PackenUiText style={{ ...this.state.styles.label, ...this.state.styling.label }}>{this.state.children}</PackenUiText>
          {this.state.icon && this.state.icon.position === "right" ? this.getIcon() : null}
        </React.Fragment>
      );
    }

    return content;
  }

  /**
   * Returns a static button content
   * @type {function}
   * @return {node} JSX for a static button
   */
  getStaticButton: Function = (): ReactNode => (
    <TouchableWithoutFeedback onPress={this.executeCallback} onPressIn={this.pressInHandler} onPressOut={this.pressOutHandler}>
      <View style={{ ...this.state.styles.shape, ...this.props.style, ...this.state.styling.shape }}>
        <View style={{ ...this.state.styles.shapeContent, ...this.state.styling.shapeContent }}>
          {this.getContent()}
        </View>
      </View>
    </TouchableWithoutFeedback>
  )

  /**
   * Returns a panned button content
   * @type {function}
   * @return {node} JSX for a panned button
   */
  getPannedButton: Function = (): ReactNode => (
    <View
      {...this.createPanResponder().panHandlers}
      style={{
        ...this.state.styles.shape,
        ...this.props.style,
        paddingLeft: 25,
        paddingRight: 0,
        borderRadius: this.createStyles().shape.size[this.state.size].minHeight,
        ...this.state.styling.shape
      }}
    >
      <Animated.View style={{
        opacity: this.state.fade,
        transform: [{ translateX: this.state.translateX }]
      }}>
        <PackenUiSvgIcon name="swipe" width={32} height={24} />
      </Animated.View>
      <Animated.View style={{
        ...this.state.styles.shapeContent,
        ...this.state.styling.shapeContent,
        opacity: this.state.swipeOpacity,
        transform: [{ translateX: this.state.swipeAnimation }],
      }}>
        <View style={{ ...this.state.styles.shapeContent, ...this.state.styling.shapeContent }}>
          {this.getContent()}
        </View>
      </Animated.View>
    </View>
  )

  /**
   * Renders the component
   * @type {function}
   * @return {node} JSX for the component
   */
  render(): ReactNode {
    return (
      <View pointerEvents={this.state.isDisabled || this.state.nonTouchable ? "none" : "auto"}>
        {this.state.panned && this.state.type !== "icon" ? this.getPannedButton() : this.getStaticButton()}
      </View>
    );
  }

  /**
   * Returns the styles for the component
   * @type {function}
   * @return {object} The styles object
   */
  createStyles: Function = (): object => {
    const iconSizeMultiplier = 1.5;
    return {
      shape: {
        base: {
          position: "relative",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          overflow: "hidden"
        },
        size: {
          xtiny: {
            minHeight: 20
          },
          tiny: {
            minHeight: 24
          },
          small: {
            minHeight: 32
          },
          medium: {
            minHeight: 40
          },
          large: {
            minHeight: 48
          },
          giant: {
            minHeight: 56
          }
        },
        level: {
          primary: {
            backgroundColor: Color.brand.primary.drk
          },
          secondary: {
            backgroundColor: Color.basic.white.drk
          },
          tertiary: {
            backgroundColor: Color.basic.independence.dft
          },
          brandSecondary: {
            backgroundColor: Color.brand.secondary.dft
          },
          ghost: {
            backgroundColor: Color.ghost.default
          },
          danger: {
            backgroundColor: Color.danger.default
          },
          success: {
            backgroundColor: Color.success.default
          },
          warning: {
            backgroundColor: Color.warning.default
          }
        },
        type: {
          icon: {
            xtiny: {
              height: 16,
              width: 16
            },
            tiny: {
              height: 24,
              width: 24
            },
            small: {
              height: 32,
              width: 32
            },
            medium: {
              height: 40,
              width: 40
            },
            large: {
              height: 48,
              width: 48
            },
            giant: {
              height: 56,
              width: 56
            }
          },
          regular: {
            xtiny: {
              paddingVertical: 4,
              paddingHorizontal: 24
            },
            tiny: {
              paddingVertical: 6,
              paddingHorizontal: 32
            },
            small: {
              paddingVertical: 8,
              paddingHorizontal: 44
            },
            medium: {
              paddingVertical: 12,
              paddingHorizontal: 46
            },
            large: {
              paddingVertical: 14,
              paddingHorizontal: 56
            },
            giant: {
              paddingVertical: 17,
              paddingHorizontal: 74
            }
          }
        },
        outline: {
          primary: {
            backgroundColor: Color.brand.primary.snw,
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: Color.brand.primary.drk
          },
          secondary: {
            backgroundColor: Color.basic.white.drk,
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: Color.basic.independence.dft
          },
          tertiary: {
            backgroundColor: Color.basic.independence.lgt,
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: Color.basic.independence.drk
          },
          brandSecondary: {
            backgroundColor: Color.brand.secondary.ulgt,
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: Color.brand.secondary.dft
          },
          ghost: {
            backgroundColor: Color.ghost.default,
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: Color.basic.independence.dft
          },
          danger: {
            backgroundColor: Color.danger.lgt,
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: Color.danger.default
          },
          success: {
            backgroundColor: Color.success.lgt,
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: Color.success.default
          },
          warning: {
            backgroundColor: Color.warning.lgt,
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: Color.warning.default
          }
        }
      },
      shapeContent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        width: "100%"
      },
      label: {
        base: {
          textAlign: "center",
          textTransform: "uppercase",
          letterSpacing: 1,
          fontFamily: Typography.family.bold
        },
        size: {
          xtiny: {
            fontSize: Typography.size.xtiny,
            lineHeight: Typography.lineheight.xtiny,
            marginHorizontal: 7
          },
          tiny: {
            fontSize: Typography.size.tiny,
            lineHeight: Typography.lineheight.tiny,
            marginHorizontal: 10
          },
          small: {
            fontSize: Typography.size.small,
            lineHeight: Typography.lineheight.small,
            marginHorizontal: 11
          },
          medium: {
            fontSize: Typography.size.medium,
            lineHeight: Typography.lineheight.medium,
            marginHorizontal: 12
          },
          large: {
            fontSize: Typography.size.large,
            lineHeight: Typography.lineheight.large,
            marginHorizontal: 12
          },
          giant: {
            fontSize: Typography.size.giant,
            lineHeight: Typography.lineheight.giant,
            marginHorizontal: 22
          }
        },
        level: {
          primary: {
            color: Color.basic.white.dft
          },
          secondary: {
            color: Color.basic.independence.dft
          },
          tertiary: {
            color: Color.basic.white.dft
          },
          brandSecondary: {
            color: Color.basic.white.dft
          },
          ghost: {
            color: Color.basic.independence.dft
          },
          danger: {
            color: Color.basic.white.dft
          },
          success: {
            color: Color.basic.white.dft
          },
          warning: {
            color: Color.basic.white.dft
          }
        },
        outline: {
          primary: {
            color: Color.brand.primary.drk
          },
          secondary: {
            color: Color.basic.independence.dft
          },
          brandSecondary: {
            color: Color.brand.secondary.dft
          },
          tertiary: {
            color: Color.basic.independence.drk
          },
          ghost: {
            color: Color.basic.independence.dft
          },
          danger: {
            color: Color.danger.default
          },
          success: {
            color: Color.success.default
          },
          warning: {
            color: Color.warning.default
          }
        }
      },
      icon: {
        size: {
          xtiny: {
            fontSize: Typography.size.xtiny * iconSizeMultiplier
          },
          tiny: {
            fontSize: Typography.size.tiny * iconSizeMultiplier
          },
          small: {
            fontSize: Typography.size.small * iconSizeMultiplier
          },
          medium: {
            fontSize: Typography.size.medium * iconSizeMultiplier
          },
          large: {
            fontSize: Typography.size.large * iconSizeMultiplier
          },
          giant: {
            fontSize: Typography.size.giant * iconSizeMultiplier
          }
        },
        level: {
          primary: {
            color: Color.basic.white.dft
          },
          secondary: {
            color: Color.basic.independence.dft
          },
          tertiary: {
            color: Color.basic.white.dft
          },
          brandSecondary: {
            color: Color.basic.white.dft
          },
          ghost: {
            color: Color.basic.independence.dft
          },
          danger: {
            color: Color.basic.white.dft
          },
          success: {
            color: Color.basic.white.dft
          },
          warning: {
            color: Color.basic.white.dft
          }
        },
        outline: {
          primary: {
            color: Color.brand.primary.drk
          },
          secondary: {
            color: Color.basic.independence.dft
          },
          tertiary: {
            color: Color.basic.independence.drk
          },
          brandSecondary: {
            color: Color.brand.secondary.dft
          },
          ghost: {
            color: Color.basic.independence.dft
          },
          danger: {
            color: Color.danger.default
          },
          success: {
            color: Color.success.default
          },
          warning: {
            color: Color.warning.default
          }
        }
      }
    };
  }

  /**
   * Defines prop-types for the component
   * @type {object}
   */
  static propTypes: object = {
    type: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    icon: PropTypes.object,
    callback: PropTypes.func,
    isOutline: PropTypes.bool,
    isDisabled: PropTypes.bool,
    nonTouchable: PropTypes.bool,
    children: PropTypes.node,
    style: PropTypes.object,
    styling: PropTypes.object,
    panned: PropTypes.bool,
    instance: PropTypes.func
  };
}

export default PackenUiButton;