import React from "react";
import { storiesOf } from "@storybook/react-native";

import Wrapper from "../wrapper";
import PackenUiLicenseBox from "../../app/components/PackenUiLicenseBox";

storiesOf("PackenUiLicenseBox", module)
  .add("Default", () => (
    <Wrapper
      full
      title="PackenUiLicenseBox"
      description="Complete example. This component doesn't support any variations."
      code={
`<PackenUiLicenseBox
  overview="Licencia para camión con refrigeración"
  category="A1"
  number="000000"
  state="approved"
  dueDate="14/08/2021"
  callback={() => false}
  labels={{
    approved: "Approved",
    expired: "Expired",
    rejected: "Rejected",
    pending: "Pending"
  }}
/>`
      }
    >
      <PackenUiLicenseBox
        overview="Licencia para camión con refrigeración"
        category="A1"
        number="000000"
        state="approved"
        dueDate="14/08/2021"
        callback={() => false}
        labels={{
          approved: "Approved",
          expired: "Expired",
          rejected: "Rejected",
          pending: "Pending"
        }}
      />
    </Wrapper>
  ));