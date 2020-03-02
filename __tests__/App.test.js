import "react-native";
import React from "react";

import App from "../App";

import renderer from "react-test-renderer";

describe("<App/>", () => {
  it("renders correctly", () => {
    const render = renderer.create(<App/>).toJSON();
    expect(render).toMatchSnapshot();
  });
});