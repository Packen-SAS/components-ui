import React from "react";
import { View } from "react-native";
import { storiesOf } from "@storybook/react-native";

import Wrapper from "../wrapper";
import Colors from "../../app/styles/abstracts/colors";
import Typography from "../../app/styles/abstracts/typography";
import PackenUiText from "../../app/components/PackenUiText";
import PackenUiButton from "../../app/components/PackenUiButton";
import PackenUiModal from "../../app/components/PackenUiModal";

storiesOf("PackenUiModal", module)
  .add("Custom", () => (
    <Wrapper
      full
      title="PackenUiModal"
      description="Modal con contenido custom."
      code={
`<PackenUiModal
  isOpen={true}
  size="small"
  type="custom"
  theme="primary"
  toggle={() => true}
  onDismiss={() => true}
  onRequestClose={() => true}
  content={(
    <View>
      <PackenUiText
        style={{ textAlign: "center" }}
        preset="p1"
      >Hemos enviado un código de verificación al número</PackenUiText>
      <PackenUiText
        preset="t1"
        style={{
          color: Colors.brand.primary.drk,
          fontFamily: Typography.family.bold,
          textDecorationLine: "underline",
          textAlign: "center"
        }}
      >3006789056</PackenUiText>
      <View style={{ alignItems: "center", paddingHorizontal: 25 }}>
        <PackenUiButton
          type="regular"
          level="ghost"
          size="tiny"
          style={{
            paddingVertical: 8,
            paddingHorizontal: 14,
            marginTop: 15,
            marginBottom: 5
          }}
          callback={() => true}
        >Volver</PackenUiButton>
        <PackenUiButton
          type="regular"
          level="primary"
          size="small"
          style={{ paddingVertical: 10, paddingHorizontal: 5 }}
          callback={() => true}
        >Aceptar</PackenUiButton>
      </View>
    </View>
  )}
/>`
    }>
      <View>
        <PackenUiText
          style={{ textAlign: "center" }}
          preset="p1"
        >Hemos enviado un código de verificación al número</PackenUiText>
        <PackenUiText
          preset="t1"
          style={{
            color: Colors.brand.primary.drk,
            fontFamily: Typography.family.bold,
            textDecorationLine: "underline",
            textAlign: "center"
          }}
        >3006789056</PackenUiText>
        <View style={{ alignItems: "center", paddingHorizontal: 25 }}>
          <PackenUiButton
            type="regular"
            level="ghost"
            size="tiny"
            style={{
              paddingVertical: 8,
              paddingHorizontal: 14,
              marginTop: 15,
              marginBottom: 5
            }}
            callback={() => true}
          >Volver</PackenUiButton>
          <PackenUiButton
            type="regular"
            level="primary"
            size="small"
            style={{ paddingVertical: 10, paddingHorizontal: 5 }}
            callback={() => true}
          >Aceptar</PackenUiButton>
        </View>
      </View>
    </Wrapper>
  ))
  .add("Info, danger, small", () => (
    <Wrapper
      full
      title="PackenUiModal"
      description="Modal tipo info de size small y theme danger. No se puede mostrar el contenido renderizado aquí."
      code={
`<PackenUiModal
  isOpen={false}
  size="small"
  type="info"
  theme="danger"
  banner={{ icon: "x-circle" }}
  info={{
    title: "Title",
    text: "Fugiat sint eiusmod esse eu duis sint labore. Veniam anim reprehenderit.",
    btn: <PackenUiButton icon={{ name: "arrow-right", position: "right" }} type="regular" level="primary" size="medium" callback={() => { this.toggleModal("danger.default"); }}>BUTTON</PackenUiButton>
  }}
  toggle={() => true}
/>`
    }>
      <PackenUiText preset="c2" style={{ textAlign: "center" }}>This component cannot be rendered in this context</PackenUiText>
    </Wrapper>
  ))
  .add("Gallery", () => (
    <Wrapper
      full
      title="PackenUiModal"
      description="Modal tipo gallery. No se puede mostrar el contenido renderizado aquí."
      code={
`<PackenUiModal
  isOpen={false}
  size="small"
  type="gallery"
  theme="white"
  images={[require("../../assets/images/placeholder.png"), require("../../assets/images/placeholder.png"), require("../../assets/images/placeholder.png")]}
  toggle={() => true}
/>`
    }>
      <PackenUiText preset="c2" style={{ textAlign: "center" }}>This component cannot be rendered in this context</PackenUiText>
    </Wrapper>
  ));