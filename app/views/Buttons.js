import React, { Component } from "react";
import { View } from "react-native";

import Section from "../components/Section";

import PackenUiButton from "../components/PackenUiButton";

class Buttons extends Component {
  constructor(props) {
    super(props);
  }

  mockCallback = () => { return true; }

  render() {
    return (
      <>
        <Section title="Buttons Primary">
          <View style={{ marginTop: 20 }}>
            <View style={{ marginBottom: 10 }}>
              <PackenUiButton
                icon={{ name: "arrow-right-circle" }}
                type="icon"
                level="primary"
                size="tiny"
                callback={this.mockCallback} />
            </View>
            <View style={{ marginBottom: 10 }}>
              <PackenUiButton
                icon={{ name: "arrow-right-circle" }}
                type="icon"
                level="primary"
                size="small"
                callback={this.mockCallback} />
            </View>
            <View style={{ marginBottom: 10 }}>
              <PackenUiButton
                icon={{ name: "arrow-right-circle" }}
                type="icon"
                level="primary"
                size="medium"
                callback={this.mockCallback} />
            </View>
            <View style={{ marginBottom: 10 }}>
              <PackenUiButton
                icon={{ name: "arrow-right-circle" }}
                type="icon"
                level="primary"
                size="large"
                callback={this.mockCallback} />
            </View>
            <View style={{ marginBottom: 10 }}>
              <PackenUiButton
                icon={{ name: "arrow-right-circle" }}
                type="icon"
                level="primary"
                size="giant"
                callback={this.mockCallback}
                isDisabled />
            </View>
            <View style={{ marginBottom: 10 }}>
              <PackenUiButton
                icon={{ name: "arrow-right", position: "right" }}
                type="regular"
                level="primary"
                size="tiny"
                callback={this.mockCallback}>Tiny</PackenUiButton>
            </View>
            <View style={{ marginBottom: 10 }}>
              <PackenUiButton
                icon={{ name: "arrow-left", position: "left" }}
                type="regular"
                level="primary"
                size="small"
                callback={this.mockCallback}>Small</PackenUiButton>
            </View>
            <View style={{ marginBottom: 10 }}>
              <PackenUiButton
                icon={{ name: "arrow-right", position: "right" }}
                type="regular"
                level="primary"
                size="medium"
                callback={this.mockCallback}>Medium</PackenUiButton>
            </View>
            <View style={{ marginBottom: 10 }}>
              <PackenUiButton
                icon={{ name: "arrow-left", position: "left" }}
                type="regular"
                level="primary"
                size="large"
                callback={this.mockCallback}>Large</PackenUiButton>
            </View>
            <View style={{ marginBottom: 10 }}>
              <PackenUiButton
                icon={{ name: "arrow-right", position: "right" }}
                type="regular"
                level="primary"
                size="giant"
                callback={this.mockCallback}
                isDisabled>Giant</PackenUiButton>
            </View>
          </View>
        </Section>
        <Section title="Buttons Secondary">
          <View style={{ marginTop: 20 }}>
            <View style={{ marginBottom: 10 }}>
              <PackenUiButton
                icon={{ name: "arrow-right-circle" }}
                type="icon"
                level="secondary"
                size="tiny"
                callback={this.mockCallback} />
            </View>
            <View style={{ marginBottom: 10 }}>
              <PackenUiButton
                icon={{ name: "arrow-right-circle" }}
                type="icon"
                level="secondary"
                size="small"
                callback={this.mockCallback} />
            </View>
            <View style={{ marginBottom: 10 }}>
              <PackenUiButton
                icon={{ name: "arrow-right-circle" }}
                type="icon"
                level="secondary"
                size="medium"
                callback={this.mockCallback} />
            </View>
            <View style={{ marginBottom: 10 }}>
              <PackenUiButton
                icon={{ name: "arrow-right-circle" }}
                type="icon"
                level="secondary"
                size="large"
                callback={this.mockCallback} />
            </View>
            <View style={{ marginBottom: 10 }}>
              <PackenUiButton
                icon={{ name: "arrow-right-circle" }}
                type="icon"
                level="secondary"
                size="giant"
                callback={this.mockCallback}
                isDisabled />
            </View>
            <View style={{ marginBottom: 10 }}>
              <PackenUiButton
                icon={{ name: "arrow-right", position: "right" }}
                type="regular"
                level="secondary"
                size="tiny"
                callback={this.mockCallback}>Tiny</PackenUiButton>
            </View>
            <View style={{ marginBottom: 10 }}>
              <PackenUiButton
                icon={{ name: "arrow-left", position: "left" }}
                type="regular"
                level="secondary"
                size="small"
                callback={this.mockCallback}>Small</PackenUiButton>
            </View>
            <View style={{ marginBottom: 10 }}>
              <PackenUiButton
                icon={{ name: "arrow-right", position: "right" }}
                type="regular"
                level="secondary"
                size="medium"
                callback={this.mockCallback}>Medium</PackenUiButton>
            </View>
            <View style={{ marginBottom: 10 }}>
              <PackenUiButton
                icon={{ name: "arrow-left", position: "left" }}
                type="regular"
                level="secondary"
                size="large"
                callback={this.mockCallback}>Large</PackenUiButton>
            </View>
            <View style={{ marginBottom: 10 }}>
              <PackenUiButton
                icon={{ name: "arrow-right", position: "right" }}
                type="regular"
                level="secondary"
                size="giant"
                callback={this.mockCallback}
                isDisabled>Giant</PackenUiButton>
            </View>
          </View>
        </Section>
        <Section title="Buttons Tertiary">
          <View style={{ marginTop: 20 }}>
            <View style={{ marginBottom: 10 }}>
              <PackenUiButton
                icon={{ name: "arrow-right-circle" }}
                type="icon"
                level="tertiary"
                size="tiny"
                callback={this.mockCallback} />
            </View>
            <View style={{ marginBottom: 10 }}>
              <PackenUiButton
                icon={{ name: "arrow-right-circle" }}
                type="icon"
                level="tertiary"
                size="small"
                callback={this.mockCallback} />
            </View>
            <View style={{ marginBottom: 10 }}>
              <PackenUiButton
                icon={{ name: "arrow-right-circle" }}
                type="icon"
                level="tertiary"
                size="medium"
                callback={this.mockCallback} />
            </View>
            <View style={{ marginBottom: 10 }}>
              <PackenUiButton
                icon={{ name: "arrow-right-circle" }}
                type="icon"
                level="tertiary"
                size="large"
                callback={this.mockCallback} />
            </View>
            <View style={{ marginBottom: 10 }}>
              <PackenUiButton
                icon={{ name: "arrow-right-circle" }}
                type="icon"
                level="tertiary"
                size="giant"
                callback={this.mockCallback}
                isDisabled />
            </View>
            <View style={{ marginBottom: 10 }}>
              <PackenUiButton
                icon={{ name: "arrow-right", position: "right" }}
                type="regular"
                level="tertiary"
                size="tiny"
                callback={this.mockCallback}>Tiny</PackenUiButton>
            </View>
            <View style={{ marginBottom: 10 }}>
              <PackenUiButton
                icon={{ name: "arrow-left", position: "left" }}
                type="regular"
                level="tertiary"
                size="small"
                callback={this.mockCallback}>Small</PackenUiButton>
            </View>
            <View style={{ marginBottom: 10 }}>
              <PackenUiButton
                icon={{ name: "arrow-right", position: "right" }}
                type="regular"
                level="tertiary"
                size="medium"
                callback={this.mockCallback}>Medium</PackenUiButton>
            </View>
            <View style={{ marginBottom: 10 }}>
              <PackenUiButton
                icon={{ name: "arrow-left", position: "left" }}
                type="regular"
                level="tertiary"
                size="large"
                callback={this.mockCallback}>Large</PackenUiButton>
            </View>
            <View style={{ marginBottom: 10 }}>
              <PackenUiButton
                icon={{ name: "arrow-right", position: "right" }}
                type="regular"
                level="tertiary"
                size="giant"
                callback={this.mockCallback}
                isDisabled>Giant</PackenUiButton>
            </View>
          </View>
        </Section>
        <Section title="Buttons Ghost">
          <View style={{ marginTop: 20 }}>
            <View style={{ marginBottom: 10 }}>
              <PackenUiButton
                icon={{ name: "arrow-right-circle" }}
                type="icon"
                level="ghost"
                size="tiny"
                callback={this.mockCallback} />
            </View>
            <View style={{ marginBottom: 10 }}>
              <PackenUiButton
                icon={{ name: "arrow-right-circle" }}
                type="icon"
                level="ghost"
                size="small"
                callback={this.mockCallback} />
            </View>
            <View style={{ marginBottom: 10 }}>
              <PackenUiButton
                icon={{ name: "arrow-right-circle" }}
                type="icon"
                level="ghost"
                size="medium"
                callback={this.mockCallback} />
            </View>
            <View style={{ marginBottom: 10 }}>
              <PackenUiButton
                icon={{ name: "arrow-right-circle" }}
                type="icon"
                level="ghost"
                size="large"
                callback={this.mockCallback} />
            </View>
            <View style={{ marginBottom: 10 }}>
              <PackenUiButton
                icon={{ name: "arrow-right-circle" }}
                type="icon"
                level="ghost"
                size="giant"
                callback={this.mockCallback}
                isDisabled />
            </View>
            <View style={{ marginBottom: 10 }}>
              <PackenUiButton
                icon={{ name: "arrow-right", position: "right" }}
                type="regular"
                level="ghost"
                size="tiny"
                callback={this.mockCallback}>Tiny</PackenUiButton>
            </View>
            <View style={{ marginBottom: 10 }}>
              <PackenUiButton
                icon={{ name: "arrow-left", position: "left" }}
                type="regular"
                level="ghost"
                size="small"
                callback={this.mockCallback}>Small</PackenUiButton>
            </View>
            <View style={{ marginBottom: 10 }}>
              <PackenUiButton
                icon={{ name: "arrow-right", position: "right" }}
                type="regular"
                level="ghost"
                size="medium"
                callback={this.mockCallback}>Medium</PackenUiButton>
            </View>
            <View style={{ marginBottom: 10 }}>
              <PackenUiButton
                icon={{ name: "arrow-left", position: "left" }}
                type="regular"
                level="ghost"
                size="large"
                callback={this.mockCallback}>Large</PackenUiButton>
            </View>
            <View style={{ marginBottom: 10 }}>
              <PackenUiButton
                icon={{ name: "arrow-right", position: "right" }}
                type="regular"
                level="ghost"
                size="giant"
                callback={this.mockCallback}
                isDisabled>Giant</PackenUiButton>
            </View>
          </View>
        </Section>
        <Section title="Buttons Danger">
          <View style={{ marginTop: 20 }}>
            <View style={{ marginBottom: 10 }}>
              <PackenUiButton
                icon={{ name: "arrow-right-circle" }}
                type="icon"
                level="danger"
                size="tiny"
                callback={this.mockCallback} />
            </View>
            <View style={{ marginBottom: 10 }}>
              <PackenUiButton
                icon={{ name: "arrow-right-circle" }}
                type="icon"
                level="danger"
                size="small"
                callback={this.mockCallback} />
            </View>
            <View style={{ marginBottom: 10 }}>
              <PackenUiButton
                icon={{ name: "arrow-right-circle" }}
                type="icon"
                level="danger"
                size="medium"
                callback={this.mockCallback} />
            </View>
            <View style={{ marginBottom: 10 }}>
              <PackenUiButton
                icon={{ name: "arrow-right-circle" }}
                type="icon"
                level="danger"
                size="large"
                callback={this.mockCallback} />
            </View>
            <View style={{ marginBottom: 10 }}>
              <PackenUiButton
                icon={{ name: "arrow-right-circle" }}
                type="icon"
                level="danger"
                size="giant"
                callback={this.mockCallback}
                isDisabled />
            </View>
            <View style={{ marginBottom: 10 }}>
              <PackenUiButton
                icon={{ name: "arrow-right", position: "right" }}
                type="regular"
                level="danger"
                size="tiny"
                callback={this.mockCallback}>Tiny</PackenUiButton>
            </View>
            <View style={{ marginBottom: 10 }}>
              <PackenUiButton
                icon={{ name: "arrow-left", position: "left" }}
                type="regular"
                level="danger"
                size="small"
                callback={this.mockCallback}>Small</PackenUiButton>
            </View>
            <View style={{ marginBottom: 10 }}>
              <PackenUiButton
                icon={{ name: "arrow-right", position: "right" }}
                type="regular"
                level="danger"
                size="medium"
                callback={this.mockCallback}>Medium</PackenUiButton>
            </View>
            <View style={{ marginBottom: 10 }}>
              <PackenUiButton
                icon={{ name: "arrow-left", position: "left" }}
                type="regular"
                level="danger"
                size="large"
                callback={this.mockCallback}>Large</PackenUiButton>
            </View>
            <View style={{ marginBottom: 10 }}>
              <PackenUiButton
                icon={{ name: "arrow-right", position: "right" }}
                type="regular"
                level="danger"
                size="giant"
                callback={this.mockCallback}
                isDisabled>Giant</PackenUiButton>
            </View>
          </View>
        </Section>
      </>
    );
  }
}

export default Buttons;