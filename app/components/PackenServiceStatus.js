import React, { useState, useEffect } from "react";
import { View } from "react-native";

import ServiceStatusStyles from "../styles/components/PackenServiceStatus";
import PackenText from "../components/PackenText";
import PackenServiceStatusIcon from "./PackenServiceStatusIcon";

const PackenServiceStatus = props => {
  const { steps, currentStepIndex } = props;
  const [finalSteps, setFinalSteps] = useState(steps);
  const [currentStep, setCurrentStep] = useState({...finalSteps[currentStepIndex]});

  const update_current_step = () => {
    for (let i = 0; i < currentStepIndex; i++) {
      finalSteps[i].isComplete = true;
    }
    for (let i = currentStepIndex; i < finalSteps.length; i++) {
      finalSteps[i].isComplete = false;
    }
    
    setCurrentStep({...steps[currentStepIndex]});
  }

  useEffect(() => {
    const updatedSteps = [...finalSteps];
    updatedSteps.forEach(step => {
      step = {
        ...step,
        isComplete: false
      }
    });
    setFinalSteps(updatedSteps);
  }, []);

  useEffect(() => {
    update_current_step();
  }, [currentStepIndex]);

  return (
    <View>
      <View style={ServiceStatusStyles.timeline}>
        {
          finalSteps.map((step, i) => (
            <PackenServiceStatusIcon
              key={i}
              stepsLength={finalSteps.length}
              activeIcon={step.activeIcon}
              activeIndex={currentStepIndex}
              selfIndex={i}
              isComplete={step.isComplete}/>
          ))
        }
      </View>
      <View style={ServiceStatusStyles.copy}>
        <PackenText style={ServiceStatusStyles.title}>{currentStep.title}</PackenText>
        <PackenText style={ServiceStatusStyles.date}>{currentStep.date} - <PackenText style={ServiceStatusStyles.time}>{currentStep.time}</PackenText></PackenText>
      </View>
    </View>
  );
}

export default PackenServiceStatus;