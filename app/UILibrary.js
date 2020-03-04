import React, { Component } from "react";
import { StyleSheet, SafeAreaView, ScrollView, View } from "react-native";

import Typography from "./styles/abstracts/typography";
import Spacing from "./styles/abstracts/spacing";
import Colors from "./styles/abstracts/colors";

import PackenText from "./components/PackenText";
import Buttons from "./views/Buttons";
import Avatars from "./views/Avatars";
import Dividers from "./views/Dividers";
import Tabs from "./views/Tabs";
import ServiceStatus from "./views/ServiceStatus";
import Radios from "./views/Radios";
import Toggles from "./views/Toggles";
import Checkbox from "./views/Checkbox";
import TextArea from "./views/TextArea";
import Modals from "./views/Modals";

class UILibrary extends Component {
  render() {
    return (
      <SafeAreaView>
        <ScrollView>
          <View style={styles.container}>
            <PackenText style={styles.container__title}>UI Components Library</PackenText>
            <Modals/>
            <Toggles/>
            <TextArea/>            
            <Checkbox />
            <Radios/>
            <ServiceStatus/>
            <Tabs/>
            <Dividers/>
            <Avatars/>
            <Buttons/>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.padding.all.base
  },
  container__title: {
    color: Colors.base.default_alt,
    fontSize: Typography.size.huge * 1.125,
    fontFamily: Typography.family.bold,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: Colors.base.default_lgt
  }
});

export default UILibrary;