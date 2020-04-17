import React, { Component } from "react";
import { View } from "react-native";

import Section from "../components/Section";

import PackenUiVehicleBox from "../components/PackenUiVehicleBox";

class VehicleBoxes extends Component {
  constructor(props) {
    super(props);
  }

  mockCallback = () => true;

  render() {
    return (
      <Section title="Vehicle Boxes">
        <View style={{ marginTop: 20 }}>
          <PackenUiVehicleBox
            type="Carry"
            make="Chevrolet"
            year="2017"
            plate="USC-914"
            img={{
              src: require("../../assets/images/carry.png"),
              width: 130,
              height: 61
            }}
            callback={this.mockCallback}
          />
        </View>
      </Section>
    );
  }
}

export default VehicleBoxes;