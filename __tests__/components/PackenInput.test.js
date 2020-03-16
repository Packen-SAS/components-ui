import "react-native";
import React from "react";
import renderer from "react-test-renderer";

import PackenInput from "../../app/components/PackenInput";

describe("<PackenInput/>", () => {
  let render, renderInstance;
  const mockCallback = jest.fn();

  beforeAll(() => {
    render = renderer.create(
      <PackenInput
        size="tiny"
        placeholder="Placeholder"
        onChangeText={mockCallback}
        icon={{
          name: "lock",
          position: "left"
        }}
        message={{
          text: "Caption text, description, error notification",
          icon: "info"
        }}
        label="Label tiny"
        help="Help text tiny"
        theme="default"
      />
    );

    renderInstance = render.getInstance();

    renderInstance.setState = state => {
      renderInstance.state = {
        ...renderInstance.state,
        ...state
      };
    }
    renderInstance.setState({
      value: "",
      state: "default",
      dimensions: {
        box: {
          width: 0,
          height: 0
        },
        iconWrapper: {
          width: 0,
          height: 0
        }
      }
    });
  });

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });
  });

  describe("styling", () => {
    it("returns icon position styles", () => {
      const returnedStyles = renderInstance.setIconPositionStyles();
      expect(returnedStyles).toBeDefined();
    });

    it("returns current padding styles if has an icon", () => {
      renderInstance.props = { icon: { position: "left" }, size: "tiny" };
      const returnedStyles = renderInstance.getPaddingStyles();
      expect(returnedStyles).toBeDefined();
    });

    it("returns empty padding styles if there's no icon", () => {
      renderInstance.props = {};
      const returnedStyles = renderInstance.getPaddingStyles();
      expect(returnedStyles).toEqual({});
    });

    it("returns multiline styles if it's a textarea", () => {
      renderInstance.props = { multiline: true, size: "tiny" };
      const returnedStyles = renderInstance.getMultilineStyles();
      expect(returnedStyles).toBeDefined();
    });

    it("returns empty multiline styles if it's not a textarea", () => {
      renderInstance.props = {};
      const returnedStyles = renderInstance.getMultilineStyles();
      expect(returnedStyles).toEqual({});
    });
  });

  describe("getting dimensions", () => {
    it("sets box dimensions", () => {
      renderInstance.getBoxDimensions({width: 100, height: 100});
      expect(renderInstance.state.dimensions.box.width).toBe(100);
      expect(renderInstance.state.dimensions.box.height).toBe(100);
    });

    it("sets icon wrapper dimensions", () => {
      renderInstance.getIconWrapperDimensions({width: 10, height: 10});
      expect(renderInstance.state.dimensions.iconWrapper.width).toBe(10);
      expect(renderInstance.state.dimensions.iconWrapper.height).toBe(10);
    });
  });

  describe("triggering actions", () => {
    it("changes styles while onPressIn", () => {
      renderInstance.handlePressIn();
      expect(renderInstance.state.state).toBe("hover");
    });

    it("changes styles while onPressOut", () => {
      renderInstance.handlePressOut();
      expect(renderInstance.state.state).toBe("default");
    });

    it("changes styles while onFocus", () => {
      renderInstance.handleFocus();
      expect(renderInstance.state.state).toBe("focus");
    });

    it("changes styles while onBlur", () => {
      renderInstance.handleBlur();
      expect(renderInstance.state.state).toBe("default");
    });

    it("handles onChangeText", () => {
      renderInstance.props = { onChangeText: mockCallback };
      renderInstance.handleChangeText("Test");
      expect(renderInstance.state.value).toBe("Test");
      expect(mockCallback).toHaveBeenCalled();
    });

    it("executes correct code on componentDidUpdate", () => {
      const prevProps = { value: "Test" };
      renderInstance.props = { value: "Test-2" };
      renderInstance.componentDidUpdate(prevProps, null, null);

      /* Review to avoid using setTimeout */
      const timeout = setTimeout(() => {
        expect(renderInstance.state.value).toBe("Test-2");
        clearTimeout(timeout);
      }, 2000);
    });
  });
});