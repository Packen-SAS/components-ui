import React, { Component, ReactNode } from "react";
import PropTypes from "prop-types";
import { View, TouchableWithoutFeedback, LayoutChangeEvent } from "react-native";
import * as UTIL from "../utils";

import Colors from "../styles/abstracts/colors";
import Typography from "../styles/abstracts/typography";

import PackenUiText from "./PackenUiText";

interface InnerElementShape {
  height: number;
  width: number;
  positioning: object;
  disabled: object;
}

interface StylingPropShape {
  shape: object;
  dot: object;
  onWrapper: object;
  offWrapper: object;
  onLabel: object;
  offLabel: object;
}

interface PackenUiToggleProps {
  isActive: boolean;
  isDisabled?: boolean;
  toggleHandler: Function;
  name: string;
  onLabel: string;
  offLabel: string;
  styling?: object;
  instance?: Function;
}

interface PackenUiToggleState {
  isActive: boolean;
  isDisabled: boolean;
  toggleHandler: Function | boolean;
  name: string;
  onLabel: string;
  offLabel: string;
  state: string;
  styling: StylingPropShape;
  initialState: string;
  shape: {
    height: number;
    width: number;
    disabled: object;
  };
  dot: InnerElementShape;
  on: InnerElementShape;
  off: InnerElementShape;
}

/**
 * Component for rendering a toggle element for switching two states
 */
class PackenUiToggle extends Component<PackenUiToggleProps, PackenUiToggleState> {
  /**
   * Initializes the component
   * @type {function}
   * @param {object} props Props passed to the component
   */
  constructor(props: PackenUiToggleProps) {
    super(props);

    /**
     * Variable that stores the state
     * @type {object}
     * @property {string} [initialState="inactive"] The initial inner status
     * @property {object} [shape={ height: 0, width: 0, disabled: {} }] The configuration data for the "shape" element
     * @property {object} [dot={ height: 0, width: 0, positioning: {}, disabled: {} }] The configuration data for the "dot" element
     * @property {object} [on={ height: 0, width: 0, positioning: {}, disabled: {} }] The configuration data for the "on" element
     * @property {object} [off={ height: 0, width: 0, positioning: {}, disabled: {} }] The configuration data for the "off" element
     */
    this.state = {
      ...this.setPropsToState(),
      initialState: this.setInitialState(),
      shape: {
        height: 0,
        width: 0,
        disabled: {}
      },
      dot: {
        height: 0,
        width: 0,
        positioning: {},
        disabled: {}
      },
      on: {
        height: 0,
        width: 0,
        positioning: {},
        disabled: {}
      },
      off: {
        height: 0,
        width: 0,
        positioning: {},
        disabled: {}
      }
    }
  }

  /**
   * Centralizes the received props assignment to set them to the state, determining default values in case any is not provided
   * @type {function}
   * @property {boolean} [isActive=false] Determines if the component should be in its 'active' state
   * @property {boolean} [isDisabled=false] Determines if the component should be disabled
   * @property {function} [toggleHandler=false] The function to be called when the component's status changes
   * @property {string} [name=""] The identifier for the component instance
   * @property {string} [onLabel=""] The label text for the "ON" status
   * @property {string} [offLabel=""] The label text for the "OFF" status
   * @property {string} [state="inactive"] The current inner status of the component
   * @property {object} [styling={ shape: {}, dot: {}, onWrapper: {}, offWrapper: {}, onLabel: {}, offLabel: {} }]
   * @return {object} The props mapepd to the state keys
   */
  setPropsToState: Function = (): object => {
    return {
      isActive: this.props.isActive ? this.props.isActive : false,
      isDisabled: this.props.isDisabled ? this.props.isDisabled : false,
      toggleHandler: this.props.toggleHandler ? this.props.toggleHandler : false,
      name: this.props.name ? this.props.name : "",
      onLabel: this.props.onLabel ? this.props.onLabel : "",
      offLabel: this.props.offLabel ? this.props.offLabel : "",
      state: this.setInitialState(),
      styling: this.props.styling ? { ...this.props.styling } : {
        shape: {},
        dot: {},
        onWrapper: {},
        offWrapper: {},
        onLabel: {},
        offLabel: {}
      }
    };
  }

  /**
   * Returns the inner status of the component
   * @type {function}
   * @return {string} The current status
   */
  setInitialState: Function = (): string => {
    return this.props.isActive ? "active" : "inactive";
  }

