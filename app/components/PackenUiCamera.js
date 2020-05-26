import React, { Component, useState, useEffect } from "react";
import {
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  Modal,
  View,
  Image,
} from "react-native";
import { RNCamera } from "react-native-camera";
import PackenUiLoaderButton from "./PackenUiLoaderButton";
import TurnOnOffFlash from 'react-native-vector-icons/Ionicons';
import ConfirmPicture from 'react-native-vector-icons/Feather';
import PackenUiAvatar from './PackenUiAvatar';
import CameraReverse from 'react-native-vector-icons/Ionicons';
import CloseCamera from 'react-native-vector-icons/Feather';
import TrashPicture from 'react-native-vector-icons/Feather';
import Color from '../styles/abstracts/colors';
import i18n from '../modules/i18n';
import Svg, { Line, Ellipse } from 'react-native-svg';

export default class PackenUiCamera extends Component {

  language = i18n();

  state = {
    camera: null,
    proccessing: true,
    cameraType: 0,
    flashMode: 0,
    picture: null,
    imageViewble: false
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
    if ((typeof EMIT_TRIGGER === 'function') && (this.state.picture != null)) {
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
    picture: await this.state.camera.takePictureAsync(PackenCameraPermissionOpts.picture)
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
        animationType='fade'>
        <View style={PackenCameraStyles.container}>
          <Image
            resizeMode='cover'
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
      case 'document':
        return (
          <View style={PackenCameraStyles.layout}>
            <DocumentLayout width={250} height={400} color='#FFFFFF' />
          </View>
        );
      case 'avatar':
        return (
          <View style={PackenCameraStyles.layout}>
            <AvatarLayout width={100} height={200} color='#1E9078' />
          </View>
        );
      default:
        return null;
    }
  }

  render() {
    return (
      <>
        <Modal
          transparent={false}
          animationType="slide"
          visible={this.props.VISIBLE}>
          <View style={PackenCameraStyles.container}>
            <RNCamera ref={this.setCamera} style={PackenCameraStyles.rncamera}
              flashMode={this.state.flashMode} type={this.state.cameraType} onCameraReady={this.cameraReady}
              zoom={0} autoFocus={true} androidCameraPermissionOptions={PackenCameraPermissionOpts.camera}
              androidRecordAudioPermissionOptions={PackenCameraPermissionOpts.audio}
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
      </>
    );
  }
}

