import "react-native";
import React from "react";
import { View, Platform } from "react-native";
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
        mocalClose={mockCallback}
      />
    );

    renderGallery = shallow(
      <PackenUiModal
        isOpen={false}
        size="small"
        type="gallery"
        theme="white"
        images={[require("../../assets/images/placeholder.png")]}
        mocalClose={mockCallback}
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
      modalClose: mockCallback,
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

    it("returns a header element correctly", () => {
      const res = renderInstance.getHeader();
      expect(res).toBeDefined();
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
    it("executes the mockCallback", () => {
      const res = renderInstance.mockCallback();

      expect(res).toBe(false);
    });

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

    it("executes the instance callback on componentDidMount if provided", () => {
      render.setProps({ instance: jest.fn() });
      renderInstance.componentDidMount();

      expect(renderInstance.props.instance).toHaveBeenCalled();
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

    it("triggers the onDismissHandler", () => {
      renderInstance.setState({ onDismiss: jest.fn() });
      renderInstance.onDismissHandler();

      expect(renderInstance.state.onDismiss).toHaveBeenCalled();
    });

    it("returns false while triggering the onDismissHandler if none is passed", () => {
      renderInstance.setState({ onDismiss: undefined });
      const res = renderInstance.onDismissHandler();

      expect(res).toBe(false);
    });

    it("triggers the onRequestCloseHandler", () => {
      renderInstance.setState({ onRequestClose: jest.fn() });
      renderInstance.onRequestCloseHandler();

      expect(renderInstance.state.onRequestClose).toHaveBeenCalled();
    });

    it("returns false while triggering the onDismissHandler if none is passed", () => {
      renderInstance.setState({ onRequestClose: undefined });
      const res = renderInstance.onRequestCloseHandler();

      expect(res).toBe(false);
    });

    it("executes the headerCallDismiss function it it's iOS", () => {
      renderInstance.setState({ modalClose: mockCallback });
      const spyOnRequestCloseHandler = jest.spyOn(renderInstance, "onRequestCloseHandler");
      Platform.OS = "ios";
      renderInstance.headerCallDismiss();

      expect(renderInstance.state.modalClose).toHaveBeenCalled();
      expect(spyOnRequestCloseHandler).toHaveBeenCalled();
      spyOnRequestCloseHandler.mockRestore();
    });

    it("executes the headerCallDismiss function it it's not iOS", () => {
      renderInstance.setState({ modalClose: mockCallback });
      const spyOnDismissHandler = jest.spyOn(renderInstance, "onDismissHandler");
      Platform.OS = "android";
      renderInstance.headerCallDismiss();

      expect(renderInstance.state.modalClose).toHaveBeenCalled();
      expect(spyOnDismissHandler).toHaveBeenCalled();
      spyOnDismissHandler.mockRestore();
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

    it("returns incoming props as the state key-value pairs", () => {
      render.setProps({
        type: undefined,
        banner: undefined,
        size: undefined,
        isOpen: undefined,
        images: undefined,
        info: undefined,
        modalClose: undefined,
        theme: undefined,
        content: undefined,
        onDismiss: undefined,
        onRequestClose: undefined,
        styling: undefined
      });
      const res = renderInstance.setPropsToState();

      expect(res).toEqual({
        type: "info",
        banner: false,
        size: "default",
        isOpen: false,
        images: [],
        info: {
          title: "",
          text: ""
        },
        modalClose: renderInstance.mockCallback,
        theme: "primary",
        content: null,
        onDismiss: false,
        onRequestClose: false,
        styling: {
          backdrop: {},
          wrapper: {},
          box: {},
          header: {},
          headerInner: {},
          closeIconSize: undefined,
          closeIconColor: undefined,
          info: {},
          banner: {},
          bannerIconSize: undefined,
          bannerIconColor: undefined,
          content: {},
          title: {},
          text: {},
          btnWrapper: {},
          galleryBox: {},
          arrowLeft: {},
          arrowRight: {},
          arrowIconSize: undefined,
          arrowIconColor: undefined
        }
      });
    });

    it("returns incoming props as the state key-value pairs if some are provided", () => {
      render.setProps({
        content: <View></View>,
        modalClose: mockCallback,
        onDismiss: mockCallback,
        onRequestClose: mockCallback
      });
      const res = renderInstance.setPropsToState();

      expect(res.content).toEqual(<View></View>);
      expect(res.modalClose).toBe(mockCallback);
      expect(res.onDismiss).toBe(mockCallback);
      expect(res.onRequestClose).toBe(mockCallback);
    });
  });
});