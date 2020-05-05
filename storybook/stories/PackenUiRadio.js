import React from "react";
import { storiesOf } from "@storybook/react-native";

import Wrapper from "../wrapper";
import PackenUiRadio from "../../app/components/PackenUiRadio";

storiesOf("PackenUiRadio", module)
  .add("Column", () => (
    <Wrapper
      title="PackenUiRadio"
      description="Radio con layout column."
      code={
`<PackenUiRadio
  layout="column"
  items={[
    {
      label: "Place your text",
      value: "Place your text",
      isDisabled: false
    },
    {
      label: "Different text",
      value: "Different text",
      isDisabled: false
    },
    {
      label: "This text is both checked and disabled",
      value: "This text is both checked and disabled",
      isDisabled: true
    }
  ]}
  initialIndex={0}
  name="radios1"
  callback={() => true}
/>`
      }
    >
      <PackenUiRadio
        layout="column"
        items={[
          {
            label: "Place your text",
            value: "Place your text",
            isDisabled: false
          },
          {
            label: "Different text",
            value: "Different text",
            isDisabled: false
          },
          {
            label: "This text is both checked and disabled",
            value: "This text is both checked and disabled",
            isDisabled: true
          }
        ]}
        initialIndex={0}
        name="radios1"
        callback={() => true}
      />
    </Wrapper>
  ))
  .add("Row", () => (
    <Wrapper
      title="PackenUiRadio"
      description="Radio con layout row."
      code={
`<PackenUiRadio
  layout="row"
  items={[
    {
      label: "Place your text",
      value: "Place your text",
      isDisabled: false
    },
    {
      label: "Different text",
      value: "Different text",
      isDisabled: false
    },
    {
      label: "This text is both checked and disabled",
      value: "This text is both checked and disabled",
      isDisabled: true
    }
  ]}
  initialIndex={2}
  name="radios2"
  callback={() => true}
/>`
      }
    >
      <PackenUiRadio
        layout="row"
        items={[
          {
            label: "Place your text",
            value: "Place your text",
            isDisabled: false
          },
          {
            label: "Different text",
            value: "Different text",
            isDisabled: false
          },
          {
            label: "This text is both checked and disabled",
            value: "This text is both checked and disabled",
            isDisabled: true
          }
        ]}
        initialIndex={2}
        name="radios2"
        callback={() => true}
      />
    </Wrapper>
  ));