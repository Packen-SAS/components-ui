import React, { Component, createRef, ReactNode, RefObject } from "react";
import PropTypes from "prop-types";
import {
  TouchableWithoutFeedback,
  View,
  LayoutChangeEvent,
  GestureResponderEvent,
  ImageSourcePropType } from "react-native";

import Icon from "react-native-vector-icons/Feather";

import Colors from "../styles/abstracts/colors";
import Typography from "../styles/abstracts/typography";
import * as UTIL from "../utils";

import PackenUiAvatar from "./PackenUiAvatar";
import PackenUiRadio from "./PackenUiRadio";
import PackenUiCheckbox from "./PackenUiCheckbox";

interface MainContentShape {
  main: {
    props: {
      children: object | object[];
      style: {
        color: string;
      };
    };
    type: {
      displayName: string;
    };
  };
}

interface ChildShape {
  type: {
    displayName: string;
  };
  props: {
    style: {
      color: string;
    };
  };
}

interface CurrentCheckboxesStateShape {
  finalSelectionArray: string[];
  checkedValues: string[];
}

interface CurrentRadiosStateShape {
  checkedValue: string;
}

interface ConfigShape {
  size: string;
  name: string;
  checkedIcon?: string;
  src: ImageSourcePropType;
  selectionType: "single" | "radio" | "multiple" | "checkbox";
}

interface MainContentSideShape {
  type: "icon" | "avatar";
  config: {
    name: string;
    size: string;
    src: ImageSourcePropType;
  };
}

interface PackenUiDropdownListItemProps {
  config: ConfigShape;
  mainContent: {
    isDisabled: boolean;
    isSelected: boolean;
    value: string;
    left: MainContentSideShape | boolean;
    right: MainContentSideShape | boolean;
    main: {
      control: {
        type: string;
        label: string;
        value: string;
        isDisabled: boolean;
        items: any[];
        handleNotify: Function;
      };
      props: {
        children: object | object[];
        style: object;
      };
      type: {
        displayName: string;
      };
    };
  };
  getItemHeight: Function;
  selectedItems: string[];
  updateSelectedItems: Function;
  currentRadiosState?: CurrentRadiosStateShape;
  currentCheckboxesState?: CurrentCheckboxesStateShape;
  styling?: object;
  instance?: Function;
}

interface PackenUiDropdownListItemState {
  prevState: string;
  state: string;
  originalStyles: {
    color: string;
  };
  mainContent: ReactNode | null;
  newSelectedState: boolean;
}

interface PackenUiRadioShape {
  setCheckedState: Function;
  setCheckedIndex: Function;
}

interface PackenUiCheckboxShape {
  setCheckedState: Function;
}

type FindSelectedItemsType = (item: string) => boolean;
type GestureEventType = (event: GestureResponderEvent) => void;
type LayoutChangeEventType = (event: LayoutChangeEvent) => void;
type CheckUnselectedChildrenType = (val: string) => boolean | void;
type ForEachFunctionType = (child: object | ChildShape, i: number, vals: object[]) => boolean | void;

/**
 * Component for rendering a {@link PackenUiDropdownList} item, and should not be used standalone
 */
class PackenUiDropdownListItem extends Component<PackenUiDropdownListItemProps, PackenUiDropdownListItemState> {
  /**
   * Variable that stores the optional inner {@link PackenUiRadio} component ref/instance
   * @type {object|null}
   */
  radioRef: PackenUiRadioShape | PackenUiRadio | RefObject<PackenUiRadio> | null = null;
  
  /**
   * Variable that stores the optional inner {@link PackenUiCheckbox} component ref/instance
   * @type {object|null}
   */
  checkboxRef: PackenUiCheckboxShape | PackenUiCheckbox | RefObject<(PackenUiCheckbox)> | null = null;

  /**
   * Initializes the component
   * @type {function}
   * @param {object} props Props passed to the component
   */
  constructor(props: PackenUiDropdownListItemProps) {
    super(props);

    /**
     * Variable that stores the state
     * @type {object}
     * @property {string} prevState The previous inner status of the component
     * @property {string} state The current inner status of the component
     * @property {object} originalStyles The original item styles to re-apply when de-selecting the item
     * @property {node} mainContent JSX for the component's main content
     * @property {boolean} newSelectedState The new selected status for the item
     */
    this.state = {
      prevState: this.setInitialState(),
      state: this.setInitialState(),
      originalStyles: this.getOriginalStyles(),
      mainContent: null,
      newSelectedState: false
    }

    this.createRefs();
  }

