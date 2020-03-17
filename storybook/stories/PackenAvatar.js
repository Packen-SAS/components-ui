import React from "react";
import { storiesOf } from "@storybook/react-native";

import Wrapper from "../wrapper";
import PackenAvatar from "../../app/components/PackenAvatar";

storiesOf("PackenAvatar", module)
  .add("Tiny", () => (
    <Wrapper
      title="PackenAvatar"
      description="Avatar with size set to tiny."
      code={
`<PackenAvatar
  size="tiny"
  src={require("../../assets/images/avatar.jpg")}
/>`
      }
    >
      <PackenAvatar
        size="tiny"
        src={require("../../assets/images/avatar.jpg")}
      />
    </Wrapper>
  ))
  .add("Small", () => (
    <Wrapper
      title="PackenAvatar"
      description="Avatar with size set to small."
      code={
`<PackenAvatar
  size="small"
  src={require("../../assets/images/avatar.jpg")}
/>`
      }
    >
      <PackenAvatar
        size="small"
        src={require("../../assets/images/avatar.jpg")}
      />
    </Wrapper>
  ))
  .add("Medium", () => (
    <Wrapper
      title="PackenAvatar"
      description="Avatar with size set to medium."
      code={
`<PackenAvatar
  size="medium"
  src={require("../../assets/images/avatar.jpg")}
/>`
      }
    >
      <PackenAvatar
        size="medium"
        src={require("../../assets/images/avatar.jpg")}
      />
    </Wrapper>
  ))
  .add("Large", () => (
    <Wrapper
      title="PackenAvatar"
      description="Avatar with size set to large."
      code={
`<PackenAvatar
  size="large"
  src={require("../../assets/images/avatar.jpg")}
/>`
      }
    >
      <PackenAvatar
        size="large"
        src={require("../../assets/images/avatar.jpg")}
      />
    </Wrapper>
  ))
  .add("Giant", () => (
    <Wrapper
      title="PackenAvatar"
      description="Avatar with size set to giant."
      code={
`<PackenAvatar
  size="giant"
  src={require("../../assets/images/avatar.jpg")}
/>`
      }
    >
      <PackenAvatar
        size="giant"
        src={require("../../assets/images/avatar.jpg")}
      />
    </Wrapper>
  ));