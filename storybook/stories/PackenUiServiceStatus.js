import React from "react";
import { storiesOf } from "@storybook/react-native";

import Wrapper from "../wrapper";
import PackenUiServiceStatus from "../../app/components/PackenUiServiceStatus";

const steps = [
  {
    title: "Vehículo asignado",
    isComplete: true,
    isCurrent: false,
    time: "05:21 pm",
    callback: () => true
  },
  {
    title: "En camino a origen",
    subtitle: "Calle 71 # 13-81",
    isComplete: true,
    isCurrent: false,
    time: "05:21 pm",
    callback: () => true
  },
  {
    title: "En origen",
    subtitle: "Calle 71 # 13-81",
    isComplete: false,
    isCurrent: true,
    time: "05:21 pm",
    callback: () => true
  },
  {
    title: "Cargue completo",
    isComplete: false,
    isCurrent: false,
    callback: () => true
  },
  {
    title: "En camino a destino A",
    isComplete: false,
    isCurrent: false,
    callback: () => true
  },
  {
    title: "En destino A",
    isComplete: false,
    isCurrent: false,
    callback: () => true
  },
  {
    title: "Descargue completo",
    isComplete: false,
    isCurrent: false,
    callback: () => true
  },
  {
    title: "Finalizado",
    isComplete: false,
    isCurrent: false,
    callback: () => true
  }
];

storiesOf("PackenUiServiceStatus", module)
  .add("Default", () => (
    <Wrapper
      full
      title="PackenUiServiceStatus"
      description="ServiceStatus default. No presenta variaciones."
      code={
`const steps = [
  {
    title: "Vehículo asignado",
    isComplete: true,
    isCurrent: false,
    time: "05:21 pm",
    callback: () => true
  },
  {
    title: "En camino a origen",
    subtitle: "Calle 71 # 13-81",
    isComplete: true,
    isCurrent: false,
    time: "05:21 pm",
    callback: () => true
  },
  {
    title: "En origen",
    subtitle: "Calle 71 # 13-81",
    isComplete: false,
    isCurrent: true,
    time: "05:21 pm",
    callback: () => true
  },
  {
    title: "Cargue completo",
    isComplete: false,
    isCurrent: false,
    callback: () => true
  },
  {
    title: "En camino a destino A",
    isComplete: false,
    isCurrent: false,
    callback: () => true
  },
  {
    title: "En destino A",
    isComplete: false,
    isCurrent: false,
    callback: () => true
  },
  {
    title: "Descargue completo",
    isComplete: false,
    isCurrent: false,
    callback: () => true
  },
  {
    title: "Finalizado",
    isComplete: false,
    isCurrent: false,
    callback: () => true
  }
];

<PackenUiServiceStatus
  steps={steps}
  currentStepIndex={2}
/>`
      }
    >
      <PackenUiServiceStatus
        steps={steps}
        currentStepIndex={2}
      />
    </Wrapper>
  ));