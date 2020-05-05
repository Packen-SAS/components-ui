import React from "react";
import { storiesOf } from "@storybook/react-native";

import Wrapper from "../wrapper";
import PackenUiRadar from "../../app/components/PackenUiRadar";

storiesOf("PackenUiRadar", module)
  .add("Animated, search", () => (
    <Wrapper
      title="PackenUiRadar"
      description="Radar con theme search, animado por default."
      code={
`<PackenUiRadar
  theme="search"
  animated={true}
  isAnimating={true}
/>`
      }
    >
      <PackenUiRadar
        theme="search"
        animated={true}
        isAnimating={true}
      />
    </Wrapper>
  ))
  .add("Static, alert", () => (
    <Wrapper
      title="PackenUiRadar"
      description="Radar con theme alert, no animado."
      code={
`<PackenUiRadar
  theme="alert"
  animated={false}
/>`
      }
    >
      <PackenUiRadar
        theme="alert"
        animated={false}
      />
    </Wrapper>
  ));