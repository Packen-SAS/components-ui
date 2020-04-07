import React, { Component } from "react";
import { View } from "react-native";

import Colors from "../styles/abstracts/colors";
import Typography from "../styles/abstracts/typography";
import Section from "../components/Section";
import SectionStyles from "../styles/components/Section";

import PackenUiButton from "../components/PackenUiButton";
import PackenUiText from "../components/PackenUiText";
import PackenUiProgressbar from "../components/PackenUiProgressbar";

class Progressbars extends Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0.3
    }
  }

  changeProgress = () => {
    this.setState({
      progress: Math.random()
    });
    return true;
  }

  completeProgress = () => {
    this.setState({
      progress: 1
    });
    return true;
  }

  render() {
    return (
      <Section title="Progressbars">
        <View style={SectionStyles.section__content}>
        <PackenUiText
          style={{ marginBottom: 10, fontFamily: Typography.family.bold, color: Colors.base.default_alt }}
        >Determinate</PackenUiText>
          <PackenUiProgressbar
            determinate={true}
            height={8}
            radius={0}
            progress={this.state.progress}
            trackColor="#E6E6E6"
            indicatorColor="#00E5FF"
          />
          <View style={{ marginTop: 15 }}>
            <PackenUiButton
              type="regular"
              level="primary"
              size="small"
              callback={this.changeProgress}
            >Random</PackenUiButton>
          </View>
          <View style={{ marginTop: 5 }}>
            <PackenUiButton
              type="regular"
              level="primary"
              size="small"
              callback={this.completeProgress}
            >Complete to 100%</PackenUiButton>
          </View>
        </View>
      </Section>
    );
  }
}

export default Progressbars;