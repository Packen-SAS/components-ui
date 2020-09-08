import React, { Component } from "react";
import { View } from "react-native";

import Section from "../components/Section";
import PageView from "./PageView";

import PackenUiButton from "../components/PackenUiButton";
import PackenUiCamera from "../components/PackenUiCamera";

class Cameras extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      regular: false,
      document: false,
      avatar: false
    }
  }

  open = name => {
    this.setState({
      [name]: true
    });
  }

  close = name => {
    this.setState({
      [name]: false
    });
  }

  render() {
    return (
      <PageView>
        <Section title="Cameras">
          <View style={{ marginTop: 20 }}>
            <View style={{ marginBottom: 10 }}>
              <PackenUiButton callback={() => { this.open("regular"); }}>Regular</PackenUiButton>
            </View>
            <View style={{ marginBottom: 10 }}>
              <PackenUiButton callback={() => { this.open("document"); }}>Document</PackenUiButton>
            </View>
            <View style={{ marginBottom: 10 }}>
              <PackenUiButton callback={() => { this.open("avatar"); }}>Avatar</PackenUiButton>
            </View>
          </View>
        </Section>
        <View>
          <PackenUiCamera i18n={{ placeholders: { upload_image: "Imagen cargada" } }} dismiss={() => { this.close("regular"); }} VISIBLE={this.state.regular} />
          <PackenUiCamera i18n={{ placeholders: { upload_image: "Imagen cargada" } }} dismiss={() => { this.close("document"); }} VISIBLE={this.state.document} MODE="document" />
          <PackenUiCamera i18n={{ placeholders: { upload_image: "Imagen cargada" } }} dismiss={() => { this.close("avatar"); }} VISIBLE={this.state.avatar} MODE="avatar" />
        </View>
      </PageView>
    );
  }
}

export default Cameras;