  /**
   * Returns the optional, custom styling props
   * @type {function}
   * @return {object} The styling object for each element
   */
  getPropStyling: Function = (): object => {
    return this.props.styling ? { ...this.props.styling } : {
      wrapper: {},
      box: {},
      contentWrapper: {},
      checkIconSize: undefined,
      checkIconColor: undefined,
      avatar: {},
      sideIconSize: undefined,
      sideIconColor: undefined,
      leftWrapper: {},
      mainWrapper: {},
      rightWrapper: {},
      checkbox: {},
      radio: {}
    };
  }

  /**
   * Creates the {@link PackenUiRadio} and {@link PackenUiCheckbox} refs/instances
   * @type {function}
   * @return {boolean} Flag used only for testing purposes
   */
  createRefs: Function = (): boolean | void => {
    if (this.props.mainContent.main.control) {
      this.radioRef = createRef();
      this.checkboxRef = createRef();
    } else {
      return false;
    }
  }

  /**
   * Returns the inital inner status of the component
   * @type {function}
   * @return {string} The status of the component
   */
  setInitialState: Function = (): string => {
    return this.props.mainContent.isDisabled ? "disabled" : this.props.mainContent.isSelected ? "active" : "default";
  }

  /**
   * Assigns the original styles of each child element if the main content is an array of nodes
   * @type {function}
   * @param {object} child The child element
   * @param {object[]} originalStyles The original styles array to push to
   */
  getOriginalChildrenStyles: Function = (child: ChildShape, originalStyles: object[]) => {
    if (child.type.displayName !== "PackenUiRadio" && child.type.displayName !== "PackenUiCheckbox") {
      originalStyles.push({ color: child.props.style.color });
    } else {
      originalStyles = [];
    }
  }

  /**
   * Returns the correct original styles format and properties depending on the type of main content
   * @type {function}
   * @return {object|object[]} The original styles
   */
  getOriginalStyles: Function = (): object | object[] => {
    let originalStyles: object | object[] = [];

    if (!this.props.mainContent.main.control) {
      if (Array.isArray(this.props.mainContent.main.props.children)) {
        this.props.mainContent.main.props.children.forEach(child => this.getOriginalChildrenStyles(child, originalStyles));
      } else {
        if (this.props.mainContent.main.type.displayName !== "PackenUiRadio" && this.props.mainContent.main.type.displayName !== "PackenUiCheckbox") {
          originalStyles = { ...this.props.mainContent.main.props.style };
        } else {
          originalStyles = {};
        }
      }
    } else {
      originalStyles = {};
    }

    return originalStyles;
  }

  /**
   * Propagates the component instance if a callback is provided via props, and sets the main content
   * @type {function}
   */
  componentDidMount() {
    this.setMainContent();

    if (typeof this.props.instance === "function") {
      this.props.instance(this);
    }
  }

  /**
   * Placeholder function that does nothing
   * @type {function}
   * @return {boolean} Flag used only for testing purposes
   */
  mockCallback: Function = (): boolean => true;

  /**
   * Returns the selected item
   * @type {function}
   * @param {object} item The item to check
   * @return {object} The same item if it's the selected one
   */
  findSelectedItem: FindSelectedItemsType = (item: string): boolean => item === this.props.mainContent.value;

