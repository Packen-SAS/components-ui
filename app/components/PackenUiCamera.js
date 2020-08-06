import React, { Component } from "react";
import PropTypes from "prop-types";
import { TouchableWithoutFeedback, StyleSheet, Dimensions, Modal, View, Image } from "react-native";
import * as UTIL from "../utils";

import { RNCamera } from "react-native-camera";
import Svg, { Line, Path } from "react-native-svg";
import TurnOnOffFlash from "react-native-vector-icons/Ionicons";
import ConfirmPicture from "react-native-vector-icons/Feather";
import CameraReverse from "react-native-vector-icons/Ionicons";
import CloseCamera from "react-native-vector-icons/Feather";
import TrashPicture from "react-native-vector-icons/Feather";

import Color from "../styles/abstracts/colors";

import PackenUiLoaderButton from "./PackenUiLoaderButton";
import PackenUiAvatar from "./PackenUiAvatar";

/**
 * Component for managing the device's camera
 */
export default class PackenUiCamera extends Component {
  /**
   * Variable that stores the state
   * @type {object}
   * @property {object} camera The RNCamera ref/instance
   * @property {boolean} proccessing Flag for the current process status
   * @property {number} cameraType Determines if the front or back camera is in use
   * @property {number} flashMode Determines whether the flash should be used when taking a picture
   * @property {object|null} picture The current picture data object
   * @property {boolean} imageViewble Determines whether the currently taken picture can be viewed
   * @property {object} labels The correct i18n labels to be used for permissions feedback text
   */
  state = {
    camera: null,
    proccessing: true,
    cameraType: 0,
    flashMode: 0,
    picture: null,
    imageViewble: false,
    labels: this.props.labels ? { ...this.props.labels } : false
  };

  /**
   * Initializes the component
   * @type {function}
   * @param {object} props Props passed to the component
   */
  constructor(props) {
    super(props);
    this.emitPicture = this.emitPicture.bind(this);
    this.capturePicture = this.capturePicture.bind(this);
  }

  /**
   * Sets the initial configuration for the camera
   * @type {function}
   */
  componentDidMount = () => {
    this.setState({
      flashMode: RNCamera.Constants.FlashMode.off,
      cameraType: RNCamera.Constants.Type.back
    });
  }

  /**
   * Prevents the image preview modal from showing
   * @type {function}
   */
  restoreImagePreviewModal = () => this.setState({ imageViewble: false });

  /**
   * Handles receiving the taken picture
   * @type {function}
   */
  emitPicture = () => {
    const { EMIT_TRIGGER, dismiss } = this.props;
    if ((typeof EMIT_TRIGGER === "function") && (this.state.picture != null)) {
      this.setState({ picture: null });
      EMIT_TRIGGER(this.state.picture);
    }
    dismiss();
    this.restoreImagePreviewModal();
  };

  /**
   * Informs that the camera is no longer processing a picture
   * @type {function}
   */
  finalize = () => this.setState({
    proccessing: false
  });

  /**
   * Initializes the process of taking a picture
   * @type {function}
   */
  capturePicture = async () => {
    if (this.state.camera == null) {
      return -1;
    }

    /* Request a picture */
    this.setState({
      proccessing: true
    }, this.callCamera);
  }

  /**
   * Requests the device's camera to take a picture
   * @type {function}
   */
  callCamera = async () => await this.makeCapture();

  /**
   * Sets the picture taken to the state
   * @type {function}
   */
  makeCapture = async () => this.setState({
    picture: await this.state.camera.takePictureAsync(getPermissionOpts().picture)
  }, this.finalize);

  /**
   * Sets the camera ref/instance to the state key
   * @type {function}
   */
  setCamera = camera => this.setState({ camera: camera });

  /**
   * Sets the correct flashmode to the state
   * @type {function}
   */
  setFlash = () => this.setState({
    flashMode: (this.state.flashMode == RNCamera.Constants.FlashMode.off
      ? RNCamera.Constants.FlashMode.on : RNCamera.Constants.FlashMode.off)
  })

  /**
   * Sets the correct camera type to the state
   * @type {function}
   */
  setCameraType = () => this.setState({
    cameraType: (this.state.cameraType == RNCamera.Constants.Type.back
      ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back)
  })

  /**
   * Informs that the device's camera is ready to take another picture
   * @type {function}
   */
  cameraReady = () => this.setState({ proccessing: false })

  /**
   * Opens the image preview modal
   * @type {function}
   */
  showCurrentPicture = () => {
    if (this.state.picture == null) {
      return;
    }
    this.setState({ imageViewble: true });
  }

