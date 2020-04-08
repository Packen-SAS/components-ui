import React, { Component } from "react";
import { View } from "react-native";

import Spacing from "../styles/abstracts/spacing";
import Colors from "../styles/abstracts/colors";
import Typography from "../styles/abstracts/typography";

import PackenUiText from "./PackenUiText";

class Section extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={this.getStyles().section}>
        <PackenUiText style={this.getStyles().section__title}>{this.props.title}</PackenUiText>
        {this.props.children}
      </View>
    );
  }

  getStyles = () => {
    return {
      section: {
        padding: Spacing.padding.all.base,
        paddingHorizontal: 0
      },
      section__title: {
        color: Colors.base.default_alt,
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