  /**
   * Checks if this item should be selected
   * @type {function}
   * @param {object} prevProps Previous props
   * @return {boolean} Flag used only for testing purposes
   */
  checkSelectedItems: Function = (prevProps: PackenUiDropdownListItemProps): boolean | void => {
    if (!UTIL.arraysEqual(prevProps.selectedItems, this.props.selectedItems)) {
      if (!this.props.mainContent.isDisabled && Array.isArray(this.props.selectedItems)) {
        const found = this.props.selectedItems.find(this.findSelectedItem);
        if (!found) {
          this.setState({
            prevState: "default",
            state: "default"
          });
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  /**
   * Selects the corresponding checkboxes
   * @type {function}
   * @return {boolean} Flag used only for testing purposes
   */
  checkCheckbox: Function = (): boolean | void => {
    if (
      this.checkboxRef
      && typeof this.checkboxRef === "object"
      && "setCheckedState" in this.checkboxRef
      && typeof this.checkboxRef.setCheckedState === "function"
      && this.props.currentCheckboxesState
    ) {
      this.checkboxRef.setCheckedState(this.props.mainContent.value, this.state.newSelectedState, this.props.currentCheckboxesState.finalSelectionArray);
    } else {
      return false;
    }
  }

  /**
   * Checks the different selection statuses when new props are received
   * @type {function}
   * @param {object} prevProps Previous props
   */
  componentDidUpdate(prevProps: PackenUiDropdownListItemProps) {
    this.checkIfUnselected();
    this.checkSelectedItems(prevProps);
    this.checkCheckbox();
  }

  /**
   * De-selects the corresponding checkboxes
   * @type {function}
   * @return {boolean} Flag used only for testing purposes
   */
  checkUnselectedChildren: CheckUnselectedChildrenType = (checkedValue: string): boolean | void => {
    if (
      checkedValue !== this.props.mainContent.value
      && this.checkboxRef
      && typeof this.checkboxRef === "object"
      && "setCheckedState" in this.checkboxRef
      && typeof this.checkboxRef.setCheckedState === "function"
      && this.props.currentCheckboxesState
    ) {
      this.checkboxRef.setCheckedState(this.props.mainContent.value, false, this.props.currentCheckboxesState.finalSelectionArray);
    } else {
      return false;
    }
  }

  /**
   * Determines which control elements should be unselected
   * @type {function}
   * @return {boolean} Flag used only for testing purposes
   */
  checkIfUnselected: Function = (): boolean | void => {
    let flag = true;

    if (this.props.mainContent.main.control) {
      if (this.props.config.selectionType === "radio" && this.props.currentRadiosState) {
        if (
          this.props.currentRadiosState.checkedValue !== this.props.mainContent.value
          && this.radioRef
          && typeof this.radioRef === "object"
          && "setCheckedIndex" in this.radioRef
        ) {
          this.radioRef.setCheckedIndex(undefined);
        } else {
          flag = false;
        }
      }
      if (this.props.config.selectionType === "checkbox" && this.props.currentCheckboxesState) {
        this.props.currentCheckboxesState.checkedValues.forEach(this.checkUnselectedChildren);
      }
    }

    return flag;
  }

  /**
   * Sets the correct "active" or "hover" inner status and applies the styles accordingly
   * @type {function}
   */
  pressInHandler: GestureEventType = () => {
    const prevState = this.state.state;
    this.setState({
      prevState: prevState,
      state: this.props.mainContent.isSelected ? "active" : "focus"
    });
  }

  /**
   * Sets the previous inner status and styles when releasing the component
   * @type {function}
   */
  pressOutHandler: GestureEventType = () => {
    this.setState({
      state: this.state.prevState
    });
  }

  /**
   * Handles a press event when the selection type is "single" or "radio"
   * @type {function}
   */
  handleSingleRadioPress: Function = () => {
    this.setState({
      prevState: "active",
      state: "active"
    });
    if (this.radioRef && "setCheckedIndex" in this.radioRef) {
      this.radioRef.setCheckedIndex(0);
      this.props.updateSelectedItems(this.props.mainContent.value, true, {
        checkedType: "radio",
        checkedValue: this.props.mainContent.value
      });
    } else {
      this.props.updateSelectedItems(this.props.mainContent.value, true);
    }
  }

  /**
   * Handles a press event when the selection type is "multiple" or "checkbox"
   * @type {function}
   */
  handleMultipleCheckboxPress: Function = () => {
    const newState = this.state.prevState === "default" ? "active" : "default";
    const newSelectedState = newState === "active" ? true : false;
    this.setState({
      prevState: newState,
      state: newState,
      newSelectedState: newSelectedState
    });
    if (this.checkboxRef) {
      this.props.updateSelectedItems(this.props.mainContent.value, newSelectedState, {
        checkedType: "checkbox",
        checkedValue: this.props.mainContent.value
      });
    } else {
      this.props.updateSelectedItems(this.props.mainContent.value, newSelectedState);
    }
  }

  /**
   * Determines how to process a press event on the component depending on the selection type to apply the correct status and styles
   * @type {function}
   * @return {boolean} Flag used only for testing purposes
   */
  pressHandler: GestureEventType = (): boolean | void => {
    switch (this.props.config.selectionType) {
      case "single":
      case "radio":
        this.handleSingleRadioPress();
        break;
      case "multiple":
      case "checkbox":
        this.handleMultipleCheckboxPress();
        break;
      default:
        return false;
    }
  }

  /**
   * Returns the active styles
   * @type {function}
   * @return {object} The styles object
   */
  getActiveStyles: Function = (): object => {
    let activeStyles = {};

    if (this.props.config.selectionType !== "radio" && this.props.config.selectionType !== "checkbox") {
      if (this.props.mainContent.isSelected) {
        activeStyles = { ...this.getStyles().box.state.active };
      } else {
        activeStyles = { ...this.getStyles().box.state.default };
      }
    }

    return activeStyles;
  }

  /**
   * Returns the focus styles
   * @type {function}
   * @return {object} The styles object
   */
  getFocusStyles: Function = (): object => {
    let focusStyles = {};

    if (this.props.config.selectionType !== "radio" && this.props.config.selectionType !== "checkbox") {
      if (this.props.mainContent.isSelected) {
        focusStyles = { ...this.getStyles().box.state.active }
      } else {
        focusStyles = this.state.state === "focus" ? { ...this.getStyles().box.state.focus } : { ...this.getStyles().box.state.default }
      }
    }

    return focusStyles;
  }

  /**
   * Returns the correct element for the left content of the component
   * @type {function}
   * @param {node} leftContent The current left content
   * @param {number} iconSizeMultiplier The multipler value for the icon size
   * @return {node} The updated JSX for the left content
   */
  getLeftRender: Function = (leftContent: ReactNode, iconSizeMultiplier: number): ReactNode | null => {
    let leftRender = leftContent;
    if (typeof this.props.mainContent.left === "object") {
      switch (this.props.mainContent.left.type) {
        case "icon":
          leftRender = (
            <Icon
              name={this.props.mainContent.left.config.name}
              color={this.getPropStyling().sideIconColor ? this.getPropStyling().sideIconColor : this.getStyles().icon.state[this.state.state].color}
              size={this.getPropStyling().sideIconSize ? this.getPropStyling().sideIconSize : this.getStyles().icon.size[this.props.config.size].size * iconSizeMultiplier}
            />
          );
          break;
        case "avatar":
          leftRender = (
            <PackenUiAvatar
              size={this.props.mainContent.left.config.size}
              src={this.props.mainContent.left.config.src}
              styling={this.getPropStyling().avatar}
            />
          );
          break;
        default:
          leftRender = null;
          break;
      }
    }
    return leftRender;
  }

  /**
   * Returns the correct element for the right content of the component
   * @type {function}
   * @param {node} rightContent The current right content
   * @param {number} iconSizeMultiplier The multipler value for the icon size
   * @return {node} The updated JSX for the right content
   */
  getRightRender: Function = (rightContent: ReactNode, iconSizeMultiplier: number): ReactNode | null => {
    let rightRender = rightContent;
    if (typeof this.props.mainContent.right === "object") {
      switch (this.props.mainContent.right.type) {
        case "icon":
          rightRender = (
            <Icon
              name={this.props.mainContent.right.config.name}
              color={this.getPropStyling().sideIconColor ? this.getPropStyling().sideIconColor : this.getStyles().icon.state[this.state.state].color}
              size={this.getPropStyling().sideIconSize ? this.getPropStyling().sideIconSize : this.getStyles().icon.size[this.props.config.size].size * iconSizeMultiplier}
            />
          );
          break;
        case "avatar":
          rightRender = (
            <PackenUiAvatar
              size={this.props.mainContent.right.config.size}
              src={this.props.mainContent.right.config.src}
              styling={this.getPropStyling().avatar}
            />
          );
          break;
        default:
          rightRender = null;
          break;
      }
    }
    return rightRender;
  }

  /**
   * Returns the sides content of the component
   * @type {function}
   * @return {object} The object holding the JSX for each side's content
   */
  getSidesContent: Function = (): { left: ReactNode; right: ReactNode } => {
    let leftContent, rightContent;
    const iconSizeMultiplier = 1.5;

    if (!this.props.mainContent.left) {
      leftContent = null;
    } else {
      leftContent = this.getLeftRender(leftContent, iconSizeMultiplier);
    }

    if (!this.props.mainContent.right) {
      rightContent = null;
    } else {
      rightContent = this.getRightRender(rightContent, iconSizeMultiplier);
    }

    if (leftContent !== null) {
      leftContent = (
        <View style={{ ...this.getStyles().content.left.base, ...this.getStyles().content.left.state[this.state.state], ...this.getPropStyling().leftWrapper }}>
          {leftContent}
        </View>
      );
    }

    if (rightContent !== null) {
      rightContent = (
        <View style={{ ...this.getStyles().content.right.base, ...this.getStyles().content.right.state[this.state.state], ...this.getPropStyling().rightWrapper }}>
          {rightContent}
        </View>
      );
    }

    return {
      left: leftContent,
      right: rightContent
    };
  }

  /**
   * Retrieves the left content of the component
   * @type {function}
   * @return {node} JSX for the left content
   */
  getLeftContent: Function = (): ReactNode => {
    return this.getSidesContent().left;
  }

  /**
   * Retrieves the right content of the component
   * @type {function}
   * @return {node} JSX for the right content
   */
  getRightContent: Function = (): ReactNode => {
    return this.getSidesContent().right;
  }

  /**
   * Sets the {@link PackenUiRadio} ref/instance to the global variable if it's a "control" dropdown
   * @type {function}
   * @param {object} radio The ref/instances
   */
  setRadioRef: (instance: PackenUiRadio | null) => void = (radio: PackenUiRadio | null) => {
    this.radioRef = radio;
  }

  /**
   * Sets the {@link PackenUiCheckbox} ref/instance to the global variable if it's a "control" dropdown
   * @type {function}
   * @param {object} checkbox The ref/instance
   */
  setCheckboxRef: (instance: PackenUiCheckbox | null) => void = (checkbox: PackenUiCheckbox | null) => {
    this.checkboxRef = checkbox;
  }

  /**
   * Returns the correct content if it's a "control" dropdown
   * @type {function}
   * @param {node} mainContent The
   * @return {node} JSX for the {@link PackenUiRadio} or {@link PackenUiCheckbox}
   */
  getMainControl: Function = (): ReactNode | null => {
    let mainControl = null;
    switch (this.props.mainContent.main.control.type) {
      case "radio": {
        mainControl = (
          <PackenUiRadio
            layout="dropdown"
            items={[{
              label: this.props.mainContent.main.control.label,
              value: this.props.mainContent.main.control.value,
              isDisabled: this.props.mainContent.main.control.isDisabled
            }]}
            ref={this.setRadioRef}
            name="dropdownItemRadio"
            initialIndex={-1}
            callback={this.mockCallback}
            styling={this.getPropStyling().radio}
          />
        );
      } break;
      case "checkbox": {
        mainControl = (
          <PackenUiCheckbox
            layout="dropdown"
            items={this.props.mainContent.main.control.items}
            callback={this.props.mainContent.main.control.handleNotify}
            ref={this.setCheckboxRef}
            name="dropdownItemCheckbox"
            styling={this.getPropStyling().checkbox}
          />
        );
      } break;
      default:
        return false;
    }
    return mainControl;
  }

  /**
   * Sets the correct main content to the state
   * @type {function}
   */
  setMainContent: Function = () => {
    let mainContent;

    if (this.props.mainContent.main.control) {
      mainContent = this.getMainControl();
    } else {
      mainContent = (
        <View style={{ ...this.getStyles().content.main, ...this.getPropStyling().mainWrapper }}>
          {this.props.mainContent.main}
        </View>
      );
    }

    this.setState({
      mainContent: mainContent
    });
  }

  /**
   * Propagates the item's height
   * @type {function}
   * @param {number} height The received item's height
   */
  getItemHeight: LayoutChangeEventType = (e: LayoutChangeEvent) => {
    this.props.getItemHeight(e.nativeEvent.layout.height);
  }

  /**
   * Returns the disabled styles
   * @type {function}
   * @return {object} The styles object
   */
  getDisabledStyles: Function = (): object => {
    let disabledStyles = {
      box: {},
      content: { wrapper: {} }
    };

    if (this.props.mainContent.isDisabled) {
      disabledStyles = {
        box: {
          ...this.getStyles().box.state.disabled
        },
        content: {
          wrapper: {
            ...this.getStyles().content.wrapper.state.disabled
          }
        }
      };
    }

    return disabledStyles;
  }

  /**
   * Sets the disabled styles to the main content elements when appropriate
   * @type {function}
   * @param {object} child The main content's element to update
   * @return {boolean} Flag used only for testing purposes
   */
  checkDisabledChildren: ForEachFunctionType = (child: object | ChildShape): boolean | void => {
    if (
      "type" in child
      && child.type.displayName !== "PackenUiRadio"
      && child.type.displayName !== "PackenUiCheckbox"
    ) {
      child.props.style.color = Colors.basic.gray.lgt;
    } else {
      return false;
    }
  }

  /**
   * Sets the disabled styles when appropriate
   * @type {function}
   * @param {object} mainContent The main content data object
   * @return {boolean} Flag used only for testing purposes
   */
  checkDisabledStyles: Function = (mainContent: MainContentShape): boolean | void => {
    if (Array.isArray(mainContent.main.props.children)) {
      mainContent.main.props.children.forEach(this.checkDisabledChildren);
    } else {
      if (mainContent.main.type.displayName !== "PackenUiRadio" && mainContent.main.type.displayName !== "PackenUiCheckbox") {
        mainContent.main.props.style.color = Colors.basic.gray.lgt;
      } else {
        return false;
      }
    }
  }

  /**
   * Sets the selected styles to the main content elements when appropriate
   * @type {function}
   * @param {object} child The main content's element to update
   * @return {boolean} Flag used only for testing purposes
   */
  checkSelectedChildren: ForEachFunctionType = (child: object | ChildShape): boolean | void => {
    if (
      "type" in child
      && child.type.displayName !== "PackenUiRadio"
      && child.type.displayName !== "PackenUiCheckbox"
    ) {
      child.props.style.color = Colors.basic.white.dft;
    } else {
      return false;
    }
  }

  /**
   * Sets the selected styles when appropriate
   * @type {function}
   * @param {object} mainContent The main content data object
   * @return {boolean} Flag used only for testing purposes
   */
  checkSelectedStyles: Function = (mainContent: MainContentShape): boolean | void => {
    if (Array.isArray(mainContent.main.props.children)) {
      mainContent.main.props.children.forEach(this.checkSelectedChildren);
    } else {
      if (mainContent.main.type.displayName !== "PackenUiRadio" && mainContent.main.type.displayName !== "PackenUiCheckbox") {
        mainContent.main.props.style.color = Colors.basic.white.dft;
      } else {
        return false;
      }
    }
  }

  /**
   * Sets the original styles to the main content elements when appropriate
   * @type {function}
   * @param {object} child The main content's element to restore
   * @param {number} i The main content's index
   */
  checkDefaultChildren: ForEachFunctionType = (child: object | ChildShape, i: number) => {
    if (
      "type" in child
      && child.type.displayName !== "PackenUiRadio"
      && child.type.displayName !== "PackenUiCheckbox"
    ) {
      child.props.style.color = this.state.originalStyles[i].color;
    }
  }

  /**
   * Sets the default styles when appropriate
   * @type {function}
   * @param {object} mainContent The main content data object
   */
  checkDefaultStyles: Function = (mainContent: MainContentShape) => {
    if (Array.isArray(mainContent.main.props.children)) {
      mainContent.main.props.children.forEach(this.checkDefaultChildren);
    } else {
      if (mainContent.main.type.displayName !== "PackenUiRadio" && mainContent.main.type.displayName !== "PackenUiCheckbox") {
        mainContent.main.props.style.color = this.state.originalStyles.color;
      }
    }
  }

  /**
   * Checks the main content styles to apply the correct object
   * @type {function}
   */
  checkMainContentStyles: Function = () => {
    const mainContent = this.props.mainContent;

    if (mainContent.isDisabled) {
      this.checkDisabledStyles(mainContent);
    } else {
      if (mainContent.isSelected) {
        this.checkSelectedStyles(mainContent);
      } else {
        this.checkDefaultStyles(mainContent);
      }
    }
  }

  /**
   * Renders the component
   * @type {function}
   * @return {node} JSX for the component
   */
  render(): ReactNode {
    if (!this.props.mainContent.main.control) {
      this.checkMainContentStyles();
    }
    const propStyling = this.getPropStyling();

    return (
      <View style={propStyling.wrapper} pointerEvents={this.props.mainContent.isDisabled ? "none" : "auto"}>
        <TouchableWithoutFeedback
          onPressIn={this.pressInHandler}
          onPressOut={this.pressOutHandler}
          onPress={this.pressHandler}
          onLayout={this.getItemHeight}
        >
          <View
            style={{
              ...this.getStyles().box.base,
              ...this.getActiveStyles(),
              ...this.getFocusStyles(),
              ...this.getStyles().box.selection[this.props.config.selectionType],
              ...this.getDisabledStyles().box,
              ...propStyling.box
            }}
          >
            <View style={{ ...this.getStyles().content.wrapper.base, ...this.getDisabledStyles().content.wrapper, ...propStyling.contentWrapper }}>
              {this.getLeftContent()}
              {this.state.mainContent}
              {this.getRightContent()}
              {
                this.props.mainContent.isSelected && this.props.config.checkedIcon ? (
                  <Icon
                    name={this.props.config.checkedIcon}
                    size={propStyling.checkIconSize ? propStyling.checkIconSize : this.getStyles().icon.size[this.props.config.size].size * 1.2}
                    color={propStyling.checkIconColor ? propStyling.checkIconColor : Colors.basic.white.dft}
                  />
                ) : null
              }
            </View>
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
      box: {
        base: {
          paddingVertical: 10,
          paddingHorizontal: 16,
          borderBottomWidth: 1,
          borderBottomStyle: "solid",
          borderBottomColor: Colors.basic.white.drk
        },
        state: {
          default: {
            backgroundColor: Colors.basic.white.dft
          },
          focus: {
            backgroundColor: Colors.brand.primary.snw
          },
          active: {
            backgroundColor: Colors.brand.primary.drk
          },
          disabled: {
            backgroundColor: Colors.basic.white.dft
          }
        },
        selection: {
          single: {},
          multiple: {},
          radio: {
            padding: 0
          },
          checkbox: {
            padding: 0
          }
        }
      },
      content: {
        wrapper: {
          base: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
          },
          state: {
            default: {},
            focus: {},
            active: {},
            disabled: {}
          }
        },
        left: {
          base: {
            marginRight: 12,
          },
          state: {
            default: {},
            focus: {},
            active: {},
            disabled: {
              opacity: 0.2
            }
          }
        },
        main: {
          flex: 1
        },
        right: {
          base: {
            marginLeft: 12
          },
          state: {
            default: {},
            focus: {},
            active: {},
            disabled: {
              opacity: 0.2
            }
          }
        }
      },
      icon: {
        base: {
          color: Colors.basic.independence.dft
        },
        size: {
          tiny: {
            size: Typography.size.small
          },
          small: {
            size: Typography.size.medium
          },
          medium: {
            size: Typography.size.medium
          },
          large: {
            size: Typography.size.medium
          },
          giant: {
            size: Typography.size.xhuge
          }
        },
        state: {
          default: {
            color: Colors.basic.independence.dft
          },
          focus: {
            color: Colors.basic.independence.dft
          },
          active: {
            color: Colors.basic.white.dft
          },
          disabled: {
            color: Colors.basic.gray.dft
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
    config: PropTypes.object.isRequired,
    mainContent: PropTypes.object.isRequired,
    getItemHeight: PropTypes.func.isRequired,
    selectedItems: PropTypes.array.isRequired,
    updateSelectedItems: PropTypes.func.isRequired,
    currentRadiosState: PropTypes.object,
    currentCheckboxesState: PropTypes.object,
    styling: PropTypes.object,
    instance: PropTypes.func
  };
}

export default PackenUiDropdownListItem;