import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import * as UTIL from "../utils"

import PackenUiRadioControl from "./PackenUiRadioControl";

/**
 * Component for rendering a group of radio buttons that can be laid out vertically or horizontally
 */
class PackenUiRadio extends Component {
  /**
   * Initializes the component
   * @type {function}
   * @param {object} props Props passed to the component
   */
  constructor(props) {
    super(props);

    /**
     * Variable that stores the state
     * @type {object}
     * @property {string} currentSelection The value of the currently selected item
     */
    this.state = {
      ...this.setPropsToState(),
      currentSelection: ""
    }
  }

  /**
   * Propagates the component instance if a callback is provided via props
   * @type {function}
   */
  componentDidMount() {
    if (typeof this.props.instance === "function") {
      this.props.instance(this);
    }
  }

  /**
   * Centralizes the received props assignment to set them to the state, determining default values in case any is not provided
   * @type {function}
   * @property {object[]} [items=[]] The configuration objects for each {@link PackenUiRadioControl} item
   * @property {number} [checkedIndex=-1] The optional initially selected item
   * @property {function} [callback=false] The callback function to be called when the selection changes to pass it the new value
   * @property {string} [name=""] The identifier for this group of radio buttons
   * @property {string} [layout="column"] The layout structure for the items - "column" or "row"
   * @property {object} [styling={ container: {}, item: {}, control: {} }] The optional custom styling props
   * @return {object} The props mapped to the state keys
   */
  setPropsToState = () => {
    return {
      items: this.props.items ? [...this.props.items] : [],
      checkedIndex: this.props.initialIndex === 0 ? 0 : this.props.initialIndex ? this.props.initialIndex : -1,
      callback: this.props.callback ? this.props.callback : false,
      name: this.props.name ? this.props.name : "",
      layout: this.props.layout ? this.props.layout : "column",
      styling: this.props.styling ? { ...this.props.styling } : {
        container: {},
        item: {},
        control: {}
      }
    };
  }

  /**
   * Returns the complete object of the currently selected value
   * @type {function}
   * @return {object} The selected item's data
   */
  findCurrentSelection = () => {
    return this.state.items[this.state.checkedIndex];
  }

  /**
   * Updates the current selected item
   * @type {function}
   * @param {string} newSelection The newly selected value
   */
  updateCurrentSelection = newSelection => {
    this.setState({
      currentSelection: newSelection
    });
  }

  /**
   * Updates the state with new props and checks the animation status
   * @type {function}
   */
  updateState = () => {
    this.setState({ ...this.setPropsToState() });
  }

  /**
   * Compares props to determine if the component should update its state with new props, and the selected value
   * @type {function}
   * @param {object} prevProps Previous props
   * @param {object} prevState Previous state
   */
  componentDidUpdate(prevProps, prevState) {
    if (prevState.checkedIndex !== this.state.checkedIndex) {
      this.updateCurrentSelection(this.findCurrentSelection());
    }
    if (prevState.currentSelection !== this.state.currentSelection) {
      /* New selection can be used here */
      /* console.log(this.state.currentSelection); */
      if (this.state.callback && this.state.currentSelection) {
        this.state.callback(this.state.name, this.state.currentSelection.value);
      }
      return this.state.currentSelection;
    }
    if (!UTIL.objectsEqual(prevProps, this.props)) {
      this.updateState();
    }
  }

  /**
   * Updates the selected item's index
   * @type {function}
   * @param {number} newCheckedIndex The newly selected item's index
   */
  setCheckedIndex = newCheckedIndex => {
    this.setState({
      checkedIndex: newCheckedIndex
    });
  }

  /**
   * Returns a {@link PackenUiRadioControl} component for each item
   * @type {function}
   * @return {node} JSX for the item
   */
  mapItems = (item, i) => (
    <View
      key={i}
      pointerEvents={this.state.layout === "dropdown" ? "none" : "auto"}
      style={{ ...this.getStyles().item[this.state.layout], ...this.state.styling.item }}
    >
      <PackenUiRadioControl
        checkedIndex={this.state.checkedIndex}
        selfIndex={i}
        label={item.label}
        isDisabled={item.isDisabled}
        updateCheckedIndex={this.setCheckedIndex}
        styling={this.state.styling.control} />
    </View>
  )

  /**
   * Renders the component
   * @type {function}
   * @return {node} JSX for the component
   */
  render() {
    return (
      <View style={{
        ...this.getStyles().container[this.state.layout],
        ...this.state.styling.container
      }}>
        {this.state.items.map(this.mapItems)}
      </View>
    );
  }

  /**
   * Returns the current styles object
   * @type {function}
   * @return {object} The current styles object
   */
  getStyles = () => {
    return {
      container: {
        column: {
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center"
        },
        row: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          flexWrap: "wrap"
        },
        dropdown: {
          flexDirection: "column",
          alignItems: "stretch",
          justifyContent: "center"
        }
      },
      item: {
        column: {
          marginBottom: 10
        },
        row: {
          marginRight: 20,
          marginBottom: 10
        },
        dropdown: {
          margin: 0
        }
      }
    };
  }
}

PackenUiRadio.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  initialIndex: PropTypes.number.isRequired,
  callback: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  layout: PropTypes.string.isRequired,
  styling: PropTypes.object
}

export default PackenUiRadio;