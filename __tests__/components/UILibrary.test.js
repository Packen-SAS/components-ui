import "react-native";
import React from "react";

import UILibrary from "../../app/UILibrary";

import renderer from "react-test-renderer";

describe("<UILibrary/>", () => {
  it("renders correctly", () => {
    const render = renderer.create(<UILibrary/>);
    expect(render).toMatchSnapshot();
  });
});