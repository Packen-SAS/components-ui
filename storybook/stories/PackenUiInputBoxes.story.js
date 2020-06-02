import React from "react";
import { storiesOf } from "@storybook/react-native";

import Wrapper from "../wrapper";
import PackenUiInputBoxes from "../../app/components/PackenUiInputBoxes";

storiesOf("PackenUiInputBoxes", module)
  .add("Default", () => (
    <Wrapper
      full
      title="PackenUiInputBoxes"
      description="Complete example. This component doesn't support any variations."
      code={
`<PackenUiInputBoxes
  boxes={4}
  emitCode={() => false}
/>`
      }
    >
      <PackenUiInputBoxes boxes={4} emitCode={() => false} />
    </Wrapper>
  ));