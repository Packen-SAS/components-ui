import React, { Component } from "react";
import { View } from "react-native";

import Section from "../components/Section";
import SectionStyles from "../styles/components/Section";

import PackenUiAvatar from "../components/PackenUiAvatar";

class Avatars extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Section title="Avatars">
        <View style={SectionStyles.section__content}>
          <PackenUiAvatar size="tiny" src={require("../../assets/images/avatar.jpg")}/>
        </View>
        <View style={SectionStyles.section__content}>
          <PackenUiAvatar size="small" src={require("../../assets/images/avatar.jpg")}/>
        </View>
        <View style={SectionStyles.section__content}>
          <PackenUiAvatar size="medium" src={require("../../assets/images/avatar.jpg")}/>
        </View>
        <View style={SectionStyles.section__content}>
          <PackenUiAvatar size="large" src={require("../../assets/images/avatar.jpg")}/>
        </View>
        <View style={SectionStyles.section__content}>
          <PackenUiAvatar size="giant" src={require("../../assets/images/avatar.jpg")}/>
        </View>
      </Section>
    );
  }
}

export default Avatars;