import React, { Component } from "react";
import { View } from "react-native";

import Section from "../components/Section";
import SectionStyles from "../styles/components/Section";

import PackenRadar from "../components/PackenRadar";

class Radars extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Section title="Radars">
        <View style={SectionStyles.section__content}>
          <PackenRadar theme="search" />
        </View>
        <View style={SectionStyles.section__content}>
          <PackenRadar theme="wait" />
        </View>
        <View style={SectionStyles.section__content}>
          <PackenRadar theme="alert" />
        </View>
      </Section>
    );
  }
}

export default Radars;