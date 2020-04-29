import React, { Component } from "react";
import { View } from "react-native";

import Section from "../components/Section";
import PageView from "./PageView";

import PackenUiAlert from "../components/PackenUiAlert";

class ServiceStatus extends Component {
  constructor(props) {
    super(props);
  }

  onCloseHandler = () => true;

  render() {
    return (
      <PageView>
        <Section title="Alerts">
          <View style={{ marginTop: 20 }}>
            <PackenUiAlert
              type="timed"
              countdown={5000}
              theme="default"
              text={{
                main: "Alerta gris para información default",
                preset: "c2"
              }}
              onClose={this.onCloseHandler}
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <PackenUiAlert
              type="static"
              theme="info"
              text={{
                title: "Info",
                main: "Alerta morada para información de interés",
                preset: "c2"
              }}
              onClose={this.onCloseHandler}
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <PackenUiAlert
              type="static"
              theme="primary"
              text={{
                title: "Primary",
                main: "Alerta azul",
                preset: "c2"
              }}
              onClose={this.onCloseHandler}
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <PackenUiAlert
              type="static"
              theme="success"
              text={{
                title: "Aprobado",
                main: "Alerta positiva para habilitar procesos o aprobar elementos",
                preset: "c2"
              }}
              onClose={this.onCloseHandler}
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <PackenUiAlert
              type="static"
              theme="warning"
              text={{
                title: "Alerta",
                main: "Alerta amarilla para información no bloqueante o de proceso",
                preset: "c1"
              }}
              onClose={this.onCloseHandler}
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <PackenUiAlert
              type="static"
              theme="danger"
              text={{
                title: "Error",
                main: "Alerta roja para información faltante o errores en el proceso, es bloqueante",
                preset: "c2"
              }}
              onClose={this.onCloseHandler}
            />
          </View>
        </Section>
      </PageView>
    );
  }
}

export default ServiceStatus;