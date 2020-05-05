import React from "react";
import { storiesOf } from "@storybook/react-native";

import Wrapper from "../wrapper";
import PackenUiInfoAction from "../../app/components/PackenUiInfoAction";

storiesOf("PackenUiInfoAction", module)
  .add("Primary and title", () => (
    <Wrapper
      full
      title="PackenUiInfoAction"
      description="InfoAction con theme primary, título e ícono."
      code={
`<PackenUiInfoAction
  theme="primary"
  title="Sólo un título"
  callback={() => true}
  img={{
    src: require("../../assets/images/i-doc.png"),
    height: 23,
    width: 19
  }}
  icon={{
    name: "play",
    size: 14
  }}
/>`
      }
    >
      <PackenUiInfoAction
        theme="primary"
        title="Sólo un título"
        callback={() => true}
        img={{
          src: require("../../assets/images/i-doc.png"),
          height: 23,
          width: 19
        }}
        icon={{
          name: "play",
          size: 14
        }}
      />
    </Wrapper>
  ))
  .add("Success with title, subtitle and caption", () => (
    <Wrapper
      full
      title="PackenUiInfoAction"
      description="InfoAction con theme success, título, subtítulo, caption e ícono."
      code={
`<PackenUiInfoAction
  theme="success"
  title="Cara 1"
  caption="(Lado de la fotografía)"
  subtitle="Listo"
  callback={() => true}
  img={{
    src: require("../../assets/images/i-cara-1.png"),
    height: 19,
    width: 19
  }}
  icon={{
    name: "play",
    size: 14
  }}
/>`
      }
    >
      <PackenUiInfoAction
        theme="success"
        title="Cara 1"
        caption="(Lado de la fotografía)"
        subtitle="Listo"
        callback={() => true}
        img={{
          src: require("../../assets/images/i-cara-1.png"),
          height: 19,
          width: 19
        }}
        icon={{
          name: "play",
          size: 14
        }}
      />
    </Wrapper>
  ));