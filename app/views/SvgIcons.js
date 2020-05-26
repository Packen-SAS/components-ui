import React, { Component } from "react";
import { View } from "react-native";

import Section from "../components/Section";
import PageView from "./PageView";

import PackenUiSvgIcon from "../components/PackenUiSvgIcon";

class Tabs extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <PageView>
        <Section title="SVG Icons">
          <View style={{ marginTop: 20 }}>
            <View style={{ marginBottom: 10 }}><PackenUiSvgIcon name="logo-main" width={150} height={50} /></View>
            <View style={{ marginBottom: 10 }}><PackenUiSvgIcon name="logo-inverted" width={150} height={50} /></View>
            <View style={{ marginBottom: 10 }}><PackenUiSvgIcon name="icon-vehicle" width={150} height={50} /></View>
            <View style={{ marginBottom: 10 }}><PackenUiSvgIcon name="whatsapp" width={20} height={20} /></View>
            <View style={{ marginBottom: 10 }}><PackenUiSvgIcon name="whatsapp_inverted" width={20} height={20} /></View>
            <View style={{ marginBottom: 10 }}><PackenUiSvgIcon name="backhandler" width={20} height={20} /></View>
            <View style={{ marginBottom: 10 }}><PackenUiSvgIcon name="document_back" width={20} height={20} /></View>
            <View style={{ marginBottom: 10 }}><PackenUiSvgIcon name="document_front" width={20} height={20} /></View>
            <View style={{ marginBottom: 10 }}><PackenUiSvgIcon name="document_file" width={20} height={20} /></View>
            <View style={{ marginBottom: 10 }}><PackenUiSvgIcon name="navigation" width={20} height={20} /></View>
            <View style={{ marginBottom: 10 }}><PackenUiSvgIcon name="navigation_blur" width={20} height={20} /></View>
            <View style={{ marginBottom: 10 }}><PackenUiSvgIcon name="shipments" width={20} height={20} /></View>
            <View style={{ marginBottom: 10 }}><PackenUiSvgIcon name="shipments_blur" width={20} height={20} /></View>
            <View style={{ marginBottom: 10 }}><PackenUiSvgIcon name="myshipments" width={20} height={20} /></View>
            <View style={{ marginBottom: 10 }}><PackenUiSvgIcon name="myshipments_blur" width={20} height={20} /></View>
            <View style={{ marginBottom: 10 }}><PackenUiSvgIcon name="support" width={20} height={20} /></View>
            <View style={{ marginBottom: 10 }}><PackenUiSvgIcon name="support_blur" width={20} height={20} /></View>
            <View style={{ marginBottom: 10 }}><PackenUiSvgIcon name="shipments" width={20} height={20} /></View>
            <View style={{ marginBottom: 10 }}><PackenUiSvgIcon name="shipments_blur" width={20} height={20} /></View>
            <View style={{ marginBottom: 10 }}><PackenUiSvgIcon name="profile" width={20} height={20} /></View>
            <View style={{ marginBottom: 10 }}><PackenUiSvgIcon name="profile_blur" width={20} height={20} /></View>
          </View>
        </Section>
      </PageView>
    );
  }
}

export default Tabs;