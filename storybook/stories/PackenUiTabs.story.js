import React from "react";
import { storiesOf } from "@storybook/react-native";

import Wrapper from "../wrapper";
import PackenUiTabs from "../../app/components/PackenUiTabs";

storiesOf("PackenUiTabs", module)
  .add("Packen arrow", () => (
    <Wrapper
      full
      title="PackenUiTabs"
      description="Tabs con las flechas de Packen."
      code={
`<PackenUiTabs
  items={[
    {
      label: "Button",
      icon: "»",
      callback: () => true
    },
    {
      label: "Button",
      icon: "»",
      callback: () => true
    },
    {
      label: "Button",
      icon: "»",
      callback: () => true
    }
  ]}
  name="tabs1"
  activeIndex={0}
  onTabChange={() => true}
/>`
      }
    >
      <PackenUiTabs
        items={[
          {
            label: "Button",
            icon: "»",
            callback: () => true
          },
          {
            label: "Button",
            icon: "»",
            callback: () => true
          },
          {
            label: "Button",
            icon: "»",
            callback: () => true
          }
        ]}
        name="tabs1"
        activeIndex={0}
        onTabChange={() => true}
      />
    </Wrapper>
  ))
  .add("Default without icon", () => (
    <Wrapper
      full
      title="PackenUiTabs"
      description="Tabs sólo con texto."
      code={
`<PackenUiTabs
  items={[
    {
      label: "Button",
      callback: () => true
    },
    {
      label: "Button",
      callback: () => true
    },
    {
      label: "Button",
      callback: () => true
    }
  ]}
  name="tabs2"
  activeIndex={1}
  onTabChange={() => true}
/>`
      }
    >
      <PackenUiTabs
        items={[
          {
            label: "Button",
            callback: () => true
          },
          {
            label: "Button",
            callback: () => true
          },
          {
            label: "Button",
            callback: () => true
          }
        ]}
        name="tabs2"
        activeIndex={1}
        onTabChange={() => true}
      />
    </Wrapper>
  ))
  .add("Default with icon", () => (
    <Wrapper
      full
      title="PackenUiTabs"
      description="Tabs con ícono."
      code={
`<PackenUiTabs
  items={[
    {
      label: "Button",
      icon: "clock",
      callback: () => true
    },
    {
      label: "Button",
      icon: "rotate-cw",
      callback: () => true
    },
    {
      label: "Button",
      icon: "check-circle",
      callback: () => true
    }
  ]}
  name="tabs3"
  activeIndex={2}
  onTabChange={() => true}
/>`
      }
    >
      <PackenUiTabs
        items={[
          {
            label: "Button",
            icon: "clock",
            callback: () => true
          },
          {
            label: "Button",
            icon: "rotate-cw",
            callback: () => true
          },
          {
            label: "Button",
            icon: "check-circle",
            callback: () => true
          }
        ]}
        name="tabs3"
        activeIndex={2}
        onTabChange={() => true}
      />
    </Wrapper>
  ));