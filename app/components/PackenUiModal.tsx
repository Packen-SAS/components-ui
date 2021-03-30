import { Modal, View, TouchableWithoutFeedback, Image, Dimensions, Platform, ImageSourcePropType, Keyboard, EmitterSubscription, ScrollView } from "react-native";
import React, { Component, ReactNode, RefObject } from "react";
import PropTypes from "prop-types";
import * as UTIL from "../utils";

import Icon from "react-native-vector-icons/Feather";
import Carousel, { AdditionalParallaxProps } from 'react-native-snap-carousel';

import Colors from "../styles/abstracts/colors";
import Shadows from "../styles/abstracts/shadows";

import PackenUiText from "./PackenUiText";
import PackenUiButton from "./PackenUiButton";
import PackenUiDivider from "./PackenUiDivider";

interface i18nShape {
  buttons: {
    view_details: string;
  };
  modal: {
    error: {
      persists: string;
    };
  };
}

interface StylingPropShape {
  container: object;
  backdrop: object;
  main: object;
  wrapper: object;
  box: object;
  header: object;
  headerInner: object;
  closeIconSize: number | undefined;
  closeIconColor: string | undefined;
  info: object;
  banner: object;
  bannerIconSize: number | undefined;
  bannerIconColor: string | undefined;
  content: object;
  title: object;
  text: object;
  btnWrapper: object;
  galleryBox: object;
  slide: object;
  slideImg: object;
  arrowLeft: object;
  arrowRight: object;
  arrowIconSize: number | undefined;
  arrowIconColor: string | undefined;
}

interface KeyboardEventArgumentShape {
  endCoordinates: {
    height: number;
  };
}

interface BannerStateShape {
  icon: string;
}

interface ErrorPayloadShape {
  success: boolean;
  code: number;
  status: string;
  errors: string[];
  source: string;
}

interface PackenUiModalProps {
  i18n: i18nShape;
  type: string;
  banner?: object;
  size: string;
  isOpen?: boolean;
  images?: ImageSourcePropType[];
  info?: object;
  payload?: ErrorPayloadShape;
  customInfo?: ReactNode;
  modalClose: Function;
  theme: string;
  content?: ReactNode;
  onDismiss?: Function;
  onRequestClose?: Function;
  styling?: StylingPropShape;
  instance?: Function;
}

interface PackenUiModalState {
  type: string;
  banner: BannerStateShape | boolean;
  size: string;
  isOpen: boolean;
  images: ImageSourcePropType[];
  info: {
    title: string;
    text: string;
    btn: ReactNode;
  };
  isPayloadVisible: boolean;
  keyboardHeight: number | null;
  isKeyboardOpen: boolean;
  isInitial: boolean;
  payload: ErrorPayloadShape | boolean;
  customInfo: ReactNode | boolean;
  alignmentStyles: object;
  initialAlignmentStyles: object;
  modalClose: Function;
  theme: string;
  content: ReactNode | null;
  onDismiss: Function | boolean;
  onRequestClose: Function | boolean;
  backdropStyles: object;
  dimensions: {
    gallery: {
      height: number;
      width: number;
    };
    arrows: {
      height: number;
      width: number;
    }
  };
  arrowStyles: {
    left?: {
      top: number;
      left: number;
    };
    right?: {
      top: number;
      right: number;
    }
  };
  has: {
    next: boolean;
    prev: boolean;
  };
  styling: StylingPropShape;
}

type HandleBeforeSnapType = (slideIndex: number) => void;
type GetDimensionsType = { width: number, height: number };
type RenderGallerySlideParamType = { item: ImageSourcePropType, index: number };
type RenderGallerySlideType = (item: { item: ImageSourcePropType; index: number; }, parallaxProps?: AdditionalParallaxProps | undefined) => ReactNode;
type KeyboardDidShowType = (e: KeyboardEventArgumentShape) => void;

/**
 * Component for rendering a modal popup with fading animation
 */
class PackenUiModal extends Component<PackenUiModalProps, PackenUiModalState> {
  /**
   * Variable that stores the carousel ref/instance in case it's a gallery modal
   * @type {object}
   */
  carouselRef: RefObject<any> = React.createRef();

  /**
   * Variable that holds the i18n json data
   * @type {object}
   */
  language: i18nShape = this.props.i18n;

  /**
   * Variable that holds the keyboardDidShow event listener
   * @type {object}
   */
  keyboardDidShowListener: EmitterSubscription | null = null;

  /**
   * Variable that holds the keyboardDidHide event listener
   * @type {object}
   */
  keyboardDidHideListener: EmitterSubscription | null = null;