  /**
   * Removes current picture from state and closes preview modal
   * @type {function}
   */
  discardCurrentPicture = () => this.setState({ picture: null }, this.restoreImagePreviewModal);

  /**
   * Returns the preview modal if a picture was taken
   * @type {function}
   * @return {node|null} JSX for the preview modal or null
   */
  getImagePreview = () => {
    if (this.state.picture == null) {
      return null;
    }
    return (
      <Modal
        visible={this.state.imageViewble}
        transparent={true}
        animationType="fade">
        <View style={PackenCameraStyles.container}>
          <Image
            resizeMode="cover"
            source={{ uri: this.state.picture.uri }}
            style={PackenCameraStyles.imagePreviewTile} />
          <View style={PackenCameraStyles.imagePreview}>
            <CameraImagePreviewTriggers
              confirmPicture={this.restoreImagePreviewModal}
              deletePicture={this.discardCurrentPicture}
            />
          </View>
        </View>
      </Modal>);
  }

  /**
   * Returns the overlay elements for "document" and "avatar" camera modes
   * @type {function}
   * @return {node|null} JSX for the overlaid elements or null
   */
  getCameraLayout = () => {
    const { MODE } = this.props;
    switch (MODE) {
      case "document":
        return (
          <View style={PackenCameraStyles.layout}>
            <DocumentLayout width={250} height={400} color={Color.basic.white.dft} />
          </View>
        );
      case "avatar":
        return (
          <View style={PackenCameraStyles.layout_avatar}>
            <AvatarLayout width={400} height={500} color={Color.success.drk} />
          </View>
        );
      default:
        return null;
    }
  }

  /**
   * Renders the component
   * @type {function}
   * @return {node} JSX for the component
   */
  render() {
    return (
      <React.Fragment>
        <Modal
          transparent={false}
          animationType="slide"
          visible={this.props.VISIBLE}>
          <View style={PackenCameraStyles.container}>
            <RNCamera ref={this.setCamera} style={PackenCameraStyles.rncamera}
              flashMode={this.state.flashMode} type={this.state.cameraType} onCameraReady={this.cameraReady}
              zoom={0} autoFocus={true} androidCameraPermissionOptions={getPermissionOpts(this.state.labels).camera}
              androidRecordAudioPermissionOptions={getPermissionOpts(this.state.labels).audio}
            />
            {this.getCameraLayout()}

            <CameraTopTriggers
              image={this.state.picture}
              closeCameraTrigger={this.emitPicture}
              showPicture={this.showCurrentPicture}
            />
            <CameraBottomTriggers
              flashTrigger={this.setFlash}
              cameraIsLoading={this.state.proccessing}
              reverseCameraTrigger={this.setCameraType}
              pictureTrigger={this.capturePicture}
            />
          </View>
        </Modal>
        {this.getImagePreview()}
      </React.Fragment>
    );
  }
}

PackenUiCamera.propTypes = {
  labels: PropTypes.object.isRequired,
  EMIT_TRIGGER: PropTypes.func.isRequired,
  dismiss: PropTypes.func.isRequired,
  MODE: PropTypes.string,
  VISIBLE: PropTypes.bool.isRequired
};

/**
 * Renders the two buttons for deleting and confirming the current picture when opening the preview modal
 * @type {function}
 * @param {object} props Props passed to the component
 */
