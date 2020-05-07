import React from "react";
import { storiesOf } from "@storybook/react-native";

import Wrapper from "../wrapper";
import PackenUiLoaderButton from "../../app/components/PackenUiLoaderButton";

storiesOf("PackenUiLoaderButton", module)
  .add("Icon, not done", () => (
    <Wrapper
      title="PackenUiLoaderButton"
      description="Loader button con level primary y tipo icon que no ha finalizado."
      code={
`<PackenUiLoaderButton
  type="icon"
  level="primary"
  size="large"
  isDone={false}
  callback={() => true}
/>`
      }
    >
      <PackenUiLoaderButton
        type="icon"
        level="primary"
        size="large"
        isDone={false}
        callback={() => true}
      />
    </Wrapper>
  ))
  .add("Icon, danger, done", () => (
    <Wrapper
      title="PackenUiLoaderButton"
      description="Loader button con level danger, size medium, y tipo icon que ya ha finalizado."
      code={
`<PackenUiLoaderButton
  type="icon"
  level="danger"
  size="medium"
  isDone={true}
  callback={() => true}
/>`
      }
    >
      <PackenUiLoaderButton
        type="icon"
        level="danger"
        size="medium"
        isDone={true}
        callback={() => true}
      />
    </Wrapper>
  ))
  .add("Regular, secondary, not done", () => (
    <Wrapper
      full
      title="PackenUiLoaderButton"
      description="Loader button con level secondary, size large, y tipo regular que no ha finalizado."
      code={
`<PackenUiLoaderButton
  type="regular"
  level="secondary"
  size="large"
  isDone={false}
  callback={() => true}
>Cargando</PackenUiLoaderButton>`
      }
    >
      <PackenUiLoaderButton
        type="regular"
        level="secondary"
        size="large"
        isDone={false}
        callback={() => true}
      >Cargando</PackenUiLoaderButton>
    </Wrapper>
  ));