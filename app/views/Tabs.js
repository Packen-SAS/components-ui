import React, { Component } from "react";
import { View } from "react-native";

import Section from "../components/Section";
import PageView from "./PageView";
import Buttons from "./Buttons";
import Avatars from "./Avatars";
import InfoActions from "./InfoActions";

import PackenUiTabs from "../components/PackenUiTabs";

class Tabs extends Component {
  constructor(props) {
    super(props);
  }

  mockCallback = () => true;

  onTabChange = (name, newIndex) => true;

  render() {
    return (
      <PageView>
        <Section title="Tabs">
          <View style={{ marginTop: 20 }}>
            <View style={{ marginBottom: 10 }}>
              <PackenUiTabs
                items={[
                  {
                    icon: "»",
                    label: "Buttons",
                    view: <Buttons/>,
                    callback: this.mockCallback,
                  },
                  {
                    icon: "»",
                    label: "Avatars",
                    view: <Avatars/>,
                    callback: this.mockCallback
                  },
                  {
                    icon: "»",
                    label: "InfoActions",
                    view: <InfoActions/>,
                    callback: this.mockCallback
                  }
                ]}
                name="tabs1"
                activeIndex={0}
                onTabChange={this.onTabChange}
              />
            </View>
            {/* <View style={{ marginBottom: 10 }}>
              <PackenUiTabs
                items={[
                  {
                    label: "Button",
                    callback: this.mockCallback
                  },
                  {
                    label: "Button",
                    callback: this.mockCallback
                  },
                  {
                    label: "Button",
                    callback: this.mockCallback
                  }
                ]}
                name="tabs2"
                activeIndex={1}
                onTabChange={this.onTabChange}
              />
            </View>
            <View style={{ marginBottom: 10 }}>
              <PackenUiTabs
                items={[
                  {
                    label: "Button",
                    icon: "clock",
                    callback: this.mockCallback
                  },
                  {
                    label: "Button",
                    icon: "rotate-cw",
                    callback: this.mockCallback
                  },
                  {
                    label: "Button",
                    icon: "check-circle",
                    callback: this.mockCallback
                  }
                ]}
                name="tabs3"
                activeIndex={2}
                onTabChange={this.onTabChange}
              />
            </View> */}
          </View>
        </Section>
      </PageView>
    );
  }
}

export default Tabs;