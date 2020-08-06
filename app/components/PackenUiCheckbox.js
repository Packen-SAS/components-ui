import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, TouchableWithoutFeedback } from "react-native";
import * as UTIL from "../utils";

import PackenUiCheckboxControl from "./PackenUiCheckboxControl";

/**
 * Component for rendering a list of checkboxes that can be laid out vertically or horizontally
 */
class PackenUiCheckbox extends Component {
  /**
   * Initializes the component
   * @type {function}
   * @param {object} props Props passed to the component
   */
  constructor(props) {
    super(props);

    /**
     * Variable that stores the state
     * @type {function}
     * @property {object[]} checkedItems The currently checked items
     * @property {number} selectedIndex The latest selected item's index
     */
    this.state = {
      ...this.setPropsToState(),
      checkedItems: [],
      selectedIndex: null
    };
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
   * @property {string} [layout="column"] The type of layout for the items - "column" or "row"
   * @property {object[]} [items=[]] The checkbox items
   * @property {function|boolean} [callback=false] The required callback to propagate when selection changes
   * @property {string} [name=""] The identifier for this set of checkboxes
   * @property {object} [styling={ wrapper: {}, content: {}, control: {} }] The optional custom styling props
   * @return {object} The props mapped to the state keys
   */
  setPropsToState = () => {
    return {
      layout: this.props.layout ? this.props.layout : "column",
      items: this.props.items ? [...this.props.items] : [],
      callback: this.props.callback ? this.props.callback : false,
      name: this.props.name ? this.props.name : "",
      styling: this.props.styling ? { ...this.props.styling } : {
        wrapper: {},
        content: {},
        control: {}
      }
    };
  }

  /**
   * Callback function that is triggered when pressing an item
   * @type {function}
   * @param {number} selectedIndex The index of the pressed item
   */
  pressHandler = selectedIndex => {
    this.setState({
      selectedIndex: selectedIndex
    }, this.updateCheckedItems);
  }

  /**
   * Determines if the provided item is checked
   * @type {function}
   * @param {object} item The item to validate
   * @return {object} The same item if it's checked
   */
  filterUpdatedItems = item => item.isChecked;

  /**
   * Extracts an item's value
   * @type {function}
   * @param {object} item The item to process
   * @return {string} The item's value
   */
  mapNewCheckedItems = item => item.value;

  /**
   * Updates the checked items array in state and triggers the provided callback
   * @type {function}
   */
  updateCheckedItems = () => {
    if (this.state.selectedIndex !== null) {
      const updatedItems = [...this.state.items];
      updatedItems[this.state.selectedIndex].isChecked = !updatedItems[this.state.selectedIndex].isChecked;
      let newCheckedItems = updatedItems.filter(this.filterUpdatedItems);
      newCheckedItems = newCheckedItems.map(this.mapNewCheckedItems);

      this.setState({
        checkedItems: newCheckedItems
      }, () => {
        if (this.state.callback) {
          this.state.callback(this.state.name, newCheckedItems);
        } else {
          return false;
        }
      });
    } else {
      return false;
    }
  }

  /**
   * Sets the checked items with the new base configuration before processing them
   * @type {function}
   * @param {object} item The item to process
   * @param {boolean} newState The item's new internal state
   * @return {object} The same item with the new configuration
   */
  mapUpdatedCheckedItems = (item, newState) => ({ label: item, isChecked: newState, isDisabled: false });

  /**
   * Returns the selected item
   * @type {function}
   * @param {object} item The item to check
   * @param {string} valueToSearch The value to compare agains
   * @return {object} The item that matches the searched value
   */
  findMatchedItemToCheck = (item, valueToSearch) => item.label === valueToSearch;

  /**
   * Programmatically sets the checked states
   * @type {function}
   * @param {string} valueToSearch The selected value to compare against
   * @param {boolean} newState The new state for the item
   * @param {string[]} finalSelectionArray The currently selected values
   */
  setCheckedState = (valueToSearch, newState, finalSelectionArray) => {
    let updatedCheckedItems = [...finalSelectionArray];
    updatedCheckedItems = updatedCheckedItems.map(item => this.mapUpdatedCheckedItems(item, newState));

    const foundItem = updatedCheckedItems.find(item => this.findMatchedItemToCheck(item, valueToSearch));
    if (foundItem) {
      foundItem.isChecked = newState;
      this.setState({
        checkedItems: updatedCheckedItems
      });
    } else {
      return false;
    }
  }

  /**
   * Returns the individual checkbox control items
   * @type {function}
   * @param {object} item The item configuration object
   * @param {number} i The item's index
   * @return {node} JSX for the checkbox control item
   */
  mapRenderedControls = (item, i) => (
    <View
      key={i}
      pointerEvents={item.isDisabled ? "none" : "auto"}
      style={{ ...this.getStyles().content.layout[this.state.layout], ...this.state.styling.content }}
    >
      <TouchableWithoutFeedback onPress={() => { this.pressHandler(i); }} >
        <View style={{ alignSelf: "flex-start" }}>
          <PackenUiCheckboxControl
            label={item.label}
            layout={this.state.layout}
            isChecked={item.isChecked}
            isDisabled={item.isDisabled}
            checkedItems={this.state.checkedItems}
            styling={this.state.styling.control}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  )

  /**
   * Updates the state with new props
   * @type {function}
   */
  updateState = () => {
    this.setState({ ...this.setPropsToState() });
  }

  /**
   * Compares props to determine if the component should update its state with new props
   * @type {function}
   * @param {object} prevProps Previous props
   */
  componentDidUpdate(prevProps) {
    if (!UTIL.objectsEqual(prevProps, this.props)) {
      this.updateState();
    }
  }

  /**
   * Renders the component
   * @type {function}
   * @return {node} JSX for the component
   */
  render() {
    return (
      <View
        style={{ ...this.getStyles().wrapper.layout[this.state.layout], ...this.state.styling.wrapper }}
        pointerEvents={this.state.layout === "dropdown" ? "none" : "auto"}
      >
        {this.state.items.map(this.mapRenderedControls)}
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
      wrapper: {
        layout: {
          column: {
            flexDirection: "column"
          },
          row: {
            flexWrap: "wrap",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start"
          },
          dropdown: {
            flexDirection: "column"
          }
        }
      },
      content: {
        layout: {
          column: {
            marginBottom: 10
          },
          row: {
            marginRight: 15,
            marginBottom: 10
          },
          dropdown: {
            marginRight: 0,
            marginBottom: 0
          }
        }
      }
    };
  }
}

PackenUiCheckbox.propTypes = {
  layout: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  callback: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  styling: PropTypes.object
};

export default PackenUiCheckbox;