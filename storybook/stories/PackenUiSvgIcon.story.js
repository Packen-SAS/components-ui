import React from "react";
import { storiesOf } from "@storybook/react-native";

import Wrapper from "../wrapper";
import PackenUiSvgIcon from "../../app/components/PackenUiSvgIcon";

storiesOf("PackenUiSvgIcon", module)
  .add("Complete", () => (
    <Wrapper
      title="PackenUiSvgIcon"
      description="Complete example. Name prop must match one of the predefined options or add a new one."
      code={
`<PackenUiSvgIcon
  name="logo-main"
  width={150}
  height={50}
/>`
      }
    >
      <PackenUiSvgIcon
        name="logo-main"
        width={150}
        height={50}
      />
    </Wrapper>
  ));