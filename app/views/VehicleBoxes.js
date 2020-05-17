import React, { Component } from "react";
import { View } from "react-native";

import Section from "../components/Section";
import PageView from "./PageView";

import PackenUiVehicleBox from "../components/PackenUiVehicleBox";

class VehicleBoxes extends Component {
  constructor(props) {
    super(props);
  }

  mockCallback = () => true;

  render() {
    return (
      <PageView>
        <Section title="Vehicle Boxes">
          <View style={{ marginTop: 20 }}>
            <PackenUiVehicleBox
              type="carry"
              overview="Camión con refrigeración"
              year="2017"
              plate="USC-914"
              state="approved"
              callback={this.mockCallback}
            />
          </View>
        </Section>
      </PageView>
    );
  }
}

export default VehicleBoxes;