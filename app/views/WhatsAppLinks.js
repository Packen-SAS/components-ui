import React, { Component } from "react";
import { View } from "react-native";

import Section from "../components/Section";
import PageView from "./PageView";

import PackenUiWhatsAppLink from "../components/PackenUiWhatsAppLink";

class WhatsAppLinks extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <PageView>
        <Section title="WhatsApp Links">
          <View style={{ marginTop: 20 }}>
            <View style={{ marginBottom: 10 }}>
              <PackenUiWhatsAppLink visible inverted color="#FFFFFF" />
            </View>
            <View style={{ marginBottom: 10 }}>
              <PackenUiWhatsAppLink visible text="Texto de prueba" style={{ justifyContent: "flex-start" }} />
            </View>
          </View>
        </Section>
      </PageView>
    );
  }
}

export default WhatsAppLinks;