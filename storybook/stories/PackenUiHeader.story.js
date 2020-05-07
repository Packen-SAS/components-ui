import React from "react";
import { storiesOf } from "@storybook/react-native";

import Colors from "../../app/styles/abstracts/colors";
import Wrapper from "../wrapper";
import PackenUiHeader from "../../app/components/PackenUiHeader";

storiesOf("PackenUiHeader", module)
  .add("Default", () => (
    <Wrapper
      title="PackenUiHeader"
      description="Header con uso default."
      code={
`<PackenUiHeader
  onBackPress={() => true}
>Título de la vista</PackenUiHeader>`
      }
    >
      <PackenUiHeader
        onBackPress={() => true}
      >Título de la vista</PackenUiHeader>
    </Wrapper>
  ))
  .add("Custom style", () => (
    <Wrapper
      title="PackenUiHeader"
      description="Header con estilos custom."
      code={
`<PackenUiHeader
  onBackPress={() => true}
  style={{ backgroundColor: Colors.basic.white.drk }}
>Título de la vista</PackenUiHeader>`
      }
    >
      <PackenUiHeader
        onBackPress={() => true}
        style={{ backgroundColor: Colors.basic.white.drk }}
      >Título de la vista</PackenUiHeader>
    </Wrapper>
  ));