  /**
   * Propagates the component instance if a callback is provided via props, positions all the elements, and checks if it's disabled
   * @type {function}
   */
  componentDidMount() {
    this.positionElement();
    this.checkIfDisabled();

    if (typeof this.props.instance === "function") {
      this.props.instance(this);
    }
  }

  /**
   * Sets the disabled styles of all elements to the state
   * @type {function}
   */
  setDisabledStyles: VoidFunction = () => {
    this.setState({
      shape: {
        ...this.state.shape,
        disabled: {
          ...this.getStyles().shape.disabled
        }
      },
      dot: {
        ...this.state.dot,
        disabled: {
          ...this.getStyles().dot.disabled
        }
      },
      on: {
        ...this.state.on,
        disabled: {
          ...this.getStyles().label.on.disabled
        }
      },
      off: {
        ...this.state.off,
        disabled: {
          ...this.getStyles().label.off.disabled
        }
      }
    });
  }

  /**
   * Determines and sets whether the component is disabled, and applies the correct styles
   * @type {function}
   */
  checkIfDisabled: Function = () => {
    if (this.state.isDisabled) {
      this.setState({
        state: "disabled"
      }, this.setDisabledStyles);
    }
  }

  /**
   * Sets the received dimensions to the appropriate elements in the state and re-positions them
   * @type {function}
   * @param {object} e The received onLayout event object
   * @param {string} elem The state key corresponding to the updated element
   */
  getElemDimensions: Function = (e: LayoutChangeEvent, elem: string) => {
    const { height, width } = e.nativeEvent.layout;
    this.setState({
      [elem]: {
        ...this.state[elem],
        height: height,
        width: width
      }
    } as Pick<PackenUiToggleState, keyof PackenUiToggleState>, this.positionElement);
  }

  /**
   * Sets the updated positioning styles for all elements to the state
   * @type {function}
   */
  positionElement: VoidFunction = () => {
    const positionStyles = this.getPositionStyles();
    this.setState({
      dot: {
        ...this.state.dot,
        positioning: positionStyles.dot
      },
      on: {
        ...this.state.on,
        positioning: positionStyles.on
      },
      off: {
        ...this.state.off,
        positioning: positionStyles.off
      }
    });
  }

  /**
   * Returns the correct position styles for all elements depending on the current status
   * @type {function}
   * @return {object} The positioning styles object
   */
  getPositionStyles: Function = (): object => {
    let positionStyles = {};
    const state = this.state.isDisabled ? this.state.initialState : this.state.state;

    if (state === "active") {
      positionStyles = {
        dot: {
          top: 2,
          right: 2
        },
        on: {
          position: "absolute",
          top: (this.state.shape.height / 2) + (this.state.on.height / 2),
          left: 8,
          bottom: "auto",
          right: "auto"
        },
        off: {
          opacity: 0
        }
      }
    } else if (state === "inactive") {
      positionStyles = {
        dot: {
          top: 2,
          left: 2
        },
        on: {
          opacity: 0
        },
        off: {
          position: "absolute",
          top: (this.state.shape.height / 2) + (this.state.off.height / 2),
          right: 8,
          bottom: "auto",
          left: "auto"
        }
      }
    }

    return positionStyles;
  }

  /**
   * Toggles the inner status and propagates the change
   * @type {function}
   */
  toggle: VoidFunction = () => {
    this.setState({
      state: this.state.state === "active" ? "inactive" : "active"
    }, () => {
      if (typeof this.state.toggleHandler === "function") {
        this.state.toggleHandler(this.state.name, this.state.state === "active");
      }
    });
  }

  /**
   * Returns the "dot" label element
   * @type {function}
   * @return {node} JSX for the "dot" element
   */
  getDot: Function = (): ReactNode => (
    <View style={{
      ...this.getStyles().dot.default,
      ...this.getStyles().dot[this.state.state],
      ...this.state.dot.positioning,
      ...this.state.dot.disabled,
      ...this.state.styling.dot
    }} onLayout={e => { this.getElemDimensions(e, "dot"); }}></View>
  )

