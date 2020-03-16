import React from "react";
import { storiesOf } from "@storybook/react-native";

import PackenAvatar from "../../app/components/PackenAvatar";

storiesOf("PackenAvatar", module)
  .add("Tiny", () => (
    <PackenAvatar
      size="tiny"
      src={require("../../assets/images/avatar.jpg")}
    />
  ));