import React, { Component } from "react";
import { View } from "react-native";

import Section from "../components/Section";


import PackenUiMapPin from "../components/PackenUiMapPin";

class Dividers extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Section title="Map pins">
        <View style={{ marginTop: 20 }}>
          <PackenUiMapPin
            type="icon"
            sub={{
              icon: "box"
            }}
            dotPosition="top"
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <PackenUiMapPin
            type="icon"
            sub={{
              icon: "box"
            }}
            dotPosition="right"
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <PackenUiMapPin
            type="icon"
            sub={{
              icon: "box"
            }}
            dotPosition="bottom"
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <PackenUiMapPin
            type="icon"
            sub={{
              icon: "box"
            }}
            dotPosition="left"
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <PackenUiMapPin
            type="info"
            theme="primary"
            sub={{
              icon: "box",
              position: "left"
            }}
            main={{
              label: "DE",
              text: "Calle 71 # 13 - 81"
            }}
            dotPosition="bottom"
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <PackenUiMapPin
            type="info"
            theme="primary"
            sub={{
              icon: "box",
              position: "left"
            }}
            main={{
              label: "DE",
              text: "Calle 71 # 13 - 81"
            }}
            dotPosition="left"
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <PackenUiMapPin
            type="info"
            theme="primary"
            sub={{
              icon: "box",
              position: "left"
            }}
            main={{
              label: "DE",
              text: "Calle 71 # 13 - 81"
            }}
            dotPosition="top"
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <PackenUiMapPin
            type="info"
            theme="primary"
            sub={{
              icon: "box",
              position: "right"
            }}
            main={{
              label: "DE",
              text: "Calle 71 # 13 - 81"
            }}
            dotPosition="bottom"
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <PackenUiMapPin
            type="info"
            theme="primary"
            sub={{
              icon: "box",
              position: "right"
            }}
            main={{
              label: "DE",
              text: "Calle 71 # 13 - 81"
            }}
            dotPosition="right"
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <PackenUiMapPin
            type="info"
            theme="primary"
            sub={{
              icon: "box",
              position: "right"
            }}
            main={{
              label: "DE",
              text: "Calle 71 # 13 - 81"
            }}
            dotPosition="top"
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <PackenUiMapPin
            type="info"
            theme="white"
            sub={{
              character: "A",
              position: "left"
            }}
            main={{
              label: "DE",
              text: "Calle 71 # 13 - 81"
            }}
            dotPosition="top"
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <PackenUiMapPin
            type="info"
            theme="white"
            sub={{
              character: "A",
              position: "left"
            }}
            main={{
              label: "DE",
              text: "Calle 71 # 13 - 81"
            }}
            dotPosition="left"
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <PackenUiMapPin
            type="info"
            theme="white"
            sub={{
              character: "A",
              position: "left"
            }}
            main={{
              label: "DE",
              text: "Calle 71 # 13 - 81"
            }}
            dotPosition="bottom"
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <PackenUiMapPin
            type="info"
            theme="white"
            sub={{
              character: "B",
              position: "right"
            }}
            main={{
              label: "DE",
              text: "Carrera 12 # 34A - 56"
            }}
            dotPosition="top"
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <PackenUiMapPin
            type="info"
            theme="white"
            sub={{
              character: "B",
              position: "right"
            }}
            main={{
              label: "DE",
              text: "Carrera 12 # 34A - 56"
            }}
            dotPosition="right"
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <PackenUiMapPin
            type="info"
            theme="white"
            sub={{
              character: "B",
              position: "right"
            }}
            main={{
              label: "DE",
              text: "Carrera 12 # 34A - 56"
            }}
            dotPosition="bottom"
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <PackenUiMapPin
            type="info"
            theme="white_primary"
            sub={{
              icon: "rotate-cw",
              position: "right"
            }}
            main={{
              label: "A",
              text: "15 min."
            }}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <PackenUiMapPin
            type="info"
            theme="white_primary"
            sub={{
              icon: "rotate-cw",
              position: "left"
            }}
            main={{
              label: "A",
              text: "15 min."
            }}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <PackenUiMapPin
            type="info"
            theme="primary"
            main={{
              label: "DE",
              text: "Calle 71 # 13 - 81"
            }}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <PackenUiMapPin
            type="info"
            theme="white"
            main={{
              label: "DE",
              text: "Calle 71 # 13 - 81"
            }}
          />
        </View>
      </Section>
    );
  }
}

export default Dividers;