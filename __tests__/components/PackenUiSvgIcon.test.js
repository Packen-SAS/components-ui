import "react-native";
import React from "react";
import { shallow } from "enzyme";

import PackenLogoMain from "../../assets/images/packen_logo_main.svg";
import PackenUiText from "../../app/components/PackenUiText";
import PackenUiSvgIcon, { Icon } from "../../app/components/PackenUiSvgIcon";

describe("<PackenUiSvgIcon/>", () => {
  let render, renderInstance;

  beforeAll(() => {
    render = shallow(
      <PackenUiSvgIcon
        name="logo-main"
        width={150}
        height={50}
      />
    );
    renderInstance = render.instance();
  });

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });

    it("returns the correct icon", () => {
      const shallowIcon = shallow(<Icon width={150} height={50} name="logo-main" />);
      expect(shallowIcon.type().testUri).toEqual(expect.stringContaining("packen_logo_main.svg"));
    });

    it("returns an error message if no recognized icon identifier is passed", () => {
      const shallowIcon = shallow(<Icon width={150} height={50} name="test" />);
      expect(shallowIcon.props().children).toBe("Icon not found.");
    });
  });
});