import React, { Component } from "react";
import { View } from "react-native";

import Section from "../components/Section";
import SectionStyles from "../styles/components/Section";
import Typography from "../styles/abstracts/typography";
import Colors from "../styles/abstracts/colors";

import PackenRadar from "../components/PackenRadar";
import PackenText from "../components/PackenText";
import PackenButton from "../components/PackenButton";

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
          <PackenText style={{ marginBottom: 10, fontFamily: Typography.family.bold, color: Colors.base.default_alt }}>Animated by default</PackenText>
          <PackenRadar theme="search" animated={true} isAnimating={true} />
        </View>
        <View style={SectionStyles.section__content}>
          <PackenText style={{ marginBottom: 10, fontFamily: Typography.family.bold, color: Colors.base.default_alt }}>Static, animatable</PackenText>
          <PackenRadar theme="wait" animated={true} isAnimating={this.state.isWaitAnimating} />
          <View style={{ marginTop: 10 }}></View>
          <PackenButton
            type="regular"
            level="primary"
            size="small"
            callback={this.toggleAnimation}>Toggle animation</PackenButton>
        </View>
        <View style={SectionStyles.section__content}>
          <PackenText style={{ marginBottom: 10, fontFamily: Typography.family.bold, color: Colors.base.default_alt }}>Static, non-animatable</PackenText>
          <PackenRadar theme="alert" animated={false} />
        </View>
      </Section>
    );
  }
}

export default Radars;