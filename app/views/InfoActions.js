import React, { Component } from "react";
import { View } from "react-native";

import Section from "../components/Section";


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
      <Section title="Info Actions">
        <View style={{ marginTop: 20 }}>
          <PackenUiInfoAction
            theme="primary"
            title="Sólo un título"
            callback={this.mockCallback}
            img={{
              src: require("../../assets/images/i-doc.png"),
              height: 23,
              width: 19
            }}
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
            img={{
              src: require("../../assets/images/i-doc.png"),
              height: 23,
              width: 19
            }}
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
            img={{
              src: require("../../assets/images/i-cara-1.png"),
              height: 19,
              width: 19
            }}
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
            img={{
              src: require("../../assets/images/i-cara-1.png"),
              height: 19,
              width: 19
            }}
            icon={{
              name: "play",
              size: 14
            }}
          />
        </View>
      </Section>
    );
  }
}

export default Avatars;