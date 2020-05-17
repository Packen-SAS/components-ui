import React from "react";
import { storiesOf } from "@storybook/react-native";

import Wrapper from "../wrapper";
import PackenUiDivider from "../../app/components/PackenUiDivider";

storiesOf("PackenUiDivider", module)
  .add("Light", () => (
    <Wrapper
      title="PackenUiDivider"
      description="Divider with theme set to light."
      code={
`<PackenUiDivider
  size={1}
  margin={{top: 10, bottom: 10}}
  type="light"
/>`
      }
    >
      <PackenUiDivider
        size={1}
        margin={{top: 10, bottom: 10}}
        type="light"
      />
    </Wrapper>
  ))
  .add("Dark, custom width", () => (
    <Wrapper
      title="PackenUiDivider"
      description="Divider with theme set to dark and custom width."
      code={
`<PackenUiDivider
  size={1}
  width={100}
  margin={{top: 10, bottom: 10}}
  type="dark"
/>`
      }
    >
      <PackenUiDivider
        size={1}
        width={100}
        margin={{top: 10, bottom: 10}}
        type="dark"
      />
    </Wrapper>
  ));