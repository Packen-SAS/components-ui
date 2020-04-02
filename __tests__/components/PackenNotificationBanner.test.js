import "react-native";
import React from "react";
import { shallow } from "enzyme";

import PackenNotificationBanner from "../../app/components/PackenNotificationBanner";

describe("<PackenNotificationBanner/>", () => {
  let render, renderInstance;

  beforeAll(() => {
    render = shallow(
      <PackenNotificationBanner
        theme="success"
        type="default"
        icon="check"
        title="Success notification"
      />
    );
    renderInstance = render.instance();
    
    renderInstance.setState({
      theme: "success",
      type: "default"
    });
  });

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });

    it("returns an icon if provided via props", () => {
      render.setProps({
        icon: "check"
      });
      const returnedElement = renderInstance.getIcon();

      expect(returnedElement.props.name).toBe("check");
    });

    it("returns an Packen logo image if set so via props", () => {
      const themes = ["success", "primary", "warning", "danger", "info"];
      const srcs = [
        require("../../assets/images/arrow_packen_success.png"),
        require("../../assets/images/arrow_packen_primary.png"),
        require("../../assets/images/arrow_packen_warning.png"),
        require("../../assets/images/arrow_packen_danger.png"),
        require("../../assets/images/arrow_packen_info.png")
      ];
      render.setProps({
        icon: "packen"
      });

      themes.forEach((theme, i) => {
        renderInstance.setState({ theme: theme });
        const returnedElement = renderInstance.getIcon();
  
        expect(returnedElement.props.source).toBe(srcs[i]);
      });
    });

    it("returns null if no icon is provided via props", () => {
      render.setProps({
        icon: undefined
      });
      const returnedElement = renderInstance.getIcon();

      expect(returnedElement).toBe(null);
    });
  });
});