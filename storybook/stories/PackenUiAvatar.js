import React from "react";
import { storiesOf } from "@storybook/react-native";

import Wrapper from "../wrapper";
import PackenUiAvatar from "../../app/components/PackenUiAvatar";

storiesOf("PackenUiAvatar", module)
  .add("Tiny", () => (
    <Wrapper
      title="PackenUiAvatar"
      description="Avatar with size set to tiny."
      code={
`<PackenUiAvatar
  size="tiny"
  src={require("../../assets/images/avatar.jpg")}
/>`
      }
    >
      <PackenUiAvatar
        size="tiny"
        src={require("../../assets/images/avatar.jpg")}
      />
    </Wrapper>
  ))
  .add("Small", () => (
    <Wrapper
      title="PackenUiAvatar"
      description="Avatar with size set to small."
      code={
`<PackenUiAvatar
  size="small"
  src={require("../../assets/images/avatar.jpg")}
/>`
      }
    >
      <PackenUiAvatar
        size="small"
        src={require("../../assets/images/avatar.jpg")}
      />
    </Wrapper>
  ))
  .add("Medium", () => (
    <Wrapper
      title="PackenUiAvatar"
      description="Avatar with size set to medium."
      code={
`<PackenUiAvatar
  size="medium"
  src={require("../../assets/images/avatar.jpg")}
/>`
      }
    >
      <PackenUiAvatar
        size="medium"
        src={require("../../assets/images/avatar.jpg")}
      />
    </Wrapper>
  ))
  .add("Large", () => (
    <Wrapper
      title="PackenUiAvatar"
      description="Avatar with size set to large."
      code={
`<PackenUiAvatar
  size="large"
  src={require("../../assets/images/avatar.jpg")}
/>`
      }
    >
      <PackenUiAvatar
        size="large"
        src={require("../../assets/images/avatar.jpg")}
      />
    </Wrapper>
  ))
  .add("Giant", () => (
    <Wrapper
      title="PackenUiAvatar"
      description="Avatar with size set to giant."
      code={
`<PackenUiAvatar
  size="giant"
  src={require("../../assets/images/avatar.jpg")}
/>`
      }
    >
      <PackenUiAvatar
        size="giant"
        src={require("../../assets/images/avatar.jpg")}
      />
    </Wrapper>
  ))
  .add("Giant empty state", () => (
    <Wrapper
      title="PackenUiAvatar"
      description="Avatar with size set to giant and no source. This enables the touchable callback."
      code={
`<PackenUiAvatar
  size="giant"
  callback={() => true}
/>`
      }
    >
      <PackenUiAvatar
        size="giant"
        callback={() => true}
      />
    </Wrapper>
  ));