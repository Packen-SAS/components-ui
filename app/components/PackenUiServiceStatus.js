import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

import PackenUiServiceStatusItem from "./PackenUiServiceStatusItem";

/**
 * Component for rendering a vertical timeline for shipments to display their status
 */
class PackenUiServiceStatus extends Component {
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
     * @property {number[]} [itemsHeights=[]] Stores the height of each inner {@link PackenUiServiceStatusItem} component
     */
    this.state = {
      ...this.setPropsToState(),
      itemsHeights: []
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
   * @property {object[]} [steps=[]] The array of configuration objects for each step item
   * @property {number} [currentStepIndex=-1] The currently selected step item
   * @property {object} [styling={ wrapper: {}, item: {} }] The optional custom styling props
   * @return {object} The props mapped to the state keys
   */
  setPropsToState = () => {
    return {
      steps: this.props.steps ? [...this.props.steps] : [],
      currentStepIndex: this.props.currentStepIndex === 0 ? 0 : this.props.currentStepIndex ? this.props.currentStepIndex : -1,
      styling: this.props.styling ? { ...this.props.styling } : {
        wrapper: {},
        item: {}
      }
    };
  }

  /**
   * Updates the currently active step item and styles each accordingly
   * @type {function}
   */
  updateCurrentStep = () => {
    if (this.state.steps && this.state.steps.length > 0) {
      for (let i = 0; i < this.state.currentStepIndex; i++) {
        this.state.steps[i].isComplete = true;
        this.state.steps[i].isCurrent = false;
      }
      for (let i = this.state.currentStepIndex; i < this.state.steps.length; i++) {
        this.state.steps[i].isComplete = false;
        this.state.steps[i].isCurrent = false;
      }

      this.setState({
        currentStepIndex: this.state.currentStepIndex
      }, this.state.steps[this.state.currentStepIndex].callback);
    }
  }

  /**
   * Adds an item's height to the state array
   * @type {function}
   * @param {number} i The item's index of the new height
   * @param {number} height The new height to be pushed
   */
  setItemsHeights = (i, height) => {
    const newHeights = [...this.state.itemsHeights];
    newHeights[i] = height;

    this.setState({
      itemsHeights: newHeights
    });
  }

  /**
   * Updates the state with new props, and checks if it's an active item
   * @type {function}
   * @param {object} prevProps Previous props
   */
  updateState = () => {
    this.setState({
      ...this.setPropsToState()
    }, () => {
      this.updateCurrentStep();
    });
  }

  /**
   * Compares props to determine if the component should update its state with new props
   * @type {function}
   * @param {object} prevProps Previous props
   */
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.updateState();
    }
  }

  /**
   * Returns a {@link PackenUiServiceStatusItem} component for each step item
   * @type {function}
   * @param {object} step The step's configuration
   * @param {number} i The step's index
   * @return {node} JSX for the new step
   */
  mapItems = (step, i) => (
    <PackenUiServiceStatusItem
      key={i}
      index={i}
      data={step}
      currentStepIndex={this.state.currentStepIndex}
      itemsHeights={this.state.itemsHeights}
      setItemsHeights={this.setItemsHeights}
      styling={this.state.styling.item}
    />
  )

  /**
   * Renders the component
   * @type {function}
   * @return {node} JSX for the component
   */
  render() {
    return (
      <View style={{ ...this.getStyles().wrapper, ...this.state.styling.wrapper }}>
        {this.state.steps.map(this.mapItems)}
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
        flexDirection: "column"
      }
    };
  }
}

PackenUiServiceStatus.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentStepIndex: PropTypes.number.isRequired,
  styling: PropTypes.object
};

export default PackenUiServiceStatus;