import React, { Component } from "react";
import { View } from "react-native";

import Section from "../components/Section";
import SectionStyles from "../styles/components/Section";
import Typography from "../styles/abstracts/typography";
import Colors from "../styles/abstracts/colors";

import PackenUiRadar from "../components/PackenUiRadar";
import PackenUiText from "../components/PackenUiText";
import PackenUiButton from "../components/PackenUiButton";

class Radars extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isWaitAnimating: false
    }
  }

  toggleAnimation = () => {
    this.setState({
      isWaitAnimating: !this.state.isWaitAnimating
    });
  }

  render() {
    return (
      <Section title="Radars">
        <View style={SectionStyles.section__content}>
          <PackenUiText style={{ marginBottom: 10, fontFamily: Typography.family.bold, color: Colors.base.default_alt }}>Animated by default</PackenUiText>
          <PackenUiRadar theme="search" animated={true} isAnimating={true} />
        </View>
        <View style={SectionStyles.section__content}>
          <PackenUiText style={{ marginBottom: 10, fontFamily: Typography.family.bold, color: Colors.base.default_alt }}>Static, animatable</PackenUiText>
          <PackenUiRadar theme="wait" animated={true} isAnimating={this.state.isWaitAnimating} />
          <View style={{ marginTop: 10 }}></View>
          <PackenUiButton
            type="regular"
            level="primary"
            size="small"
            callback={this.toggleAnimation}>Toggle animation</PackenUiButton>
        </View>
        <View style={SectionStyles.section__content}>
          <PackenUiText style={{ marginBottom: 10, fontFamily: Typography.family.bold, color: Colors.base.default_alt }}>Static, non-animatable</PackenUiText>
          <PackenUiRadar theme="alert" animated={false} />
        </View>
      </Section>
    );
  }
}

export default Radars;