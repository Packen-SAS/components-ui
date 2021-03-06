import React from "react";
import { storiesOf } from "@storybook/react-native";

import Wrapper from "../wrapper";
import PackenUiButton from "../../app/components/PackenUiButton";

storiesOf("PackenUiButton", module)
  .add("Icon primary tiny", () => (
    <Wrapper
      title="PackenUiButton"
      description="Icon button with size set to tiny."
      code={
`<PackenUiButton
  icon={{ name: "arrow-right-circle" }}
  type="icon"
  level="primary"
  size="tiny"
  callback={() => { return; }}
/>`
      }
    >
      <PackenUiButton
        icon={{ name: "arrow-right-circle" }}
        type="icon"
        level="primary"
        size="tiny"
        callback={() => { return; }} />
    </Wrapper>
  ))
  .add("Icon primary small", () => (
    <Wrapper
      title="PackenUiButton"
      description="Icon button with size set to small."
      code={
`<PackenUiButton
  icon={{ name: "arrow-right-circle" }}
  type="icon"
  level="primary"
  size="small"
  callback={() => { return; }}
/>`
      }
    >
      <PackenUiButton
        icon={{ name: "arrow-right-circle" }}
        type="icon"
        level="primary"
        size="small"
        callback={() => { return; }} />
    </Wrapper>
  ))
  .add("Icon primary medium", () => (
    <Wrapper
      title="PackenUiButton"
      description="Icon button with size set to medium."
      code={
`<PackenUiButton
  icon={{ name: "arrow-right-circle" }}
  type="icon"
  level="primary"
  size="medium"
  callback={() => { return; }}
/>`
        }
    >
      <PackenUiButton
        icon={{ name: "arrow-right-circle" }}
        type="icon"
        level="primary"
        size="medium"
        callback={() => { return; }} />
    </Wrapper>
  ))
  .add("Icon primary large", () => (
    <Wrapper
      title="PackenUiButton"
      description="Icon button with size set to large."
      code={
`<PackenUiButton
  icon={{ name: "arrow-right-circle" }}
  type="icon"
  level="primary"
  size="large"
  callback={() => { return; }}
/>`
        }
    >
      <PackenUiButton
        icon={{ name: "arrow-right-circle" }}
        type="icon"
        level="primary"
        size="large"
        callback={() => { return; }} />
    </Wrapper>
  ))
  .add("Icon primary giant disabled", () => (
    <Wrapper
      title="PackenUiButton"
      description="Icon button with size set to giant."
      code={
`<PackenUiButton
  icon={{ name: "arrow-right-circle" }}
  type="icon"
  level="primary"
  size="giant"
  callback={() => { return; }}
  isDisabled
/>`
      }
    >
      <PackenUiButton
        icon={{ name: "arrow-right-circle" }}
        type="icon"
        level="primary"
        size="giant"
        callback={() => { return; }}
        isDisabled />
    </Wrapper>
  ))
  .add("Primary medium", () => (
    <Wrapper
      title="PackenUiButton"
      description="Regular button with size set to medium."
      code={
`<PackenUiButton
  icon={{ name: "arrow-right", position: "right" }}
  type="regular"
  level="primary"
  size="medium"
  callback={() => { return; }}
>Medium</PackenUiButton>`
      }
    >
      <PackenUiButton
        icon={{ name: "arrow-right", position: "right" }}
        type="regular"
        level="primary"
        size="medium"
        callback={() => { return; }}
      >Medium</PackenUiButton>
    </Wrapper>
  ))
  .add("Danger small, no icon", () => (
    <Wrapper
      title="PackenUiButton"
      description="Regular button with size set to small and theme set to danger."
      code={
`<PackenUiButton
  type="regular"
  level="danger"
  size="small"
  callback={() => { return; }}
>Small</PackenUiButton>`
      }
    >
      <PackenUiButton
        type="regular"
        level="danger"
        size="small"
        callback={() => { return; }}
      >Small</PackenUiButton>
    </Wrapper>
  ));