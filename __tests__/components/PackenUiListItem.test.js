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
          input: undefined,
          media: undefined,
          callback: undefined,
          customWrapperStyle: undefined,
          styling: undefined
        }
      });
      const res = renderInstance.setPropsToState();

      expect(res).toEqual({
        data: {
          size: "default",
          title: "",
          subtitle: false,
          label: false,
          icon: false,
          stateIcon: false,
          subCustom: false,
          input: false,
          media: false,
          callback: false,
          customWrapperStyle: {}
        },
        styling: {
          wrapper: {},
          media: {},
          main: {},
          sub: {},
          title: {},
          subtitle: {},
          dropdown: {
            contentSizer: {
              inner: {},
              text: {},
              wrapper: {},
            },
            input: {
              box: {},
              header: {
                base: {},
                label: {},
              },
              help: {
                text: {},
                touchable: {},
              },
              icon: {},
              iconColor: undefined,
              iconSize: undefined,
              iconWrapper: {},
              input: {},
              loader: {
                iconColor: undefined,
                iconSize: undefined,
                iconWrapper: {},
                label: {},
                shape: {},
                shapeContent: {},
              },
              message: {
                box: {},
                icon: {},
                iconColor: undefined,
                iconSize: undefined,
                text: {},
              },
            },
            inputWrapper: {},
            list: {
              flatlist: {},
              item: {},
              wrapper: {},
            },
            menu: {},
            wrapper: {},
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
      });
    });

    it("returns incoming props as the state key-value pairs if input is provided", () => {
      render.setProps({ data: { input: { test: "Test" } } });
      const res = renderInstance.setPropsToState();

      expect(res.data.input).toEqual({ test: "Test" });
    });

    it("returns incoming props as the state key-value pairs if styling is provided", () => {
      render.setProps({ styling: { test: "Test" } });
      const res = renderInstance.setPropsToState();
      expect(res.styling).toEqual({ test: "Test" });
    });

    it("changes the state when opening and closing if it's a dropdown", () => {
      renderInstance.onOpenStateChangeHandler(true, 10);
      expect(renderInstance.state.data.input.isOpen).toBe(true);
      expect(renderInstance.state.data.input.dropdownHeight).toBe(10);

      renderInstance.setState({ data: { input: false } });
      const res = renderInstance.onOpenStateChangeHandler();
      expect(res).toBeUndefined();
    });

    it("returns incoming props as the state key-value pairs if some are provided", () => {
      render.setProps({ data: { stateIcon: { test: "test" }, subCustom: "test" } });
      const res = renderInstance.setPropsToState();
      expect(res.data.stateIcon).toEqual({ test: "test" });
      expect(res.data.subCustom).toBe("test");
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

    it("returns the main content if it's provided and is a dropdown", () => {
      renderInstance.setState({ data: { input: { isDropdown: true } } });
      const returnedElement = renderInstance.getMainContent();

      expect(returnedElement).toBeDefined();
    });

    it("returns the main content if it's provided and is an input", () => {
      renderInstance.setState({ data: { input: { isDropdown: false } } });
      const returnedElement = renderInstance.getMainContent();

      expect(returnedElement).toBeDefined();
    });

    it("returns the sub content if it's provided", () => {
      let returnedElement = renderInstance.getSubContent();
      expect(returnedElement).toBeDefined();

      renderInstance.setState({ data: { icon: {} }, styling: { iconSize: 15, iconColor: "#FFFFFF" } });
      returnedElement = renderInstance.getSubContent();
      expect(returnedElement).toBeDefined();
    });

    it("returns the correct inner input component", () => {
      [true, false].forEach((state) => {
        const _data = { ...renderInstance.state.data };
        _data.input = { isDropdown: state };
        renderInstance.setState({ data: _data });
        const res = renderInstance.determineInputContent();
        expect(res).toBeDefined();
        if (state) {
          expect(res.props.input.icon.callback()).toBe(true);
        }
      });

      renderInstance.setState({ data: { input: false } });
      const _res = renderInstance.determineInputContent();
      expect(_res).toBeNull();
    });

    it("returns the icon element", () => {
      [undefined, jest.fn()].forEach((callback) => {
        const res = renderInstance.getIcon({ name: "test", color: "test", callback });
        expect(res).toBeDefined();
      });
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

    it("executes the inputChangeHandler", () => {
      renderInstance.setState({ data: { input: { onChange: jest.fn() } } });
      renderInstance.inputChangeHandler("Test", "val");
      expect(renderInstance.state.data.input.onChange).toHaveBeenCalledWith("Test", "val");

      const spyUpdateDropdown = jest.spyOn(renderInstance, "updateDropdown");
      renderInstance.setState({ data: { input: { isDropdown: true, value: "", onChange: jest.fn() } } });
      renderInstance.inputChangeHandler("Test", "val");
      expect(renderInstance.state.data.input.value).toBe("val");
      expect(spyUpdateDropdown).toHaveBeenCalled();
      spyUpdateDropdown.mockRestore();
    });

    it("returns false while executing the inputChangeHandler if not provided", () => {
      renderInstance.setState({ data: { input: { onChange: undefined } } });
      const res = renderInstance.inputChangeHandler("Test", "val");

      expect(res).toBe(false);
    });

    it("returns the correct placeholder configuration if a value is provided", () => {
      renderInstance.setState({ data: { input: { value: "Test" } } });
      const res = renderInstance.getPlaceholder();

      expect(res).toEqual({
        val: "Test",
        color: Colors.basic.independence.drk
      });

      renderInstance.setState({ data: { input: false } });
      expect(renderInstance.getPlaceholder()).toBeUndefined();
    });

    it("returns the correct placeholder configuration if a value is not provided", () => {
      renderInstance.setState({ data: { input: { value: "", placeholder: "Test 2" } } });
      const res = renderInstance.getPlaceholder();

      expect(res).toEqual({
        val: "Test 2",
        color: Colors.basic.gray.dft
      });
    });

    it("returns the main wrapper if it's an open dropdown", () => {
      [true, false].forEach((state) => {
        renderInstance.setState({
          data: {
            input: {
              isOpen: state,
              dropdownHeight: 10
            },
            subtitle: true
          }
        });
        const returnedElement = renderInstance.getMainWrapper(<View></View>);

        expect(returnedElement).toBeDefined();
        expect(returnedElement.props.children[1].props.style.transform[0].translateY).toBe(state ? -10 : 0);
      });
    });

    it("sets the dropdoen ref", () => {
      renderInstance.getDropdownRef({ test: "Test" });
      expect(renderInstance.dropdownRef).toEqual({ test: "Test" });
    });

    it("programmatically toggles the dropdown", () => {
      renderInstance.dropdownRef = { toggleMenu: jest.fn() };
      renderInstance.toggleDropdown();
      expect(renderInstance.dropdownRef.toggleMenu).toHaveBeenCalled();

      renderInstance.dropdownRef = undefined;
      const res = renderInstance.toggleDropdown();
      expect(res).toBe(undefined);
    });

    it("executes the placeholder function", () => {
      expect(renderInstance.mockCallback()).toBe(false);
    });

    it("executes the onOpenStateChange event of the optional inner dropdown component", () => {
      renderInstance.dropdownRef = { onOpenStateChange: jest.fn() };
      renderInstance.updateDropdown();
      expect(renderInstance.dropdownRef.onOpenStateChange).toHaveBeenCalled();

      renderInstance.dropdownRef = null;
      const res = renderInstance.updateDropdown();
      expect(res).toBeUndefined();
    });
  });
});