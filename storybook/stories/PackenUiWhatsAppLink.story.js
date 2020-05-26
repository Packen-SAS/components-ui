import React from "react";
import { View } from "react-native";
import { storiesOf } from "@storybook/react-native";

import Wrapper from "../wrapper";
import PackenUiWhatsAppLink from "../../app/components/PackenUiWhatsAppLink";

storiesOf("PackenUiWhatsAppLink", module)
  .add("Default", () => (
    <Wrapper
      title="PackenUiWhatsAppLink"
      description="Default content."
      code={
`<PackenUiWhatsAppLink visible />`
      }
    >
      <PackenUiWhatsAppLink visible />
    </Wrapper>
  ))
  .add("Custom", () => (
    <Wrapper
      full
      title="PackenUiWhatsAppLink"
      description="Customized text and color."
      code={
`<PackenUiWhatsAppLink
  visible
  inverted
  text="Texto de prueba"
  color="#FFFFFF"
  style={{ justifyContent: "flex-start" }}
/>`
      }
    >
      <View style={{ backgroundColor: "lightgray" }}>
        <PackenUiWhatsAppLink
          visible
          inverted
          text="Texto de prueba"
          color="#FFFFFF"
          style={{ justifyContent: "flex-start" }}
        />
      </View>
    </Wrapper>
  ));