import "react-native";
import React from "react";
import renderer from "react-test-renderer";

import ModalStyles from "../../app/styles/components/PackenModal";
import PackenModal from "../../app/components/PackenModal";
import PackenButton from "../../app/components/PackenButton";

describe("<PackenModal/>", () => {
  let render, renderInstance, renderGallery;
  const mock_callback = jest.fn();

  beforeAll(() => {
    render = renderer.create(
      <PackenModal
        isOpen={false}
        size="default"
        type="info"
        theme="danger"
        banner={{icon: "x-circle"}}
        info={{
          title: "Title",
          text: "Fugiat sint eiusmod esse eu duis sint labore. Veniam anim reprehenderit.",
          btn: <PackenButton icon={{ name: "arrow-right", position: "right" }} type="regular" level="primary" size="medium" callback={mock_callback}>BUTTON</PackenButton>
        }}
        toggle={mock_callback}
      />
    );

    renderGallery = renderer.create(
      <PackenModal
        isOpen={false}
        size="small"
        type="gallery"
        theme="white"
        images={[require("../../assets/images/placeholder.png")]}
        toggle={mock_callback}
      />
    );

    renderInstance = render.getInstance();

    renderInstance.setState = state => {
      renderInstance.state = {
        ...renderInstance.state,
        ...state
      };
    }
    renderInstance.setState({
      backdropStyles: { ...ModalStyles.backdrop.base },
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

    it("renders a gallery modal correctly", () => {
      expect(renderGallery).toBeDefined();
    });

    it("renders gallery slide correctly", () => {
      const gallerySlide = renderInstance.render_gallery_slide({
        item: require("../../assets/images/placeholder.png"),
        index: 0
      });
      expect(gallerySlide).toBeDefined();
    });
  });

  describe("styling", () => {
    it("returns correct content styles if there's a banner", () => {
      renderInstance.props = { banner: {}, size: "small" };
      const returnedStyles = renderInstance.get_content_styles();
      expect(returnedStyles).toEqual({ ...ModalStyles.content.base, ...ModalStyles.content.banner.small});
    });

    it("returns correct content styles if there's no banner", () => {
      renderInstance.props = {};
      const returnedStyles = renderInstance.get_content_styles();
      expect(returnedStyles).toEqual({ ...ModalStyles.content.base, ...ModalStyles.content.default});
    });

    it("returns correct text styles if there's a banner", () => {
      renderInstance.props = { banner: {}, size: "default" };
      const returnedStyles = renderInstance.get_text_styles();
      expect(returnedStyles).toEqual({ ...ModalStyles.text.banner.default });
    });

    it("returns correct text styles if there's no banner", () => {
      renderInstance.props = {};
      const returnedStyles = renderInstance.get_text_styles();
      expect(returnedStyles).toEqual({ ...ModalStyles.text.default });
    });

    it("sets correct backdrop styles if it's open", () => {
      renderInstance.props = { isOpen: true };
      renderInstance.set_backdrop_styles();
      expect(renderInstance.state.backdropStyles).toEqual({
        ...renderInstance.state.backdropStyles,
        ...ModalStyles.backdrop.open
      });
    });

    it("sets correct backdrop styles if it's closed", () => {
      renderInstance.props = { isOpen: false };
      renderInstance.set_backdrop_styles();
      expect(renderInstance.state.backdropStyles).toEqual({
        ...renderInstance.state.backdropStyles,
        ...ModalStyles.backdrop.closed
      });
    });
  });

  describe("triggering actions", () => {
    it("sets correct backdrop styles if open prop changed", () => {
      const prevProps = { isOpen: false };
      renderInstance.props = { isOpen: true };
      renderInstance.set_backdrop_styles = jest.fn();
      renderInstance.componentDidUpdate(prevProps, null, null);
      expect(renderInstance.set_backdrop_styles).toHaveBeenCalled();
    });

    it("sets gallery arrows position on componentDidUpdate", () => {
      renderInstance.set_gallery_arrows_position = jest.fn();
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
        },
      };
      const prevProps = {
        isOpen: false
      };
      renderInstance.props = { isOpen: false, type: "gallery" };
      renderInstance.componentDidUpdate(prevProps, prevState, null);
      expect(renderInstance.set_gallery_arrows_position).toHaveBeenCalled();
    });

    it("reinitializes gallery on componentDidUpdate", () => {
      renderInstance.reinit_gallery = jest.fn();
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
        },
      };
      const prevProps = {
        isOpen: false
      };
      renderInstance.props = { isOpen: true, type: "gallery" };
      renderInstance.componentDidUpdate(prevProps, prevState, null);
      expect(renderInstance.reinit_gallery).toHaveBeenCalled();
    });

    it("reinit_gallery", () => {
      renderInstance.reinit_gallery();
      expect(renderInstance.state.has.next).toBe(true);
      expect(renderInstance.state.has.prev).toBe(false);
    });

    it("goes to the previous slide if type is gallery", () => {
      renderInstance.carousel_ref = {
        snapToPrev: jest.fn()
      };
      renderInstance.prevSlide();
      expect(renderInstance.carousel_ref.snapToPrev).toHaveBeenCalled();
    });

    it("goes to the next slide if type is gallery", () => {
      renderInstance.carousel_ref = {
        snapToNext: jest.fn()
      };
      renderInstance.nextSlide();
      expect(renderInstance.carousel_ref.snapToNext).toHaveBeenCalled();
    });
  });

  describe("getting dimensions", () => {
    it("sets gallery dimensions", () => {
      renderInstance.set_gallery_arrows_position = jest.fn();
      renderInstance.get_gallery_dimensions({width: 100, height: 100});
      expect(renderInstance.state.dimensions.gallery.width).toBe(Math.floor(100));
      expect(renderInstance.state.dimensions.gallery.height).toBe(Math.floor(100));
      
      /* Review to avoid using setTimeout */
      const timeout = setTimeout(() => {
        expect(renderInstance.set_gallery_arrows_position).toHaveBeenCalled();
        clearTimeout(timeout);
      }, 1000);
    });

    it("sets gallery arrows dimensions", () => {
      renderInstance.set_gallery_arrows_position = jest.fn();
      renderInstance.get_gallery_arrow_dimensions({width: 10, height: 10});
      expect(renderInstance.state.dimensions.arrows.width).toBe(Math.floor(10));
      expect(renderInstance.state.dimensions.arrows.height).toBe(Math.floor(10));
      
      /* Review to avoid using setTimeout */
      const timeout = setTimeout(() => {
        expect(renderInstance.set_gallery_arrows_position).toHaveBeenCalled();
        clearTimeout(timeout);
      }, 1000);
    });

    it("returns gallery box dimensions", () => {
      const returnedDimensions = renderInstance.get_gallery_box_dimensions();
      expect(typeof returnedDimensions.height).toBe("number");
      expect(typeof returnedDimensions.width).toBe("number");
    });
  });

  describe("state changing", () => {
    it("sets correct 'has' state if on initial slide", () => {
      renderInstance.props = {
        images: [
          require("../../assets/images/placeholder.png"),
          require("../../assets/images/placeholder.png"),
          require("../../assets/images/placeholder.png")]
      };
      renderInstance.handle_before_snap(0);
      expect(renderInstance.state.has.next).toBe(true);
      expect(renderInstance.state.has.prev).toBe(false);
    });

    it("sets correct 'has' state if on middle slide", () => {
      renderInstance.props = {
        images: [
          require("../../assets/images/placeholder.png"),
          require("../../assets/images/placeholder.png"),
          require("../../assets/images/placeholder.png")]
      };
      renderInstance.handle_before_snap(1);
      expect(renderInstance.state.has.next).toBe(true);
      expect(renderInstance.state.has.prev).toBe(true);
    });

    it("sets correct 'has' state if on final slide", () => {
      renderInstance.props = {
        images: [
          require("../../assets/images/placeholder.png"),
          require("../../assets/images/placeholder.png"),
          require("../../assets/images/placeholder.png")]
      };
      renderInstance.handle_before_snap(2);
      expect(renderInstance.state.has.next).toBe(false);
      expect(renderInstance.state.has.prev).toBe(true);
    });
  });
});