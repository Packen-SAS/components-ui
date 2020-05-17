import React from "react";
import { storiesOf } from "@storybook/react-native";

import { genKey } from "../../app/utils";
import Colors from "../../app/styles/abstracts/colors";
import Icon from "react-native-vector-icons/dist/Feather";
import Wrapper from "../wrapper";
import PackenUiText from "../../app/components/PackenUiText";
import PackenUiAvatar from "../../app/components/PackenUiAvatar";
import PackenUiList from "../../app/components/PackenUiList";

const items = [
  {
    size: "large",
    subtitle: "Tipo de vehículo",
    input: {
      isDropdown: true,
      nonEditable: true,
      isOpen: false,
      value: "",
      placeholder: "Carry",
      onChange: () => true,
      list: {
        config: {
          size: "medium",
          checkedIcon: "check",
          selectionType: "single"
        },
        items: [
          {
            key: genKey(),
            left: false,
            right: false,
            value: "Bogotá, D.C.",
            isSelected: false,
            main: (<PackenUiText style={{ color: Colors.basic.independence.dft }}>Bogotá, D.C.</PackenUiText>)
          },
          {
            key: genKey(),
            left: false,
            right: false,
            value: "Test",
            isSelected: false,
            main: (<PackenUiText style={{ color: Colors.basic.independence.dft }}>Test</PackenUiText>)
          },
          {
            key: genKey(),
            left: false,
            right: false,
            value: "Test 2",
            isSelected: false,
            main: (<PackenUiText style={{ color: Colors.basic.independence.dft }}>Test 2</PackenUiText>)
          },
          {
            key: genKey(),
            left: false,
            right: false,
            value: "Test 3",
            isSelected: false,
            main: (<PackenUiText style={{ color: Colors.basic.independence.dft }}>Test 3</PackenUiText>)
          },
          {
            key: genKey(),
            left: false,
            right: false,
            value: "Lorem ipsum dolor sit amet consectetur adipiscing elit!",
            isSelected: false,
            main: (<PackenUiText style={{ color: Colors.basic.independence.dft }}>Lorem ipsum dolor sit amet consectetur adipiscing elit!</PackenUiText>)
          },
          {
            key: genKey(),
            left: false,
            right: false,
            value: "Medellín",
            isSelected: false,
            main: (<PackenUiText style={{ color: Colors.basic.independence.dft }}>Medellín</PackenUiText>)
          },
          {
            key: genKey(),
            left: false,
            right: false,
            value: "Bucaramanga",
            isSelected: false,
            isDisabled: true,
            main: (<PackenUiText style={{ color: Colors.basic.independence.dft }}>Bucaramanga</PackenUiText>)
          },
          {
            key: genKey(),
            left: false,
            right: false,
            value: "Santa Marta",
            isSelected: false,
            main: (<PackenUiText style={{ color: Colors.basic.independence.dft }}>Santa Marta</PackenUiText>)
          },
          {
            key: genKey(),
            left: false,
            right: false,
            value: "Cali",
            isSelected: false,
            main: (<PackenUiText style={{ color: Colors.basic.independence.dft }}>Cali</PackenUiText>)
          },
          {
            key: genKey(),
            left: false,
            right: false,
            value: "Cartagena",
            isSelected: false,
            main: (<PackenUiText style={{ color: Colors.basic.independence.dft }}>Cartagena</PackenUiText>)
          },
          {
            key: genKey(),
            left: false,
            right: false,
            value: "Leticia",
            isSelected: false,
            main: (<PackenUiText style={{ color: Colors.basic.independence.dft }}>Leticia</PackenUiText>)
          }
        ]
      }
    },
    customWrapperStyle: { marginBottom: 16 }
  },
  {
    size: "large",
    subtitle: "Nombre del propietario",
    media: (<Icon name="user" color={Colors.basic.independence.dft} size={20} />),
    input: {
      isDropdown: false,
      nonEditable: false,
      value: "",
      placeholder: "Steven Seagal",
      onChange: () => true
    },
    customWrapperStyle: { marginBottom: 16 }
  },
  {
    size: "default",
    title: "List item one",
    icon: { name: "chevron-right", color: Colors.brand.primary.drk },
    callback: () => true,
    customWrapperStyle: { marginBottom: 8 }
  },
  {
    size: "default",
    title: "List item two",
    icon: { name: "chevron-right", color: Colors.brand.primary.drk },
    media: (<PackenUiAvatar size="xtiny" src={require("../../assets/images/avatar.jpg")} />),
    callback: () => true,
    customWrapperStyle: { marginBottom: 8 }
  },
  {
    size: "large",
    title: "List item three",
    subtitle: "Secondary text",
    label: { text: "Verificado", color: Colors.success.default },
    icon: { name: "chevron-right", color: Colors.brand.primary.drk },
    callback: () => true,
    customWrapperStyle: { marginBottom: 16 }
  },
  {
    size: "large",
    title: "List item four",
    label: { text: "Verificado", color: Colors.success.default },
    icon: { name: "chevron-right", color: Colors.brand.primary.drk },
    media: (<PackenUiAvatar size="tiny" src={require("../../assets/images/avatar.jpg")} />),
    callback: () => true,
    customWrapperStyle: { marginBottom: 16 }
  },
  {
    size: "large",
    title: "List item five",
    subtitle: "Secondary text",
    label: { text: "Verificado", color: Colors.success.default },
    icon: { name: "chevron-right", color: Colors.brand.primary.drk },
    media: (<Icon name="check-circle" color={Colors.basic.independence.dft} size={20} />),
    callback: () => true,
    customWrapperStyle: { marginBottom: 16 }
  }
];

