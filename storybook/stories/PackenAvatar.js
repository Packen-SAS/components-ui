import React from "react";
import { storiesOf } from "@storybook/react-native";

import Wrapper from "../wrapper";
import PackenAvatar from "../../app/components/PackenAvatar";

storiesOf("PackenAvatar", module)
  .add("Tiny", () => (
    <Wrapper>
      <PackenAvatar
        size="tiny"
        src={require("../../assets/images/avatar.jpg")}
      />
    </Wrapper>
  ))
  .add("Small", () => (
    <Wrapper>
      <PackenAvatar
        size="small"
        src={require("../../assets/images/avatar.jpg")}
      />
    </Wrapper>
  ))
  .add("Medium", () => (
    <Wrapper>
      <PackenAvatar
        size="medium"
        src={require("../../assets/images/avatar.jpg")}
      />
    </Wrapper>
  ))
  .add("Large", () => (
    <Wrapper>
      <PackenAvatar
        size="large"
        src={require("../../assets/images/avatar.jpg")}
      />
    </Wrapper>
  ))
  .add("Giant", () => (
    <Wrapper>
      <PackenAvatar
        size="giant"
        src={require("../../assets/images/avatar.jpg")}
      />
    </Wrapper>
  ));