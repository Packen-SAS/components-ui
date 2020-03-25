import React, { Component } from "react";
import { Modal, View, TouchableWithoutFeedback, Image, Dimensions } from "react-native";

import Carousel from 'react-native-snap-carousel';
import Icon from "react-native-vector-icons/dist/Feather";

import Colors from "../styles/abstracts/colors";
import ModalStyles from "../styles/components/PackenModal";

import PackenText from "./PackenText";

class PackenModal extends Component {
  constructor(props) {
    super(props);

    let initialState = { backdropStyles: {...ModalStyles.backdrop.base} };
    if (props.type === "info") {
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

    this.state = {...initialState};

    this.carousel_ref;
  }

  componentDidMount() {
    if (this.props.type === "gallery") {
      this.set_gallery_arrows_position();
    }
  }

  get_btn_styles = () => {
    let btnStyles = {...ModalStyles.btn.base};

    if (this.props.banner) {
      btnStyles = {
        ...btnStyles,
        ...ModalStyles.btn.banner[this.props.size]
      }
    } else {
      btnStyles = {
        ...btnStyles,
        ...ModalStyles.btn.default
      }
    }

    return btnStyles;
  }

  get_content_styles = () => {
    let contentStyles = { ...ModalStyles.content.base };

    if (this.props.banner) {
      contentStyles = {
        ...contentStyles,
        ...ModalStyles.content.banner[this.props.size]
      }
    } else {
      contentStyles = {
        ...contentStyles,
        ...ModalStyles.content.default
      }
    }

    return contentStyles;
  }

  get_text_styles = () => {
    let textStyles = {};

    if (this.props.banner) {
      textStyles = {
        ...ModalStyles.text.banner[this.props.size]
      }
    } else {
      textStyles = {
        ...ModalStyles.text.default
      }
    }

    return textStyles;
  }

  set_backdrop_styles = () => {
    if (this.props.isOpen) {
      this.setState({
        backdropStyles: {
          ...this.state.backdropStyles,
          ...ModalStyles.backdrop.open
        }
      });
    } else {
      this.setState({
        backdropStyles: {
          ...this.state.backdropStyles,
          ...ModalStyles.backdrop.closed
        }
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.isOpen !== this.props.isOpen) {
      this.set_backdrop_styles();
    }
    if (this.props.type === "gallery") {
      if (prevState.dimensions !== this.state.dimensions) {
        this.set_gallery_arrows_position();
      }
      if (prevProps.isOpen !== this.props.isOpen) {
        this.reinit_gallery();
      }
    }
  }

  reinit_gallery = () => {
    this.setState({
      has: {
        next: true,
        prev: false
      }
    });
  }

  prevSlide = () => {
    this.carousel_ref.snapToPrev();
  }

  nextSlide = () => {
    this.carousel_ref.snapToNext();
  }

  render_gallery_slide = ({item, index}) => {
    return (
      <View key={index} style={ModalStyles.gallery.slide}>
        <Image source={item} style={this.get_gallery_box_dimensions()}/>
      </View>
    );
  }

  get_gallery_dimensions = ({width, height}) => {
    this.setState({
      dimensions: {
        ...this.state.dimensions,
        gallery: {
          height: Math.floor(height),
          width: Math.floor(width)
        }
      }
    }, this.set_gallery_arrows_position);
  }

  get_gallery_arrow_dimensions = ({width, height}) => {
    this.setState({
      dimensions: {
        ...this.state.dimensions,
        arrows: {
          height: Math.floor(height),
          width: Math.floor(width)
        }
      }
    }, this.set_gallery_arrows_position);
  }

  set_gallery_arrows_position = () => {
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

  get_gallery_box_dimensions = () => {
    return {
      height: Dimensions.get("screen").height / 3,
      width: Dimensions.get("screen").width - 50
    };
  }

  handle_before_snap = slideIndex => {
    this.setState({
      has: {
        next: slideIndex === this.props.images.length - 1 ? false : true,
        prev: slideIndex === 0 ? false : true
      }
    });
  }

  render() {
    return (
      <Modal visible={this.props.isOpen} animationType="fade" transparent={true}>
        <View style={this.state.backdropStyles}>
          <View style={ModalStyles.wrapper[this.props.size]}>
            <View style={ModalStyles.box}>
              <View style={ModalStyles.header}>        
                <View style={ModalStyles.header__inner}>
                  <TouchableWithoutFeedback onPress={this.props.toggle}>
                    <Icon name="x" size={20} color={Colors[this.props.theme].default} style={this.props.type === "gallery" ? ModalStyles.header__close_icon : null}/>
                  </TouchableWithoutFeedback>
                </View>
              </View>
              {
                this.props.type === "info" ? (
                  /* Info modal */
                  <View style={ModalStyles.info}>
                    {
                      this.props.banner ? (
                        <View style={{ ...ModalStyles.banner.base, ...ModalStyles.banner[this.props.theme] }}>
                          <Icon name={this.props.banner.icon} size={40} color={Colors[this.props.theme].default} />
                        </View>
                      ) : null
                    }
                    <View style={this.get_content_styles()}>
                      <PackenText preset="h3" style={ModalStyles.title}>{this.props.info.title}</PackenText>
                      <PackenText preset="p1" style={{...ModalStyles.text.base, ...this.get_text_styles()}}>{this.props.info.text}</PackenText>
                      {
                        this.props.info.btn ? (
                          <View style={ModalStyles.btn}>
                            {this.props.info.btn}
                          </View>
                        ) : null
                      }
                    </View>
                  </View>
                ) : (
                    /* Gallery modal */
                    <View style={this.get_gallery_box_dimensions()} onLayout={e => { this.get_gallery_dimensions(e.nativeEvent.layout); }}>
                      {
                        this.props.images.length > 1 ? (
                          <>
                            {
                              this.state.has.prev ? (
                                <TouchableWithoutFeedback onPress={this.prevSlide}>
                                  <View onLayout={e => { this.get_gallery_arrow_dimensions(e.nativeEvent.layout); }} style={[ModalStyles.gallery.arrows.base, this.state.arrowStyles.left]}>
                                    <Icon name="arrow-left-circle" size={30} color={Colors.basic.white.dft} style={ModalStyles.gallery.arrows.icon}/>
                                  </View>
                                </TouchableWithoutFeedback>
                              ) : null
                            }
                            {
                              this.state.has.next ? (
                                <TouchableWithoutFeedback onPress={this.nextSlide}>
                                  <View style={[ModalStyles.gallery.arrows.base, this.state.arrowStyles.right]}>
                                    <Icon name="arrow-right-circle" size={30} color={Colors.basic.white.dft} style={ModalStyles.gallery.arrows.icon}/>
                                  </View>
                                </TouchableWithoutFeedback>
                              ) : null
                            }
                          </>
                        ) : null
                      }
                      <Carousel
                        ref={c => { this.carousel_ref = c; }}
                        onBeforeSnapToItem={this.handle_before_snap}
                        data={this.props.images}
                        renderItem={this.render_gallery_slide}
                        itemWidth={this.get_gallery_box_dimensions().width}
                        sliderWidth={this.get_gallery_box_dimensions().width}
                        inactiveSlideOpacity={1}
                        inactiveSlideScale={1}
                      />
                    </View>
                  )
              }
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

export default PackenModal;