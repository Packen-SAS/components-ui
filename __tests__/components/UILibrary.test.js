import "react-native";
import React from "react";
import { shallow } from "enzyme";

import UILibrary from "../../app/UILibrary";

describe("<UILibrary/>", () => {
  it("renders correctly", () => {
    const render = shallow(<UILibrary/>);
    
    expect(render).toBeDefined();
  });
});