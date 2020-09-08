import { TouchableWithoutFeedback, StyleSheet, Dimensions, Modal, View, Image, GestureResponderEvent, ImageSourcePropType } from "react-native";
import { RNCamera, TakePictureResponse } from "react-native-camera";
import React, { Component, ReactNode, RefObject } from "react";
import Svg, { Line, Path } from "react-native-svg";
import PropTypes from "prop-types";
import * as UTIL from "../utils";

import TurnOnOffFlash from "react-native-vector-icons/Ionicons";
import ConfirmPicture from "react-native-vector-icons/Feather";
import CameraReverse from "react-native-vector-icons/Ionicons";
import CloseCamera from "react-native-vector-icons/Feather";
import TrashPicture from "react-native-vector-icons/Feather";

import Color from "../styles/abstracts/colors";

import PackenUiLoaderButton from "./PackenUiLoaderButton";
import PackenUiAvatar from "./PackenUiAvatar";
import PackenUiText from './PackenUiText';

interface LabelsShape {
  camera: {
    access_title: string;
    access_message: string;
  };
  mic: {
    access_title: string;
    access_message: string;
  };
  buttons: {
    ok: string;
    cancel: string;
  };
}

interface LayoutPropsShape {
  width: number;
  height: number;
  color: string;
}

interface StylesShape {
  rncamera: object;
  layout: object;
  layout_avatar: object;
  container: object;
  trigger: object;
  triggerChild: object;
  triggerChildDisabled: object;
  bottomTriggersContainer: object;
  topTriggersContainer: object;
  imagePreview: object;
  imagePreviewTriggersContainer: object;
  imagePreviewTile: object;
  imagePreviewContainer: object;
  imagePreviewInner: object;
  topTriggersInner: object;
  btnUploadLabel: object;
}

interface i18nShape {
  placeholders: {
    upload_image: string;
  };
}

interface PackenUiCameraProps {
  i18n: i18nShape;
  labels: LabelsShape;
  EMIT_TRIGGER: Function;
  dismiss: Function;
  MODE?: string;
  VISIBLE: boolean;
}

interface PackenUiCameraState {
  camera: RNCamera | null;
  proccessing: boolean;
  cameraType: "front" | "back" | undefined;
  flashMode: "on" | "off" | "torch" | "auto" | undefined;
  picture: TakePictureResponse | null;
  imageViewble: boolean;
  labels: LabelsShape | boolean;
}

type GestureResponderType = (event: GestureResponderEvent) => void;
type SetCameraType = string | ((instance: RNCamera | null) => void) | RefObject<RNCamera> | null | undefined;

/**
 * Component for managing the device's camera
 */
export default class PackenUiCamera extends Component<PackenUiCameraProps, PackenUiCameraState> {
  /**
   * Variable that stores the i18n json data
   * @type {object}
   */
  i18n: i18nShape = this.props.i18n || { placeholders: { upload_image: "Cargar imagen" } };

  /**
   * Variable that stores the state
   * @type {object}
   * @property {object} camera The RNCamera ref/instance
   * @property {boolean} proccessing Flag for the current process status
   * @property {undefined|string} cameraType Determines if the front or back camera is in use
   * @property {undefined|string} flashMode Determines whether the flash should be used when taking a picture
   * @property {object|null} picture The current picture data object
   * @property {boolean} imageViewble Determines whether the currently taken picture can be viewed
   * @property {object} labels The correct i18n labels to be used for permissions feedback text
   */
  state: PackenUiCameraState = {
    camera: null,
    proccessing: true,
    cameraType: undefined,
    flashMode: undefined,
    picture: null,
    imageViewble: false,
    labels: this.props.labels ? { ...this.props.labels } : false
  };

  /**
   * Initializes the component
   * @type {function}
   * @param {object} props Props passed to the component
   */
  constructor(props: PackenUiCameraProps) {
    super(props);
    this.emitPicture = this.emitPicture.bind(this);
    this.capturePicture = this.capturePicture.bind(this);
  }

  /**
   * Sets the initial configuration for the camera
   * @type {function}
   */
  componentDidMount() {
    this.setState({
      flashMode: RNCamera.Constants.FlashMode.off,
      cameraType: RNCamera.Constants.Type.back
    });
  }

  /**
   * Prevents the image preview modal from showing
   * @type {function}
   */
  restoreImagePreviewModal: VoidFunction = () => this.setState({ imageViewble: false });

