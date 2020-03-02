import React from "react";
import { View } from "react-native";

import Section from "../components/Section";
import SectionStyles from "../styles/components/Section";

import Colors from "../styles/abstracts/colors";
import Typography from "../styles/abstracts/typography";

import PackenText from "../components/PackenText";
import PackenDivider from "../components/PackenDivider";
import PackenRadio from "../components/PackenRadio";

const Radios = () => {
  return (
    <Section title="Radios">
      <View style={SectionStyles.section__content}>
        <PackenText style={{marginBottom: 10, fontFamily: Typography.family.bold, color: Colors.base.default_alt}}>Column layout</PackenText>
        <PackenRadio layout="column" items={[
          {
            label: "Place your text",
            isDisabled: false
          },
          {
            label: "Different text",
            isDisabled: false
          },
          {
            label: "This text is both checked and disabled",
            isDisabled: true
          }
        ]} initialIndex={2}/>
        <PackenDivider size={1} type="light" margin={{top: 15, bottom: 15}}/>
        <PackenText style={{marginBottom: 5, fontFamily: Typography.family.bold, color: Colors.base.default_alt}}>Row layout</PackenText>
        <PackenRadio layout="row" items={[
          {
            label: "Placeholder",
            isDisabled: false
          },
          {
            label: "This is checked",
            isDisabled: false
          },
          {
            label: "Some other text",
            isDisabled: false
          }
        ]} initialIndex={1}/>
      </View>
    </Section>
  );
}

export default Radios;