import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, View, TouchableWithoutFeedback, Image, Dimensions, Platform } from "react-native";
import * as UTIL from "../utils";

import Carousel from 'react-native-snap-carousel';
import Icon from "react-native-vector-icons/dist/Feather";

import Colors from "../styles/abstracts/colors";
import Shadows from "../styles/abstracts/shadows";

import PackenUiText from "./PackenUiText";

/**
 * Component for rendering a modal popup with fading animation
 */
class PackenUiModal extends Component {
  /**
   * Initializes the component
   * @type {function}
   * @param {object} props Props passed to the component
   */
  constructor(props) {
    super(props);

    /**
     * Variable that stores the base state for all types of modals
     * @type {object}
     */
    let initialState = {
      ...this.setPropsToState(),
      backdropStyles: { ...this.getStyles().backdrop.base }
    };
    if (props.type !== "gallery") {
      initialState = {
        ...initialState
      }
    } else {
      initialState = {
        ...initialState,
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
      }
    }

    /**
     * Variable that stores the state
     * @type {object}
     */
    this.state = { ...initialState };

    /**
     * Variable that stores the carousel ref/instance in case it's a gallery modal
     * @type {object}
     */
    this.carouselRef;
  }

  /**
   * Placeholder function that does nothing
   * @type {function}
   * @return {boolean} Flag used only for testing purposes
   */
  mockCallback = () => false;

  /**
   * Centralizes the received props assignment to set them to the state, determining default values in case any is not provided
   * @type {function}
   * @property {string} [type="info"] The type of modal - "info"; "custom"; "gallery"
   * @property {object} [banner=false] The configuration for the optional banner element
   * @property {string} [size="default"] The size for applying correct styles - "default" or "small"
   * @property {boolean} [isOpen=false] Determines whether the modal should be open
   * @property {array} [images=[]] The images to be rendered in a "gallery" modal
   * @property {object} [info={ title: "", text: "" }] The text labels to render for "info" modals
   * @property {function} [modalClose=mockCallback] The passed function to close the modal from inside the component
   * @property {string} [theme="info"] The theme to apply correct styles - "info"; "warning"; "danger"; "success"
   * @property {node} [content=null] The JSX content for "custom" modals
   * @property {function} [onDismiss=false] Callback function to be triggered when onDismiss is called
   * @property {function} [onRequestClose=false] Callback function to be triggered when onRequestClose is called
   * @property {object} [styling={ container: {}, backdrop: {}, main: {}, wrapper: {}, box: {}, header: {}, headerInner: {}, closeIconSize: undefined, closeIconColor: undefined, info: {}, banner: {}, bannerIconSize: undefined, bannerIconColor: undefined, content: {}, title: {}, text: {}, btnWrapper: {}, galleryBox: {}, slide: {}, slideImg: {}, arrowLeft: {}, arrowRight: {}, arrowIconSize: undefined, arrowIconColor: undefined }] The optional custom styling props
   * @return {object} The props mapped to the state keys
   */
  setPropsToState = () => {
    return {
      type: this.props.type ? this.props.type : "info",
      banner: this.props.banner ? this.props.banner : false,
      size: this.props.size ? this.props.size : "default",
      isOpen: this.props.isOpen ? this.props.isOpen : false,
      images: this.props.images ? this.props.images : [],
      info: this.props.info ? this.props.info : {
        title: "",
        text: ""
      },
      modalClose: this.props.modalClose ? this.props.modalClose : this.mockCallback,
      theme: this.props.theme ? this.props.theme : "info",
      content: this.props.content ? this.props.content : null,
      onDismiss: this.props.onDismiss ? this.props.onDismiss : false,
      onRequestClose: this.props.onRequestClose ? this.props.onRequestClose : false,
      styling: this.props.styling ? { ...this.props.styling } : {
        container: {},
        backdrop: {},
        main: {},
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
        slide: {},
        slideImg: {},
        arrowLeft: {},
        arrowRight: {},
        arrowIconSize: undefined,
        arrowIconColor: undefined
      }
    };
  }

  /**
   * Propagates the component instance if a callback is provided via props, and sets the gallery arrows positioning styles
   * @type {function}
   */
  componentDidMount() {
    if (this.state.type === "gallery") {
      this.setGalleryArrowsPosition();
    }
    if (typeof this.props.instance === "function") {
      this.props.instance(this);
    }
  }

