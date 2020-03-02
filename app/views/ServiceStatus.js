import React, { useState, useEffect } from "react";
import { View } from "react-native";

import Section from "../components/Section";
import SectionStyles from "../styles/components/Section";

import PackenButton from "../components/PackenButton";
import PackenServiceStatus from "../components/PackenServiceStatus";

const ServiceStatus = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const mock_callback = () => { return; }

  const steps = [
    {
      title: "Solicitando Servicio",
      activeIcon: "clock",
      date: "Agosto 13, 2017",
      time: "05:08 pm",
      callback: mock_callback
    },
    {
      title: "Servicio Confirmado",
      activeIcon: "search",
      date: "Agosto 13, 2017",
      time: "05:13 pm",
      callback: mock_callback
    },
    {
      title: "Servicio Finalizado",
      activeIcon: "check-circle",
      date: "Agosto 13, 2017",
      time: "06:32 pm",
      callback: mock_callback
    }
  ];

  const back = () => {
    setCurrentStepIndex(currentStepIndex > 0 ? currentStepIndex - 1 : 0);
  }

  const next = () => {
    setCurrentStepIndex(currentStepIndex < steps.length - 1 ? currentStepIndex + 1 : steps.length - 1);
  }
  
  return (
    <Section title="Service Status">
      <View style={SectionStyles.section__content}>
        <PackenServiceStatus steps={steps} currentStepIndex={currentStepIndex}/>
        <View style={{marginTop: 20, flexDirection: "row"}}>
          <View style={{marginRight: 5}}>
            <PackenButton
              type="regular"
              level="primary"
              size="tiny"
              icon={{name: "arrow-left", position: "left"}}
              callback={back}>Previous</PackenButton>
          </View>
          <View style={{marginRight: 5}}>
            <PackenButton
              type="regular"
              level="primary"
              size="tiny"
              icon={{name: "arrow-right", position: "right"}}
              callback={next}>Next</PackenButton>
          </View>
        </View>
      </View>
    </Section>
  );
}

export default ServiceStatus;