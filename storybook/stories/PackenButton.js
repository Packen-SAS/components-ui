import React from "react";
import { storiesOf } from "@storybook/react-native";

import Wrapper from "../wrapper";
import PackenButton from "../../app/components/PackenButton";

storiesOf("PackenButton", module)
  .add("Icon primary tiny", () => (
    <Wrapper
      title="PackenButton"
      description="Icon button with size set to tiny."
      code={
`<PackenButton
  icon={{ name: "arrow-right-circle" }}
  type="icon"
  level="primary"
  size="tiny"
  callback={() => { return; }}
/>`
      }
    >
      <PackenButton
        icon={{ name: "arrow-right-circle" }}
        type="icon"
        level="primary"
        size="tiny"
        callback={() => { return; }} />
    </Wrapper>
  ))
  .add("Icon primary small", () => (
    <Wrapper
      title="PackenButton"
      description="Icon button with size set to small."
      code={
`<PackenButton
  icon={{ name: "arrow-right-circle" }}
  type="icon"
  level="primary"
  size="small"
  callback={() => { return; }}
/>`
      }
    >
      <PackenButton
        icon={{ name: "arrow-right-circle" }}
        type="icon"
        level="primary"
        size="small"
        callback={() => { return; }} />
    </Wrapper>
  ))
  .add("Icon primary medium", () => (
    <Wrapper
      title="PackenButton"
      description="Icon button with size set to medium."
      code={
`<PackenButton
  icon={{ name: "arrow-right-circle" }}
  type="icon"
  level="primary"
  size="medium"
  callback={() => { return; }}
/>`
        }
    >
      <PackenButton
        icon={{ name: "arrow-right-circle" }}
        type="icon"
        level="primary"
        size="medium"
        callback={() => { return; }} />
    </Wrapper>
  ))
  .add("Icon primary large", () => (
    <Wrapper
      title="PackenButton"
      description="Icon button with size set to large."
      code={
`<PackenButton
  icon={{ name: "arrow-right-circle" }}
  type="icon"
  level="primary"
  size="large"
  callback={() => { return; }}
/>`
        }
    >
      <PackenButton
        icon={{ name: "arrow-right-circle" }}
        type="icon"
        level="primary"
        size="large"
        callback={() => { return; }} />
    </Wrapper>
  ))
  .add("Icon primary large disabled", () => (
    <Wrapper
      title="PackenButton"
      description="Icon button with size set to giant."
      code={
`<PackenButton
  icon={{ name: "arrow-right-circle" }}
  type="icon"
  level="primary"
  size="giant"
  callback={() => { return; }}
  isDisabled
/>`
      }
    >
      <PackenButton
        icon={{ name: "arrow-right-circle" }}
        type="icon"
        level="primary"
        size="giant"
        callback={() => { return; }}
        isDisabled />
    </Wrapper>
  ));