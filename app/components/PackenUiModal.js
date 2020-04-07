import React, { Component } from "react";
import { Modal, View, TouchableWithoutFeedback, Image, Dimensions } from "react-native";

import Carousel from 'react-native-snap-carousel';
import Icon from "react-native-vector-icons/dist/Feather";

import Colors from "../styles/abstracts/colors";
import Shadows from "../styles/abstracts/shadows";

import PackenUiText from "./PackenUiText";

class PackenUiModal extends Component {
  constructor(props) {
    super(props);

    let initialState = { backdropStyles: { ...this.getStyles().backdrop.base } };
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

  componentDidMount() {
    if (this.props.type === "gallery") {
      this.setGalleryArrowsPosition();
    }
  }

  getContentStyles = () => {
    let contentStyles = { ...this.getStyles().content.base };

    if (this.props.banner) {
      contentStyles = {
        ...contentStyles,
        ...this.getStyles().content.banner[this.props.size]
      }
    } else {
      if (this.props.type === "custom") {
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

    if (this.props.banner) {
      textStyles = {
        ...this.getStyles().text.banner[this.props.size]
      }
    } else {
      textStyles = {
        ...this.getStyles().text.default
      }
    }

    return textStyles;
  }

  setBackdropStyles = () => {
    if (this.props.isOpen) {
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

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.isOpen !== this.props.isOpen) {
      this.setBackdropStyles();
    }
    if (this.props.type === "gallery") {
      if (prevState.dimensions !== this.state.dimensions) {
        this.setGalleryArrowsPosition();
      }
      if (prevProps.isOpen !== this.props.isOpen) {
        this.reinitGallery();
      }
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
        <Image source={item} style={this.getGalleryBoxDimensions()} />
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
    const horizontalOffset = this.state.dimensions.arrows.width + 20;

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
      height: Dimensions.get("screen").height / 3,
      width: Dimensions.get("screen").width - 50
    };
  }

  handleBeforeSnap = slideIndex => {
    this.setState({
      has: {
        next: slideIndex === this.props.images.length - 1 ? false : true,
        prev: slideIndex === 0 ? false : true
      }
    });
  }

  getBanner = () => {
    let banner = null;

    if (this.props.banner) {
      banner = (
        <View style={{ ...this.getStyles().banner.base, ...this.getStyles().banner[this.props.theme] }}>
          <Icon name={this.props.banner.icon} size={40} color={Colors[this.props.theme].default} />
        </View>
      );
    }

    return banner;
  }

  getInfoButton = () => {
    let btn = null;

    if (this.props.info.btn) {
      btn = (
        <View style={this.getStyles().btn}>
          {this.props.info.btn}
        </View>
      );
    }

    return btn;
  }

  getHeader = () => {
    let header = null;

    if (this.props.type !== "custom") {
      header = (
        <View style={this.getStyles().header}>
          <View style={this.getStyles().header__inner}>
            <TouchableWithoutFeedback onPress={this.props.toggle}>
              <Icon name="x" size={20} color={Colors[this.props.theme].default} style={this.props.type === "gallery" ? this.getStyles().header__close_icon : null} />
            </TouchableWithoutFeedback>
          </View>
        </View>
      );
    }

    return header;
  }

  getContent = () => {
    let content = null;
    
    switch (this.props.type) {
      case "custom":
        content = (
          <View style={this.getStyles().info}>
            <View style={this.getContentStyles()}>
              {this.props.content}
            </View>
          </View>
        );
        break;
      case "info":
          content = (
            <View style={this.getStyles().info}>
              {this.getBanner()}
              <View style={this.getContentStyles()}>
                <PackenUiText preset="h3" style={this.getStyles().title}>{this.props.info.title}</PackenUiText>
                <PackenUiText preset="p1" style={{ ...this.getStyles().text.base, ...this.getTextStyles() }}>{this.props.info.text}</PackenUiText>
                {this.getInfoButton()}
              </View>
            </View>
          );
        break;
      case "gallery":
        content = (
          <View style={this.getGalleryBoxDimensions()} onLayout={e => { this.getGalleryDimensions(e.nativeEvent.layout); }}>
            {
              this.props.images.length > 1 ? (
                <>
                  {
                    this.state.has.prev ? (
                      <TouchableWithoutFeedback onPress={this.prevSlide}>
                        <View onLayout={e => { this.getGalleryArrowsDimensions(e.nativeEvent.layout); }} style={[this.getStyles().gallery.arrows.base, this.state.arrowStyles.left]}>
                          <Icon name="arrow-left-circle" size={30} color={Colors.basic.white.dft} style={this.getStyles().gallery.arrows.icon} />
                        </View>
                      </TouchableWithoutFeedback>
                    ) : null
                  }
                  {
                    this.state.has.next ? (
                      <TouchableWithoutFeedback onPress={this.nextSlide}>
                        <View style={[this.getStyles().gallery.arrows.base, this.state.arrowStyles.right]}>
                          <Icon name="arrow-right-circle" size={30} color={Colors.basic.white.dft} style={this.getStyles().gallery.arrows.icon} />
                        </View>
                      </TouchableWithoutFeedback>
                    ) : null
                  }
                </>
              ) : null
            }
            <Carousel
              ref={c => { this.carouselRef = c; }}
              onBeforeSnapToItem={this.handleBeforeSnap}
              data={this.props.images}
              renderItem={this.renderGallerySlide}
              itemWidth={this.getGalleryBoxDimensions().width}
              sliderWidth={this.getGalleryBoxDimensions().width}
              inactiveSlideOpacity={1}
              inactiveSlideScale={1}
            />
          </View>
        );
        break;
    }

    return content;
  }

  render() {
    return (
      <Modal visible={this.props.isOpen} animationType="fade" transparent={true}>
        <View style={this.state.backdropStyles}>
          <View style={this.getStyles().wrapper[this.props.size]}>
            <View style={this.getStyles().box}>
              {this.getHeader()}
              {this.getContent()}
            </View>
          </View>
        </View>
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
          padding: 25
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
        elevation: Shadows.md.elevation,
        shadowColor: Colors.basic.black.dft,
        shadowOffset: {
          width: 0,
          height: 0
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22
      },
      header: {
        width: "100%",
        position: "absolute",
        zIndex: 1,
        top: 0,
        left: 0
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
        flexDirection: "row",
        alignItems: "center",
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

export default PackenUiModal;