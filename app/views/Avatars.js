import React, { Component } from "react";
import { View } from "react-native";

import Section from "../components/Section";
import SectionStyles from "../styles/components/Section";

import PackenAvatar from "../components/PackenAvatar";

class Avatars extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Section title="Avatars">
        <View style={SectionStyles.section__content}>
          <PackenAvatar size="tiny" src={require("../../assets/images/avatar.jpg")}/>
        </View>
        <View style={SectionStyles.section__content}>
          <PackenAvatar size="small" src={require("../../assets/images/avatar.jpg")}/>
        </View>
        <View style={SectionStyles.section__content}>
          <PackenAvatar size="medium" src={require("../../assets/images/avatar.jpg")}/>
        </View>
        <View style={SectionStyles.section__content}>
          <PackenAvatar size="large" src={require("../../assets/images/avatar.jpg")}/>
        </View>
        <View style={SectionStyles.section__content}>
          <PackenAvatar size="giant" src={require("../../assets/images/avatar.jpg")}/>
        </View>
      </Section>
    );
  }
}

export default Avatars;