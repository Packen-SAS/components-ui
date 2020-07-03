import React, { Component } from "react";
import PropTypes from "prop-types";
import { TouchableWithoutFeedback, StyleSheet, Dimensions, Modal, View, Image } from "react-native";

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

export default class PackenUiCamera extends Component {
  state = {
    camera: null,
    proccessing: true,
    cameraType: 0,
    flashMode: 0,
    picture: null,
    imageViewble: false,
    labels: this.props.labels ? { ...this.props.labels } : false
  };

  constructor(props) {
    super(props);
    this.emitPicture = this.emitPicture.bind(this);
    this.capturePicture = this.capturePicture.bind(this);
  }

  componentDidMount = () => {
    this.setState({
      flashMode: RNCamera.Constants.FlashMode.off,
      cameraType: RNCamera.Constants.Type.back
    });
  }

  restoreImagePreviewModal = () => this.setState({ imageViewble: false });

  emitPicture = () => {
    const { EMIT_TRIGGER, dismiss } = this.props;
    if ((typeof EMIT_TRIGGER === "function") && (this.state.picture != null)) {
      this.setState({ picture: null });
      EMIT_TRIGGER(this.state.picture);
    }
    dismiss();
    this.restoreImagePreviewModal();
  };

  finalize = () => this.setState({
    proccessing: false
  });


  capturePicture = async () => {
    if (this.state.camera == null) {
      return -1;
    }

    /* Request a picture */
    this.setState({
      proccessing: true
    }, this.callCamera);
  }

  callCamera = async () => await this.makeCapture();

  makeCapture = async () => this.setState({
    picture: await this.state.camera.takePictureAsync(getPermissionOpts().picture)
  }, this.finalize);

  setCamera = camera => this.setState({ camera: camera });

  setFlash = () => this.setState({
    flashMode: (this.state.flashMode == RNCamera.Constants.FlashMode.off
      ? RNCamera.Constants.FlashMode.on : RNCamera.Constants.FlashMode.off)
  })

  setCameraType = () => this.setState({
    cameraType: (this.state.cameraType == RNCamera.Constants.Type.back
      ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back)
  })

  cameraReady = () => this.setState({ proccessing: false })

  showCurrentPicture = () => {
    if (this.state.picture == null) {
      return;
    }
    this.setState({ imageViewble: true });
  }

  discardCurrentPicture = () => this.setState({ picture: null }, this.restoreImagePreviewModal);

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

export class CameraTopTriggers extends Component {
  state = {
    source: {
      uri: (this.props.image != null ? this.props.image.uri : null)
    }
  }

  propagePicture = () => {
    if ((typeof this.props.showPicture === "function")) {
      this.props.showPicture();
    }
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.setState({
        source: {
          uri: (this.props.image != null ? this.props.image.uri : null)
        }
      });
    }
  }

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

export class CameraBottomTriggers extends Component {
  state = {
    hasFlash: false,
    loading: false
  }

  propagateFlashMode = () => {
    if ((typeof this.props.flashTrigger === "function") && !this.state.loading) {
      this.setState({ hasFlash: !this.state.hasFlash });
      this.props.flashTrigger();
    }
  };

  propagatePictureTaked = () => {
    if ((typeof this.props.pictureTrigger === "function") && !this.state.loading) {
      this.props.pictureTrigger();
    }
  }

  propagateReverseCamera = () => {
    if ((typeof this.props.reverseCameraTrigger === "function") && !this.state.loading) {
      this.props.reverseCameraTrigger();
    }
  }

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

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
      this.setState({
        loading: this.props.cameraIsLoading
      });
    }
  }

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