  /**
   * Handles receiving the taken picture
   * @type {function}
   */
  emitPicture: GestureResponderType = () => {
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
  finalize: VoidFunction = () => this.setState({
    proccessing: false
  });

  /**
   * Initializes the process of taking a picture
   * @type {function}
   */
  capturePicture: Function = async (): Promise<void | number> => {
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
  callCamera: VoidFunction = async () => await this.makeCapture();

  /**
   * Sets the picture taken to the state
   * @type {function}
   */
  makeCapture: Function = async () => {
    if (this.state.camera) {
      this.setState({
        picture: await this.state.camera.takePictureAsync(getPermissionOpts(this.state.labels).picture)
      }, this.finalize);
    }
  }

  /**
   * Sets the camera ref/instance to the state key
   * @type {function}
   */
  setCamera: SetCameraType = (camera: RNCamera | null) => this.setState({ camera: camera });

  /**
   * Sets the correct flashmode to the state
   * @type {function}
   */
  setFlash: Function = () => this.setState({
    flashMode: (this.state.flashMode == RNCamera.Constants.FlashMode.off
      ? RNCamera.Constants.FlashMode.on : RNCamera.Constants.FlashMode.off)
  })

  /**
   * Sets the correct camera type to the state
   * @type {function}
   */
  setCameraType: Function = () => this.setState({
    cameraType: (this.state.cameraType == RNCamera.Constants.Type.back
      ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back)
  })

  /**
   * Informs that the device's camera is ready to take another picture
   * @type {function}
   */
  cameraReady: VoidFunction = () => this.setState({ proccessing: false })

  /**
   * Opens the image preview modal
   * @type {function}
   */
  showCurrentPicture: Function = () => {
    if (this.state.picture == null) {
      return;
    }
    this.setState({ imageViewble: true });
  }

  /**
   * Removes current picture from state and closes preview modal
   * @type {function}
   */
  discardCurrentPicture: Function = () => this.setState({ picture: null }, this.restoreImagePreviewModal);

  /**
   * Returns the preview modal if a picture was taken
   * @type {function}
   * @return {node|null} JSX for the preview modal or null
   */
  getImagePreview: Function = (): ReactNode | null => {
    if (this.state.picture == null) {
      return null;
    }
    return (
      <Modal
        visible={this.state.imageViewble}
        transparent
        animationType="fade"
      >
        <View style={PackenCameraStyles.imagePreviewContainer}>
          <View style={PackenCameraStyles.imagePreviewInner}>
            <Image
              resizeMode="cover"
              source={{ uri: this.state.picture.uri }}
              style={PackenCameraStyles.imagePreviewTile}
            />
            <View style={PackenCameraStyles.imagePreview}>
              <CameraImagePreviewTriggers
                confirmPicture={this.restoreImagePreviewModal}
                deletePicture={this.discardCurrentPicture}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  /**
   * Returns the overlay elements for "document" and "avatar" camera modes
   * @type {function}
   * @return {node|null} JSX for the overlaid elements or null
   */
  getCameraLayout: Function = (): ReactNode | null => {
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
            <AvatarLayout width={400} height={500} color={Color.brand.primary.dft} />
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
  render(): ReactNode {
    return (
      <React.Fragment>
        <Modal
          transparent={false}
          animationType="slide"
          visible={this.props.VISIBLE}>
          <View style={PackenCameraStyles.container}>
            <RNCamera
              zoom={0}
              autoFocus="on"
              ref={this.setCamera}
              type={this.state.cameraType}
              flashMode={this.state.flashMode}
              onCameraReady={this.cameraReady}
              style={PackenCameraStyles.rncamera}
              androidCameraPermissionOptions={getPermissionOpts(this.state.labels).camera}
              androidRecordAudioPermissionOptions={getPermissionOpts(this.state.labels).audio}
            />
            {this.getCameraLayout()}
            <CameraTopTriggers
              language={this.i18n}
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

  /**
   * Defines prop-types for the component
   * @type {object}
   */
  static propTypes: object = {
    labels: PropTypes.object.isRequired,
    EMIT_TRIGGER: PropTypes.func.isRequired,
    dismiss: PropTypes.func.isRequired,
    MODE: PropTypes.string,
    VISIBLE: PropTypes.bool.isRequired
  };
}

interface CameraImagePreviewTriggersProps {
  confirmPicture: VoidFunction;
  deletePicture: VoidFunction;
}

/**
 * Renders the two buttons for deleting and confirming the current picture when opening the preview modal
 * @type {function}
 * @param {object} props Props passed to the component
 */
export const CameraImagePreviewTriggers: Function = (props: CameraImagePreviewTriggersProps) => {
  return (
    <View style={PackenCameraStyles.imagePreviewTriggersContainer}>
      <TouchableWithoutFeedback onPress={props.confirmPicture}>
        <View style={[PackenCameraStyles.trigger, {
          width: 55,
          height: 55,
          borderRadius: 27,
          marginHorizontal: 10
        }]}>
          <ConfirmPicture
            size={25}
            name="arrow-left"
            color={Color.base.white}
          />
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={props.deletePicture}>
        <View style={[PackenCameraStyles.trigger, {
          width: 55,
          height: 55,
          borderRadius: 27,
          marginHorizontal: 10
        }]}>
          <TrashPicture
            size={25}
            name="trash-2"
            color={Color.base.white}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

interface CameraTopTriggersProps {
  language: i18nShape;
  image: null | {
    uri: string;
  };
  showPicture: Function;
  closeCameraTrigger: GestureResponderType;
}

interface CameraTopTriggersState {
  icon: string;
  source: ImageSourcePropType | {
    uri: string;
  }
}

/**
 * Inner components for managing the top elements of the camera UI (close button, preview modal)
 */
export class CameraTopTriggers extends Component<CameraTopTriggersProps, CameraTopTriggersState> {
  /**
   * Variable that stores the state
   * @type {function}
   * @property {object} source The object that holds the preview image uri
   */
  state: CameraTopTriggersState = {
    icon: "x",
    source: {
      uri: ""
      /* uri: (this.props.image != null ? this.props.image.uri : "") */
    }
  }

  /**
   * Propagates the picture
   * @type {function}
   */
  propagePicture: Function = () => {
    if ((typeof this.props.showPicture === "function")) {
      this.props.showPicture();
    }
  }

  /**
   * Updates the latest taken image uri
   * @type {function}
   * @param {object} prevProps The previous props object
   */
  componentDidUpdate(prevProps: CameraTopTriggersProps) {
    if (!UTIL.objectsEqual(prevProps, this.props)) {
      let newIcon = "x";
      let newSource = { uri: "" };
      if (this.props.image) {
        newIcon = "check";
        newSource = { uri: this.props.image.uri };
      }
      this.setState({
        icon: newIcon,
        source: newSource
      });
    }
  }

  /**
   * Renders the inner component
   * @type {function}
   * @return {node} JSX for the inner component
   */
  render(): ReactNode {
    return (
      <View style={PackenCameraStyles.topTriggersContainer}>
        <TouchableWithoutFeedback onPress={this.props.closeCameraTrigger}>
          <View style={PackenCameraStyles.topTriggersInner}>
            <View style={[PackenCameraStyles.trigger, {
              width: 40, height: 40, borderRadius: 20
            }]}
            >
              <CloseCamera
                size={25}
                name={this.state.icon}
                color={Color.base.white}
              />
            </View>
            {
              this.props.image ? (
                <PackenUiText style={PackenCameraStyles.btnUploadLabel}>
                  {this.props.language.placeholders.upload_image}
                </PackenUiText>
              ) : null
            }
          </View>
        </TouchableWithoutFeedback>
        <PackenUiAvatar size="medium" src={this.state.source} callback={this.propagePicture} />
      </View>
    );
  }
};

interface CameraBottomTriggersProps {
  flashTrigger: Function;
  pictureTrigger: Function;
  reverseCameraTrigger: Function;
  cameraIsLoading: boolean;
}

interface CameraBottomTriggersState {
  loading: boolean;
  hasFlash: boolean;
}

/**
 * Inner components for managing the bottom elements of the camera UI (flash, trigger, camera switch)
 */
export class CameraBottomTriggers extends Component<CameraBottomTriggersProps, CameraBottomTriggersState> {
  /**
   * Variable that stores the state
   * @type {function}
   * @property {boolean} hasFlash Determines if flash is active
   * @property {boolean} loading Determines if the camera is currently processing a previous picture
   */
  state: CameraBottomTriggersState = {
    hasFlash: false,
    loading: false
  }

  /**
   * Propagates the current flash mode via props
   * @type {function}
   */
  propagateFlashMode: GestureResponderType = () => {
    if ((typeof this.props.flashTrigger === "function") && !this.state.loading) {
      this.setState({ hasFlash: !this.state.hasFlash });
      this.props.flashTrigger();
    }
  };

  /**
   * Propagates the press on the trigger button via props callback
   * @type {function}
   */
  propagatePictureTaked: GestureResponderType = () => {
    if ((typeof this.props.pictureTrigger === "function") && !this.state.loading) {
      this.props.pictureTrigger();
    }
  }

  /**
   * Propagates the current camera type via props
   * @type {function}
   */
  propagateReverseCamera: VoidFunction = () => {
    if ((typeof this.props.reverseCameraTrigger === "function") && !this.state.loading) {
      this.props.reverseCameraTrigger();
    }
  }

  /**
   * Returns the camera trigger button
   * @type {function}
   * @return {node} JSX for the trigger button
   */
  getCaptureTrigger: Function = (): ReactNode => {
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
          callback={() => false}
        />
      </View>
    );
  }

  /**
   * Sets the correct loading status on props change
   * @type {function}
   * @param {object} prevProps The previous props object
   */
  componentDidUpdate(prevProps: CameraBottomTriggersProps) {
    if (!UTIL.objectsEqual(prevProps, this.props)) {
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
  render(): ReactNode {
    return (
      <View style={PackenCameraStyles.bottomTriggersContainer}>
        <TouchableWithoutFeedback onPress={this.propagateFlashMode}>
          <View style={[PackenCameraStyles.trigger, {
            width: 50, height: 50, borderRadius: 25
          }]}>
            <TurnOnOffFlash size={25}
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
            <CameraReverse size={25}
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
export const DocumentLayout: Function = (props: LayoutPropsShape): ReactNode => (
  <Svg height={props.height} width={props.width} fill="transparent">
    {/* Esquina superior izquierda */}
    <Line x1="0" y1="0" x2="0" y2="50" stroke={props.color} strokeWidth="5" />
    <Line x1="0" y1="0" x2="50" y2="0" stroke={props.color} strokeWidth="5" />
    {/* Esquina superior derecha */}
    <Line x1={props.width - 50} y1="0" x2={props.width} y2="0" stroke={props.color} strokeWidth="5" />
    <Line x1={props.width} y1="0" x2={props.width} y2="50" stroke={props.color} strokeWidth="5" />
    {/* Esquina inferior izquierda */}
    <Line x1="0" y1={props.height - 50} x2="0" y2={props.height} stroke={props.color} strokeWidth="5" />
    <Line x1="0" y1={props.height} x2="50" y2={props.height} stroke={props.color} strokeWidth="5" />
    {/* Esquina inferior derecha */}
    <Line x1={props.width - 50} y1={props.height} x2={props.width} y2={props.height} stroke={props.color} strokeWidth="5" />
    <Line x1={props.width} y1={props.height} x2={props.width} y2={props.height - 50} stroke={props.color} strokeWidth="5" />
  </Svg>
);

/**
 * Returns the overlaid elements for "avatar" camera modes
 * @param {number} width The width for the SVG
 * @param {number} height The height for the SVG
 * @param {string} color The color for the SVG
 * @return {node} JSX for the overlay SVG
 */
export const AvatarLayout: Function = (props: LayoutPropsShape): ReactNode => (
  <Svg height={props.height} width={props.width} fill="transparent" viewBox="0 0 200 200">
    {/* Frame para encuadrar rostro del conductor */}
    <Path fill="none" stroke={props.color} strokeWidth="2"
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

/**
 * Returns the provided i18n labels or defaults to Spanish ones for the permissions popups
 * @type {function}
 * @return {object} The labels object
 */
const getPermissionOpts: Function = (labels: LabelsShape | boolean): object => {
  const { camera, buttons, mic } = labels && typeof labels === "object" ? labels : {
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

/**
 * Creates the styles for the component
 * @type {object}
 * @return {object} The styles object
 */
const PackenCameraStyles: StylesShape = StyleSheet.create({
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
  btnUploadLabel: {
    marginLeft: 10,
    color: Color.basic.white.dft,
    textShadowColor: UTIL.hex2rgba(Color.basic.black.dft, 0.75),
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 15
  },
  trigger: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Color.primary.default
  },
  triggerChild: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Color.primary.default
  },
  triggerChildDisabled: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Color.base.default
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
  topTriggersInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  imagePreviewContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: UTIL.hex2rgba(Color.basic.black.dft, 0.75)
  },
  imagePreviewInner: {
    position: "relative"
  },
  imagePreview: {
    left: 0,
    right: 0,
    bottom: 50,
    zIndex: 10,
    position: "absolute"
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