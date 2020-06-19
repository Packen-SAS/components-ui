import React, { Component, ReactElement } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import * as UTIL from "../utils";

import Icon from "react-native-vector-icons/Feather";
import Colors from "../styles/abstracts/colors";
import Typography from "../styles/abstracts/typography";

import PackenUiText from "./PackenUiText";

interface ItemShape {
  label: string;
  isChecked: boolean;
  isDisabled: boolean;
}

interface StylingPropShape {
  inner: object,
  iconBox: object,
  iconSize: number,
  iconColor: string,
  label: object
}

interface PackenUiCheckboxControlProps {
  label: string;
  layout: string;
  isChecked: boolean;
  isDisabled: boolean;
  checkedItems: any[];
  styling?: StylingPropShape | object;
  instance?: Function;
}

interface PackenUiCheckboxControlState {
  label: string;
  layout: string;
  isChecked: boolean;
  isDisabled: boolean;
  checkedItems: any[];
  styling: StylingPropShape;
  styles: {
    disabled: object
  }
}

type FindItemToCheckType = (item: ItemShape) => boolean;

/**
 * Component for rendering an actual checkbox and label item. This is an inner component of {@link PackenUiCheckbox} and should not be used standalone
 */
class PackenUiCheckboxControl extends Component<PackenUiCheckboxControlProps, PackenUiCheckboxControlState> {
  /**
   * Initializes the component
   * @type {function}
   * @param {object} props Props passed to the component
   */
  constructor(props: PackenUiCheckboxControlProps) {
    super(props);

    /**
     * Variable that stores the state
     * @type {object}
     * @property {object} styles The current styles for the item
     */
    this.state = {
      ...this.setPropsToState(),
      styles: {
        disabled: {}
      }
    }
  }

  /**
   * Centralizes the received props assignment to set them to the state, determining default values in case any is not provided
   * @type {function}
   * @property {string} [label=""] The label to be displayed alongside the checkbox
   * @property {string} [layout="column"] The layout type to arrange the items - "column" or "row"
   * @property {boolean} [isChecked=false] Determines whether this item is checked
   * @property {boolean} [isDisabled=false] Determines whether this items is disabled
   * @property {object[]} [checkedItems=[]] The currently checked items of the group this one belongs to
   * @property {object} [styling={ inner: {}, iconBox: {}, iconSize: undefined, iconColor: undefined, label: {} }] The optional custom styling props
   * @return {object} The props mapped as the state keys
   */
  setPropsToState: Function = (): PackenUiCheckboxControlProps => {
    return {
      label: this.props.label ? this.props.label : "",
      layout: this.props.layout ? this.props.layout : "column",
      isChecked: this.props.isChecked ? this.props.isChecked : false,
      isDisabled: this.props.isDisabled ? this.props.isDisabled : false,
      checkedItems: this.props.checkedItems ? this.props.checkedItems : [],
      styling: this.props.styling ? { ...this.props.styling } : {
        inner: {},
        iconBox: {},
        iconSize: undefined,
        iconColor: undefined,
        label: {}
      }
    };
  }

  /**
   * Propagates the component instance if a callback is provided via props and applies the correct disabled styles if set so
   * @type {function}
   */
  componentDidMount() {
    this.setDisabledStyles();

    if (typeof this.props.instance === "function") {
      this.props.instance(this);
    }
  }

  /**
   * Compares a group's item's label with this component's label
   * @type {function}
   * @param {object} item The item to compare
   */
  findItemToCheck: FindItemToCheckType = (item: ItemShape): boolean => item.label === this.state.label; 

  /**
   * Sets the active styles
   * @type {function}
   * @return {boolean} Flag used only for testing purposes
   */
  setActiveStyles: Function = (): boolean => {
    if (this.state.layout === "dropdown") {
      const newCheckedItems = [...this.state.checkedItems];
      const foundItem = newCheckedItems.find(this.findItemToCheck);
      this.setState({
        isChecked: foundItem.isChecked
      });
      return foundItem.isChecked;
    } else {
      if (typeof this.state.label === "string" && this.state.checkedItems.includes(this.state.label)) {
        this.setState({
          isChecked: true
        });
        return true;
      } else {
        this.setState({
          isChecked: false
        });
        return false;
      }
    }
  }

