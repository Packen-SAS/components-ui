import "react-native";
import "react-native-gesture-handler";
import React from "react";
import { shallow } from "enzyme";

import UILibrary from "../../app/UILibrary";

describe("<UILibrary/>", () => {
  it("renders correctly", () => {
    jest.mock('NativeModules', () => ({
      UIManager: {
        RCTView: () => {},
      },
      RNGestureHandlerModule: {
        attachGestureHandler: jest.fn(),
        createGestureHandler: jest.fn(),
        dropGestureHandler: jest.fn(),
        updateGestureHandler: jest.fn(),
        State: {},
        Directions: {},
      },
    }));
    const render = shallow(<UILibrary/>);
    
    expect(render).toBeDefined();
  });
});