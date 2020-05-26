import React from "react";
import { storiesOf } from "@storybook/react-native";

import Wrapper from "../wrapper";
import PackenUiText from "../../app/components/PackenUiText";

storiesOf("PackenUiCamera", module)
  .add("Default", () => (
    <Wrapper
      full
      title="PackenUiCamera"
      description="Default camera with no special overlays."
      code={
`<PackenUiCamera
  dismiss={() => false}
  VISIBLE={false}
/>`
      }
    >
      <PackenUiText style={{ textAlign: "center" }} preset="c2">Este componente no puede ser renderizado en este contexto</PackenUiText>
    </Wrapper>
  ))
  .add("Document", () => (
    <Wrapper
      full
      title="PackenUiCamera"
      description="Camera with document framing guides overlay."
      code={
`<PackenUiCamera
  dismiss={() => false}
  VISIBLE={false}
  MODE="document"
/>`
      }
    >
      <PackenUiText style={{ textAlign: "center" }} preset="c2">Este componente no puede ser renderizado en este contexto</PackenUiText>
    </Wrapper>
  ))
  .add("Avatar", () => (
    <Wrapper
      full
      title="PackenUiCamera"
      description="Camera with face framing overlay."
      code={
`<PackenUiCamera
  dismiss={() => false}
  VISIBLE={false}
  MODE="avatar"
/>`
      }
    >
      <PackenUiText style={{ textAlign: "center" }} preset="c2">Este componente no puede ser renderizado en este contexto</PackenUiText>
    </Wrapper>
  ));