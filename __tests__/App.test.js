import "../__mocks__/global.mock";
import "../__mocks__/react-native-reanimated.mock";

import "react-native";
import React from "react";
import { shallow } from "enzyme";

import App from "../App";

describe("<App/>", () => {
  it("renders correctly", () => {
    const render = shallow(<App/>);
    
    expect(render).toBeDefined();
  });
});