  /**
   * Initializes the component
   * @type {function}
   * @param {object} props Props passed to the component
   */
  constructor(props: PackenUiModalProps) {
    super(props);

    /**
     * Variable that stores the base state for all types of modals
     * @type {object}
     */
    let initialState: PackenUiModalState = {
      ...this.setPropsToState(),
      isPayloadVisible: false,
      keyboardHeight: null,
      isKeyboardOpen: false,
      isInitial: true,
      alignmentStyles: {},
      initialAlignmentStyles: {},
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
  }

  /**
   * Placeholder function that does nothing
   * @type {function}
   * @return {boolean} Flag used only for testing purposes
   */
  mockCallback: Function = (): boolean => false;

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
  setPropsToState: Function = (): object => {
    return {
      type: this.props.type ? this.props.type : "info",
      banner: this.props.banner ? this.props.banner : false,
      size: this.props.size ? this.props.size : "default",
      isOpen: this.props.isOpen ? this.props.isOpen : false,
      images: this.props.images ? this.props.images : [],
      info: this.props.info ? this.props.info : {
        title: "",
        text: "",
        btn: false
      },
      payload: this.props.payload ? this.props.payload : false,
      customInfo: this.props.customInfo ? this.props.customInfo : false,
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
    this.keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", this.keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", this.keyboardDidHide);
  }

  /**
   * Removes keyboard event listeners when the component is unmounted
   * @type {Function}
   */
  componentWillUnmount() {
    if (this.keyboardDidShowListener && this.keyboardDidHideListener) {
      this.keyboardDidShowListener.remove();
      this.keyboardDidHideListener.remove();
    }
  }

  /**
   * Sets the keyboard height to the state when it's opened
   * @type {Function}
   * @param {object} e The event data object
   */
  keyboardDidShow: KeyboardDidShowType = (e: KeyboardEventArgumentShape) => { this.setState({ isKeyboardOpen: true, keyboardHeight: e.endCoordinates.height }); }

  /**
   * Resets all keyboard-related properties in the state when it's closed
   * @type {Function}
   */
  keyboardDidHide: VoidFunction = () => { this.setState({ isKeyboardOpen: false, keyboardHeight: 0, alignmentStyles: this.state.initialAlignmentStyles }); }

  /**
   * Returns the correct content styles depending on the type of modal
   * @type {function}
   * @return {object} The styles object
   */
  getContentStyles: Function = (): object => {
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
  getTextStyles: Function = (): object => {
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
   */
  setBackdropStyles: Function = () => {
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
  checkHandlers: Function = () => {
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
  updateState: Function = (prevProps: PackenUiModalProps, prevState: PackenUiModalState) => {
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
  componentDidUpdate(prevProps: PackenUiModalProps, prevState: PackenUiModalState) {
    if (!UTIL.objectsEqual(prevProps, this.props)) {
      this.updateState(prevProps, prevState);
    }
  }

  /**
   * Reinitializes the gallery arrows state, which doesn't automatically change when closing the modal
   * @type {function}
   */
  reinitGallery: Function = () => {
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
  prevSlide: VoidFunction = () => {
    if (this.carouselRef) { this.carouselRef.current.snapToPrev(); }
  }

  /**
   * Programmatically goes to the next slide
   * @type {function}
   */
  nextSlide: VoidFunction = () => {
    if (this.carouselRef) { this.carouselRef.current.snapToNext(); }
  }

  /**
   * Renders a gallery slide
   * @type {function}
   * @param {object} item The item's configuration data
   * @param {number} index The item's index
   * @return {node} JSX for the slide
   */
  renderGallerySlide: RenderGallerySlideType = ({ item, index }: RenderGallerySlideParamType): ReactNode => {
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
  getGalleryDimensions: Function = ({ width, height }: GetDimensionsType) => {
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
  getGalleryArrowsDimensions: Function = ({ width, height }: GetDimensionsType) => {
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
  setGalleryArrowsPosition: VoidFunction = () => {
    const verticalOffset = this.state.dimensions?.gallery?.height ? this.state.dimensions.gallery.height / 2.25 : 0;
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
  getGalleryBoxDimensions: Function = (): GetDimensionsType => {
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
  handleBeforeSnap: HandleBeforeSnapType = (slideIndex: number) => {
    this.setState({
      has: {
        next: slideIndex !== this.state.images.length - 1,
        prev: slideIndex !== 0
      }
    });
  }

  /**
   * Returns the JSX for the optional banner element
   * @type {function}
   * @return {node|null} The JSX for the banner
   */
  getBanner: Function = (): ReactNode | null => {
    let banner = null;

    if (typeof this.state.banner === "object") {
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
  getInfoButton: Function = (): ReactNode | null => {
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
   * Toggles payload content visibility
   * @type {Function}
   */
  togglePayload: Function = () => { this.setState({ isPayloadVisible: !this.state.isPayloadVisible }); }

  /**
   * Returns the payload elements if corresponding data is provided
   * @type {Function}
   * @return {node|null}
   */
  getPayload: Function = (): ReactNode | null => {
    let payload = null;

    if (typeof this.state.payload === "object") {
      const { success, code, status, errors, source } = this.state.payload;
      if (success === false) {
        let _errors = '---';
        let _success = success.toString();
        if (Array.isArray(errors)) {
          _errors = '';
          errors.forEach((err) => {
            _errors += `• ${err}\n`;
          });
          _errors = _errors.trimRight();
        }
        payload = (
          <View style={{ marginTop: 10 }}>
            <PackenUiButton
              isOutline
              type="regular"
              level="danger"
              size="tiny"
              icon={{ name: this.state.isPayloadVisible ? 'arrow-up' : 'arrow-down', position: 'right' }}
              style={{ paddingLeft: 5, paddingRight: 10 }}
              callback={this.togglePayload}
            >
              {this.language.buttons.view_details}
            </PackenUiButton>
            {
              this.state.isPayloadVisible ? (
                <View style={this.getStyles().payload}>
                  <ScrollView style={this.getStyles().payloadData}>
                    <PackenUiText preset="c1">
                      <PackenUiText preset="c2">Code:</PackenUiText>
                      {' '}
                      {code || '---'}
                    </PackenUiText>
                    <PackenUiText preset="c1">
                      <PackenUiText preset="c2">Status:</PackenUiText>
                      {' '}
                      {status || '---'}
                    </PackenUiText>
                    <PackenUiText preset="c1">
                      <PackenUiText preset="c2">Source:</PackenUiText>
                      {' '}
                      {source || '---'}
                    </PackenUiText>
                    <PackenUiText preset="c1">
                      <PackenUiText preset="c2">Success:</PackenUiText>
                      {' '}
                      {_success}
                    </PackenUiText>
                    <View style={{ flexDirection: 'row', paddingBottom: 20 }}>
                      <PackenUiText preset="c2">Errors: </PackenUiText>
                      <PackenUiText preset="c1" style={{ flex: 1 }}>{_errors}</PackenUiText>
                    </View>
                  </ScrollView>
                  <PackenUiDivider type="light" size={1} margin={{ top: 10, bottom: 10 }} />
                  <PackenUiText preset="c2">{this.language.modal.error.persists}</PackenUiText>
                </View>
              ) : null
            }
          </View>
        );
      }
    }

    return payload;
  }

  /**
   * Triggers the platform-specific handlers when closing the modal when pressing the "X" icon on the header
   * @type {function}
   */
  headerCallDismiss: VoidFunction = () => {
    this.setState({ isPayloadVisible: false });
    if (Platform.OS === "ios") {
      this.onRequestCloseHandler();
      this.closeModal();
      return;
    }
    this.onDismissHandler();
    this.closeModal();
  };

  /**
   * Returns the JSX for the header element if it's not a "custom" modal
   * @type {function}
   * @return {node|null} JSX for the header or null
   */
  getHeader: Function = (): ReactNode | null => {
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
  getCustomContent: Function = (): ReactNode => (
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
  getInfoContent: Function = (): ReactNode => (
    <View style={{ ...this.getStyles().info, ...this.state.styling.info }}>
      {this.getBanner()}
      <View style={{ ...this.getContentStyles(), ...this.state.styling.content }}>
        {
          this.state.customInfo ? this.state.customInfo : (
            <>
              <PackenUiText preset="h3" style={{ ...this.getStyles().title, ...this.state.styling.title }}>{this.state.info.title}</PackenUiText>
              <PackenUiText preset="p1" style={{ ...this.getStyles().text.base, ...this.getTextStyles(), ...this.state.styling.text }}>{this.state.info.text}</PackenUiText>
              {this.getInfoButton()}
              {this.getPayload()}
            </>
          )
        }
      </View>
    </View>
  )

  /**
   * Returns the JSX for the arrows if it's a "gallery" modal and there's more than one slide
   * @type {function}
   * @return {node|null} JSX for the arrows
   */
  getGalleryArrows: Function = (): ReactNode | null => (
    this.state.images.length > 1 ? (
      <React.Fragment>
        {
          this.state.has && this.state.has.prev ? (
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
          this.state.has && this.state.has.next ? (
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
  getGalleryContent: Function = (): ReactNode => (
    <View
      style={{
        ...this.getGalleryBoxDimensions(),
        ...this.state.styling.galleryBox
      }}
      onLayout={e => { this.getGalleryDimensions(e.nativeEvent.layout); }}
    >
      {this.getGalleryArrows()}
      <Carousel
        ref={this.carouselRef}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
        data={this.state.images}
        renderItem={this.renderGallerySlide}
        onBeforeSnapToItem={this.handleBeforeSnap}
        itemWidth={this.getGalleryBoxDimensions().width}
        sliderWidth={this.getGalleryBoxDimensions().width}
      />
    </View>
  )

  /**
   * Returns the correct JSX for the main content depending on the type of modal
   * @type {function}
   * @return {node|null} JSX for the modal content or null
   */
  getContent: Function = (): ReactNode | null => {
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
   * @return {boolean} Flag used only for testing purposes
   */
  onDismissHandler: VoidFunction = (): boolean | void => {
    if (typeof this.state.onDismiss === "function") {
      this.state.onDismiss();
    } else {
      return false;
    }
  }

  /**
   * Handles the onRequestCloseHandler event on the native Modal component
   * @type {function}
   * @return {boolean} Flag used only for testing purposes
   */
  onRequestCloseHandler: VoidFunction = (): boolean | void => {
    if (typeof this.state.onRequestClose === "function") {
      this.state.onRequestClose();
    } else {
      return false;
    }
  }

  /**
   * Closes the modal with the passed function via props
   * @property {function}
   * @return {boolean} Flag used only for testing purposes
   */
  closeModal: VoidFunction = (): boolean | void => {
    if (this.state.modalClose) {
      this.state.modalClose();
    } else {
      return false;
    }
  }

  /**
   * Determines whether to apply to vertical center-alignment styles to enable scrolling when modal height exceeds the available space
   * @type {Function}
   * @param {number} height The height of the modal
   */
  getModalLayout: Function = ({ height }: GetDimensionsType) => {
    const screenHeight = Dimensions.get("screen").height;
    let newStyles = { ...this.state.alignmentStyles };
    const keyboardHeight = this.state.keyboardHeight || 0;
    if (
      height > screenHeight - 50
      || (this.state.isKeyboardOpen && ((screenHeight - keyboardHeight - 50) < height))
    ) {
      newStyles = {}; // Enable scrolling modal by removing vertical center-alignment
    } else {
      newStyles = {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
      }
    }
    if (this.state.isInitial) {
      this.setState({
        isInitial: false,
        initialAlignmentStyles: { ...newStyles }
      });
    }
    this.setState({
      alignmentStyles: { ...newStyles }
    });
  }

  /**
   * Renders the component
   * @type {function}
   * @return {node} JSX for the component
   */
  render(): ReactNode {
    return (
      <Modal
        transparent
        animationType="fade"
        visible={this.state.isOpen}
        onDismiss={this.onDismissHandler}
        onRequestClose={this.onRequestCloseHandler}
      >
        <View style={this.state.backdropStyles}>
          <ScrollView
            nestedScrollEnabled
            style={this.getStyles().scroll}
            contentContainerStyle={this.state.alignmentStyles}
          >
            <View style={this.getStyles().wrapper[this.state.size]} onLayout={(e) => { this.getModalLayout(e.nativeEvent.layout); }}>
              <View style={this.getStyles().box}>
                {this.getHeader()}
                {this.getContent()}
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>
    );
  }

  /**
   * Returns the current styles object
   * @type {function}
   * @return {object} The current styles object
   */
  getStyles: Function = (): object => {
    return {
      backdrop: {
        base: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        },
        open: {
          backgroundColor: UTIL.hex2rgba(Colors.basic.black.dft, 0.5)
        },
        closed: {
          backgroundColor: "transparent"
        }
      },
      wrapper: {
        default: {
          padding: 25,
          width: "100%",
          alignItems: "center",
          justifyContent: "center"
        },
        small: {
          padding: 25
        }
      },
      box: {
        position: "relative",
        overflow: "hidden",
        borderRadius: 8,
        width: "100%",
        minWidth: Dimensions.get("window").width - 50,
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
          marginBottom: 10
        },
        banner: {
          default: {
            marginTop: 10,
            marginBottom: 10
          },
          small: {
            marginTop: 10,
            marginBottom: 10
          }
        }
      },
      btn: {
        marginTop: 10,
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
          borderRadius: 8,
          backgroundColor: Colors.basic.black.dft
        }
      },
      payload: {
        marginTop: 15,
      },
      payloadData: {
        height: 85,
        padding: 10,
        overflow: "hidden",
        backgroundColor: Colors.danger.lgt
      }
    };
  }

  /**
   * Defines prop-types for the component
   * @type {object}
   */
  static propTypes: object = {
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
    styling: PropTypes.object,
    instance: PropTypes.func
  };
}

export default PackenUiModal;