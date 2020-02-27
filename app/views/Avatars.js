import React from "react";
import { View } from "react-native";

import Section from "../components/Section";
import SectionStyles from "../styles/components/Section";

import PackenAvatar from "../components/PackenAvatar";

const Avatars = () => {
  return (
    <Section title="Avatars">
      <View style={SectionStyles.section__content}>
        <PackenAvatar size="tiny" src="avatar.jpg"/>
      </View>
      <View style={SectionStyles.section__content}>
        <PackenAvatar size="small" src="avatar.jpg"/>
      </View>
      <View style={SectionStyles.section__content}>
        <PackenAvatar size="medium" src="avatar.jpg"/>
      </View>
      <View style={SectionStyles.section__content}>
        <PackenAvatar size="large" src="avatar.jpg"/>
      </View>
      <View style={SectionStyles.section__content}>
        <PackenAvatar size="giant" src="avatar.jpg"/>
      </View>
    </Section>
  );
}

export default Avatars;