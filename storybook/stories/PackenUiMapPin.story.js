import React from "react";
import { storiesOf } from "@storybook/react-native";

import Wrapper from "../wrapper";
import PackenUiMapPin from "../../app/components/PackenUiMapPin";

storiesOf("PackenUiMapPin", module)
  .add("Icon", () => (
    <Wrapper
      title="PackenUiMapPin"
      description="Pin tipo icon."
      code={
`<PackenUiMapPin
  type="icon"
  sub={{
    icon: "box"
  }}
  dotPosition="bottom"
/>`
      }
    >
      <PackenUiMapPin
        type="icon"
        sub={{
          icon: "box"
        }}
        dotPosition="bottom"
      />
    </Wrapper>
  ))
  .add("Info", () => (
    <Wrapper
      title="PackenUiMapPin"
      description="Pin tipo info."
      code={
`<PackenUiMapPin
  type="info"
  theme="primary"
  sub={{
    icon: "box",
    position: "left"
  }}
  main={{
    label: "DE",
    text: "Calle 71 # 13 - 81"
  }}
  dotPosition="left"
/>`
      }
    >
      <PackenUiMapPin
        type="info"
        theme="primary"
        sub={{
          icon: "box",
          position: "left"
        }}
        main={{
          label: "DE",
          text: "Calle 71 # 13 - 81"
        }}
        dotPosition="left"
      />
    </Wrapper>
  ))
  .add("Info without sub", () => (
    <Wrapper
      title="PackenUiMapPin"
      description="Pin tipo info sin contenido sub."
      code={
`<PackenUiMapPin
  type="info"
  theme="white"
  main={{
    label: "DE",
    text: "Calle 71 # 13 - 81"
  }}
/>`
      }
    >
      <PackenUiMapPin
        type="info"
        theme="white"
        main={{
          label: "DE",
          text: "Calle 71 # 13 - 81"
        }}
      />
    </Wrapper>
  ));