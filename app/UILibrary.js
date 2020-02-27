import React from "react";
import { StyleSheet, SafeAreaView, View } from "react-native";

import Typography from "./styles/abstracts/typography";
import Spacing from "./styles/abstracts/spacing";

import PackenText from "./components/PackenText";
import Colors from "./styles/abstracts/colors";

const UILibrary = () => {

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.section}>
          <PackenText style={styles.section__title}>Buttons Primary</PackenText>
          <View style={styles.section__content}>

          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.padding.all.base
  },
  section: {
    padding: Spacing.padding.all.base,
    paddingLeft: 0,
    borderBottomWidth: 1,
    borderBottomColor: Colors.base.default_alt
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
    marginTop: 15
  }
});

export default UILibrary;