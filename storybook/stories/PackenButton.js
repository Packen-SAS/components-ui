import React from "react";
import { storiesOf } from "@storybook/react-native";

import Wrapper from "../wrapper";
import PackenButton from "../../app/components/PackenButton";

storiesOf("PackenButton", module)
  .add("Icon primary tiny", () => (
    <Wrapper>
      <PackenButton
        icon={{ name: "arrow-right-circle" }}
        type="icon"
        level="primary"
        size="tiny"
        callback={() => { return; }} />
    </Wrapper>
  ))
  .add("Icon primary small", () => (
    <Wrapper>
      <PackenButton
        icon={{ name: "arrow-right-circle" }}
        type="icon"
        level="primary"
        size="small"
        callback={() => { return; }} />
    </Wrapper>
  ))
  .add("Icon primary medium", () => (
    <Wrapper>
      <PackenButton
        icon={{ name: "arrow-right-circle" }}
        type="icon"
        level="primary"
        size="medium"
        callback={() => { return; }} />
    </Wrapper>
  ))
  .add("Icon primary large", () => (
    <Wrapper>
      <PackenButton
        icon={{ name: "arrow-right-circle" }}
        type="icon"
        level="primary"
        size="large"
        callback={() => { return; }} />
    </Wrapper>
  ))
  .add("Icon primary large disabled", () => (
    <Wrapper>
      <PackenButton
        icon={{ name: "arrow-right-circle" }}
        type="icon"
        level="primary"
        size="giant"
        callback={() => { return; }}
        isDisabled />
    </Wrapper>
  ));