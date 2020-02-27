import React from "react";

import { View } from "react-native";

import SectionStyles from "../styles/components/Section";

import PackenText from "../components/PackenText";

const Section = props => {
  return (
    <View style={SectionStyles.section}>
      <PackenText style={SectionStyles.section__title}>{props.title}</PackenText>
      {props.children}
    </View>
  );
}

export default Section;