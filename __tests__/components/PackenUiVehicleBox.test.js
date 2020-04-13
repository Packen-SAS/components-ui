import "react-native";
import React from "react";
import { shallow } from "enzyme";

import PackenUiVehicleBox from "../../app/components/PackenUiVehicleBox";

describe("<PackenUiVehicleBox/>", () => {
  let render, renderInstance;
  const mockCallback = jest.fn();

  beforeAll(() => {
    render = shallow(
      <PackenUiVehicleBox
        type="Carry"
        make="Chevrolet"
        year="2017"
        plate="USC-914"
        img={{
          src: require("../../assets/images/carry.png"),
          width: 130,
          height: 61
        }}
        callback={mockCallback}
      />
    );
    renderInstance = render.instance();
    
    renderInstance.setState({
      type: "Carry",
      make: "Chevrolet",
      year: "2017",
      plate: "USC-914",
      img: require("../../assets/images/carry.png"),
      callback: mockCallback
    });
  });

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });

    it("returns the content without a touchable if not set so", () => {
      renderInstance.setState({ callback: undefined });
      const returnedElement = renderInstance.getContent();
      
      expect(returnedElement).toBeDefined();
    });

    it("returns the content with a touchable if set so", () => {
      renderInstance.setState({ callback: mockCallback });
      const returnedElement = renderInstance.getContent();
      
      expect(returnedElement).toBeDefined();
    });
  });

  describe("triggering actions", () => {
    it("executes correct code on componentDidUpdate", () => {
      const spyUpdateState = jest.spyOn(renderInstance, "updateState");
      renderInstance.componentDidUpdate();

      expect(spyUpdateState).toHaveBeenCalled();
      spyUpdateState.mockRestore();
    });
  });

  describe("state changing", () => {
    it("updates the state with the new, incoming props", () => {
      render.setProps({ type: "Test" });
      const spySetState = jest.spyOn(renderInstance, "setState");
      renderInstance.updateState();

      expect(spySetState).toHaveBeenCalled();
      expect(renderInstance.state.type).toBe("Test");
      spySetState.mockRestore();
    });
  });

  describe("styling", () => {
    it("returns the styles object", () => {
      const returnedStyles = renderInstance.getStyles();

      expect(returnedStyles).toBeDefined();
    });
  });
});