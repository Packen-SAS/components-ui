import React, { Component } from "react";

import { View } from "react-native";

import SectionStyles from "../styles/components/Section";

import PackenUiText from "./PackenUiText";

class Section extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={SectionStyles.section}>
        <PackenUiText style={SectionStyles.section__title}>{this.props.title}</PackenUiText>
        {this.props.children}
      </View>
    );
  }
}

export default Section;