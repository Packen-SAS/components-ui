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