const CameraImagePreviewTriggers = props => {
  return (
    <View style={PackenCameraStyles.imagePreviewTriggersContainer}>
      <TouchableWithoutFeedback onPress={props.confirmPicture}>
        <View style={[PackenCameraStyles.trigger, {
          width: 55, height: 55, borderRadius: 27,
          marginLeft: 5, marginRight: 5
        }]}>
          <ConfirmPicture solid size={25}
            name='check-circle'
            color={Color.base.white}
          />
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={props.deletePicture}>
        <View style={[PackenCameraStyles.trigger, {
          width: 55, height: 55, borderRadius: 27,
          marginLeft: 5, marginRight: 5
        }]}>
          <TrashPicture solid size={25}
            name='trash-2'
            color={Color.base.white}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const CameraTopTriggers = props => {
  var source = {
    uri: (props.image != null ? props.image.uri : null)
  };

  const propagePicture = () => {
    if ((typeof props.showPicture === 'function')) {
      props.showPicture();
    }
  }
  return (
    <View style={PackenCameraStyles.topTriggersContainer}>
      <TouchableWithoutFeedback onPress={props.closeCameraTrigger}>
        <View style={[PackenCameraStyles.trigger, {
          width: 40, height: 40, borderRadius: 20
        }]}>
          <CloseCamera solid size={25}
            name='x'
            color={Color.base.white}
          />
        </View>
      </TouchableWithoutFeedback>
      <PackenUiAvatar size="medium" src={source} callback={propagePicture} />
    </View>
  );
};

const CameraBottomTriggers = props => {

  var [hasFlash, setFlashActive] = useState(false);
  var [loading, setLoading] = useState(false);

  const propagateFlashMode = () => {
    if ((typeof props.flashTrigger === 'function') && !loading) {
      setFlashActive(!hasFlash);
      props.flashTrigger();
    }
  };

  const propagatePictureTaked = () => {
    if ((typeof props.pictureTrigger === 'function') && !loading) {
      props.pictureTrigger();
    }
  }

  const propagateReverseCamera = () => {
    if ((typeof props.reverseCameraTrigger === 'function') && !loading) {
      props.reverseCameraTrigger();
    }
  }

  const getCaptureTrigger = () => {
    if (!loading) {
      return (
        <TouchableWithoutFeedback onPress={propagatePictureTaked}>
          <View style={[PackenCameraStyles.trigger, {
            width: 75, height: 75, borderRadius: 37.5,
            marginLeft: 15, marginRight: 15,
            backgroundColor: Color.base.white
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
        backgroundColor: Color.base.white
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

  useEffect(() => {
    setLoading(props.cameraIsLoading);
  });

  return (
    <View style={PackenCameraStyles.bottomTriggersContainer}>
      <TouchableWithoutFeedback onPress={propagateFlashMode}>
        <View style={[PackenCameraStyles.trigger, {
          width: 50, height: 50, borderRadius: 25
        }]}>
          <TurnOnOffFlash solid size={25}
            name={hasFlash ? 'ios-flash' : 'ios-flash-off'}
            color={!props.cameraIsLoading ? Color.base.white : Color.base.default}
          />
        </View>
      </TouchableWithoutFeedback>
      {getCaptureTrigger()}
      <TouchableWithoutFeedback onPress={propagateReverseCamera}>
        <View style={[PackenCameraStyles.trigger, {
          width: 50, height: 50, borderRadius: 25
        }]}>
          <CameraReverse solid size={25}
            name='md-reverse-camera'
            color={!props.cameraIsLoading ? Color.base.white : Color.base.default}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>);
}


const DocumentLayout = ({ width, height, color }) => (
  <Svg height={height} width={width} fill='transparent'>
    {/* Esquina superior izquierda */}
    <Line x1='0' y1='0' x2='0' y2='50' stroke={color} strokeWidth='5' />
    <Line x1='0' y1='0' x2='50' y2='0' stroke={color} strokeWidth='5' />
    {/* Esquina superior derecha */}
    <Line x1={width - 50} y1='0' x2={width} y2='0' stroke={color} strokeWidth='5' />
    <Line x1={width} y1='0' x2={width} y2='50' stroke={color} strokeWidth='5' />
    {/* Esquina inferior izquierda */}
    <Line x1='0' y1={height - 50} x2='0' y2={height} stroke={color} strokeWidth='5' />
    <Line x1='0' y1={height} x2='50' y2={height} stroke={color} strokeWidth='5' />
    {/* Esquina inferior derecha */}
    <Line x1={width - 50} y1={height} x2={width} y2={height} stroke={color} strokeWidth='5' />
    <Line x1={width} y1={height} x2={width} y2={height - 50} stroke={color} strokeWidth='5' />
  </Svg>
);

const AvatarLayout = ({ width, height, color }) => (
  <Svg height={height} width={width} fill='transparent'>
    {/* Frame para encuadrar rostro del conductor */}
    <Ellipse cx={(width / 2)} cy={(height / 2)} rx={(width / 2)} ry={(height / 2)} stroke={color} strokeWidth='8' />
  </Svg>
);

const PackenCameraPermissionOpts = {
  camera: {
    title: i18n().camera.access_title,
    message: i18n().camera.access_message,
    buttonPositive: i18n().buttons.ok,
    buttonNegative: i18n().buttons.cancel,
  },
  audio: {
    title: i18n().mic.access_title,
    message: i18n().mic.access_message,
    buttonPositive: i18n().buttons.ok,
    buttonNegative: i18n().buttons.cancel,
  },
  picture: {
    quality: 0.5,
    skipProcessing: false,
    orientation: 'portrait',
    fixOrientation: true,
    forceUpOrientation: true
  }
};

const PackenCameraStyles = StyleSheet.create({
  rncamera: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: 1,
    flex: 1
  },
  layout: {
    position: 'relative',
    zIndex: 2,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trigger: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
    position: 'absolute',
    bottom: 10,
    left: 0,
    zIndex: 5,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  topTriggersContainer: {
    position: 'absolute',
    top: 10,
    left: 0,
    zIndex: 5,
    paddingLeft: 30,
    paddingRight: 30,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  imagePreview: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    width: '100%',
    padding: 5,
    zIndex: 10,
    position: 'absolute',
    bottom: 50,
    left: 0
  },
  imagePreviewTriggersContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'relative'
  },
  imagePreviewTile: {
    width: Dimensions.get('window').width - 30,
    height: Dimensions.get('window').height - 100,
    borderRadius: 15
  }
});