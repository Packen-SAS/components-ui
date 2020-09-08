import React, { Component, ReactNode } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import * as UTIL from "../utils";

import PackenUiServiceStatusItem from "./PackenUiServiceStatusItem";

interface StylingPropShape {
  wrapper: object;
  item: {
    box: object;
    sub: object;
    time: object;
    spacer: object;
    line: object;
    dot: object;
    dotIconSize: number | undefined;
    dotIconColor: string | undefined;
    main: object;
    title: object;
    subtitle: object;
  };
}

interface StepShape {
  time?: string;
  title: string;
  label?: string;
  subtitle?: string;
  isCurrent?: boolean;
  isComplete?: boolean;
  callback?: VoidFunction;
}

interface PackenUiServiceStatusProps {
  steps: StepShape[];
  currentStepIndex?: number;
  altStyle?: boolean,
  styling?: StylingPropShape;
  instance?: Function;
}

interface PackenUiServiceStatusState {
  steps: StepShape[];
  currentStepIndex: number;
  altStyle: boolean,
  styling: StylingPropShape;
  itemsHeights: number[];
}

type MapItemsType = (step: StepShape, i: number) => ReactNode;

/**
 * Component for rendering a vertical timeline for shipments to display their status
 */
class PackenUiServiceStatus extends Component<PackenUiServiceStatusProps, PackenUiServiceStatusState> {
  /**
   * Initializes the component
   * @type {function}
   * @param {object} props Props passed to the component
   */
  constructor(props: PackenUiServiceStatusProps) {
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
  setPropsToState: Function = (): object => {
    return {
      altStyle: this.props.altStyle || false,
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
  updateCurrentStep: VoidFunction = () => {
    if (this.state.steps && this.state.steps.length > 0) {
      this.state.steps.forEach((step, i) => {
        if (i < this.state.currentStepIndex) {
          step.isComplete = true;
          step.isCurrent = false;
        } else {
          step.isComplete = false;
          step.isCurrent = false;
        }
      });

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
  setItemsHeights: Function = (i: number, height: number) => {
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
  updateState: Function = () => {
    this.setState({
      ...this.setPropsToState()
    }, this.updateCurrentStep);
  }

  /**
   * Compares props to determine if the component should update its state with new props
   * @type {function}
   * @param {object} prevProps Previous props
   */
  componentDidUpdate(prevProps: PackenUiServiceStatusProps) {
    if (!UTIL.objectsEqual(prevProps, this.props)) {
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
  mapItems: MapItemsType = (step: StepShape, i: number): ReactNode => (
    <PackenUiServiceStatusItem
      key={i}
      index={i}
      data={step}
      altStyle={this.state.altStyle}
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
  render(): ReactNode {
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
  getStyles: Function = (): object => {
    return {
      wrapper: {
        flexDirection: "column"
      }
    };
  }

  /**
   * Defines prop-types for the component
   * @type {object}
   */
  static propTypes: object = {
    steps: PropTypes.arrayOf(PropTypes.object).isRequired,
    currentStepIndex: PropTypes.number.isRequired,
    altStyle: PropTypes.bool,
    styling: PropTypes.object,
    instance: PropTypes.func
  };
}

export default PackenUiServiceStatus;