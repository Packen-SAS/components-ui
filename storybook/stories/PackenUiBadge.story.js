import React from "react";
import { storiesOf } from "@storybook/react-native";

import colors from "../../app/styles/abstracts/colors";
import Wrapper from "../wrapper";
import PackenUiBadge from "../../app/components/PackenUiBadge";

storiesOf("PackenUiBadge", module)
  .add("No label", () => (
    <Wrapper
      title="PackenUiBadge"
      description="Badge with no label and custom background color."
      code={
`<PackenUiBadge
  width={8}
  height={8}
  backgroundColor={colors.danger.default}
/>
`
      }
    >
      <PackenUiBadge
        width={8}
        height={8}
        backgroundColor={colors.danger.default}
      />
    </Wrapper>
  ))
  .add("Label and custom colors", () => (
    <Wrapper
      title="PackenUiBadge"
      description="Badge with label, custom color and background color."
      code={
`<PackenUiBadge
  label="10"
  width={25}
  height={25}
  backgroundColor={colors.warning.default}
  color={colors.warning.drk}
/>
`
      }
    >
      <PackenUiBadge
        label="10"
        width={25}
        height={25}
        backgroundColor={colors.warning.default}
        color={colors.warning.drk}
      />
    </Wrapper>
  ));