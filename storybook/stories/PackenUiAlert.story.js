import React from "react";
import { storiesOf } from "@storybook/react-native";

import Wrapper from "../wrapper";
import PackenUiText from "../../app/components/PackenUiText";

storiesOf("PackenUiAlert", module)
  .add("Default timed", () => (
    <Wrapper
      full
      title="PackenUiAlert"
      description="Alert with theme set to default and type of timed."
      code={
`<PackenUiAlert
  type="timed"
  countdown={5000}
  theme="default"
  visible={false}
  position="top"
  text={{
    main: "Alerta gris para información default",
    preset: "c2"
  }}
  onClose={() => true}
/>`
      }
    >
      <PackenUiText preset="c2" style={{ textAlign: "center" }}>This component cannot be rendered in this context</PackenUiText>
    </Wrapper>
  ))
  .add("Info static", () => (
    <Wrapper
      title="PackenUiAlert"
      description="Alert with theme set to info and type of static."
      code={
`<PackenUiAlert
  type="static"
  theme="info"
  visible={false}
  position="bottom"
  text={{
    title: "Info",
    main: "Alerta morada para información de interés",
    preset: "c2"
  }}
  onClose={() => true}
/>`
      }
    >
      <PackenUiText preset="c2" style={{ textAlign: "center" }}>This component cannot be rendered in this context</PackenUiText>
    </Wrapper>
  ));