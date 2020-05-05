import React from "react";
import { storiesOf } from "@storybook/react-native";

import Wrapper from "../wrapper";
import PackenUiAlert from "../../app/components/PackenUiAlert";

storiesOf("PackenUiAlert", module)
  .add("Default timed", () => (
    <Wrapper
      title="PackenUiAlert"
      description="Alert with theme set to default and type of timed."
      code={
`<PackenUiAlert
  type="timed"
  countdown={5000}
  theme="default"
  text={{
    main: "Alerta gris para información default",
    preset: "c2"
  }}
  onClose={() => true}
/>`
      }
    >
      <PackenUiAlert
        type="timed"
        countdown={5000}
        theme="default"
        text={{
          main: "Alerta gris para información default",
          preset: "c2"
        }}
        onClose={() => true}
      />
    </Wrapper>
  ))
  .add("Info static", () => (
    <Wrapper
      title="PackenUiAlert"
      description="Alert with theme set to info and type of static."
      code={
`<PackenUiAlert
  type="static"
  theme="info"
  text={{
    title: "Info",
    main: "Alerta morada para información de interés",
    preset: "c2"
  }}
  onClose={() => true}
/>`
      }
    >
      <PackenUiAlert
        type="static"
        theme="info"
        text={{
          title: "Info",
          main: "Alerta morada para información de interés",
          preset: "c2"
        }}
        onClose={() => true}
      />
    </Wrapper>
  ));