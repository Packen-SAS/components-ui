import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

import PackenUiSelectionButtonsControl from "./PackenUiSelectionButtonsControl";

/**
 * Component for rendering a group of selectable square buttons laid out horizontally, with a different design than {@link PackenUiButton}'s
 */
class PackenUiSelectionButtons extends Component {
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
     * @property {string|string[]} selected The selected value(s)
     */
    this.state = {
      ...this.setPropsToState(),
      selected: this.getInitialSelected()
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
   * @property {boolean} [altStyle=false] Flag to switch to the alternative styles
   * @property {string} [name=""] The identifier for this group
   * @property {string} [type="label"] Determines which type of selection buttons to render - "label" for small, simple text buttons; or "image" for big buttons with an image and text
   * @property {object[]} [items=[]] The configuration objects for each {@link PackenUiSelectionButtonsControl}
   * @property {string} [selection="single"] The type of selection - "single" for single selection; or "multiple" for multiple selections
   * @property {number} [itemsPerRow=2] The number of items to render per row
   * @property {function} [onNewSelection=false] The callback function to be called when the selection changes
   * @property {object} [styling={ wrapper: {}, item: {}, control: {} }] The optional custom styling props
   * @return {object} The props mapped to the state keys
   */
  setPropsToState = () => {
    return {
      altStyle: this.props.altStyle ? this.props.altStyle : false,
      name: this.props.name ? this.props.name : "",
      type: this.props.type ? this.props.type : "label",
      items: this.props.items ? [...this.props.items] : [],
      selection: this.props.selection ? this.props.selection : "single",
      itemsPerRow: this.props.itemsPerRow ? this.props.itemsPerRow : 2,
      onNewSelection: this.props.onNewSelection ? this.props.onNewSelection : false,
      styling: this.props.styling ? { ...this.props.styling } : {
        wrapper: {},
        item: {},
        control: {}
      }
    };
  }

  /**
   * Returns the selected items
   * @type {function}
   * @param {object} item The item to check
   * @return {object} The same item if it's selected
   */
  filterInitialSelected = item => item.isSelected;

  /**
   * Adds the preselected items to a common array
   * @type {function}
   * @param {object} item The item to check
   * @param {object[]} preSelected The array to push to
   */
  pushPreselected = (item, preSelected) => {
    if (item.isSelected) {
      preSelected.push(item.value);
    }
  }

  /**
   * Checks which items are initially preselected and returns them
   * @type {function}
   * @return {string|string[]} The preselected value(s)
   */
  getInitialSelected = () => {
    const items = this.setPropsToState().items;
    let selected;

    if (this.props.selection === "single") {
      const found = items.filter(this.filterInitialSelected)[0];
      if (found) {
        selected = found.value;
      } else {
        selected = "";
      }
    } else {
      const preSelected = [];
      items.forEach(item => this.pushPreselected(item, preSelected));
      selected = [...preSelected];
    }

    return selected;
  }

  /**
   * Checks whether a given item is the latest selected
   * @type {function}
   * @param {object} item The item to check
   * @param {string} newValue The value to compare against
   * @return {boolean} Flag that determines if the item is the one that was selected
   */
  findNewSelectedIndex = (item, newValue) => item === newValue;

  /**
   * Handles when a new selection is made
   * @type {function}
   * @param {string} newValue The latest selected value
   * @return {string} The processed latest selected value(s)
   */
  newSelectionHandler = newValue => {
    let newSelected;

    if (this.state.selection === "single") {
      newSelected = newValue;
    } else {
      newSelected = [...this.state.selected];

      if (newSelected.includes(newValue)) {
        const foundIndex = newSelected.findIndex(item => this.findNewSelectedIndex(item, newValue));
        if (newSelected.length > 1) {
          newSelected.splice(foundIndex, 1);
        }
      } else {
        newSelected.push(newValue);
      }

      newSelected = [...new Set(newSelected)];
    }

    this.setState({
      selected: newSelected
    });

    if (this.state.onNewSelection) {
      this.state.onNewSelection(this.state.name, newSelected);
    }

    return newSelected;
  }

  /**
   * Updates the state with new props
   * @type {function}
   */
  updateState = () => {
    this.setState({
      ...this.setPropsToState(),
      selected: this.getInitialSelected()
    });
  }

  /**
   * Compares props to determine if the component should update its state with new props
   * @type {function}
   * @param {object} prevProps Previous props
   */
  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.updateState();
    }
  }

  /**
   * Returns a {@link PackenUiSelectionButtonsControl} component for each item
   * @type {function}
   * @param {object} item The item's configuration data object
   * @param {number} i The item's index
   * @return {node} JSX for the item
   */
  mapItems = (item, i) => (
    <View key={i} style={{
      ...this.getStyles().item.type[this.state.type],
      ...this.getStyles().item.altStyle[this.state.altStyle],
      width: `${100 / this.state.itemsPerRow}%`,
      ...this.state.styling.item,
    }}>
      <PackenUiSelectionButtonsControl
        data={item}
        altStyle={this.state.altStyle}
        type={this.state.type}
        selected={this.state.selected}
        selection={this.state.selection}
        onNewSelection={this.newSelectionHandler}
        styling={this.state.styling.control}
      />
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
        ...this.getStyles().wrapper.base,
        ...this.getStyles().wrapper.type[this.state.type],
        ...this.getStyles().wrapper.altStyle[this.state.altStyle],
        ...this.state.styling.wrapper
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
      wrapper: {
        base: {
          flexDirection: "row",
          alignItems: "stretch",
          justifyContent: "flex-start",
          flexWrap: "wrap",
          flex: 1
        },
        type: {
          label: {
            marginVertical: -4,
            marginHorizontal: -12
          },
          image: {
            margin: -12
          }
        },
        altStyle: {
          false: {},
          true: {
            marginVertical: -16,
            marginHorizontal: -16
          }
        }
      },
      item: {
        type: {
          label: {
            paddingVertical: 4,
            paddingHorizontal: 12
          },
          image: {
            padding: 12
          }
        },
        altStyle: {
          false: {},
          true: {
            paddingVertical: 16,
            paddingHorizontal: 16
          }
        }
      }
    };
  }
}

PackenUiSelectionButtons.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  selection: PropTypes.string.isRequired,
  itemsPerRow: PropTypes.number.isRequired,
  onNewSelection: PropTypes.func.isRequired,
  styling: PropTypes.object
};

export default PackenUiSelectionButtons;