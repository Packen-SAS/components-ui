import React from "react";
import { storiesOf } from "@storybook/react-native";

import Wrapper from "../wrapper";
import PackenUiNotificationBanner from "../../app/components/PackenUiNotificationBanner";

storiesOf("PackenUiNotificationBanner", module)
  .add("Success, default, Packen", () => (
    <Wrapper
      title="PackenUiNotificationBanner"
      description="Notification banner con theme success de tipo default y flechas de Packen."
      code={
`<PackenUiNotificationBanner
  theme="success"
  type="default"
  icon="packen"
  title="Success Packen notification"
/>`
      }
    >
      <PackenUiNotificationBanner
        theme="success"
        type="default"
        icon="packen"
        title="Success Packen notification"
      />
    </Wrapper>
  ))
  .add("Info, accent, icon", () => (
    <Wrapper
      title="PackenUiNotificationBanner"
      description="Notification banner con theme info de tipo accent e ícono."
      code={
`<PackenUiNotificationBanner
  theme="info"
  type="accent"
  icon="info"
  title="Info accent notification"
/>`
      }
    >
      <PackenUiNotificationBanner
        theme="info"
        type="accent"
        icon="info"
        title="Info accent notification"
      />
    </Wrapper>
  ));