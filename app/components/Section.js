import React, { Component } from "react";
import { View } from "react-native";

import Spacing from "../styles/abstracts/spacing";
import Colors from "../styles/abstracts/colors";
import Typography from "../styles/abstracts/typography";

import PackenUiText from "./PackenUiText";
import PackenUiDivider from "./PackenUiDivider";

class Section extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={this.getStyles().section}>
        <PackenUiText style={this.getStyles().section__title}>{this.props.title}</PackenUiText>
        <PackenUiDivider size={1} type="light" />
        {this.props.children}
      </View>
    );
  }

  getStyles = () => {
    return {
      section: {
        paddingVertical: Spacing.padding.horizontal.base
      },
      section__title: {
        color: Colors.basic.independence.drk,
        fontSize: Typography.size.huge,
        fontFamily: Typography.family.bold,
        paddingBottom: 10,
        borderBottomWidth: 2,
        borderBottomColor: Colors.base.default_lgt
      },
      section__content: {
        marginTop: 20
      },
      section__contentItem: {
        marginBottom: 10
      }
    };
  }
}

export default Section;