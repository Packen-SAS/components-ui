import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, View, TouchableWithoutFeedback, Image, Dimensions, Platform } from "react-native";

import Carousel from 'react-native-snap-carousel';
import Icon from "react-native-vector-icons/dist/Feather";

import Colors from "../styles/abstracts/colors";
import Shadows from "../styles/abstracts/shadows";

import PackenUiText from "./PackenUiText";

class PackenUiModal extends Component {
  constructor(props) {
    super(props);

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

    this.state = { ...initialState };

    this.carouselRef;
  }

  mockCallback = () => false;

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
      theme: this.props.theme ? this.props.theme : "primary",
      content: this.props.content ? this.props.content : null,
      onDismiss: this.props.onDismiss ? this.props.onDismiss : false,
      onRequestClose: this.props.onRequestClose ? this.props.onRequestClose : false,
      styling: this.props.styling ? { ...this.props.styling } : {
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
    };
  }

  componentDidMount() {
    if (this.state.type === "gallery") {
      this.setGalleryArrowsPosition();
    }
    if (typeof this.props.instance === "function") {
      this.props.instance(this);
    }
  }

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

  checkHandlers = () => {
    if (!this.state.isOpen) {
      this.onDismissHandler();
    }
  }

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

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps !== this.props) {
      this.updateState(prevProps, prevState);
    }
  }

  reinitGallery = () => {
    this.setState({
      has: {
        next: true,
        prev: false
      }
    });
  }

  prevSlide = () => {
    this.carouselRef.snapToPrev();
  }

  nextSlide = () => {
    this.carouselRef.snapToNext();
  }

  renderGallerySlide = ({ item, index }) => {
    return (
      <View key={index} style={this.getStyles().gallery.slide}>
        <Image source={item} resizeMode="cover" style={this.getGalleryBoxDimensions()} />
      </View>
    );
  }

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

  getGalleryBoxDimensions = () => {
    return {
      height: Dimensions.get("screen").height / 3.5,
      width: (Dimensions.get("screen").width * .85) - 40
    };
  }

  handleBeforeSnap = slideIndex => {
    this.setState({
      has: {
        next: slideIndex === this.state.images.length - 1 ? false : true,
        prev: slideIndex === 0 ? false : true
      }
    });
  }

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

  headerCallDismiss = () => {
    if (Platform.OS === "ios") {
      this.onRequestCloseHandler();
      this.state.modalClose();
      return;
    }
    this.onDismissHandler();
    this.state.modalClose();
  };

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

  getCustomContent = () => (
    <View style={{ ...this.getStyles().info, ...this.state.styling.info }}>
      <View style={{ ...this.getContentStyles(), ...this.state.styling.content }}>
        {this.state.content}
      </View>
    </View>
  )

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

  onDismissHandler = () => {
    if (this.state.onDismiss) {
      this.state.onDismiss();
    } else {
      return false;
    }
  }

  onRequestCloseHandler = () => {
    if (this.state.onRequestClose) {
      this.state.onRequestClose();
    } else {
      return false;
    }
  }

  closeModal = () => {
    if (this.state.modalClose) {
      this.state.modalClose();
    }
  }

  render() {
    return (
      <Modal
        visible={this.state.isOpen}
        animationType="fade"
        transparent={true}
        onDismiss={this.onDismissHandler}
        onRequestClose={this.onRequestCloseHandler}
      >
        <TouchableWithoutFeedback onPress={this.closeModal}>
          <View style={{ ...this.state.backdropStyles, ...this.state.styling.backdrop }}>
            <View style={{ ...this.getStyles().wrapper[this.state.size], ...this.state.styling.wrapper }}>
              <TouchableWithoutFeedback>
                <View style={{ ...this.getStyles().box, ...this.state.styling.box }}>
                  {this.getHeader()}
                  {this.getContent()}
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }

  getStyles = () => {
    return {
      backdrop: {
        base: {
          flex: 1,
          alignItems: "center",
          justifyContent: "center"
        },
        open: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
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
          paddingVertical: 25,
          paddingHorizontal: 50
        }
      },
      box: {
        position: "relative",
        overflow: "hidden",
        borderRadius: 8,
        width: "85%",
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
          borderRadius: 8,
          backgroundColor: Colors.basic.black.dft
        }
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