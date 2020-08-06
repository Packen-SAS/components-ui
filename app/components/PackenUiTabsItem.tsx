import React, { Component, ReactNode } from "react";
import PropTypes from "prop-types";
import { View, TouchableWithoutFeedback } from "react-native";
import * as UTIL from "../utils";

import Icon from "react-native-vector-icons/Feather";

import Colors from "../styles/abstracts/colors";
import Typography from "../styles/abstracts/typography";

import PackenUiText from "./PackenUiText";

interface StylingPropShape {
  shape: object;
  iconWrapper: object;
  iconCharacter: object;
  iconSize: number | undefined;
  iconColor: string | undefined;
  label: object;
}

interface ItemStyleShape {
  shape: object;
  label: object;
  icon: {
    color: string;
    fontSize: number;
  };
}

interface PackenUiTabsItemProps {
  updateActiveTabIndex: Function;
  activeTabIndex: number;
  selfIndex: number;
  callback: Function;
  label: string;
  icon?: string;
  styling?: StylingPropShape;
  instance?: Function;
}

interface PackenUiTabsItemState {
  updateActiveTabIndex: Function;
  selfIndex: number;
  activeTabIndex: number;
  callback: Function;
  icon: "»" | string | boolean;
  label: string;
  styling: StylingPropShape;
  itemStyles: ItemStyleShape;
}

/**
 * Component for rendering a trigger item of a {@link PackenUiTabs} component, and should not be used standalone
 */
class PackenUiTabsItem extends Component<PackenUiTabsItemProps, PackenUiTabsItemState> {
  /**
   * Initializes the component
   * @type {function}
   * @param {object} props Props passed to the component
   */
  constructor(props: PackenUiTabsItemProps) {
    super(props);

    /**
     * Variable that stores the state
     * @type {object}
     * @property {object} itemStyles The currently applied styles object
     */
    this.state = {
      ...this.setPropsToState(),
      itemStyles: this.getItemStyles()
    }
  }

  /**
   * Centralizes the received props assignment to set them to the state, determining default values in case any is not provided
   * @type {function}
   * @property {function} [updateActiveTabIndex=false] Callback function to be triggered when pressing on the component to propagate the change
   * @property {number} [selfIndex=0] The trigger's index
   * @property {number} [activeTabIndex=0] The currently active tab item's index
   * @property {function} [callback=false] The optional callback to be called once this specific trigger is pressed
   * @property {string} [icon=false] The optional icon name to be displayed
   * @property {string} [label=""] The actual text to be displayed for this trigger
   * @property {object} [styling={ shape: {}, iconWrapper: {}, iconCharacter: {}, iconSize: undefined, iconColor: undefined, label: {} }] The optional custom styling props
   * @return {object} The props mapped to the state keys
   */
  setPropsToState: Function = (): object => {
    return {
      updateActiveTabIndex: this.props.updateActiveTabIndex ? this.props.updateActiveTabIndex : false,
      selfIndex: this.props.selfIndex ? this.props.selfIndex : 0,
      activeTabIndex: this.props.activeTabIndex ? this.props.activeTabIndex : 0,
      callback: this.props.callback ? this.props.callback : false,
      icon: this.props.icon ? this.props.icon : false,
      label: this.props.label ? this.props.label : "",
      styling: this.props.styling && Object.keys(this.props.styling).length > 0 ? { ...this.props.styling } : {
        shape: {},
        iconWrapper: {},
        iconCharacter: {},
        iconSize: undefined,
        iconColor: undefined,
        label: {}
      }
    };
  }

  /**
   * Propagates the component instance if a callback is provided via props and checks if the item should be active
   * @type {function}
   */
  componentDidMount() {
    this.checkIfActive();
    
    if (typeof this.props.instance === "function") {
      this.props.instance(this);
    }
  }

  /**
   * Returns the default styles
   * @type {function}
   * @return The default styles object
   */
  getItemStyles: Function = (): ItemStyleShape => {
    const styles = {
      shape: {
        ...this.getStyles().item.base.shape,
        ...this.getStyles().item.default.shape
      },
      label: {
        ...this.getStyles().item.base.label,
        ...this.getStyles().item.default.label
      },
      icon: {
        ...this.getStyles().item.base.icon,
        ...this.getStyles().item.default.icon
      }
    };
    return styles;
  }

  /**
   * Handles the onPress event on the component, setting the active styles, propagating the change, and triggering a callback if provided
   * @type {function}
   */
  setActiveTab: VoidFunction = () => {
    this.setActiveStyles();
    if (typeof this.state.updateActiveTabIndex === "function") {
      this.state.updateActiveTabIndex(this.state.selfIndex);
    }
    if (typeof this.state.callback === "function") {
      this.state.callback();
    }
  }

  /**
   * Returns and sets the active styles
   * @type {function}
   * @return The active styles object
   */
  setActiveStyles: Function = () => {
    let activeStyles = { ...this.state.itemStyles };
    activeStyles.shape = {
      ...activeStyles.shape,
      ...this.getStyles().item.active.shape
    };
    activeStyles.label = {
      ...activeStyles.label,
      ...this.getStyles().item.active.label
    };
    activeStyles.icon = {
      ...activeStyles.icon,
      ...this.getStyles().item.active.icon
    };

    this.setState({
      itemStyles: activeStyles
    });

    return activeStyles;
  }

