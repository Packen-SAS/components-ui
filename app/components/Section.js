import React, { Component } from "react";

import { View } from "react-native";

import SectionStyles from "../styles/components/Section";

import PackenText from "../components/PackenText";

class Section extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={SectionStyles.section}>
        <PackenText style={SectionStyles.section__title}>{this.props.title}</PackenText>
        {this.props.children}
      </View>
    );
  }
}

export default Section;