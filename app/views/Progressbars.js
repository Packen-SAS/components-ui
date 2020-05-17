import React, { Component } from "react";
import { View } from "react-native";

import Colors from "../styles/abstracts/colors";
import Typography from "../styles/abstracts/typography";
import Section from "../components/Section";
import PageView from "./PageView";

import PackenUiButton from "../components/PackenUiButton";
import PackenUiText from "../components/PackenUiText";
import PackenUiProgressbar from "../components/PackenUiProgressbar";

class Progressbars extends Component {
  constructor(props) {
    super(props);

    this.state = {
      progress: 0.3,
      isComplete: false
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

  completeIndeterminate = () => {
    this.setState({
      isComplete: true
    });
    return true;
  }

  render() {
    return (
      <PageView>
        <Section title="Progressbars">
          <View style={{ marginTop: 20 }}>
            <PackenUiText
              style={{ marginBottom: 10, fontFamily: Typography.family.bold, color: Colors.basic.independence.drk }}
            >Determinate</PackenUiText>
            <PackenUiProgressbar
              wrapperStyle={{ marginBottom: 10 }}
              type="determinate"
              height={12}
              radius={4}
              progress={this.state.progress}
              trackColor="#E6E6E6"
              indicatorColor="#20D292"
            />
            <PackenUiProgressbar
              type="determinate"
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
          <View style={{ marginTop: 20 }}>
            <PackenUiText
              style={{ marginBottom: 10, fontFamily: Typography.family.bold, color: Colors.basic.independence.drk }}
            >Indeterminate</PackenUiText>
            <PackenUiProgressbar
              wrapperStyle={{ marginBottom: 10 }}
              type="indeterminate"
              height={12}
              radius={4}
              isComplete={this.state.isComplete}
              trackColor="#E6E6E6"
              indicatorColor="#20D292"
            />
            <PackenUiProgressbar
              type="indeterminate"
              height={8}
              radius={0}
              isComplete={this.state.isComplete}
              trackColor="#E6E6E6"
              indicatorColor="#00E5FF"
            />
            <View style={{ marginTop: 15 }}>
              <PackenUiButton
                type="regular"
                level="primary"
                size="small"
                callback={this.completeIndeterminate}
              >Complete</PackenUiButton>
            </View>
          </View>
        </Section>
      </PageView>
    );
  }
}

export default Progressbars;