import React, { Component, ReactNode } from "react";
import PropTypes from "prop-types";
import { TouchableWithoutFeedback, View } from "react-native";
import * as UTIL from "../utils";

import Colors from "../styles/abstracts/colors";
import Typography from "../styles/abstracts/typography";

import PackenUiText from "./PackenUiText";

interface StylingPropShape {
  shape: object;
  control: object;
  label: object;
}

interface PackenUiRadioControlProps {
  updateCheckedIndex: Function;
  selfIndex: number;
  isDisabled?: boolean;
  checkedIndex?: number;
  label: string;
  styling?: StylingPropShape;
  instance?: Function;
}

interface PackenUiRadioControlState {
  updateCheckedIndex: Function | boolean;
  selfIndex: number;
  isDisabled: boolean;
  checkedIndex: number;
  label: string;
  styling: StylingPropShape;
  state: string;
}

/**
 * Component for rendering an actual individual radio button with a label as part of a {@link PackenUiRadio} component, and should not be used standalone
 */
class PackenUiRadioControl extends Component<PackenUiRadioControlProps, PackenUiRadioControlState> {
  /**
   * Initializes the component
   * @type {function}
   * @param {object} props Props passed to the component
   */
  constructor(props: PackenUiRadioControlProps) {
    super(props);

    /**
     * Variable that stores the state
     * @type {object}
     * @property {string} state The current status of this item in particular
     */
    this.state = {
      ...this.setPropsToState(),
      state: this.setInitialState()
    }
  }

  /**
   * Centralizes the received props assignment to set them to the state, determining default values in case any is not provided
   * @property {function} [updateCheckedIndex=false] The callback function to be called when pressing this item to update the group's selection
   * @property {number} [selfIndex=0] The item's own index in the group
   * @property {boolean} [isDisabled=false] Determines if the item should be disabled
   * @property {number} [checkedIndex=-1] The optional pre-selected item in the group
   * @property {string} [label=""] The text to be displayed alongisde the radio button
   * @property {object} [styling={ shape: {}, control: {}, label: {} }] The optional custom styling props
   * @type {function}
   * @return {object} The props mapped as the state keys
   */
  setPropsToState: Function = (): object => {
    return {
      updateCheckedIndex: this.props.updateCheckedIndex ? this.props.updateCheckedIndex : false,
      selfIndex: this.props.selfIndex ? this.props.selfIndex : 0,
      isDisabled: this.props.isDisabled ? this.props.isDisabled : false,
      checkedIndex: this.props.checkedIndex === 0 ? 0 : (typeof this.props.checkedIndex === "number") && (this.props.checkedIndex > 0) ? this.props.checkedIndex : -1,
      label: this.props.label ? this.props.label : "",
      styling: this.props.styling ? { ...this.props.styling } : {
        shape: {},
        control: {},
        label: {}
      }
    };
  }

  /**
   * Determines the initial status of the item to apply correct styles
   * @type {function}
   * @return {string} The item's status
   */
  setInitialState: Function = (): string => {
    return this.props.isDisabled ? "default_disabled" : "default";
  }

  /**
   * Propagates the component instance if a callback is provided via props, and checks for any special states
   * @type {function}
   */
  componentDidMount() {
    this.checkIfChecked();
    this.checkIfDisabled();
    
    if (typeof this.props.instance === "function") {
      this.props.instance(this);
    }
  }

  /**
   * Callback triggered when pressing the item, setting its internal status to "checked", and triggering the propagation callback
   * @type {function}
   * @return {boolean} Flag used only for testing purposes
   */
  onPressHandler: VoidFunction = (): boolean | void => {
    this.setState({
      state: "checked"
    });

    if (typeof this.state.updateCheckedIndex === "function") {
      this.state.updateCheckedIndex(this.state.selfIndex);
    } else {
      return false;
    }
  }

  /**
   * Sets the disabled state if configured like so to apply correct styles and disable pointer events
   * @type {function}
   * @return {boolean} Flag used only for testing purposes
   */
  checkIfDisabled: Function = (): boolean | void => {
    if (this.state.isDisabled) {
      if (this.state.checkedIndex !== this.state.selfIndex) {
        this.setState({
          state: "default_disabled"
        });
      } else {
        this.setState({
          state: "checked_disabled"
        });
      }
    } else {
      return false;
    }
  }

  /**
   * Sets the checked state if configured like so to apply correct styles
   * @type {function}
   */
  checkIfChecked: Function = () => {
    if (this.state.checkedIndex !== this.state.selfIndex) {
      this.setState({
        state: "default"
      });
    } else {
      this.setState({
        state: "checked"
      });
    }
  }

  /**
   * Updates the state with new props and checks for any special states
   * @type {function}
   */
  updateState: Function = () => {
    this.setState({
      ...this.setPropsToState()
    }, () => {
      this.checkIfChecked();
      this.checkIfDisabled();
    });
  }

  /**
   * Compares props to determine if the component should update its state with new props
   * @type {function}
   * @param {object} prevProps Previous props
   */
  componentDidUpdate(prevProps: PackenUiRadioControlProps) {
    if (!UTIL.objectsEqual(prevProps, this.props)) {
      this.updateState();
    }
  }

  /**
   * Returns the label element if provided
   * @type {function}
   * @return {node|null} JSX for the label or null
   */
  getLabel: Function = (): ReactNode | null => {
    let label = null;

    if (this.state.label) {
      label = (
        <PackenUiText
          style={{
            ...this.getStyles().label.base,
            ...this.getStyles().label[this.state.state],
            ...this.state.styling.label
          }}>{this.state.label}</PackenUiText>
      );
    }

    return label;
  }

  /**
   * Renders the component
   * @type {function}
   * @return {node} JSX for the component
   */
  render(): ReactNode {
    return (
      <View pointerEvents={this.state.isDisabled ? "none" : "auto"}>
        <TouchableWithoutFeedback onPress={this.onPressHandler}>
          <View style={{
            ...this.getStyles().shape.base,
            ...this.state.styling.shape
            }}>
            <View style={{
              ...this.getStyles().control.base,
              ...this.getStyles().control[this.state.state],
              ...this.state.styling.control
            }}></View>
            {this.getLabel()}
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
        base: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          flexWrap: "nowrap"
        }
      },
      control: {
        base: {
          height: 18,
          width: 18,
          borderRadius: 18,
          borderWidth: 2,
          borderStyle: "solid",
          borderColor: Colors.brand.primary.drk
        },
        checked: {
          borderWidth: 6,
          backgroundColor: Colors.basic.white.dft
        },
        default_disabled: {
          borderColor: Colors.base.disabled_alt
        },
        checked_disabled: {
          borderWidth: 6,
          backgroundColor: Colors.basic.white.dft,
          borderColor: Colors.base.disabled_alt
        }
      },
      label: {
        base: {
          marginLeft: 8,
          color: Colors.basic.independence.drk,
          fontSize: Typography.size.medium,
          lineHeight: Typography.lineheight.medium_alt
        },
        default_disabled: {
          color: Colors.base.disabled_alt
        },
        checked_disabled: {
          color: Colors.base.disabled_alt
        }
      }
    };
  }

  /**
   * Defines prop-types for the component
   * @type {object}
   */
  static propTypes: object = {
    updateCheckedIndex: PropTypes.func.isRequired,
    selfIndex: PropTypes.number.isRequired,
    isDisabled: PropTypes.bool,
    checkedIndex: PropTypes.number,
    label: PropTypes.string.isRequired,
    styling: PropTypes.object,
    instance: PropTypes.func
  };
}

export default PackenUiRadioControl;