export const CameraImagePreviewTriggers = props => {
  return (
    <View style={PackenCameraStyles.imagePreviewTriggersContainer}>
      <TouchableWithoutFeedback onPress={props.confirmPicture}>
        <View style={[PackenCameraStyles.trigger, {
          width: 55, height: 55, borderRadius: 27,
          marginLeft: 5, marginRight: 5
        }]}>
          <ConfirmPicture solid size={25}
            name="check-circle"
            color={Color.basic.white.dft}
          />
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={props.deletePicture}>
        <View style={[PackenCameraStyles.trigger, {
          width: 55, height: 55, borderRadius: 27,
          marginLeft: 5, marginRight: 5
        }]}>
          <TrashPicture solid size={25}
            name="trash-2"
            color={Color.basic.white.dft}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

/**
 * Inner components for managing the top elements of the camera UI (close button, preview modal)
 */
export class CameraTopTriggers extends Component {
  /**
   * Variable that stores the state
   * @type {function}
   * @property {object} source The object that holds the preview image uri
   */
  state = {
    source: {
      uri: (this.props.image != null ? this.props.image.uri : null)
    }
  }

  /**
   * Propagates the picture
   * @type {function}
   */
  propagePicture = () => {
    if ((typeof this.props.showPicture === "function")) {
      this.props.showPicture();
    }
  }

  /**
   * Updates the latest taken image uri
   * @type {function}
   * @param {object} prevProps The previous props object
   */
  componentDidUpdate(prevProps) {
    if (!UTIL.objectsEqual(prevProps, this.props)) {
      this.setState({
        source: {
          uri: (this.props.image != null ? this.props.image.uri : null)
        }
      });
    }
  }

  /**
   * Renders the inner component
   * @type {function}
   * @return {node} JSX for the inner component
   */
  render() {
    return (
      <View style={PackenCameraStyles.topTriggersContainer}>
        <TouchableWithoutFeedback onPress={this.props.closeCameraTrigger}>
          <View style={[PackenCameraStyles.trigger, {
            width: 40, height: 40, borderRadius: 20
          }]}>
            <CloseCamera solid size={25}
              name="x"
              color={Color.basic.white.dft}
            />
          </View>
        </TouchableWithoutFeedback>
        <PackenUiAvatar size="medium" src={this.state.source} callback={this.propagePicture} />
      </View>
    );
  }
};

/**
 * Inner components for managing the bottom elements of the camera UI (flash, trigger, camera switch)
 */
export class CameraBottomTriggers extends Component {
  /**
   * Variable that stores the state
   * @type {function}
   * @property {boolean} hasFlash Determines if flash is active
   * @property {boolean} loading Determines if the camera is currently processing a previous picture
   */
  state = {
    hasFlash: false,
    loading: false
  }

  /**
   * Propagates the current flash mode via props
   * @type {function}
   */
  propagateFlashMode = () => {
    if ((typeof this.props.flashTrigger === "function") && !this.state.loading) {
      this.setState({ hasFlash: !this.state.hasFlash });
      this.props.flashTrigger();
    }
  };

  /**
   * Propagates the press on the trigger button via props callback
   * @type {function}
   */
  propagatePictureTaked = () => {
    if ((typeof this.props.pictureTrigger === "function") && !this.state.loading) {
      this.props.pictureTrigger();
    }
  }

  /**
   * Propagates the current camera type via props
   * @type {function}
   */
  propagateReverseCamera = () => {
    if ((typeof this.props.reverseCameraTrigger === "function") && !this.state.loading) {
      this.props.reverseCameraTrigger();
    }
  }

  /**
   * Returns the camera trigger button
   * @type {function}
   * @return {node} JSX for the trigger button
   */
  getCaptureTrigger = () => {
    if (!this.state.loading) {
      return (
        <TouchableWithoutFeedback onPress={this.propagatePictureTaked}>
          <View style={[PackenCameraStyles.trigger, {
            width: 75, height: 75, borderRadius: 37.5,
            marginLeft: 15, marginRight: 15,
            backgroundColor: Color.basic.white.dft
          }]}>
            <View style={PackenCameraStyles.triggerChild}>
            </View>
          </View>
        </TouchableWithoutFeedback>
      );
    }
    return (
      <View style={[PackenCameraStyles.trigger, {
        width: 75, height: 75, borderRadius: 37.5,
        marginLeft: 15, marginRight: 15,
        backgroundColor: Color.basic.white.dft
      }]}>
        <PackenUiLoaderButton
          type="icon"
          level="ghost"
          size="tiny"
          isDone={false}
          callback={null}
        />
      </View>
    );
  }

  /**
   * Sets the correct loading status on props change
   * @type {function}
   * @param {object} prevProps The previous props object
   */
  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.setState({
        loading: this.props.cameraIsLoading
      });
    }
  }

  /**
   * Renders the inner component
   * @type {function}
   * @return {node} JSX for the inner component
   */
  render() {
    return (
      <View style={PackenCameraStyles.bottomTriggersContainer}>
        <TouchableWithoutFeedback onPress={this.propagateFlashMode}>
          <View style={[PackenCameraStyles.trigger, {
            width: 50, height: 50, borderRadius: 25
          }]}>
            <TurnOnOffFlash solid size={25}
              name={this.state.hasFlash ? "ios-flash" : "ios-flash-off"}
              color={!this.props.cameraIsLoading ? Color.basic.white.dft : Color.basic.independence.drk_alt}
            />
          </View>
        </TouchableWithoutFeedback>
        {this.getCaptureTrigger()}
        <TouchableWithoutFeedback onPress={this.propagateReverseCamera}>
          <View style={[PackenCameraStyles.trigger, {
            width: 50, height: 50, borderRadius: 25
          }]}>
            <CameraReverse solid size={25}
              name="md-reverse-camera"
              color={!this.props.cameraIsLoading ? Color.basic.white.dft : Color.basic.independence.drk_alt}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>);
  }
}

