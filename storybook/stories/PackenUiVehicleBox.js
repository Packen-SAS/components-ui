import React from "react";
import { storiesOf } from "@storybook/react-native";

import Wrapper from "../wrapper";
import PackenUiVehicleBox from "../../app/components/PackenUiVehicleBox";

storiesOf("PackenUiVehicleBox", module)
  .add("Default", () => (
    <Wrapper
      title="PackenUiVehicleBox"
      description="VehicleBox default. No presenta variaciones."
      code={
`<PackenUiVehicleBox
  type="carry"
  overview="Camión con refrigeración"
  year="2017"
  plate="USC-914"
  state="approved"
  callback={() => true}
/>`
      }
    >
      <PackenUiVehicleBox
        type="carry"
        overview="Camión con refrigeración"
        year="2017"
        plate="USC-914"
        state="approved"
        callback={() => true}
      />
    </Wrapper>
  ));