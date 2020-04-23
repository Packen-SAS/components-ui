import React, { Component } from "react";
import { View } from "react-native";

import Section from "../components/Section";
import PageView from "./PageView";

import PackenUiLoaderButton from "../components/PackenUiLoaderButton";
import PackenUiButton from "../components/PackenUiButton";
import PackenUiDivider from "../components/PackenUiDivider";

class Avatars extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDone: false,
      label: "Cargando..."
    }
  }

  mockCallback = () => { return true; }

  finish = () => {
    this.setState({
      isDone: true,
      label: "Listo!"
    });
    return true;
  }

  render() {
    return (
      <PageView>
        <Section title="Loader Buttons">
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <View style={{ marginRight: 5 }}>
              <PackenUiLoaderButton
                type="icon"
                level="primary"
                size="large"
                isDone={this.state.isDone}
                callback={this.mockCallback}
              />
            </View>
            <View style={{ marginRight: 5 }}>
              <PackenUiLoaderButton
                type="icon"
                level="secondary"
                size="medium"
                isDone={this.state.isDone}
                callback={this.mockCallback}
              />
            </View>
            <View style={{ marginRight: 5 }}>
              <PackenUiLoaderButton
                type="icon"
                level="tertiary"
                size="small"
                isDone={this.state.isDone}
                callback={this.mockCallback}
              />
            </View>
            <View style={{ marginRight: 5 }}>
              <PackenUiLoaderButton
                type="icon"
                level="ghost"
                size="tiny"
                isDone={this.state.isDone}
                callback={this.mockCallback}
              />
            </View>
          </View>
          <View style={{ marginTop: 10 }}>
            <PackenUiLoaderButton
              type="regular"
              level="secondary"
              size="large"
              isDone={this.state.isDone}
              callback={this.mockCallback}
            >{this.state.label}</PackenUiLoaderButton>
          </View>
          <View style={{ marginTop: 20 }}>
            <PackenUiLoaderButton
              type="regular"
              level="primary"
              size="medium"
              isDone={this.state.isDone}
              callback={this.mockCallback}
            >{this.state.label}</PackenUiLoaderButton>
          </View>
          <View style={{ marginTop: 10 }}>
            <PackenUiLoaderButton
              type="regular"
              level="tertiary"
              size="small"
              isDone={this.state.isDone}
              callback={this.mockCallback}
            >{this.state.label}</PackenUiLoaderButton>
          </View>
          <View style={{ marginTop: 10 }}>
            <PackenUiLoaderButton
              type="regular"
              level="ghost"
              size="tiny"
              isDone={this.state.isDone}
              callback={this.mockCallback}
            >{this.state.label}</PackenUiLoaderButton>
          </View>
          <PackenUiDivider size={1} type="light" margin={{ top: 20, bottom: 20 }} />
          <PackenUiButton
            type="regular"
            level="secondary"
            size="small"
            callback={this.finish}
          >Finish</PackenUiButton>
        </Section>
      </PageView>
    );
  }
}

export default Avatars;