storiesOf("PackenUiList", module)
  .add("Complete", () => (
    <Wrapper
      full
      title="PackenUiList"
      description="Ejemplo completo con todos los tipos de items."
      code={
`const items = [
  {
    size: "large",
    subtitle: "Tipo de vehículo",
    input: {
      isDropdown: true,
      nonEditable: true,
      isOpen: false,
      value: "",
      placeholder: "Carry",
      onChange: () => true,
      list: {
        config: {
          size: "medium",
          checkedIcon: "check",
          selectionType: "single"
        },
        items: [
          {
            key: genKey(),
            left: false,
            right: false,
            value: "Bogotá, D.C.",
            isSelected: false,
            main: (<PackenUiText style={{ color: Colors.basic.independence.dft }}>Bogotá, D.C.</PackenUiText>)
          },
          {
            key: genKey(),
            left: false,
            right: false,
            value: "Test",
            isSelected: false,
            main: (<PackenUiText style={{ color: Colors.basic.independence.dft }}>Test</PackenUiText>)
          },
          {
            key: genKey(),
            left: false,
            right: false,
            value: "Test 2",
            isSelected: false,
            main: (<PackenUiText style={{ color: Colors.basic.independence.dft }}>Test 2</PackenUiText>)
          },
          {
            key: genKey(),
            left: false,
            right: false,
            value: "Test 3",
            isSelected: false,
            main: (<PackenUiText style={{ color: Colors.basic.independence.dft }}>Test 3</PackenUiText>)
          },
          {
            key: genKey(),
            left: false,
            right: false,
            value: "Lorem ipsum dolor sit amet consectetur adipiscing elit!",
            isSelected: false,
            main: (<PackenUiText style={{ color: Colors.basic.independence.dft }}>Lorem ipsum dolor sit amet consectetur adipiscing elit!</PackenUiText>)
          },
          {
            key: genKey(),
            left: false,
            right: false,
            value: "Medellín",
            isSelected: false,
            main: (<PackenUiText style={{ color: Colors.basic.independence.dft }}>Medellín</PackenUiText>)
          },
          {
            key: genKey(),
            left: false,
            right: false,
            value: "Bucaramanga",
            isSelected: false,
            isDisabled: true,
            main: (<PackenUiText style={{ color: Colors.basic.independence.dft }}>Bucaramanga</PackenUiText>)
          },
          {
            key: genKey(),
            left: false,
            right: false,
            value: "Santa Marta",
            isSelected: false,
            main: (<PackenUiText style={{ color: Colors.basic.independence.dft }}>Santa Marta</PackenUiText>)
          },
          {
            key: genKey(),
            left: false,
            right: false,
            value: "Cali",
            isSelected: false,
            main: (<PackenUiText style={{ color: Colors.basic.independence.dft }}>Cali</PackenUiText>)
          },
          {
            key: genKey(),
            left: false,
            right: false,
            value: "Cartagena",
            isSelected: false,
            main: (<PackenUiText style={{ color: Colors.basic.independence.dft }}>Cartagena</PackenUiText>)
          },
          {
            key: genKey(),
            left: false,
            right: false,
            value: "Leticia",
            isSelected: false,
            main: (<PackenUiText style={{ color: Colors.basic.independence.dft }}>Leticia</PackenUiText>)
          }
        ]
      }
    },
    customWrapperStyle: { marginBottom: 16 }
  },
  {
    size: "large",
    subtitle: "Nombre del propietario",
    media: (<Icon name="user" color={Colors.basic.independence.dft} size={20} />),
    input: {
      isDropdown: false,
      nonEditable: false,
      value: "",
      placeholder: "Steven Seagal",
      onChange: () => true
    },
    customWrapperStyle: { marginBottom: 16 }
  },
  {
    size: "default",
    title: "List item one",
    icon: { name: "chevron-right", color: Colors.brand.primary.drk },
    callback: () => true,
    customWrapperStyle: { marginBottom: 8 }
  },
  {
    size: "default",
    title: "List item two",
    icon: { name: "chevron-right", color: Colors.brand.primary.drk },
    media: (<PackenUiAvatar size="xtiny" src={require("../../assets/images/avatar.jpg")} />),
    callback: () => true,
    customWrapperStyle: { marginBottom: 8 }
  },
  {
    size: "large",
    title: "List item three",
    subtitle: "Secondary text",
    label: { text: "Verificado", color: Colors.success.default },
    icon: { name: "chevron-right", color: Colors.brand.primary.drk },
    callback: () => true,
    customWrapperStyle: { marginBottom: 16 }
  },
  {
    size: "large",
    title: "List item four",
    label: { text: "Verificado", color: Colors.success.default },
    icon: { name: "chevron-right", color: Colors.brand.primary.drk },
    media: (<PackenUiAvatar size="tiny" src={require("../../assets/images/avatar.jpg")} />),
    callback: () => true,
    customWrapperStyle: { marginBottom: 16 }
  },
  {
    size: "large",
    title: "List item five",
    subtitle: "Secondary text",
    label: { text: "Verificado", color: Colors.success.default },
    icon: { name: "chevron-right", color: Colors.brand.primary.drk },
    media: (<Icon name="check-circle" color={Colors.basic.independence.dft} size={20} />),
    callback: () => true,
    customWrapperStyle: { marginBottom: 16 }
  }
];

<PackenUiList
  style={{ marginVertical: 15 }}
  items={items}
/>`
      }
    >
      <PackenUiList
        style={{ marginVertical: 15 }}
        items={items}
      />
    </Wrapper>
  ));