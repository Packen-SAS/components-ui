import React, { Component } from "react";
import { View } from "react-native";

import Section from "../components/Section";
import SectionStyles from "../styles/components/Section";

import Typography from "../styles/abstracts/typography";
import Colors from "../styles/abstracts/colors";
import Spacing from "../styles/abstracts/spacing";

import PackenUiButton from "../components/PackenUiButton";
import PackenUiText from "../components/PackenUiText";
import PackenUiDivider from "../components/PackenUiDivider";
import PackenUiModal from "../components/PackenUiModal";

class Modals extends Component {
  constructor(props) {
    super(props);

    this.state = {
      custom: {
        small: false
      },
      primary: {
        default: false,
        small: false
      },
      warning: {
        default: false,
        small: false
      },
      danger: {
        default: false,
        small: false
      },
      info: {
        default: false,
        small: false
      },
      success: {
        default: false,
        small: false
      },
      gallery: {
        single: false,
        multiple: false
      }
    }
  }

  toggleModal = instance => {
    const path = instance.split(".");
    const theme = path[0];
    const size = path[1];

    const newState = { ...this.state };
    newState[theme][size] = !newState[theme][size];

    this.setState(newState);
  }

  render() {
    return (
      <Section title="Modals">
        <View style={{ marginTop: 20 }}>
          <PackenUiText style={{ marginBottom: 10, fontFamily: Typography.family.bold, color: Colors.base.default_alt }}>Custom type</PackenUiText>
          <View style={{ marginBottom: Spacing[2] }}>
            <PackenUiButton type="regular" level="primary" size="small" callback={() => { this.toggleModal("custom.small"); }}>Custom small</PackenUiButton>
          </View>

          <PackenUiDivider size={1} type="light" margin={{ top: 15, bottom: 15 }} />
          <PackenUiText style={{ marginBottom: 10, fontFamily: Typography.family.bold, color: Colors.base.default_alt }}>Information type</PackenUiText>

          <View style={{ marginBottom: Spacing[2] }}>
            <PackenUiButton type="regular" level="primary" size="small" callback={() => { this.toggleModal("primary.default"); }}>Primary default</PackenUiButton>
          </View>
          <View style={{ marginBottom: Spacing[2] }}>
            <PackenUiButton type="regular" level="primary" size="small" callback={() => { this.toggleModal("primary.small"); }}>Primary small</PackenUiButton>
          </View>
          <View style={{ marginBottom: Spacing[2] }}>
            <PackenUiButton type="regular" level="primary" size="small" callback={() => { this.toggleModal("warning.default"); }}>Warning default</PackenUiButton>
          </View>
          <View style={{ marginBottom: Spacing[2] }}>
            <PackenUiButton type="regular" level="primary" size="small" callback={() => { this.toggleModal("warning.small"); }}>Warning small</PackenUiButton>
          </View>
          <View style={{ marginBottom: Spacing[2] }}>
            <PackenUiButton type="regular" level="primary" size="small" callback={() => { this.toggleModal("danger.default"); }}>Danger default</PackenUiButton>
          </View>
          <View style={{ marginBottom: Spacing[2] }}>
            <PackenUiButton type="regular" level="primary" size="small" callback={() => { this.toggleModal("danger.small"); }}>Danger small</PackenUiButton>
          </View>
          <View style={{ marginBottom: Spacing[2] }}>
            <PackenUiButton type="regular" level="primary" size="small" callback={() => { this.toggleModal("info.default"); }}>Info default</PackenUiButton>
          </View>
          <View style={{ marginBottom: Spacing[2] }}>
            <PackenUiButton type="regular" level="primary" size="small" callback={() => { this.toggleModal("info.small"); }}>Info small</PackenUiButton>
          </View>
          <View style={{ marginBottom: Spacing[2] }}>
            <PackenUiButton type="regular" level="primary" size="small" callback={() => { this.toggleModal("success.default"); }}>Success default</PackenUiButton>
          </View>
          <View style={{ marginBottom: Spacing[2] }}>
            <PackenUiButton type="regular" level="primary" size="small" callback={() => { this.toggleModal("success.small"); }}>Success small</PackenUiButton>
          </View>

          <PackenUiDivider size={1} type="light" margin={{ top: 15, bottom: 15 }} />
          <PackenUiText style={{ marginBottom: 10, fontFamily: Typography.family.bold, color: Colors.base.default_alt }}>Gallery type</PackenUiText>

          <View style={{ marginBottom: Spacing[2] }}>
            <PackenUiButton type="regular" level="primary" size="small" callback={() => { this.toggleModal("gallery.multiple"); }}>Gallery multiple</PackenUiButton>
          </View>
          <View style={{ marginBottom: Spacing[2] }}>
            <PackenUiButton type="regular" level="primary" size="small" callback={() => { this.toggleModal("gallery.single"); }}>Gallery single</PackenUiButton>
          </View>
        </View>

        <View>
          <PackenUiModal
            isOpen={this.state.custom.small}
            size="small"
            type="custom"
            theme="primary"
            toggle={() => { this.toggleModal("custom.small"); }}
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
                <View style={{ alignItems: "center" }}>
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
                    callback={() => { this.toggleModal("custom.small"); }}
                  >Volver</PackenUiButton>
                  <PackenUiButton
                    type="regular"
                    level="primary"
                    size="small"
                    style={{ paddingVertical: 10, paddingHorizontal: 5 }}
                    callback={() => { this.toggleModal("custom.small"); }}
                  >Aceptar</PackenUiButton>
                </View>
              </View>
            )}
          />
          <PackenUiModal isOpen={this.state.primary.default} size="default" type="info" theme="primary" info={{
            title: "Title",
            text: "Fugiat sint eiusmod esse eu duis sint labore. Veniam anim reprehenderit.",
            btn: <PackenUiButton icon={{ name: "arrow-right", position: "right" }} type="regular" level="primary" size="medium" callback={() => { this.toggleModal("primary.default"); }}>BUTTON</PackenUiButton>
          }} toggle={() => { this.toggleModal("primary.default"); }} />
          <PackenUiModal isOpen={this.state.primary.small} size="small" type="info" theme="primary" info={{
            title: "Title",
            text: "Fugiat sint eiusmod esse eu duis sint labore. Veniam anim reprehenderit.",
            btn: <PackenUiButton icon={{ name: "arrow-right", position: "right" }} type="regular" level="primary" size="medium" callback={() => { this.toggleModal("primary.small"); }}>BUTTON</PackenUiButton>
          }} toggle={() => { this.toggleModal("primary.small"); }} />
          <PackenUiModal isOpen={this.state.warning.default} size="default" type="info" theme="warning" banner={{ icon: "alert-triangle" }} info={{
            title: "Title",
            text: "Fugiat sint eiusmod esse eu duis sint labore. Veniam anim reprehenderit."
          }} toggle={() => { this.toggleModal("warning.default"); }} />
          <PackenUiModal isOpen={this.state.warning.small} size="small" type="info" theme="warning" banner={{ icon: "alert-triangle" }} info={{
            title: "Title",
            text: "Fugiat sint eiusmod esse eu duis sint labore. Veniam anim reprehenderit.",
            btn: <PackenUiButton icon={{ name: "arrow-right", position: "right" }} type="regular" level="primary" size="medium" callback={() => { this.toggleModal("warning.small"); }}>BUTTON</PackenUiButton>
          }} toggle={() => { this.toggleModal("warning.small"); }} />
          <PackenUiModal isOpen={this.state.danger.default} size="default" type="info" theme="danger" banner={{ icon: "x-circle" }} info={{
            title: "Title",
            text: "Fugiat sint eiusmod esse eu duis sint labore. Veniam anim reprehenderit.",
            btn: <PackenUiButton icon={{ name: "arrow-right", position: "right" }} type="regular" level="primary" size="medium" callback={() => { this.toggleModal("danger.default"); }}>BUTTON</PackenUiButton>
          }} toggle={() => { this.toggleModal("danger.default"); }} />
          <PackenUiModal isOpen={this.state.danger.small} size="small" type="info" theme="danger" banner={{ icon: "x-circle" }} info={{
            title: "Title",
            text: "Fugiat sint eiusmod esse eu duis sint labore. Veniam anim reprehenderit."
          }} toggle={() => { this.toggleModal("danger.small"); }} />
          <PackenUiModal isOpen={this.state.info.default} size="default" type="info" theme="info" banner={{ icon: "info" }} info={{
            title: "Title",
            text: "Fugiat sint eiusmod esse eu duis sint labore. Veniam anim reprehenderit.",
            btn: <PackenUiButton icon={{ name: "arrow-right", position: "right" }} type="regular" level="primary" size="medium" callback={() => { this.toggleModal("info.default"); }}>BUTTON</PackenUiButton>
          }} toggle={() => { this.toggleModal("info.default"); }} />
          <PackenUiModal isOpen={this.state.info.small} size="small" type="info" theme="info" banner={{ icon: "info" }} info={{
            title: "Title",
            text: "Fugiat sint eiusmod esse eu duis sint labore. Veniam anim reprehenderit.",
            btn: <PackenUiButton icon={{ name: "arrow-right", position: "right" }} type="regular" level="primary" size="medium" callback={() => { this.toggleModal("info.small"); }}>BUTTON</PackenUiButton>
          }} toggle={() => { this.toggleModal("info.small"); }} />
          <PackenUiModal isOpen={this.state.success.default} size="default" type="info" theme="success" banner={{ icon: "check-circle" }} info={{
            title: "Title",
            text: "Fugiat sint eiusmod esse eu duis sint labore. Veniam anim reprehenderit."
          }} toggle={() => { this.toggleModal("success.default"); }} />
          <PackenUiModal isOpen={this.state.success.small} size="small" type="info" theme="success" banner={{ icon: "check-circle" }} info={{
            title: "Title",
            text: "Fugiat sint eiusmod esse eu duis sint labore. Veniam anim reprehenderit.",
            btn: <PackenUiButton icon={{ name: "arrow-right", position: "right" }} type="regular" level="primary" size="medium" callback={() => { this.toggleModal("success.small"); }}>BUTTON</PackenUiButton>
          }} toggle={() => { this.toggleModal("success.small"); }} />

          <PackenUiModal isOpen={this.state.gallery.multiple} size="small" type="gallery" theme="white"
            images={[require("../../assets/images/placeholder.png"), require("../../assets/images/placeholder.png"), require("../../assets/images/placeholder.png")]}
            toggle={() => { this.toggleModal("gallery.multiple"); }} />
          <PackenUiModal isOpen={this.state.gallery.single} size="small" type="gallery" theme="white"
            images={[require("../../assets/images/placeholder.png")]}
            toggle={() => { this.toggleModal("gallery.single"); }} />
        </View>
      </Section>
    );
  }
}

export default Modals;