  /**
   * Returns the correct content styles depending on the type of modal
   * @type {function}
   * @return {object} The styles object
   */
  getContentStyles = () => {
    let contentStyles = { ...this.getStyles().content.base };

    if (this.state.banner) {
      contentStyles = {
        ...contentStyles,
        ...this.getStyles().content.banner[this.state.size]
      }
    } else {
      if (this.state.type === "custom") {
        contentStyles = {
          ...contentStyles,
          ...this.getStyles().content.custom
        }
      } else {
        contentStyles = {
          ...contentStyles,
          ...this.getStyles().content.default
        }
      }
    }

    return contentStyles;
  }

  /**
   * Returns the correct text styles
   * @type {function}
   * @return {object} The styles object
   */
  getTextStyles = () => {
    let textStyles = {};

    if (this.state.banner) {
      textStyles = {
        ...this.getStyles().text.banner[this.state.size]
      }
    } else {
      textStyles = {
        ...this.getStyles().text.default
      }
    }

    return textStyles;
  }

  /**
   * Sets the correct backdrop styles depending on whether the modal is open or closed
   * @type {function}
   * @return {object} The styles object
   */
  setBackdropStyles = () => {
    if (this.state.isOpen) {
      this.setState({
        backdropStyles: {
          ...this.state.backdropStyles,
          ...this.getStyles().backdrop.open
        }
      });
    } else {
      this.setState({
        backdropStyles: {
          ...this.state.backdropStyles,
          ...this.getStyles().backdrop.closed
        }
      });
    }
  }

  /**
   * Triggers the closing handlers when closing the modal
   * @type {function}
   */
  checkHandlers = () => {
    if (!this.state.isOpen) {
      this.onDismissHandler();
      this.onRequestCloseHandler();
    }
  }

  /**
   * Updates the state with new props and, depending on the type of modal, checks styles and triggers callbacks
   * @type {function}
   * @param {object} prevProps Previous props
   * @param {object} prevState Previous state
   */
  updateState = (prevProps, prevState) => {
    this.setState({
      ...this.setPropsToState()
    }, () => {
      if (prevProps.isOpen !== this.props.isOpen) {
        this.setBackdropStyles();
        this.checkHandlers();
      }
      if (this.props.type === "gallery") {
        if (prevProps.isOpen !== this.props.isOpen) {
          this.reinitGallery();
        }
        if (prevState.dimensions !== this.state.dimensions) {
          this.setGalleryArrowsPosition();
        }
      }
    });
  }

  /**
   * Compares props to determine if the component should update its state with new props
   * @type {function}
   * @param {object} prevProps Previous props
   * @param {object} prevState Previous state
   */
  componentDidUpdate(prevProps, prevState) {
    if (!UTIL.objectsEqual(prevProps, this.props)) {
      this.updateState(prevProps, prevState);
    }
  }

  /**
   * Reinitializes the gallery arrows state, which doesn't automatically change when closing the modal
   * @type {function}
   */
  reinitGallery = () => {
    this.setState({
      has: {
        next: true,
        prev: false
      }
    });
  }

  /**
   * Programmatically goes to the previous slide
   * @type {function}
   */
  prevSlide = () => {
    this.carouselRef.snapToPrev();
  }

  /**
   * Programmatically goes to the next slide
   * @type {function}
   */
  nextSlide = () => {
    this.carouselRef.snapToNext();
  }

  /**
   * Renders a gallery slide
   * @type {function}
   * @param {object} item The item's configuration data
   * @param {number} index The item's index
   * @return {node} JSX for the slide
   */
  renderGallerySlide = ({ item, index }) => {
    return (
      <View key={index} style={{
        ...this.getStyles().gallery.slide,
        ...this.getGalleryBoxDimensions(),
        ...this.state.styling.slide
      }}>
        <Image
          source={item}
          resizeMode="cover"
          style={{
            ...this.getStyles().gallery.img,
            ...this.getGalleryBoxDimensions(),
            ...this.state.styling.slideImg
          }}
        />
      </View>
    );
  }

  /**
   * Sets the carousel wrapper element dimensions for correct positioning
   * @type {function}
   * @param {number} width The width of the wrapper
   * @param {number} height The height of the wrapper
   */
  getGalleryDimensions = ({ width, height }) => {
    this.setState({
      dimensions: {
        ...this.state.dimensions,
        gallery: {
          height: Math.floor(height),
          width: Math.floor(width)
        }
      }
    }, this.setGalleryArrowsPosition);
  }

