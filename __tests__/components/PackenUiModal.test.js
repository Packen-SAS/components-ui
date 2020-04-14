import "react-native";
import React from "react";
import { shallow } from "enzyme";

import PackenUiModal from "../../app/components/PackenUiModal";
import PackenUiButton from "../../app/components/PackenUiButton";

describe("<PackenUiModal/>", () => {
  let render, renderInstance, renderGallery;
  const mockCallback = jest.fn();

  beforeAll(() => {
    render = shallow(
      <PackenUiModal
        isOpen={false}
        size="default"
        type="info"
        theme="danger"
        banner={{ icon: "x-circle" }}
        info={{
          title: "Title",
          text: "Fugiat sint eiusmod esse eu duis sint labore. Veniam anim reprehenderit.",
          btn: <PackenUiButton icon={{ name: "arrow-right", position: "right" }} type="regular" level="primary" size="medium" callback={mockCallback}>BUTTON</PackenUiButton>
        }}
        toggle={mockCallback}
      />
    );

    renderGallery = shallow(
      <PackenUiModal
        isOpen={false}
        size="small"
        type="gallery"
        theme="white"
        images={[require("../../assets/images/placeholder.png")]}
        toggle={mockCallback}
      />
    );

    renderInstance = render.instance();

    renderInstance.setState({
      type: "info",
      banner: { icon: "x-circle" },
      size: "default",
      isOpen: false,
      images: undefined,
      info: {
        title: "Title",
        text: "Fugiat sint eiusmod esse eu duis sint labore. Veniam anim reprehenderit.",
        btn: <PackenUiButton icon={{ name: "arrow-right", position: "right" }} type="regular" level="primary" size="medium" callback={mockCallback}>BUTTON</PackenUiButton>
      },
      toggle: mockCallback,
      theme: "danger",
      content: undefined,
      backdropStyles: { ...renderInstance.getStyles().backdrop.base },
      dimensions: {
        gallery: {
          height: 0,
          width: 0
        },
        arrows: {
          height: 0,
          width: 0
        }
      },
      arrowStyles: {
        left: {
          top: 0,
          left: 0
        },
        right: {
          top: 0,
          right: 0
        }
      },
      has: {
        next: true,
        prev: false
      }
    });
  });

  describe("rendering", () => {
    it("renders an info modal correctly", () => {
      expect(render).toBeDefined();
    });

    it("renders a banner if provided via props", () => {
      render.setProps({
        theme: "primary",
        banner: {
          icon: "check"
        }
      });
      const returnedElement = renderInstance.getBanner();

      expect(returnedElement).toBeDefined();
    });

    it("renders null if a banner is not provided", () => {
      render.setProps({ banner: undefined });
      const returnedElement = renderInstance.getBanner();

      expect(returnedElement).toBe(null);
    });

    it("renders an info button if provided via props", () => {
      render.setProps({
        info: {
          btn: "Test"
        }
      });
      const returnedElement = renderInstance.getInfoButton();

      expect(returnedElement).toBeDefined();
    });

    it("renders null if no info button is provided", () => {
      render.setProps({
        info: {
          btn: undefined
        }
      });
      const returnedElement = renderInstance.getInfoButton();

      expect(returnedElement).toBe(null);
    });

    it("renders a gallery modal correctly", () => {
      expect(renderGallery).toBeDefined();
    });

    it("renders gallery slide correctly", () => {
      const gallerySlide = renderInstance.renderGallerySlide({
        item: require("../../assets/images/placeholder.png"),
        index: 0
      });

      expect(gallerySlide).toBeDefined();
    });
  });

  describe("styling", () => {
    it("returns correct content styles if there's a banner", () => {
      render.setProps({
        banner: {},
        size: "small"
      });
      const returnedStyles = renderInstance.getContentStyles();

      expect(returnedStyles).toEqual({ ...renderInstance.getStyles().content.base, ...renderInstance.getStyles().content.banner.small });
    });

    it("returns custom content styles if set so", () => {
      render.setProps({
        banner: undefined,
        type: "custom"
      });
      const returnedStyles = renderInstance.getContentStyles();

      expect(returnedStyles).toEqual({ ...renderInstance.getStyles().content.base, ...renderInstance.getStyles().content.custom });
    });

    it("returns correct content styles if there's no banner", () => {
      renderInstance.setState({
        banner: undefined,
        type: "info",
        size: "small"
      });
      const returnedStyles = renderInstance.getContentStyles();

      expect(returnedStyles).toEqual({ ...renderInstance.getStyles().content.base, ...renderInstance.getStyles().content.default });
    });

    it("returns correct text styles if there's a banner", () => {
      render.setProps({
        banner: {},
        size: "default"
      });
      const returnedStyles = renderInstance.getTextStyles();

      expect(returnedStyles).toEqual({ ...renderInstance.getStyles().text.banner.default });
    });

    it("returns correct text styles if there's no banner", () => {
      renderInstance.setState({ banner: undefined });
      const returnedStyles = renderInstance.getTextStyles();

      expect(returnedStyles).toEqual({ ...renderInstance.getStyles().text.default });
    });

    it("sets correct backdrop styles if it's open", () => {
      render.setProps({
        isOpen: true
      });
      renderInstance.setBackdropStyles();

      expect(renderInstance.state.backdropStyles).toEqual({
        ...renderInstance.state.backdropStyles,
        ...renderInstance.getStyles().backdrop.open
      });
    });

    it("sets correct backdrop styles if it's closed", () => {
      render.setProps({
        isOpen: false
      });
      renderInstance.setBackdropStyles();

      expect(renderInstance.state.backdropStyles).toEqual({
        ...renderInstance.state.backdropStyles,
        ...renderInstance.getStyles().backdrop.closed
      });
    });
  });

  describe("triggering actions", () => {
    it("sets correct backdrop styles if open prop changed", () => {
      const spySetBackdropStyles = jest.spyOn(renderInstance, "setBackdropStyles");
      const prevProps = { isOpen: false };
      render.setProps({
        isOpen: true
      });
      renderInstance.componentDidUpdate(prevProps, null, null);

      expect(spySetBackdropStyles).toHaveBeenCalled();
      spySetBackdropStyles.mockRestore();
    });

    it("executes onLayout event callback for gallery", () => {
      const spyGetGalleryBoxDimensions = jest.spyOn(renderInstance, "getGalleryBoxDimensions");
      const e = {
        nativeEvent: {
          layout: {}
        }
      };
      render.setProps({
        isOpen: false,
        type: "gallery",
        images: []
      });
      render.props().children.props.children.props.children.props.children[1].props.onLayout(e);

      expect(spyGetGalleryBoxDimensions).toHaveBeenCalled();
      spyGetGalleryBoxDimensions.mockRestore();
    });

    it("executes onLayout event callback for previous arrow", () => {
      const spyGetGalleryArrowsDimensions = jest.spyOn(renderInstance, "getGalleryArrowsDimensions");
      const e = {
        nativeEvent: {
          layout: {}
        }
      };
      render.setProps({
        isOpen: false,
        type: "gallery",
        images: ["", "", ""]
      });
      renderInstance.setState({ has: { prev: true } });
      render.props().children.props.children.props.children.props.children[1].props.children[0].props.children[0].props.children.props.onLayout(e);

      expect(spyGetGalleryArrowsDimensions).toHaveBeenCalled();
      spyGetGalleryArrowsDimensions.mockRestore();
    });

    it("executes ref event callback for the carousel", () => {
      const c = "ref";
      render.setProps({
        isOpen: false,
        type: "gallery",
        images: ["", "", ""]
      });
      renderInstance.setState({ has: { prev: true } });
      render.props().children.props.children.props.children.props.children[1].props.children[1].ref(c);

      expect(renderInstance.carouselRef).toBe("ref");
    });

    it("sets gallery arrows position on componentDidUpdate", () => {
      const spySetGalleryArrowsPosition = jest.spyOn(renderInstance, "setGalleryArrowsPosition");
      const prevState = {
        dimensions: {
          gallery: {
            height: 1,
            width: 1
          },
          arrows: {
            height: 1,
            width: 1
          }
        }
      };
      const prevProps = {
        isOpen: false
      };
      render.setProps({
        isOpen: false,
        type: "gallery",
        images: []
      });
      renderInstance.componentDidUpdate(prevProps, prevState, null);

      expect(spySetGalleryArrowsPosition).toHaveBeenCalled();
      spySetGalleryArrowsPosition.mockRestore();
    });

    it("reinitializes gallery on componentDidUpdate", () => {
      const spyReinitGallery = jest.spyOn(renderInstance, "reinitGallery");
      const prevState = {
        dimensions: {
          gallery: {
            height: 1,
            width: 1
          },
          arrows: {
            height: 1,
            width: 1
          }
        }
      };
      const prevProps = {
        isOpen: true
      };
      render.setProps({
        isOpen: false,
        type: "gallery"
      });
      renderInstance.componentDidUpdate(prevProps, prevState, null);

      expect(spyReinitGallery).toHaveBeenCalled();
      spyReinitGallery.mockRestore();
    });

    it("reinitializes gallery slides position", () => {
      renderInstance.reinitGallery();

      expect(renderInstance.state.has.next).toBe(true);
      expect(renderInstance.state.has.prev).toBe(false);
    });

    it("goes to the previous slide if type is gallery", () => {
      renderInstance.carouselRef = {
        snapToPrev: jest.fn()
      };
      renderInstance.prevSlide();

      expect(renderInstance.carouselRef.snapToPrev).toHaveBeenCalled();
    });

    it("goes to the next slide if type is gallery", () => {
      renderInstance.carouselRef = {
        snapToNext: jest.fn()
      };
      renderInstance.nextSlide();

      expect(renderInstance.carouselRef.snapToNext).toHaveBeenCalled();
    });
  });

  describe("getting dimensions", () => {
    it("sets gallery dimensions", () => {
      renderInstance.getGalleryDimensions({ width: 100, height: 100 });

      expect(renderInstance.state.dimensions.gallery.width).toBe(Math.floor(100));
      expect(renderInstance.state.dimensions.gallery.height).toBe(Math.floor(100));
    });

    it("sets gallery arrows dimensions", () => {
      renderInstance.getGalleryArrowsDimensions({ width: 10, height: 10 });

      expect(renderInstance.state.dimensions.arrows.width).toBe(Math.floor(10));
      expect(renderInstance.state.dimensions.arrows.height).toBe(Math.floor(10));
    });

    it("returns gallery box dimensions", () => {
      const returnedDimensions = renderInstance.getGalleryBoxDimensions();

      expect(typeof returnedDimensions.height).toBe("number");
      expect(typeof returnedDimensions.width).toBe("number");
    });
  });

  describe("state changing", () => {
    it("sets correct 'has' state if on initial slide", () => {
      render.setProps({
        images: [
          require("../../assets/images/placeholder.png"),
          require("../../assets/images/placeholder.png"),
          require("../../assets/images/placeholder.png")]
      });
      renderInstance.handleBeforeSnap(0);

      expect(renderInstance.state.has.next).toBe(true);
      expect(renderInstance.state.has.prev).toBe(false);
    });

    it("sets correct 'has' state if on middle slide", () => {
      render.setProps({
        images: [
          require("../../assets/images/placeholder.png"),
          require("../../assets/images/placeholder.png"),
          require("../../assets/images/placeholder.png")]
      });
      renderInstance.handleBeforeSnap(1);

      expect(renderInstance.state.has.next).toBe(true);
      expect(renderInstance.state.has.prev).toBe(true);
    });

    it("sets correct 'has' state if on final slide", () => {
      render.setProps({
        images: [
          require("../../assets/images/placeholder.png"),
          require("../../assets/images/placeholder.png"),
          require("../../assets/images/placeholder.png")]
      });
      renderInstance.handleBeforeSnap(2);

      expect(renderInstance.state.has.next).toBe(false);
      expect(renderInstance.state.has.prev).toBe(true);
    });

    it("updates the state with new, incoming props if type is regular and isOpen changed", () => {
      const prevProps = { isOpen: false };
      const prevState = { dimensions: "Test" };
      render.setProps({ type: "regular", isOpen: true });
      const spySetState = jest.spyOn(renderInstance, "setState");
      const spySetBackdropStyles = jest.spyOn(renderInstance, "setBackdropStyles");
      renderInstance.updateState(prevProps, prevState);

      expect(spySetState).toHaveBeenCalled();
      expect(spySetBackdropStyles).toHaveBeenCalled();
      spySetState.mockRestore();
      spySetBackdropStyles.mockRestore();
    });

    it("updates the state with new, incoming props if type is gallery, and isOpen and dimensions changed", () => {
      const prevProps = { isOpen: false };
      const prevState = { dimensions: "Test" };
      render.setProps({ type: "gallery", isOpen: true, dimensions: "Test 2" });
      const spySetState = jest.spyOn(renderInstance, "setState");
      const spySetGalleryArrowsPosition = jest.spyOn(renderInstance, "setGalleryArrowsPosition");
      const spyReinitGallery = jest.spyOn(renderInstance, "reinitGallery");
      renderInstance.updateState(prevProps, prevState);

      expect(spySetState).toHaveBeenCalled();
      expect(spySetGalleryArrowsPosition).toHaveBeenCalled();
      expect(spyReinitGallery).toHaveBeenCalled();
      spySetState.mockRestore();
      spySetGalleryArrowsPosition.mockRestore();
      spyReinitGallery.mockRestore();
    });

    it("returns false after updating the state with new, incoming props if type is gallery, and isOpen and dimensions did not change", () => {
      const prevProps = { isOpen: true };
      const prevState = { dimensions: "Test" };
      const spySetState = jest.spyOn(renderInstance, "setState");
      render.setProps({ type: "gallery", isOpen: true, dimensions: "Test" });
      renderInstance.updateState(prevProps, prevState);

      expect(spySetState).toHaveBeenCalled();
      spySetState.mockRestore();
    });
  });
});