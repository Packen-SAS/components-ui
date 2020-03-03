import React, { Component } from "react";
import { View } from "react-native";

import ServiceStatusStyles from "../styles/components/PackenServiceStatus";
import PackenText from "../components/PackenText";
import PackenServiceStatusIcon from "./PackenServiceStatusIcon";

class PackenServiceStatus extends Component {
  constructor(props) {
    super(props);

    updatedSteps = [...props.steps];
    updatedSteps.forEach(step => {
      step = {
        ...step,
        isComplete: false
      }
    });

    this.state = {
      finalSteps: updatedSteps,
      currentStep: {...props.steps[props.currentStepIndex]}
    }
  }

  update_current_step = () => {
    for (let i = 0; i < this.props.currentStepIndex; i++) {
      this.state.finalSteps[i].isComplete = true;
    }
    for (let i = this.props.currentStepIndex; i < this.state.finalSteps.length; i++) {
      this.state.finalSteps[i].isComplete = false;
    }
    
    this.setState({
      currentStep: {...this.props.steps[this.props.currentStepIndex]}
    }, this.state.currentStep.callback);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.currentStepIndex !== this.props.currentStepIndex) {
      this.update_current_step();
    }
  }

  render() {
    return (
      <View>
        <View style={ServiceStatusStyles.timeline}>
          {
            this.state.finalSteps.map((step, i) => (
              <PackenServiceStatusIcon
                key={i}
                stepsLength={this.state.finalSteps.length}
                activeIcon={step.activeIcon}
                activeIndex={this.props.currentStepIndex}
                selfIndex={i}
                isComplete={step.isComplete}/>
            ))
          }
        </View>
        <View style={ServiceStatusStyles.copy}>
          <PackenText style={ServiceStatusStyles.title}>{this.state.currentStep.title}</PackenText>
          <PackenText style={ServiceStatusStyles.date}>{this.state.currentStep.date} - <PackenText style={ServiceStatusStyles.time}>{this.state.currentStep.time}</PackenText></PackenText>
        </View>
      </View>
    );
  }
}

export default PackenServiceStatus;