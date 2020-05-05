import React from "react";
import { storiesOf } from "@storybook/react-native";

import Wrapper from "../wrapper";
import PackenUiProgressbar from "../../app/components/PackenUiProgressbar";

storiesOf("PackenUiProgressbar", module)
  .add("Indeterminate", () => (
    <Wrapper
      title="PackenUiProgressbar"
      description="Progressbar tipo indeterminate."
      code={
`<PackenUiProgressbar
  wrapperStyle={{ marginBottom: 10 }}
  type="indeterminate"
  height={12}
  radius={4}
  isComplete={false}
  trackColor="#E6E6E6"
  indicatorColor="#20D292"
/>`
      }
    >
      <PackenUiProgressbar
        wrapperStyle={{ marginBottom: 10 }}
        type="indeterminate"
        height={12}
        radius={4}
        isComplete={false}
        trackColor="#E6E6E6"
        indicatorColor="#20D292"
      />
    </Wrapper>
  ))
  .add("Determinate", () => (
    <Wrapper
      title="PackenUiProgressbar"
      description="Progressbar tipo determinate."
      code={
`<PackenUiProgressbar
  wrapperStyle={{ marginBottom: 10 }}
  type="determinate"
  height={12}
  radius={4}
  progress={0.5}
  trackColor="#E6E6E6"
  indicatorColor="#20D292"
/>`
      }
    >
      <PackenUiProgressbar
        wrapperStyle={{ marginBottom: 10 }}
        type="determinate"
        height={12}
        radius={4}
        progress={0.5}
        trackColor="#E6E6E6"
        indicatorColor="#20D292"
      />
    </Wrapper>
  ));