import React, { Component } from "react";
import { StyleSheet, SafeAreaView, ScrollView, View } from "react-native";

import Typography from "./styles/abstracts/typography";
import Spacing from "./styles/abstracts/spacing";
import Colors from "./styles/abstracts/colors";

import PackenUiText from "./components/PackenUiText";

import Buttons from "./views/Buttons";
import Avatars from "./views/Avatars";
import Dividers from "./views/Dividers";
import Tabs from "./views/Tabs";
import ServiceStatus from "./views/ServiceStatus";
import Radios from "./views/Radios";
import Toggles from "./views/Toggles";
import Checkboxes from "./views/Checkboxes";
import Modals from "./views/Modals";
import Inputs from "./views/Inputs";
import MapPins from "./views/MapPins";
import Dropdowns from "./views/Dropdowns";
import NotificationBanners from "./views/NotificationBanners";
import Radars from "./views/Radars";
import IconTexts from "./views/IconTexts";
import InfoActions from "./views/InfoActions";
import SelectionButtons from "./views/SelectionButtons";
import Progressbars from "./views/Progressbars";
import LoaderButtons from "./views/LoaderButtons";

class UILibrary extends Component {
  render() {
    return (
      <SafeAreaView>
        <ScrollView>
          <View style={styles.container}>
            <PackenUiText style={styles.container__title}>UI Components Library</PackenUiText>
            <LoaderButtons/>
            <Progressbars/>
            <SelectionButtons/>
            <InfoActions/>
            <IconTexts/>
            <Radars/>
            <NotificationBanners/>
            <ServiceStatus/>
            <MapPins/>
            <Dropdowns/>
            <Modals/>
            <Inputs/>
            <Toggles/>
            <Checkboxes/>
            <Radios/>
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