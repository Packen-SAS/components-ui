import React, { Component } from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

import PackenUiServiceStatusItem from "./PackenUiServiceStatusItem";

class PackenUiServiceStatus extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.setPropsToState(),
      itemsHeights: []
    }
  }

  componentDidMount() {
    if (typeof this.props.instance === "function") {
      this.props.instance(this);
    }
  }

  setPropsToState = () => {
    return {
      steps: this.props.steps ? [...this.props.steps] : [],
      currentStepIndex: this.props.currentStepIndex === 0 ? 0 : this.props.currentStepIndex ? this.props.currentStepIndex : -1
    };
  }

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

  setItemsHeights = (i, height) => {
    const newHeights = [...this.state.itemsHeights];
    newHeights[i] = height;

    this.setState({
      itemsHeights: newHeights
    });
  }

  updateState = () => {
    this.setState({
      ...this.setPropsToState()
    }, () => {
      this.updateCurrentStep();
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.updateState();
    }
  }

  render() {
    return (
      <View style={this.getStyles().wrapper}>
        {
          this.state.steps.map((step, i) => (
            <PackenUiServiceStatusItem
              key={i}
              index={i}
              data={step}
              currentStepIndex={this.state.currentStepIndex}
              itemsHeights={this.state.itemsHeights}
              setItemsHeights={this.setItemsHeights}
            />
          ))
        }
      </View>
    );
  }

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
  currentStepIndex: PropTypes.number.isRequired
};

export default PackenUiServiceStatus;