import React, { Component } from "react";
import { View } from "react-native";

import Section from "../components/Section";
import PageView from "./PageView";

import PackenUiAvatar from "../components/PackenUiAvatar";

class Avatars extends Component {
  constructor(props) {
    super(props);
  }

  mockCallback = () => true;

  render() {
    return (
      <PageView>
        <Section title="Avatars">
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <View style={{ marginRight: 10 }}>
              <PackenUiAvatar size="tiny" src={require("../../assets/images/avatar.jpg")} />
            </View>
            <View style={{ marginRight: 10 }}>
              <PackenUiAvatar size="tiny" callback={this.mockCallback} />
            </View>
          </View>
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <View style={{ marginRight: 10 }}>
              <PackenUiAvatar size="small" src={require("../../assets/images/avatar.jpg")} />
            </View>
            <View style={{ marginRight: 10 }}>
              <PackenUiAvatar size="small" callback={this.mockCallback} />
            </View>
          </View>
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <View style={{ marginRight: 10 }}>
              <PackenUiAvatar size="medium" src={require("../../assets/images/avatar.jpg")} />
            </View>
            <View style={{ marginRight: 10 }}>
              <PackenUiAvatar size="medium" callback={this.mockCallback} />
            </View>
          </View>
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <View style={{ marginRight: 10 }}>
              <PackenUiAvatar size="large" src={require("../../assets/images/avatar.jpg")} />
            </View>
            <View style={{ marginRight: 10 }}>
              <PackenUiAvatar size="large" callback={this.mockCallback} />
            </View>
          </View>
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <View style={{ marginRight: 10 }}>
              <PackenUiAvatar size="giant" src={require("../../assets/images/avatar.jpg")} />
            </View>
            <View style={{ marginRight: 10 }}>
              <PackenUiAvatar size="giant" callback={this.mockCallback} />
            </View>
          </View>
        </Section>
      </PageView>
    );
  }
}

export default Avatars;