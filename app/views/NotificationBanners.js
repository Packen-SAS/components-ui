import React, { Component } from "react";
import { View } from "react-native";

import Section from "../components/Section";
import SectionStyles from "../styles/components/Section";

import PackenNotificationBanner from "../components/PackenNotificationBanner";

class NotificationBanners extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Section title="Notification Banners">
        <View style={SectionStyles.section__content}>
          <PackenNotificationBanner theme="success" type="default" icon="packen" title="Success Packen notification"/>
        </View>
        <View style={SectionStyles.section__content}>
          <PackenNotificationBanner theme="success" type="accent" icon="packen" title="Success Packen accent notification"/>
        </View>
        <View style={SectionStyles.section__content}>
          <PackenNotificationBanner theme="success" type="default" icon="check" title="Success notification"/>
        </View>
        <View style={SectionStyles.section__content}>
          <PackenNotificationBanner theme="success" type="accent" icon="check" title="Success accent notification"/>
        </View>
        <View style={SectionStyles.section__content}>
          <PackenNotificationBanner theme="info" type="default" icon="info" title="Info notification"/>
        </View>
        <View style={SectionStyles.section__content}>
          <PackenNotificationBanner theme="info" type="accent" icon="info" title="Info accent notification"/>
        </View>
        <View style={SectionStyles.section__content}>
          <PackenNotificationBanner theme="primary" type="default" icon="box" title="Primary notification"/>
        </View>
        <View style={SectionStyles.section__content}>
          <PackenNotificationBanner theme="primary" type="accent" icon="box" title="Primary accent notification"/>
        </View>
        <View style={SectionStyles.section__content}>
          <PackenNotificationBanner theme="warning" type="default" icon="alert-triangle" title="Warning notification"/>
        </View>
        <View style={SectionStyles.section__content}>
          <PackenNotificationBanner theme="warning" type="accent" icon="alert-triangle" title="Warning accent notification"/>
        </View>
        <View style={SectionStyles.section__content}>
          <PackenNotificationBanner theme="danger" type="default" icon="x-circle" title="Danger notification"/>
        </View>
        <View style={SectionStyles.section__content}>
          <PackenNotificationBanner theme="danger" type="accent" icon="x-circle" title="Danger accent notification"/>
        </View>
      </Section>
    );
  }
}

export default NotificationBanners;