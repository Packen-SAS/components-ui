import "react-native";
import React from "react";
import { View } from "react-native";
import { shallow } from "enzyme";

import Colors from "../../app/styles/abstracts/colors";
import Icon from "react-native-vector-icons/dist/Feather";

import PackenUiListItem from "../../app/components/PackenUiListItem";

describe("<PackenUiListItem/>", () => {
  let render, renderInstance;
  const mockCallback = () => true;
  const data = {
    size: "large",
    title: "List item five",
    subtitle: "Secondary text",
    label: { text: "Verificado", color: Colors.success.default },
    icon: { name: "chevron-right", color: Colors.brand.primary.drk },
    media: (<Icon name="user" color={Colors.basic.independence.dft} size={20} />),
    callback: mockCallback,
    customWrapperStyle: {}
  };

  beforeAll(() => {
    render = shallow(
      <PackenUiListItem data={data} key={4} />
    );
    renderInstance = render.instance();

    renderInstance.setState({
      data: { ...data }
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
        data: {
          size: undefined,
          title: undefined,
          subtitle: undefined,
          label: undefined,
          icon: undefined,
          media: undefined,
          callback: undefined,
          customWrapperStyle: undefined
        }
      });
      const res = renderInstance.setPropsToState();

      expect(res).toEqual({
        data: {
          size: "default",
          title: "",
          subtitle: false,
          label: false,
          icon: {
            name: "chevron-right",
            color: Colors.brand.primary.drk
          },
          media: false,
          callback: false,
          customWrapperStyle: {}
        }
      });
    });
  });

  describe("styling", () => {
    it("returns the styles object", () => {
      const returnedStyles = renderInstance.getStyles();

      expect(returnedStyles).toBeDefined();
    });
  });

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });

    it("returns null if no media is provided", () => {
      renderInstance.setState({
        data: {
          media: undefined,
          icon: { 
            name: "chevron-right",
            color: "#FFFFFF"
          }
        }
      });
      const returnedElement = renderInstance.getMedia();

      expect(returnedElement).toBe(null);
    });

    it("returns a media element if it's provided", () => {
      renderInstance.state.data.media = (<View></View>);
      const returnedElement = renderInstance.getMedia();

      expect(returnedElement).toBeDefined();
    });

    it("returns the main content if it's provided", () => {
      const returnedElement = renderInstance.getMainContent();

      expect(returnedElement).toBeDefined();
    });

    it("returns the sub content if it's provided", () => {
      const returnedElement = renderInstance.getSubContent();

      expect(returnedElement).toBeDefined();
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

    it("executes the onPress handler", () => {
      renderInstance.state.data.callback = jest.fn();
      renderInstance.onPressHandler();

      expect(renderInstance.state.data.callback).toHaveBeenCalled();
    });

    it("returns false while executing the onPress handler if no callback is provided", () => {
      renderInstance.state.data.callback = false;
      const res = renderInstance.onPressHandler();

      expect(res).toBe(false);
    });
  });
});