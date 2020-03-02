import React from "react";
import { View } from "react-native";

import Section from "../components/Section";
import SectionStyles from "../styles/components/Section";

import PackenText from "../components/PackenText";
import PackenDivider from "../components/PackenDivider";

const Dividers = () => {
  return (
    <Section title="Dividers">
      <View style={SectionStyles.section__content}>
        <PackenText style={{marginBottom: 5}}>Light, 1px</PackenText>
        <PackenDivider size={1} margin={{top: 10, bottom: 10}} type="light"/>
      </View>
      <View style={SectionStyles.section__content}>
        <PackenText style={{marginBottom: 5}}>Dark, 2px</PackenText>
        <PackenDivider size={2} margin={{top: 10, bottom: 10}} type="dark"/>
      </View>
    </Section>
  );
}

export default Dividers;