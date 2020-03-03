import React, { Component } from "react";
import { View } from "react-native";

import Section from "../components/Section";
import SectionStyles from "../styles/components/Section";

import Spacing from "../styles/abstracts/spacing";

import PackenToggle from "../components/PackenToggle";

class Toggles extends Component {
  constructor(props) {
    super(props);
  }

  toggle_handler = newState => {
    /* New state can be used here */
    /* console.log(newState); */
  }
  
  render() {
    return (
      <Section title="Toggles">
        <View style={SectionStyles.section__content}>
          <View style={{marginBottom: Spacing[2]}}>
            <PackenToggle onLabel="ON" offLabel="OFF" isActive={true} toggleHandler={this.toggle_handler}/>
          </View>
          <View style={{marginBottom: Spacing[2]}}>
            <PackenToggle onLabel="SÍ" offLabel="NO" isActive={false} toggleHandler={this.toggle_handler}/>
          </View>
          <View style={{marginBottom: Spacing[2]}}>
            <PackenToggle onLabel="SÍ" offLabel="NO" isActive={true} toggleHandler={this.toggle_handler} isDisabled/>
          </View>
          <View style={{marginBottom: Spacing[2]}}>
            <PackenToggle onLabel="ON" offLabel="OFF" isActive={false} toggleHandler={this.toggle_handler} isDisabled/>
          </View>
        </View>
      </Section>
    );
  }
}

export default Toggles;