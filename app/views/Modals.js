import React, { Component } from "react";
import { View } from "react-native";

import Section from "../components/Section";
import SectionStyles from "../styles/components/Section";

import Typography from "../styles/abstracts/typography";
import Colors from "../styles/abstracts/colors";
import Spacing from "../styles/abstracts/spacing";

import PackenButton from "../components/PackenButton";
import PackenText from "../components/PackenText";
import PackenDivider from "../components/PackenDivider";
import PackenModal from "../components/PackenModal";

class Modals extends Component {
  constructor(props) {
    super(props);

    this.state = {
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

    const newState = {...this.state};
    newState[theme][size] = !newState[theme][size];

    this.setState(newState);
  }
  
  render() {
    return (
      <Section title="Modals">
        <View style={SectionStyles.section__content}>
          <PackenText style={{marginBottom: 10, fontFamily: Typography.family.bold, color: Colors.base.default_alt}}>Information type</PackenText>
          
          <View style={{marginBottom: Spacing[2]}}>
            <PackenButton type="regular" level="primary" size="small" callback={() => { this.toggleModal("primary.default"); }}>Primary default</PackenButton>
          </View>
          <View style={{marginBottom: Spacing[2]}}>
            <PackenButton type="regular" level="primary" size="small" callback={() => { this.toggleModal("primary.small"); }}>Primary small</PackenButton>
          </View>
          <View style={{marginBottom: Spacing[2]}}>
            <PackenButton type="regular" level="primary" size="small" callback={() => { this.toggleModal("warning.default"); }}>Warning default</PackenButton>
          </View>
          <View style={{marginBottom: Spacing[2]}}>
            <PackenButton type="regular" level="primary" size="small" callback={() => { this.toggleModal("warning.small"); }}>Warning small</PackenButton>
          </View>
          <View style={{marginBottom: Spacing[2]}}>
            <PackenButton type="regular" level="primary" size="small" callback={() => { this.toggleModal("danger.default"); }}>Danger default</PackenButton>
          </View>
          <View style={{marginBottom: Spacing[2]}}>
            <PackenButton type="regular" level="primary" size="small" callback={() => { this.toggleModal("danger.small"); }}>Danger small</PackenButton>
          </View>
          <View style={{marginBottom: Spacing[2]}}>
            <PackenButton type="regular" level="primary" size="small" callback={() => { this.toggleModal("info.default"); }}>Info default</PackenButton>
          </View>
          <View style={{marginBottom: Spacing[2]}}>
            <PackenButton type="regular" level="primary" size="small" callback={() => { this.toggleModal("info.small"); }}>Info small</PackenButton>
          </View>
          <View style={{marginBottom: Spacing[2]}}>
            <PackenButton type="regular" level="primary" size="small" callback={() => { this.toggleModal("success.default"); }}>Success default</PackenButton>
          </View>
          <View style={{marginBottom: Spacing[2]}}>
            <PackenButton type="regular" level="primary" size="small" callback={() => { this.toggleModal("success.small"); }}>Success small</PackenButton>
          </View>

          <PackenDivider size={1} type="light" margin={{top: 15, bottom: 15}}/>
          <PackenText style={{marginBottom: 10, fontFamily: Typography.family.bold, color: Colors.base.default_alt}}>Gallery type</PackenText>
          
          <View style={{marginBottom: Spacing[2]}}>
            <PackenButton type="regular" level="primary" size="small" callback={() => { this.toggleModal("gallery.multiple"); }}>Gallery multiple</PackenButton>
          </View>
          <View style={{marginBottom: Spacing[2]}}>
            <PackenButton type="regular" level="primary" size="small" callback={() => { this.toggleModal("gallery.single"); }}>Gallery single</PackenButton>
          </View>
        </View>

        <View>
          <PackenModal isOpen={this.state.primary.default} size="default" type="info" theme="primary" info={{
            title: "Title",
            text: "Fugiat sint eiusmod esse eu duis sint labore. Veniam anim reprehenderit.",
            btn: <PackenButton icon={{ name: "arrow-right", position: "right" }} type="regular" level="primary" size="medium" callback={() => { this.toggleModal("primary.default"); }}>BUTTON</PackenButton>
          }} toggle={() => { this.toggleModal("primary.default"); }}/>
          <PackenModal isOpen={this.state.primary.small} size="small" type="info" theme="primary" info={{
            title: "Title",
            text: "Fugiat sint eiusmod esse eu duis sint labore. Veniam anim reprehenderit.",
            btn: <PackenButton icon={{ name: "arrow-right", position: "right" }} type="regular" level="primary" size="medium" callback={() => { this.toggleModal("primary.small"); }}>BUTTON</PackenButton>
          }} toggle={() => { this.toggleModal("primary.small"); }}/>
          <PackenModal isOpen={this.state.warning.default} size="default" type="info" theme="warning" banner={{icon: "alert-triangle"}} info={{
            title: "Title",
            text: "Fugiat sint eiusmod esse eu duis sint labore. Veniam anim reprehenderit."
          }} toggle={() => { this.toggleModal("warning.default"); }}/>
          <PackenModal isOpen={this.state.warning.small} size="small" type="info" theme="warning" banner={{icon: "alert-triangle"}} info={{
            title: "Title",
            text: "Fugiat sint eiusmod esse eu duis sint labore. Veniam anim reprehenderit.",
            btn: <PackenButton icon={{ name: "arrow-right", position: "right" }} type="regular" level="primary" size="medium" callback={() => { this.toggleModal("warning.small"); }}>BUTTON</PackenButton>
          }} toggle={() => { this.toggleModal("warning.small"); }}/>
          <PackenModal isOpen={this.state.danger.default} size="default" type="info" theme="danger" banner={{icon: "x-circle"}} info={{
            title: "Title",
            text: "Fugiat sint eiusmod esse eu duis sint labore. Veniam anim reprehenderit.",
            btn: <PackenButton icon={{ name: "arrow-right", position: "right" }} type="regular" level="primary" size="medium" callback={() => { this.toggleModal("danger.default"); }}>BUTTON</PackenButton>
          }} toggle={() => { this.toggleModal("danger.default"); }}/>
          <PackenModal isOpen={this.state.danger.small} size="small" type="info" theme="danger" banner={{icon: "x-circle"}} info={{
            title: "Title",
            text: "Fugiat sint eiusmod esse eu duis sint labore. Veniam anim reprehenderit."
          }} toggle={() => { this.toggleModal("danger.small"); }}/>
          <PackenModal isOpen={this.state.info.default} size="default" type="info" theme="info" banner={{icon: "info"}} info={{
            title: "Title",
            text: "Fugiat sint eiusmod esse eu duis sint labore. Veniam anim reprehenderit.",
            btn: <PackenButton icon={{ name: "arrow-right", position: "right" }} type="regular" level="primary" size="medium" callback={() => { this.toggleModal("info.default"); }}>BUTTON</PackenButton>
          }} toggle={() => { this.toggleModal("info.default"); }}/>
          <PackenModal isOpen={this.state.info.small} size="small" type="info" theme="info" banner={{icon: "info"}} info={{
            title: "Title",
            text: "Fugiat sint eiusmod esse eu duis sint labore. Veniam anim reprehenderit.",
            btn: <PackenButton icon={{ name: "arrow-right", position: "right" }} type="regular" level="primary" size="medium" callback={() => { this.toggleModal("info.small"); }}>BUTTON</PackenButton>
          }} toggle={() => { this.toggleModal("info.small"); }}/>
          <PackenModal isOpen={this.state.success.default} size="default" type="info" theme="success" banner={{icon: "check-circle"}} info={{
            title: "Title",
            text: "Fugiat sint eiusmod esse eu duis sint labore. Veniam anim reprehenderit."
          }} toggle={() => { this.toggleModal("success.default"); }}/>
          <PackenModal isOpen={this.state.success.small} size="small" type="info" theme="success" banner={{icon: "check-circle"}} info={{
            title: "Title",
            text: "Fugiat sint eiusmod esse eu duis sint labore. Veniam anim reprehenderit.",
            btn: <PackenButton icon={{ name: "arrow-right", position: "right" }} type="regular" level="primary" size="medium" callback={() => { this.toggleModal("success.small"); }}>BUTTON</PackenButton>
          }} toggle={() => { this.toggleModal("success.small"); }}/>
          
          <PackenModal isOpen={this.state.gallery.multiple} size="small" type="gallery" theme="white"
            images={[require("../../assets/images/placeholder.png"), require("../../assets/images/placeholder.png"), require("../../assets/images/placeholder.png")]}
            toggle={() => { this.toggleModal("gallery.multiple"); }}/>
          <PackenModal isOpen={this.state.gallery.single} size="small" type="gallery" theme="white"
            images={[require("../../assets/images/placeholder.png")]}
            toggle={() => { this.toggleModal("gallery.single"); }}/>
        </View>
      </Section>
    );
  }
}

export default Modals;