  /**
   * Sets the gallery arrows wrapper element dimensions for correct positioning
   * @type {function}
   * @param {number} width The width of the wrapper
   * @param {number} height The height of the wrapper
   */
  getGalleryArrowsDimensions = ({ width, height }) => {
    this.setState({
      dimensions: {
        ...this.state.dimensions,
        arrows: {
          height: Math.floor(height),
          width: Math.floor(width)
        }
      }
    }, this.setGalleryArrowsPosition);
  }

  /**
   * Sets the gallery arrows position styles to the state
   * @type {function}
   */
  setGalleryArrowsPosition = () => {
    const verticalOffset = this.state.dimensions.gallery.height / 2.25;
    const horizontalOffset = 20;

    this.setState({
      arrowStyles: {
        left: {
          top: verticalOffset,
          left: horizontalOffset
        },
        right: {
          top: verticalOffset,
          right: horizontalOffset
        }
      }
    });
  }

  /**
   * Returns the gallery box dimensions based on the screen's dimensions
   * @type {function}
   * @return {object} The dimensions object
   */
  getGalleryBoxDimensions = () => {
    return {
      height: Dimensions.get("screen").height / 3.5,
      width: (Dimensions.get("screen").width * .85) - 36
    };
  }

  /**
   * Handles the beforeSnap event for the "gallery" modals carousel component to set the arrows visibility depending on the current slide position
   * @type {function}
   * @param {number} slideIndex The current slide index
   */
  handleBeforeSnap = slideIndex => {
    this.setState({
      has: {
        next: slideIndex === this.state.images.length - 1 ? false : true,
        prev: slideIndex === 0 ? false : true
      }
    });
  }

  /**
   * Returns the JSX for the optional banner element
   * @type {function}
   * @return {node|null} The JSX for the banner
   */
  getBanner = () => {
    let banner = null;

    if (this.state.banner) {
      banner = (
        <View style={{ ...this.getStyles().banner.base, ...this.getStyles().banner[this.state.theme], ...this.state.styling.banner }}>
          <Icon
            name={this.state.banner.icon}
            size={this.state.styling.bannerIconSize ? this.state.styling.bannerIconSize : 40}
            color={this.state.styling.bannerIconColor ? this.state.styling.bannerIconColor : Colors[this.state.theme].default} />
        </View>
      );
    }

    return banner;
  }

  /**
   * Returns the JSX for the button element of "info" modals
   * @type {function}
   * @return {node|null} The JSX for the button
   */
  getInfoButton = () => {
    let btn = null;

    if (this.state.info.btn) {
      btn = (
        <View style={{ ...this.getStyles().btn, ...this.state.styling.btnWrapper }}>
          {this.state.info.btn}
        </View>
      );
    }

    return btn;
  }

  /**
   * Triggers the platform-specific handlers when closing the modal when pressing the "X" icon on the header
   * @type {function}
   */
  headerCallDismiss = () => {
    if (Platform.OS === "ios") {
      this.onRequestCloseHandler();
      this.state.modalClose();
      return;
    }
    this.onDismissHandler();
    this.state.modalClose();
  };

  /**
   * Returns the JSX for the header element if it's not a "custom" modal
   * @type {function}
   * @return {node|null} JSX for the header or null
   */
  getHeader = () => {
    let header = null;

    if (this.state.type !== "custom") {
      header = (
        <View style={{ ...(this.state.type === "gallery" ? this.getStyles().header__gallery : this.getStyles().header), ...this.state.styling.header }}>
          <View style={{ ...this.getStyles().header__inner, ...this.state.styling.headerInner }}>
            <TouchableWithoutFeedback onPress={this.headerCallDismiss}>
              <Icon
                name="x"
                size={this.state.styling.closeIconSize ? this.state.styling.closeIconSize : 20}
                color={this.state.styling.closeIconColor ? this.state.styling.closeIconColor : Colors[this.state.theme].default}
                style={this.state.type === "gallery" ? this.getStyles().header__close_icon : null} />
            </TouchableWithoutFeedback>
          </View>
        </View>
      );
    }

    return header;
  }

  /**
   * Returns the correct JSX if it's a "custom" modal
   * @type {function}
   * @return {node} JSX for the content
   */
  getCustomContent = () => (
    <View style={{ ...this.getStyles().info, ...this.state.styling.info }}>
      <View style={{ ...this.getContentStyles(), ...this.state.styling.content }}>
        {this.state.content}
      </View>
    </View>
  )

