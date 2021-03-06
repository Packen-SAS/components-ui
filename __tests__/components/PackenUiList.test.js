import "react-native";
import React from "react";
import { shallow } from "enzyme";

import Colors from "../../app/styles/abstracts/colors";
import PackenUiAvatar from "../../app/components/PackenUiAvatar";
import Icon from "react-native-vector-icons/dist/Feather";

import PackenUiList from "../../app/components/PackenUiList";

describe("<PackenUiList/>", () => {
  let render, renderInstance;
  const mockCallback = () => true;
  const items = [
    {
      size: "default",
      title: "List item one",
      icon: { name: "chevron-right", color: Colors.brand.primary.drk },
      callback: mockCallback,
      customWrapperStyle: { marginBottom: 8 }
    },
    {
      size: "default",
      title: "List item two",
      icon: { name: "chevron-right", color: Colors.brand.primary.drk },
      media: (<PackenUiAvatar size="xtiny" src={require("../../assets/images/avatar.jpg")} />),
      callback: mockCallback,
      customWrapperStyle: { marginBottom: 8 }
    },
    {
      size: "large",
      title: "List item three",
      subtitle: "Secondary text",
      label: { text: "Verificado", color: Colors.success.default },
      icon: { name: "chevron-right", color: Colors.brand.primary.drk },
      callback: mockCallback,
      customWrapperStyle: { marginBottom: 16 }
    },
    {
      size: "large",
      title: "List item four",
      label: { text: "Verificado", color: Colors.success.default },
      icon: { name: "chevron-right", color: Colors.brand.primary.drk },
      media: (<PackenUiAvatar size="tiny" src={require("../../assets/images/avatar.jpg")} />),
      callback: mockCallback,
      customWrapperStyle: { marginBottom: 16 }
    },
    {
      size: "large",
      title: "List item five",
      subtitle: "Secondary text",
      label: { text: "Verificado", color: Colors.success.default },
      icon: { name: "chevron-right", color: Colors.brand.primary.drk },
      media: (<Icon name="user" color={Colors.basic.independence.dft} size={20} />),
      callback: mockCallback,
      customWrapperStyle: {}
    }
  ];

  beforeAll(() => {
    render = shallow(
      <PackenUiList
        style={{ marginTop: 15 }}
        items={items}
      />
    );
    renderInstance = render.instance();
  });

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });
  });

  describe("state changing", () => {
    it("updates the state with incoming new props", () => {
      const spySetState = jest.spyOn(renderInstance, "setState");
      renderInstance.updateState();

      expect(spySetState).toHaveBeenCalled();
      spySetState.mockRestore();
    });

    it("returns incoming props as the state key-value pairs", () => {
      render.setProps({
        items: undefined,
        style: undefined,
        styling: undefined
      });
      const res = renderInstance.setPropsToState();
      
      expect(res).toEqual({
        items: [],
        customWrapperStyles: {},
        styling: {
          wrapper: {},
          inner: {},
          item: {
            wrapper: {},
            media: {},
            main: {},
            sub: {},
            title: {},
            subtitle: {},
            dropdown: {
              wrapper: {},
              inputWrapper: {},
              contentSizer: {
                wrapper: {},
                inner: {},
                text: {},
              },
              menu: {},
              list: {
                wrapper: {},
                flatlist: {},
                item: {},
              },
              input: {
                header: {
                  base: {},
                  label: {},
                },
                help: {
                  touchable: {},
                  text: {},
                },
                box: {},
                input: {},
                message: {
                  box: {},
                  icon: {},
                  iconSize: undefined,
                  iconColor: undefined,
                  text: {},
                },
                loader: {
                  shape: {},
                  shapeContent: {},
                  label: {},
                  iconWrapper: {},
                  iconSize: undefined,
                  iconColor: undefined,
                },
                iconWrapper: {},
                icon: {},
                iconSize: undefined,
                iconColor: undefined,
              },
            },
            input: {
              header: {
                base: {},
                label: {},
              },
              help: {
                touchable: {},
                text: {},
              },
              box: {},
              input: {},
              message: {
                box: {},
                icon: {},
                iconSize: undefined,
                iconColor: undefined,
                text: {},
              },
              loader: {
                shape: {},
                shapeContent: {},
                label: {},
                iconWrapper: {},
                iconSize: undefined,
                iconColor: undefined,
              },
              iconWrapper: {},
              icon: {},
              iconSize: undefined,
              iconColor: undefined
            },
            label: {},
            iconWrapper: {},
            iconSize: undefined,
            iconColor: undefined
          }
        }
      });
    });

    it("returns incoming props as the state key-value pairs if some are provided", () => {
      render.setProps({ styling: { test: "Test" } });
      const res = renderInstance.setPropsToState();
      expect(res.styling).toEqual({ test: "Test" });
    });
  });

  describe("styling", () => {  
    it("returns the styles object", () => {
      const returnedStyles = renderInstance.getStyles();

      expect(returnedStyles).toBeDefined();
    });
  });

  describe("triggering actions", () => {
    it("executes the correct code on componentDidUpdate", () => {
      const prevProps = { test: "Test" };
      render.setProps({ test: "Test 2" });
      const spyUpdateState = jest.spyOn(renderInstance, "updateState");
      renderInstance.componentDidUpdate(prevProps, null, null);

      expect(spyUpdateState).toHaveBeenCalled();
      spyUpdateState.mockRestore();
    });

    it("executes the instance callback on componentDidMount if provided", () => {
      render.setProps({ instance: jest.fn() });
      renderInstance.componentDidMount();

      expect(renderInstance.props.instance).toHaveBeenCalled();
    });
  });
});