import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import * as UTIL from "../utils";

import PackenUiListItem from "./PackenUiListItem";

/**
 * Component for rendering a list (NOT a dropdown list)
 */
class PackenUiList extends Component {
  /**
   * Initializes the component
   * @param {object} props Props passed to the component
   */
  constructor(props) {
    super(props);

    /**
     * Variable that stores the state
     * @type {object}
     */
    this.state = { ...this.setPropsToState() }
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
    * @property {object[]} [items=[]] The items for the list
    * @property {object} [customWrapperStyles={}] The optional custom styles specifically for the wrapper element
    * @property {object} [styling={ wrapper: {}, inner: {}, item: {} }] The optional custom styling props
    * @return {object} The props mapped to the state keys
    */
  setPropsToState = () => {
    return {
      items: this.props.items ? [...this.props.items] : [],
      customWrapperStyles: this.props.style ? { ...this.props.style } : {},
      styling: this.props.styling ? { ...this.props.styling } : {
        wrapper: {},
        inner: {},
        item: {}
      }
    };
  }

  /**
   * Returns a {@link PackenUiListItem} component for each element
   * @type {function}
   * @param {object} item The configuration object for this item
   * @param {number} i The index of this item
   * @return {node} JSX for this item
   */
  mapItems = (item, i) => (
    <View style={{ zIndex: this.state.items.length - i, ...this.state.styling.inner }}>
      <PackenUiListItem data={item} key={i} styling={this.state.styling.item} />
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
      <View style={{
        ...this.getStyles().wrapper,
        ...this.state.customWrapperStyles,
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
        flex: 1,
        width: "100%"
      }
    };
  }
}

PackenUiList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  customWrapperStyles: PropTypes.object,
  styling: PropTypes.object
};

export default PackenUiList;