  /**
   * Returns the correct JSX if it's an "info" modal
   * @type {function}
   * @return {node} JSX for the content
   */
  getInfoContent = () => (
    <View style={{ ...this.getStyles().info, ...this.state.styling.info }}>
      {this.getBanner()}
      <View style={{ ...this.getContentStyles(), ...this.state.styling.content }}>
        <PackenUiText preset="h3" style={{ ...this.getStyles().title, ...this.state.styling.title }}>{this.state.info.title}</PackenUiText>
        <PackenUiText preset="p1" style={{ ...this.getStyles().text.base, ...this.getTextStyles(), ...this.state.styling.text }}>{this.state.info.text}</PackenUiText>
        {this.getInfoButton()}
      </View>
    </View>
  )

  /**
   * Returns the JSX for the arrows if it's a "gallery" modal
   * @type {function}
   * @return {node} JSX for the arrows
   */
  getGalleryArrows = () => (
    this.state.images.length > 1 ? (
      <React.Fragment>
        {
          this.state.has.prev ? (
            <TouchableWithoutFeedback onPress={this.prevSlide}>
              <View
                onLayout={e => { this.getGalleryArrowsDimensions(e.nativeEvent.layout); }}
                style={{
                  ...this.getStyles().gallery.arrows.base,
                  ...this.state.arrowStyles.left,
                  ...this.state.styling.arrowLeft
                }}>
                <Icon
                  name="arrow-left-circle"
                  size={this.state.styling.arrowIconSize ? this.state.styling.arrowIconSize : 30}
                  color={this.state.styling.arrowIconColor ? this.state.styling.arrowIconColor : Colors.basic.white.dft}
                  style={this.getStyles().gallery.arrows.icon} />
              </View>
            </TouchableWithoutFeedback>
          ) : null
        }
        {
          this.state.has.next ? (
            <TouchableWithoutFeedback onPress={this.nextSlide}>
              <View
                style={{
                  ...this.getStyles().gallery.arrows.base,
                  ...this.state.arrowStyles.right,
                  ...this.state.styling.arrowRight
                }}>
                <Icon
                  name="arrow-right-circle"
                  size={this.state.styling.arrowIconSize ? this.state.styling.arrowIconSize : 30}
                  color={this.state.styling.arrowIconColor ? this.state.styling.arrowIconColor : Colors.basic.white.dft}
                  style={this.getStyles().gallery.arrows.icon} />
              </View>
            </TouchableWithoutFeedback>
          ) : null
        }
      </React.Fragment>
    ) : null
  )

  /**
   * Returns the correct JSX if it's a "gallery" modal
   * @type {function}
   * @return {node} JSX for the content
   */
  getGalleryContent = () => (
    <View
      style={{
        ...this.getGalleryBoxDimensions(),
        ...this.state.styling.galleryBox
      }}
      onLayout={e => { this.getGalleryDimensions(e.nativeEvent.layout); }}
    >
      {this.getGalleryArrows()}
      <Carousel
        ref={c => { this.carouselRef = c; }}
        onBeforeSnapToItem={this.handleBeforeSnap}
        data={this.state.images}
        renderItem={this.renderGallerySlide}
        itemWidth={this.getGalleryBoxDimensions().width}
        sliderWidth={this.getGalleryBoxDimensions().width}
        inactiveSlideOpacity={1}
        inactiveSlideScale={1}
      />
    </View>
  )

  /**
   * Returns the correct JSX for the main content depending on the type of modal
   * @type {function}
   * @return {node|null} JSX for the modal content or null
   */
  getContent = () => {
    let content = null;

    switch (this.state.type) {
      case "custom":
        content = this.getCustomContent();
        break;
      case "info":
        content = this.getInfoContent();
        break;
      case "gallery":
        content = this.getGalleryContent();
        break;
    }

    return content;
  }

  /**
   * Handles the onDismissHandler event on the native Modal component
   * @type {function}
   */
  onDismissHandler = () => {
    if (this.state.onDismiss) {
      this.state.onDismiss();
    } else {
      return false;
    }
  }

  /**
   * Handles the onRequestCloseHandler event on the native Modal component
   * @type {function}
   */
  onRequestCloseHandler = () => {
    if (this.state.onRequestClose) {
      this.state.onRequestClose();
    } else {
      return false;
    }
  }