  /**
   * Returns the "on" label element
   * @type {function}
   * @return {node} JSX for the "on" element
   */
  getOnLabel: Function = (): ReactNode => (
    <View onLayout={e => { this.getElemDimensions(e, "on"); }} style={{ ...this.state.on.positioning, ...this.state.styling.onWrapper }}>
      <PackenUiText style={{
        ...this.getStyles().label.default,
        ...this.getStyles().label.on[this.state.state],
        ...this.state.on.disabled,
        ...this.state.styling.onLabel
      }}>{this.state.onLabel}</PackenUiText>
    </View>
  )

  /**
   * Returns the "off" label element
   * @type {function}
   * @return {node} JSX for the "off" element
   */
  getOffLabel: Function = (): ReactNode => (
    <View onLayout={e => { this.getElemDimensions(e, "off"); }} style={{ ...this.state.off.positioning, ...this.state.styling.offWrapper }}>
      <PackenUiText style={{
        ...this.getStyles().label.default,
        ...this.getStyles().label.off[this.state.state],
        ...this.state.off.disabled,
        ...this.state.styling.offLabel
      }}>{this.state.offLabel}</PackenUiText>
    </View>
  )

  /**
   * Updates the state with new props
   * @type {function}
   */
  updateState: Function = () => {
    this.setState({ ...this.setPropsToState() });
  }

  /**
   * Compares props to determine if the component should update its state with new props, re-positions all elements, and checks if it should now be disabled
   * @type {function}
   * @param {object} prevProps Previous props
   * @param {object} prevState Previous state
   */
  componentDidUpdate(prevProps: PackenUiToggleProps, prevState: PackenUiToggleState) {
    if (prevState.state !== this.state.state) {
      this.positionElement();
      this.checkIfDisabled();
    }
    if (!UTIL.objectsEqual(prevProps, this.props)) {
      this.updateState();
    }
  }

  /**
   * Renders the component
   * @type {function}
   * @return {node} JSX for the component
   */
  render(): ReactNode {
    return (
      <View pointerEvents={this.state.isDisabled ? "none" : "auto"}>
        <TouchableWithoutFeedback onPress={this.toggle}>
          <View style={{
            ...this.getStyles().shape.default,
            ...this.getStyles().shape[this.state.state],
            ...this.state.shape.disabled,
            ...this.state.styling.shape
          }} onLayout={e => { this.getElemDimensions(e, "shape"); }}>
            {this.getDot()}
            {this.getOnLabel()}
            {this.getOffLabel()}
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  /**
   * Returns the current styles object
   * @type {function}
   * @return {object} The current styles object
   */
  getStyles: Function = (): object => {
    return {
      shape: {
        default: {
          height: 24,
          width: 56,
          borderRadius: 100
        },
        active: {
          backgroundColor: Colors.brand.primary.drk
        },
        inactive: {
          backgroundColor: Colors.basic.independence.drk
        },
        disabled: {
          backgroundColor: Colors.base.disabled_alt
        }
      },
      dot: {
        default: {
          height: 20,
          width: 20,
          borderRadius: 50,
          position: "absolute"
        },
        active: {
          backgroundColor: Colors.brand.primary.snw
        },
        inactive: {
          backgroundColor: Colors.basic.gray.lgt
        },
        disabled: {
          backgroundColor: Colors.basic.white.dft
        }
      },
      label: {
        default: {
          opacity: 0.6,
          fontFamily: Typography.family.bold,
          fontSize: Typography.size.tiny,
          lineHeight: Typography.lineheight.tiny,
          position: "absolute"
        },
        on: {
          active: {
            color: Colors.brand.primary.ulgt,
            top: -6,
            left: 0
          },
          inactive: {
            top: -6,
            left: 0,
            opacity: 0
          },
          disabled: {
            top: -6,
            left: 0,
            opacity: 0.6,
            color: Colors.basic.white.dft
          }
        },
        off: {
          active: {
            opacity: 0,
            top: -6,
            right: 0
          },
          inactive: {
            top: -6,
            right: 0,
            color: Colors.basic.gray.drk
          },
          disabled: {
            top: -6,
            right: 0,
            opacity: 0.6,
            color: Colors.basic.white.dft
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
    isActive: PropTypes.bool.isRequired,
    isDisabled: PropTypes.bool,
    toggleHandler: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onLabel: PropTypes.string.isRequired,
    offLabel: PropTypes.string.isRequired,
    styling: PropTypes.object,
    instance: PropTypes.func
  };
}

export default PackenUiToggle;