import "react-native";
import React from "react";
import { shallow } from "enzyme";

import SelectionButtons from "../../app/views/SelectionButtons";

describe("<SelectionButtons/>", () => {
  const render = shallow(<SelectionButtons/>);

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });
  });

  describe("triggering actions", () => {
    it("returns the correct selection", () => {
      const res = render.instance().newSelectionHandler("selectionButtons1", "Test");

      expect(res).toBe("Test");
    });
  });
});