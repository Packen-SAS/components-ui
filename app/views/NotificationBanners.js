import React, { Component } from "react";
import { View } from "react-native";

import Section from "../components/Section";
import PageView from "./PageView";

import PackenUiNotificationBanner from "../components/PackenUiNotificationBanner";

class NotificationBanners extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <PageView>
        <Section title="Notification Banners">
          <View style={{ marginTop: 20 }}>
            <PackenUiNotificationBanner theme="success" type="default" icon="packen" title="Success Packen notification" />
          </View>
          <View style={{ marginTop: 20 }}>
            <PackenUiNotificationBanner theme="success" type="accent" icon="packen" title="Success Packen accent notification" />
          </View>
          <View style={{ marginTop: 20 }}>
            <PackenUiNotificationBanner theme="success" type="default" icon="check" title="Success notification" />
          </View>
          <View style={{ marginTop: 20 }}>
            <PackenUiNotificationBanner theme="success" type="accent" icon="check" title="Success accent notification" />
          </View>
          <View style={{ marginTop: 20 }}>
            <PackenUiNotificationBanner theme="info" type="default" icon="info" title="Info notification" />
          </View>
          <View style={{ marginTop: 20 }}>
            <PackenUiNotificationBanner theme="info" type="accent" icon="info" title="Info accent notification" />
          </View>
          <View style={{ marginTop: 20 }}>
            <PackenUiNotificationBanner theme="primary" type="default" icon="box" title="Primary notification" />
          </View>
          <View style={{ marginTop: 20 }}>
            <PackenUiNotificationBanner theme="primary" type="accent" icon="box" title="Primary accent notification" />
          </View>
          <View style={{ marginTop: 20 }}>
            <PackenUiNotificationBanner theme="warning" type="default" icon="alert-triangle" title="Warning notification" />
          </View>
          <View style={{ marginTop: 20 }}>
            <PackenUiNotificationBanner theme="warning" type="accent" icon="alert-triangle" title="Warning accent notification" />
          </View>
          <View style={{ marginTop: 20 }}>
            <PackenUiNotificationBanner theme="danger" type="default" icon="x-circle" title="Danger notification" />
          </View>
          <View style={{ marginTop: 20 }}>
            <PackenUiNotificationBanner theme="danger" type="accent" icon="x-circle" title="Danger accent notification" />
          </View>
        </Section>
      </PageView>
    );
  }
}

export default NotificationBanners;