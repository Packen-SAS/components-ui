import React, { Component } from "react";
import { View } from "react-native";

import Section from "../components/Section";
import SectionStyles from "../styles/components/Section";

import PackenUiButton from "../components/PackenUiButton";
import PackenUiServiceStatus from "../components/PackenUiServiceStatus";

class ServiceStatus extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentStepIndex: 2,
      steps: [
        {
          title: "Vehículo asignado",
          isComplete: true,
          isCurrent: false,
          time: "05:21 pm",
          callback: this.mockCallback
        },
        {
          title: "En camino a origen",
          subtitle: "Calle 71 # 13-81",
          isComplete: true,
          isCurrent: false,
          time: "05:21 pm",
          callback: this.mockCallback
        },
        {
          title: "En origen",
          subtitle: "Calle 71 # 13-81",
          isComplete: false,
          isCurrent: true,
          time: "05:21 pm",
          callback: this.mockCallback
        },
        {
          title: "Cargue completo",
          isComplete: false,
          isCurrent: false,
          callback: this.mockCallback
        },
        {
          title: "En camino a destino A",
          isComplete: false,
          isCurrent: false,
          callback: this.mockCallback
        },
        {
          title: "En destino A",
          isComplete: false,
          isCurrent: false,
          callback: this.mockCallback
        },
        {
          title: "Descargue completo",
          isComplete: false,
          isCurrent: false,
          callback: this.mockCallback
        },
        {
          title: "Finalizado",
          isComplete: false,
          isCurrent: false,
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
        <View style={{ marginTop: 20 }}>
          <PackenUiServiceStatus steps={this.state.steps} currentStepIndex={this.state.currentStepIndex}/>
          <View style={{marginTop: 20, flexDirection: "row"}}>
            <View style={{marginRight: 5}}>
              <PackenUiButton
                type="regular"
                level="primary"
                size="tiny"
                icon={{name: "arrow-left", position: "left"}}
                callback={this.back}>Previous</PackenUiButton>
            </View>
            <View style={{marginRight: 5}}>
              <PackenUiButton
                type="regular"
                level="primary"
                size="tiny"
                icon={{name: "arrow-right", position: "right"}}
                callback={this.next}>Next</PackenUiButton>
            </View>
          </View>
        </View>
      </Section>
    );
  }
}

export default ServiceStatus;