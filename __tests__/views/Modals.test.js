import "react-native";
import React from "react";
import { shallow } from "enzyme";

import Modals from "../../app/views/Modals";

describe("<Modals/>", () => {
  let render, renderInstance;

  beforeAll(() => {
    render = shallow(<Modals/>);
    renderInstance = render.instance();

    renderInstance.setState({
      custom: {
        small: false
      },
      primary: {
        default: false,
        small: false
      },
      warning: {
        default: false,
        small: false
      },
      danger: {
        default: false,
        small: false
      },
      info: {
        default: false,
        small: false
      },
      success: {
        default: false,
        small: false
      },
      gallery: {
        single: false,
        multiple: false
      }
    });
  });

  describe("rendering", () => {
    it("renders correctly", () => {
      expect(render).toBeDefined();
    });
  });

  describe("triggering actions", () => {
    it("toggles each modal", () => {
      renderInstance.toggleModal("custom.small");
      renderInstance.toggleModal("primary.default");
      renderInstance.toggleModal("primary.small");
      renderInstance.toggleModal("warning.default");
      renderInstance.toggleModal("warning.small");
      renderInstance.toggleModal("danger.default");
      renderInstance.toggleModal("danger.small");
      renderInstance.toggleModal("info.default");
      renderInstance.toggleModal("info.small");
      renderInstance.toggleModal("success.default");
      renderInstance.toggleModal("success.small");
      renderInstance.toggleModal("gallery.multiple");
      renderInstance.toggleModal("gallery.single");

      expect(renderInstance.state.custom.small).toBe(true);
      expect(renderInstance.state.primary.default).toBe(true);
      expect(renderInstance.state.primary.small).toBe(true);
      expect(renderInstance.state.warning.default).toBe(true);
      expect(renderInstance.state.warning.small).toBe(true);
      expect(renderInstance.state.danger.default).toBe(true);
      expect(renderInstance.state.danger.small).toBe(true);
      expect(renderInstance.state.info.default).toBe(true);
      expect(renderInstance.state.info.small).toBe(true);
      expect(renderInstance.state.success.default).toBe(true);
      expect(renderInstance.state.success.small).toBe(true);
      expect(renderInstance.state.gallery.multiple).toBe(true);
      expect(renderInstance.state.gallery.single).toBe(true);
    });

    it("executes all callbacks", () => {
      render.props().children.props.children[0].props.children.forEach(child => {
        if (child.type.displayName === "View") {
          const spyToggleModal = jest.spyOn(renderInstance, "toggleModal");
          child.props.children.props.callback();

          expect(spyToggleModal).toHaveBeenCalled();
          spyToggleModal.mockRestore();
        }
      });
      
      render.props().children.props.children[1].props.children.forEach(modalInstance => {
        const spyToggleModal = jest.spyOn(renderInstance, "toggleModal");
        modalInstance.props.toggle();

        if (modalInstance.props.type === "custom") {
          modalInstance.props.content.props.children[2].props.children.forEach(element => {
            element.props.callback();

            expect(spyToggleModal).toHaveBeenCalled();
          });
        }

        expect(spyToggleModal).toHaveBeenCalled();

        if (modalInstance.props.info && modalInstance.props.info.btn) {
          const btnInstance = modalInstance.props.info.btn;
          btnInstance.props.callback();

          expect(spyToggleModal).toHaveBeenCalled();
        }

        spyToggleModal.mockRestore();
      });
    });

    it("executes all custom event handlers", () => {
      const res = renderInstance.onDismissCallback();
      const res2 = renderInstance.onRequestCloseCallback();

      expect(res).toBe("dismiss");
      expect(res2).toBe("requestclose");
    });
  });
});