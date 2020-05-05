import React from "react";
import { storiesOf } from "@storybook/react-native";

import Wrapper from "../wrapper";
import PackenUiToggle from "../../app/components/PackenUiToggle";

storiesOf("PackenUiToggle", module)
  .add("Default", () => (
    <Wrapper
      title="PackenUiToggle"
      description="Toggle default."
      code={
`<PackenUiToggle
  name="toggle1"
  onLabel="ON"
  offLabel="OFF"
  isActive={true}
  toggleHandler={() => true}
/>`
      }
    >
      <PackenUiToggle
        name="toggle1"
        onLabel="ON"
        offLabel="OFF"
        isActive={true}
        toggleHandler={() => true}
      />
    </Wrapper>
  ))
  .add("Disabled", () => (
    <Wrapper
      title="PackenUiToggle"
      description="Toggle disabled."
      code={
`<PackenUiToggle
  name="toggle2"
  onLabel="SÍ"
  offLabel="NO"
  isActive={true}
  toggleHandler={() => true}
  isDisabled
/>`
      }
    >
      <PackenUiToggle
        name="toggle2"
        onLabel="SÍ"
        offLabel="NO"
        isActive={true}
        toggleHandler={() => true}
        isDisabled
      />
    </Wrapper>
  ));