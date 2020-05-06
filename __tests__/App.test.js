import "react-native";
import React from "react";
import { shallow } from "enzyme";

import App from "../App";

jest.mock("global", () => ({
  ...global,
  WebSocket: function WebSocket() {}
}));

jest.mock("react-native-reanimated", () => {
  const View = require('react-native').View;
  return {
    Value: jest.fn(),
    event: jest.fn(),
    add: jest.fn(),
    eq: jest.fn(),
    set: jest.fn(),
    cond: jest.fn(),
    interpolate: jest.fn(),
    View: View,
    Extrapolate: { CLAMP: jest.fn() }
  };
});

describe("<App/>", () => {
  it("renders correctly", () => {
    const render = shallow(<App/>);
    
    expect(render).toBeDefined();
  });
});