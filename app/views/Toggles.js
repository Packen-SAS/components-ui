import React, { Component } from "react";
import { View } from "react-native";

import Section from "../components/Section";


import Spacing from "../styles/abstracts/spacing";

import PackenUiToggle from "../components/PackenUiToggle";

class Toggles extends Component {
  constructor(props) {
    super(props);
  }

  toggleHandler = (name, newState) => {
    /* New state can be used here */
    /* console.log(name, newState); */
    return newState;
  }
  
  render() {
    return (
      <Section title="Toggles">
        <View style={{ marginTop: 20 }}>
          <View style={{marginBottom: Spacing[2]}}>
            <PackenUiToggle name="toggle1" onLabel="ON" offLabel="OFF" isActive={true} toggleHandler={this.toggleHandler}/>
          </View>
          <View style={{marginBottom: Spacing[2]}}>
            <PackenUiToggle name="toggle2" onLabel="SÍ" offLabel="NO" isActive={false} toggleHandler={this.toggleHandler}/>
          </View>
          <View style={{marginBottom: Spacing[2]}}>
            <PackenUiToggle name="toggle3" onLabel="SÍ" offLabel="NO" isActive={true} toggleHandler={this.toggleHandler} isDisabled/>
          </View>
          <View style={{marginBottom: Spacing[2]}}>
            <PackenUiToggle name="toggle4" onLabel="ON" offLabel="OFF" isActive={false} toggleHandler={this.toggleHandler} isDisabled/>
          </View>
        </View>
      </Section>
    );
  }
}

export default Toggles;