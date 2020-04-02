import React, { Component } from "react";
import { View } from "react-native";

import Section from "../components/Section";
import SectionStyles from "../styles/components/Section";

import PackenButton from "../components/PackenButton";
import PackenServiceStatus from "../components/PackenServiceStatus";

class ServiceStatus extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStepIndex: 0,
      steps: [
        {
          title: "Solicitando Servicio",
          activeIcon: "clock",
          date: "Agosto 13, 2017",
          time: "05:08 pm",
          callback: this.mockCallback
        },
        {
          title: "Servicio Confirmado",
          activeIcon: "search",
          date: "Agosto 13, 2017",
          time: "05:13 pm",
          callback: this.mockCallback
        },
        {
          title: "Servicio Finalizado",
          activeIcon: "check-circle",
          date: "Agosto 13, 2017",
          time: "06:32 pm",
          callback: this.mockCallback
        }
      ]
    }
  }

  mockCallback = () => { return true; }

  back = () => {
    this.setState({
      currentStepIndex: this.state.currentStepIndex > 0 ? this.state.currentStepIndex - 1 : 0
    });
  }

  next = () => {
    this.setState({
      currentStepIndex: this.state.currentStepIndex < this.state.steps.length - 1 ? this.state.currentStepIndex + 1 : this.state.steps.length - 1
    });
  }

  render() {
    return (
      <Section title="Service Status">
        <View style={SectionStyles.section__content}>
          <PackenServiceStatus steps={this.state.steps} currentStepIndex={this.state.currentStepIndex}/>
          <View style={{marginTop: 20, flexDirection: "row"}}>
            <View style={{marginRight: 5}}>
              <PackenButton
                type="regular"
                level="primary"
                size="tiny"
                icon={{name: "arrow-left", position: "left"}}
                callback={this.back}>Previous</PackenButton>
            </View>
            <View style={{marginRight: 5}}>
              <PackenButton
                type="regular"
                level="primary"
                size="tiny"
                icon={{name: "arrow-right", position: "right"}}
                callback={this.next}>Next</PackenButton>
            </View>
          </View>
        </View>
      </Section>
    );
  }
}

export default ServiceStatus;