import React, { Component } from "react";
import { View } from "react-native";

import Section from "../components/Section";
import PageView from "./PageView";

import PackenUiInfoAction from "../components/PackenUiInfoAction";

class Avatars extends Component {
  constructor(props) {
    super(props);
  }

  mockCallback = () => {
    /* console.log("Pressed"); */
    return true;
  };

  render() {
    return (
      <PageView>
        <Section title="Info Actions">
          <View style={{ marginTop: 20 }}>
            <PackenUiInfoAction
              theme="primary"
              title="Sólo un título"
              callback={this.mockCallback}
              img="document_file"
              icon={{
                name: "play",
                size: 14
              }}
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <PackenUiInfoAction
              theme="primary"
              title="Subir documento"
              subtitle="Pendiente"
              callback={this.mockCallback}
              img="document_file"
              icon={{
                name: "play",
                size: 14
              }}
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <PackenUiInfoAction
              theme="success"
              title="Cara 1"
              caption="(Lado de la fotografía)"
              subtitle="Listo"
              callback={this.mockCallback}
              img="document_front"
              icon={{
                name: "play",
                size: 14
              }}
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <PackenUiInfoAction
              theme="danger"
              title="Cara 2"
              subtitle="Error al cargar"
              callback={this.mockCallback}
              img="document_back"
              icon={{
                name: "play",
                size: 14
              }}
            />
          </View>
        </Section>
      </PageView>
    );
  }
}

export default Avatars;