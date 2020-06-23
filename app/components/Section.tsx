import React, { Component, ReactNode } from "react";
import { View } from "react-native";

import Spacing from "../styles/abstracts/spacing";
import Colors from "../styles/abstracts/colors";
import Typography from "../styles/abstracts/typography";

import PackenUiText from "./PackenUiText";
import PackenUiDivider from "./PackenUiDivider";

interface SectionProps {
  title: string;
  children: ReactNode;
}

/**
 * Wrapper component to apply common styles to the others when showcased. This component is not meant to be used at all, it's just for the example showcasing app
 */
class Section extends Component<SectionProps> {
  /**
   * Initializes the component
   * @type {function}
   * @param {object} props Props passed to the component
   */
  constructor(props: SectionProps) {
    super(props);
  }

  /**
   * Renders the component
   * @type {function}
   * @return {node} JSX for the component
   */
  render(): ReactNode {
    return (
      <View style={this.getStyles().section}>
        <PackenUiText style={this.getStyles().section__title}>{this.props.title}</PackenUiText>
        <PackenUiDivider size={1} type="light" />
        {this.props.children}
      </View>
    );
  }

  /**
   * Returns the current styles object
   * @type {function}
   * @return {object} The current styles object
   */
  getStyles: Function = (): object => {
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