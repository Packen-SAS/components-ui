import React from "react";
import { storiesOf } from "@storybook/react-native";

import Wrapper from "../wrapper";
import PackenUiSelectionButtons from "../../app/components/PackenUiSelectionButtons";

storiesOf("PackenUiSelectionButtons", module)
  .add("Label, single, altStyle", () => (
    <Wrapper
      title="PackenUiSelectionButtons"
      description="SelectionButtons con altStyle, tipo label y selection single."
      code={
`<PackenUiSelectionButtons
  type="label"
  selection="single"
  itemsPerRow={4}
  name="selectionButtons1"
  altStyle
  onNewSelection={() => true}
  items={[
    { label: "A1", value: "A1", isSelected: false },
    { label: "A2", value: "A2", isSelected: false },
    { label: "B1", value: "B1", isSelected: false },
    { label: "B2", value: "B2", isSelected: false },
    { label: "B3", value: "B3", isSelected: false },
    { label: "C1", value: "C1", isSelected: true },
    { label: "C2", value: "C2", isSelected: false },
    { label: "C3", value: "C3", isSelected: false }
  ]}
/>`
      }
    >
      <PackenUiSelectionButtons
        type="label"
        selection="single"
        itemsPerRow={4}
        name="selectionButtons1"
        altStyle
        onNewSelection={() => true}
        items={[
          { label: "A1", value: "A1", isSelected: false },
          { label: "A2", value: "A2", isSelected: false },
          { label: "B1", value: "B1", isSelected: false },
          { label: "B2", value: "B2", isSelected: false },
          { label: "B3", value: "B3", isSelected: false },
          { label: "C1", value: "C1", isSelected: true },
          { label: "C2", value: "C2", isSelected: false },
          { label: "C3", value: "C3", isSelected: false }
        ]}
      />
    </Wrapper>
  ))
  .add("Image, multiple", () => (
    <Wrapper
      title="PackenUiSelectionButtons"
      description="SelectionButtons tipo image y selection multiple."
      code={
`<PackenUiSelectionButtons
  type="image"
  selection="multiple"
  itemsPerRow={2}
  name="selectionButtons2"
  onNewSelection={() => true}
  items={[
    {
      image: {
        default: {
          src: require("../../assets/images/i-propietario-default.png"),
          width: 26,
          height: 45
        },
        active: {
          src: require("../../assets/images/i-propietario.png"),
          width: 51,
          height: 45
        }
      },
      label: "SÍ",
      value: true,
      isSelected: true
    },
    {
      image: {
        default: {
          src: require("../../assets/images/i-propietario-default.png"),
          width: 26,
          height: 45
        },
        active: {
          src: require("../../assets/images/i-propietario.png"),
          width: 51,
          height: 45
        }
      },
      label: "NO",
      value: false,
      isSelected: false
    }
  ]}
/>`
      }
    >
      <PackenUiSelectionButtons
        type="image"
        selection="multiple"
        itemsPerRow={2}
        name="selectionButtons2"
        onNewSelection={() => true}
        items={[
          {
            image: {
              default: {
                src: require("../../assets/images/i-propietario-default.png"),
                width: 26,
                height: 45
              },
              active: {
                src: require("../../assets/images/i-propietario.png"),
                width: 51,
                height: 45
              }
            },
            label: "SÍ",
            value: true,
            isSelected: true
          },
          {
            image: {
              default: {
                src: require("../../assets/images/i-propietario-default.png"),
                width: 26,
                height: 45
              },
              active: {
                src: require("../../assets/images/i-propietario.png"),
                width: 51,
                height: 45
              }
            },
            label: "NO",
            value: false,
            isSelected: false
          }
        ]}
      />
    </Wrapper>
  ));