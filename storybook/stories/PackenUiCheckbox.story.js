import React from "react";
import { storiesOf } from "@storybook/react-native";

import Wrapper from "../wrapper";
import PackenUiCheckbox from "../../app/components/PackenUiCheckbox";

const items = [
  {
    label: "This is checked",
    value: "This is checked",
    isChecked: true,
    isDisabled: false
  },
  {
    label: "This is unchecked",
    value: "This is unchecked",
    isChecked: false,
    isDisabled: false
  },
  {
    label: "This is both checked and disabled",
    value: "This is both checked and disabled",
    isChecked: true,
    isDisabled: true
  },
  {
    label: "This is both unchecked and disabled",
    value: "This is both unchecked and disabled",
    isChecked: false,
    isDisabled: true
  }
];

storiesOf("PackenUiCheckbox", module)
  .add("Column layout", () => (
    <Wrapper
      title="PackenUiCheckbox"
      description="Checkbox with layout set to column."
      code={
`<PackenUiCheckbox
  layout="column"
  items={items}
  callback={() => true}
  name="checkbox1"
/>`
      }
    >
      <PackenUiCheckbox
        layout="column"
        items={items}
        callback={() => true}
        name="checkbox1"
      />
    </Wrapper>
  ))
  .add("Row layout", () => (
    <Wrapper
      title="PackenUiCheckbox"
      description="Checkbox with layout set to row."
      code={
`<PackenUiCheckbox
  layout="row"
  items={items}
  callback={() => true}
  name="checkbox2"
/>`
      }
    >
      <PackenUiCheckbox
        layout="row"
        items={items}
        callback={() => true}
        name="checkbox1"
      />
    </Wrapper>
  ));