  /**
   * Closes the modal with the passed function via props
   * @property {function}
   */
  closeModal = () => {
    if (this.state.modalClose) {
      this.state.modalClose();
    } else {
      return false;
    }
  }

  /**
   * Renders the component
   * @type {function}
   * @return {node} JSX for the component
   */
  render() {
    return (
      <Modal
        visible={this.state.isOpen}
        animationType="fade"
        transparent={true}
        onDismiss={this.onDismissHandler}
        onRequestClose={this.onRequestCloseHandler}
      >
        <View style={{ ...this.getStyles().container, ...this.state.styling.container }}>
          <TouchableWithoutFeedback onPress={this.closeModal}>
            <View style={{ ...this.state.backdropStyles, ...this.state.styling.backdrop }}></View>
          </TouchableWithoutFeedback>
          <View style={{ ...this.getStyles().main.base, ...this.getStyles().main[this.state.size], ...this.state.styling.main }}>
            <View style={{ ...this.getStyles().wrapper, ...this.state.styling.wrapper }}>
              <View style={{ ...this.getStyles().box, ...this.state.styling.box }}>
                {this.getHeader()}
                {this.getContent()}
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  /**
   * Returns the current styles object
   * @type {function}
   * @return {object} The current styles object
   */
  getStyles = () => {
    return {
      container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
      },
      backdrop: {
        base: {
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%"
        },
        open: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        closed: {
          backgroundColor: "transparent"
        }
      },
      main: {
        base: {
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center"
        },
        default: {
          width: "85%"
        },
        small: {
          width: "75%"
        }
      },
      wrapper: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
      },
      box: {
        position: "relative",
        overflow: "hidden",
        borderRadius: 8,
        width: "100%",
        ...Shadows.md
      },
      header: {
        width: "100%",
        position: "absolute",
        zIndex: 1,
        top: 0,
        left: 0
      },
      header__gallery: {
        width: "100%",
        position: "absolute",
        zIndex: 1,
        top: 0,
        right: 0
      },
      header__inner: {
        padding: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end"
      },
      header__close_icon: {
        shadowOpacity: 0.05,
        textShadowRadius: 5,
        textShadowOffset: { width: 0, height: 1 }
      },
      info: {
        backgroundColor: "transparent"
      },
      banner: {
        base: {
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          paddingVertical: 50,
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center"
        },
        warning: {
          backgroundColor: Colors.warning.lgt
        },
        info: {
          backgroundColor: Colors.info.lgt
        },
        danger: {
          backgroundColor: Colors.danger.lgt
        },
        success: {
          backgroundColor: Colors.success.lgt
        }
      },
      content: {
        base: {
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          backgroundColor: Colors.basic.white.dft
        },
        custom: {
          paddingTop: 40,
          paddingBottom: 20,
          paddingHorizontal: 28
        },
        default: {
          paddingTop: 72,
          paddingBottom: 20,
          paddingHorizontal: 28
        },
        banner: {
          default: {
            paddingTop: 15,
            paddingBottom: 20,
            paddingHorizontal: 28
          },
          small: {
            paddingTop: 15,
            paddingBottom: 34,
            paddingHorizontal: 34
          }
        }
      },
      title: {
        textAlign: "center",
        color: Colors.basic.yankees.dft
      },
      text: {
        base: {
          color: Colors.basic.independence.dft
        },
        default: {
          marginTop: 21,
          marginBottom: 46
        },
        banner: {
          default: {
            marginTop: 10,
            marginBottom: 46
          },
          small: {
            marginTop: 10,
            marginBottom: 23
          }
        }
      },
      btn: {
        alignItems: "stretch",
        justifyContent: "center"
      },
      gallery: {
        arrows: {
          base: {
            position: "absolute",
            zIndex: 2
          },
          icon: {
            shadowOpacity: 0.05,
            textShadowRadius: 5,
            textShadowOffset: { width: 0, height: 1 }
          }
        },
        slide: {
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: Colors.basic.black.dft
        },
        img: {}
      }
    };
  }
}

PackenUiModal.propTypes = {
  type: PropTypes.string.isRequired,
  banner: PropTypes.object,
  size: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
  images: PropTypes.array,
  info: PropTypes.object,
  modalClose: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
  content: PropTypes.node,
  onDismiss: PropTypes.func,
  onRequestClose: PropTypes.func,
  styling: PropTypes.object
};

export default PackenUiModal;