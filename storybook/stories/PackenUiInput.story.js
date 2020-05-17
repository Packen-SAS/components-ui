import React from "react";
import { storiesOf } from "@storybook/react-native";

import Wrapper from "../wrapper";
import PackenUiInput from "../../app/components/PackenUiInput";

storiesOf("PackenUiInput", module)
  .add("Default, number-pad, max-length", () => (
    <Wrapper
      full
      title="PackenUiInput"
      description="Input con props completos, theme default, teclado number-pad y max-length."
      code={
`<PackenUiInput
  name="input1"
  size="tiny"
  placeholder="Placeholder"
  onChangeText={() => true}
  maxLength={10}
  icon={{
    name: "lock",
    position: "left"
  }}
  message={{
    text: "Caption text, description, error notification",
    icon: "info"
  }}
  label="Label tiny"
  help="Number-pad keyboard"
  keyboardType="number-pad"
  theme="default"
  eventHandlers={{
    onFocus: () => true,
    onBlur: () => true,
    onSubmitEditing: () => true
  }}
/>`
      }
    >
      <PackenUiInput
        name="input1"
        size="tiny"
        placeholder="Placeholder"
        onChangeText={() => true}
        maxLength={10}
        icon={{
          name: "lock",
          position: "left"
        }}
        message={{
          text: "Caption text, description, error notification",
          icon: "info"
        }}
        label="Label tiny"
        help="Number-pad keyboard"
        keyboardType="number-pad"
        theme="default"
        eventHandlers={{
          onFocus: () => true,
          onBlur: () => true,
          onSubmitEditing: () => true
        }}
      />
    </Wrapper>
  ))
  .add("Disabled", () => (
    <Wrapper
      full
      title="PackenUiInput"
      description="Input disabled."
      code={
`<PackenUiInput
  name="input6"
  size="medium"
  placeholder="Placeholder"
  onChangeText={() => true}
  icon={{
    name: "clock",
    position: "left"
  }}
  message={{
    text: "Caption text, description, error notification",
    icon: "info"
  }}
  label="Label disabled"
  help="Help text disabled"
  theme="success"
  disabled
/>`
      }
    >
      <PackenUiInput
        name="input6"
        size="medium"
        placeholder="Placeholder"
        onChangeText={() => true}
        icon={{
          name: "clock",
          position: "left"
        }}
        message={{
          text: "Caption text, description, error notification",
          icon: "info"
        }}
        label="Label disabled"
        help="Help text disabled"
        theme="success"
        disabled
      />
    </Wrapper>
  ));