import React from "react";
import { storiesOf } from "@storybook/react-native";

import Colors from "../../app/styles/abstracts/colors";
import Wrapper from "../wrapper";
import PackenUiText from "../../app/components/PackenUiText";

storiesOf("PackenUiIconText", module)
  .add("Callback, custom styles", () => (
    <Wrapper
      title="PackenUiIconText"
      description="Texto con touchable, ícono y estilos custom."
      code={
`<PackenUiText
  preset="p2"
  touchable={{
    style: {
      label: {
        color: Colors.brand.secondary.dft,
        textDecorationLine: "underline"
      },
      wrapper: {
        width: "100%",
        justifyContent: "flex-start"
      }
    },
    callback: () => true
  }}
  icon={{
    name: "plus-circle",
    position: "left",
    color: Colors.brand.secondary.dft,
    size: 14
  }}
>This triggers an internal callback</PackenUiText>`
      }
    >
      <PackenUiText
        preset="p2"
        touchable={{
          style: {
            label: {
              color: Colors.brand.secondary.dft,
              textDecorationLine: "underline"
            },
            wrapper: {
              width: "100%",
              justifyContent: "flex-start"
            }
          },
          callback: () => true
        }}
        icon={{
          name: "plus-circle",
          position: "left",
          color: Colors.brand.secondary.dft,
          size: 14
        }}
      >This triggers an internal callback</PackenUiText>
    </Wrapper>
  ))
  .add("No callback", () => (
    <Wrapper
      title="PackenUiIconText"
      description="Texto con ícono."
      code={
`<PackenUiText
  preset="p2"
  icon={{
    name: "check",
    position: "right",
    color: Colors.basic.independence.drk,
    size: 14
  }}
>This is just a text with an icon</PackenUiText>`
      }
    >
      <PackenUiText
        preset="p2"
        icon={{
          name: "check",
          position: "right",
          color: Colors.basic.independence.drk,
          size: 14
        }}
      >This is just a text with an icon</PackenUiText>
    </Wrapper>
  ));