  /**
   * Determines whether the item should be active and applies the corresponding styles
   * @type {function}
   */
  checkIfActive: Function = () => {
    if (this.state.activeTabIndex === this.state.selfIndex) {
      this.setActiveStyles();
    } else {
      this.setState({
        itemStyles: this.getItemStyles()
      });
    }
  }

  /**
   * Updates the state with new props and checks if it's now active
   * @type {function}
   * @param {object} prevProps Previous props
   */
  updateState: Function = (prevProps: PackenUiTabsItemProps) => {
    this.setState({
      ...this.setPropsToState()
    }, () => {
      if (prevProps.activeTabIndex !== this.state.activeTabIndex) {
        this.checkIfActive();
      }
    });
  }

  /**
   * Compares props to determine if the component should update its state with new props
   * @type {function}
   * @param {object} prevProps Previous props
   */
  componentDidUpdate(prevProps: PackenUiTabsItemProps) {
    if (!UTIL.objectsEqual(prevProps, this.props)) {
      this.updateState(prevProps);
    }
  }

  /**
   * Sets the "hover" styles while onPressIn
   * @type {function}
   */
  pressInHandler: VoidFunction = () => {
    let newStyles = { ...this.state.itemStyles };

    newStyles.shape = {
      ...newStyles.shape,
      ...this.getStyles().item.focus.shape
    };
    newStyles.label = {
      ...newStyles.label,
      ...this.getStyles().item.focus.label
    };
    newStyles.icon = {
      ...newStyles.icon,
      ...this.getStyles().item.focus.icon
    };

    this.setState({
      itemStyles: newStyles
    });
  }

  /**
   * Sets the active styles onPressOut
   * @type {function}
   */
  pressOutHandler: VoidFunction = () => {
    this.setActiveTab();
  }

  /**
   * Returns the icon if is provided
   * @type {function}
   * @return {node|null} JSX for the icon or null
   */
  getIcon: Function = (): ReactNode | null => {
    let icon = null;

    if (typeof this.state.icon !== "boolean") {
      icon = (
        <View style={{
          marginRight: 10,
          ...this.state.styling.iconWrapper
        }}>
          {
            this.state.icon === "»" ? (
              <PackenUiText style={{
                ...this.state.itemStyles.icon,
                ...this.state.styling.iconCharacter
              }}>»</PackenUiText>
            ) : (
                <Icon
                  name={this.state.icon}
                  color={this.state.styling.iconColor ? this.state.styling.iconColor : this.state.itemStyles.icon.color}
                  size={this.state.styling.iconSize ? this.state.styling.iconSize : this.state.itemStyles.icon.fontSize * 0.6}
                />
              )
          }
        </View>
      );
    }

    return icon;
  }

  /**
   * Renders the component
   * @type {function}
   * @return {node} JSX for the component
   */
  render(): ReactNode {
    return (
      <TouchableWithoutFeedback onPress={this.setActiveTab} onPressIn={this.pressInHandler} onPressOut={this.pressOutHandler}>
        <View style={{
          ...this.state.itemStyles.shape,
          ...this.state.styling.shape
        }}>
          {this.getIcon()}
          <PackenUiText style={{
            ...this.state.itemStyles.label,
            ...this.state.styling.label
          }}>{this.state.label}</PackenUiText>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  /**
   * Returns the current styles object
   * @type {function}
   * @return {object} The current styles object
   */
  getStyles: Function = (): object => {
    return {
      item: {
        base: {
          shape: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            flexGrow: 1,
            borderBottomWidth: 4,
            borderBottomStyle: "solid",
            paddingTop: 12,
            paddingBottom: 8
          },
          label: {
            textAlign: "center",
            fontFamily: Typography.family.semibold,
            fontSize: Typography.size.medium,
            lineHeight: Typography.lineheight.huge
          },
          icon: {
            textAlign: "center",
            fontFamily: Typography.family.semibold,
            lineHeight: Typography.lineheight.huge,
            fontSize: Typography.size.medium * 1.65
          }
        },
        default: {
          shape: {
            borderBottomColor: Colors.base.disabled_alt
          },
          label: {
            color: Colors.base.disabled_alt_drk
          },
          icon: {
            color: Colors.base.disabled_alt_drk
          }
        },
        focus: {
          shape: {
            backgroundColor: Colors.ghost.focus,
            borderBottomColor: Colors.base.disabled_alt_drk
          },
          label: {
            color: Colors.basic.gray.dft
          },
          icon: {
            color: Colors.basic.gray.dft
          }
        },
        active: {
          shape: {
            backgroundColor: Colors.ghost.default,
            borderBottomColor: Colors.brand.primary.drk
          },
          label: {
            color: Colors.brand.primary.drk
          },
          icon: {
            color: Colors.brand.primary.drk
          }
        }
      }
    };
  }

  /**
   * Defines prop-types for the subcomponent
   * @type {object}
   */
  static propTypes: object = {
    updateActiveTabIndex: PropTypes.func.isRequired,
    activeTabIndex: PropTypes.number.isRequired,
    selfIndex: PropTypes.number.isRequired,
    callback: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    icon: PropTypes.string,
    styling: PropTypes.object,
    instance: PropTypes.func
  };
}

export default PackenUiTabsItem;