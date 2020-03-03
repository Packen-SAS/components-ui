import "react-native";
import React from "react";

import PackenAvatar from "../../app/components/PackenAvatar";

import renderer from "react-test-renderer";

describe("<PackenAvatar/>", () => {
  const render = renderer.create(
    <PackenAvatar size="tiny" src={require("../../assets/images/avatar.jpg")}/>
  ).toJSON();

  it("renders correctly", () => {
    expect(render).toMatchSnapshot();
  });
});