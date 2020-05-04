import React, { Component } from "react";
import { View } from "react-native";

import Section from "../components/Section";
import PageView from "./PageView";

import colors from "../styles/abstracts/colors";
import PackenUiBadge from "../components/PackenUiBadge";

class Badges extends Component {
  constructor(props) {
    super(props);
  }

  onCloseHandler = () => true;

  render() {
    return (
      <PageView>
        <Section title="Badges">
          <View style={{ marginTop: 20 }}>
            <PackenUiBadge width={8} height={8} backgroundColor={colors.danger.default} />
          </View>
          <View style={{ marginTop: 10 }}>
            <PackenUiBadge label="1" width={18} height={18} backgroundColor={colors.success.default} />
          </View>
          <View style={{ marginTop: 10 }}>
            <PackenUiBadge label="3" width={20} height={20} />
          </View>
          <View style={{ marginTop: 10 }}>
            <PackenUiBadge label="10" width={25} height={25} backgroundColor={colors.warning.default} color={colors.warning.drk} />
          </View>
        </Section>
      </PageView>
    );
  }
}

export default Badges;