  /**
   * Sets the disabled styles
   * @type {function}
   */
  setDisabledStyles: Function = (): object => {
    let disabledStyles = {};

    if (this.state.isDisabled) {
      const correctStyles = this.getStyles().iconBox.state.disabled[this.state.isChecked ? "active" : "inactive"];
      this.setState({
        styles: {
          ...this.state.styles,
          disabled: { ...correctStyles }
        }
      });
      disabledStyles = correctStyles
    }

    return disabledStyles;
  }

  /**
   * Updates the state with new props and checks for any special styles change
   * @type {function}
   */
  updateState: Function = () => {
    this.setState({
      ...this.setPropsToState()
    }, () => {
      this.setActiveStyles();
      this.setDisabledStyles();
    });
  }

  /**
   * Compares props to determine if the component should update its state with new props
   * @type {function}
   * @param {object} prevProps Previous props
   */
  componentDidUpdate(prevProps: PackenUiCheckboxControlProps) {
    if (!UTIL.objectsEqual(prevProps, this.props)) {
      this.updateState();
    }
  }

  /**
   * Renders the component
   * @type {function}
   * @return {node} JSX for the component
   */
  render(): ReactElement {
    return (
      <View style={{ ...this.getStyles().inner.base, ...this.state.styling.inner }}>
        <View
          style={{
            ...this.getStyles().iconBox.base,
            ...this.getStyles().iconBox.state[this.state.isChecked ? "active" : "inactive"],
            ...this.state.styling.iconBox,
            ...this.state.styles.disabled
          }}
        >
          {
            this.state.isChecked ? (
              <Icon
                name="check"
                size={this.state.styling.iconSize ? this.state.styling.iconSize : this.getStyles().icon.base.size}
                color={this.state.styling.iconColor ? this.state.styling.iconColor : this.getStyles().icon.base.color}
              />
            ) : null
          }
        </View>
        <PackenUiText
          style={{
            ...this.getStyles().label.base,
            ...this.getStyles().label.state[this.state.isDisabled ? "disabled" : "default"],
            ...this.state.styling.label
          }}
        >{this.state.label}</PackenUiText>
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
      inner: {
        base: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          alignSelf: "flex-start"
        }
      },
      iconBox: {
        base: {
          height: 18,
          width: 18,
          borderWidth: 1,
          borderRadius: 3,
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center"
        },
        state: {
          active: {
            backgroundColor: Colors.brand.primary.drk,
            borderColor: Colors.brand.primary.drk
          },
          inactive: {
            backgroundColor: Colors.brand.primary.snw,
            borderColor: Colors.brand.primary.drk
          },
          disabled: {
            active: {
              backgroundColor: Colors.base.disabled_alt,
              borderColor: Colors.base.disabled_alt
            },
            inactive: {
              backgroundColor: Colors.ghost.focus,
              borderColor: Colors.base.disabled_alt
            }
          }
        }
      },
      icon: {
        base: {
          size: Typography.size.small,
          color: Colors.basic.white.dft
        }
      },
      label: {
        base: {
          color: Colors.basic.independence.drk,
          fontSize: Typography.size.medium,
          lineHeight: Typography.lineheight.medium_alt,
          marginLeft: 8
        },
        state: {
          default: {},
          disabled: {
            color: Colors.base.disabled_alt
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
    label: PropTypes.string.isRequired,
    layout: PropTypes.string.isRequired,
    isChecked: PropTypes.bool.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    checkedItems: PropTypes.array.isRequired,
    styling: PropTypes.object,
    instance: PropTypes.func
  };
}

export default PackenUiCheckboxControl;