/**
 * Returns the overlaid elements for "document" camera modes
 * @param {number} width The width for the SVG
 * @param {number} height The height for the SVG
 * @param {string} color The color for the SVG
 * @return {node} JSX for the overlay SVG
 */
export const DocumentLayout = ({ width, height, color }) => (
  <Svg height={height} width={width} fill="transparent">
    {/* Esquina superior izquierda */}
    <Line x1="0" y1="0" x2="0" y2="50" stroke={color} strokeWidth="5" />
    <Line x1="0" y1="0" x2="50" y2="0" stroke={color} strokeWidth="5" />
    {/* Esquina superior derecha */}
    <Line x1={width - 50} y1="0" x2={width} y2="0" stroke={color} strokeWidth="5" />
    <Line x1={width} y1="0" x2={width} y2="50" stroke={color} strokeWidth="5" />
    {/* Esquina inferior izquierda */}
    <Line x1="0" y1={height - 50} x2="0" y2={height} stroke={color} strokeWidth="5" />
    <Line x1="0" y1={height} x2="50" y2={height} stroke={color} strokeWidth="5" />
    {/* Esquina inferior derecha */}
    <Line x1={width - 50} y1={height} x2={width} y2={height} stroke={color} strokeWidth="5" />
    <Line x1={width} y1={height} x2={width} y2={height - 50} stroke={color} strokeWidth="5" />
  </Svg>
);

/**
 * Returns the overlaid elements for "avatar" camera modes
 * @param {number} width The width for the SVG
 * @param {number} height The height for the SVG
 * @param {string} color The color for the SVG
 * @return {node} JSX for the overlay SVG
 */
export const AvatarLayout = ({ width, height, color }) => (
  <Svg height={height} width={width} fill="transparent" viewBox="0 0 200 200">
    {/* Frame para encuadrar rostro del conductor */}
    <Path fill="none" stroke={Color.success.default} strokeWidth="2"
      d="M 141.50,89.50
        C 143.20,77.08 143.00,64.00 143.00,64.00
        135.00,10.00 69.50,-8.50 52.00,64.00
        52.49,64.49 51.66,78.29 53.50,90.50
        55.42,103.29 60.00,114.50 60.00,114.50
        74.94,156.29 112.08,172.48 136.00,115.00
        136.00,115.00 139.71,102.56 141.50,89.50 Z"
    />
  </Svg>
);

const getPermissionOpts = labels => {
  const { camera, buttons, mic } = labels ? labels : {
    camera: {
      access_title: "Acceso a la cámara",
      access_message: "Deberá permitir el acceso a la cámara para anexarlas como soporte al servicio activo."
    },
    mic: {
      access_title: "Acceso al micrófono",
      access_message: "Está función es requerida por la cámara"
    },
    buttons: {
      ok: "Aceptar",
      cancel: "Cancelar"
    }
  };

  return {
    camera: {
      title: camera.access_title,
      message: camera.access_message,
      buttonPositive: buttons.ok,
      buttonNegative: buttons.cancel,
    },
    audio: {
      title: mic.access_title,
      message: mic.access_message,
      buttonPositive: buttons.ok,
      buttonNegative: buttons.cancel,
    },
    picture: {
      quality: 0.5,
      skipProcessing: false,
      orientation: "portrait",
      fixOrientation: true,
      forceUpOrientation: true
    }
  }
}

const PackenCameraStyles = StyleSheet.create({
  rncamera: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    zIndex: 1,
    flex: 1
  },
  layout: {
    position: "relative",
    zIndex: 2,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  layout_avatar: {
    position: "absolute",
    left: 0,
    top: -5,
    zIndex: 2,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  trigger: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Color.brand.primary.drk
  },
  triggerChild: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Color.brand.primary.drk
  },
  triggerChildDisabled: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Color.basic.independence.drk_alt
  },
  bottomTriggersContainer: {
    position: "absolute",
    bottom: 10,
    left: 0,
    zIndex: 5,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  topTriggersContainer: {
    position: "absolute",
    top: 10,
    left: 0,
    zIndex: 5,
    paddingLeft: 30,
    paddingRight: 30,
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row"
  },
  imagePreview: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    width: "100%",
    padding: 5,
    zIndex: 10,
    position: "absolute",
    bottom: 50,
    left: 0
  },
  imagePreviewTriggersContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    position: "relative"
  },
  imagePreviewTile: {
    width: Dimensions.get("window").width - 30,
    height: Dimensions.get("window").height - 100,
    borderRadius: 15
  }
});