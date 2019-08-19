import * as React from 'react';
import { Fab, Grid } from '@material-ui/core';
import { Camera as CameraIcon } from '@material-ui/icons';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const isNotSupport = () => navigator.mediaDevices === undefined || navigator.mediaDevices.getUserMedia === undefined;

const FACING_MODE = {
  // 前カメラ
  USER: 'user',
  // 後カメラ
  ENVIRONMENT: 'environment',
};

class WebCamera extends React.Component<Props, State, any> {
  state = {
    canvas: document.createElement('canvas'),
    onAir: false,
    stream: (undefined as unknown) as MediaStream,
  };

  componentWillReceiveProps(nextProps: Props) {
    // Camera Not Support
    if (isNotSupport()) {
      return;
    }

    // 開始
    if (!this.state.onAir && nextProps.onAir) {
      this.startCamera();
    }

    // 終了
    if (this.state.onAir && !nextProps.onAir) {
      this.stopCamera();
    }
  }

  componentWillUnmount() {
    this.stopCamera();
  }

  /** 写真作成 */
  drawImage = () => {
    // const camera = this.
    const element = document.querySelector('video');
    if (!element) {
      return;
    }
    const video = element as HTMLVideoElement;

    const canvas = this.state.canvas;
    canvas.width = video.videoWidth;
    canvas.height = video.videoWidth;

    const context = canvas.getContext('2d');

    // 画像出力の準備
    context && context.drawImage(video, 0, 0);
  }

  /** カメラ開始 */
  startCamera = () => {
    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: {
          facingMode: FACING_MODE.ENVIRONMENT,
        },
      })
      .then((value: MediaStream) => {
        const element = document.querySelector('video');

        if (!element) {
          return;
        }

        // 状態変更
        this.setState({ onAir: true, stream: value });

        const video = element as HTMLVideoElement;
        video.srcObject = value;

        video.onloadedmetadata = () => video.play();
      });
  }

  /** カメラ終了 */
  stopCamera = () => {
    const { beforeStartCamera, afterStopCamera } = this.props;
    const { stream } = this.state;

    try {
      // カメラ終了前イベント
      beforeStartCamera && beforeStartCamera();

      // カメラ閉じる
      stream && stream.getTracks().forEach(track => track.stop());
      // 状態変更
      this.setState({ onAir: false, stream: undefined });

      const element = document.querySelector('video');
      if (!element) {
        return;
      }

      const video = element as HTMLVideoElement;
      video.src = '';
      video.srcObject = null;
    } finally {
      // カメラ終了後イベント
      afterStopCamera && afterStopCamera();
    }
  }

  /** 写真 */
  takePhoto = ({ type, quality } = { type: 'image/png', quality: 1 }) => {
    this.drawImage();
    const canvas = this.state.canvas;
    const base64 = canvas.toDataURL(type, quality);

    const { takePhoto } = this.props;
    takePhoto && takePhoto(base64);

    this.stopCamera();
  }

  render() {
    const { onAir } = this.state;
    const classes = styles();
    const isShow = onAir ? '' : 'none';

    return (
      <Grid container alignItems="center" direction="column">
        <video className={classes.video} muted autoPlay playsInline style={{ display: isShow }} />
        <Fab
          style={{ display: isShow }}
          aria-label="Camera"
          size="large"
          color="secondary"
          disableFocusRipple
          disableTouchRipple
          disableRipple
          onClick={() => {
            this.takePhoto({
              type: 'image/png',
              quality: 0.8,
            });
          }}
        >
          <CameraIcon />
        </Fab>
      </Grid>
    );
  }
}

const styles = makeStyles(() =>
  createStyles({
    video: {
      width: '100%',
      height: '450px',
    },
  }),
);

export default WebCamera;

export interface Props {
  onAir?: boolean;
  takePhoto?: (dataUri: string) => void;
  beforeStartCamera?: () => void;
  afterStartCamera?: () => void;
  beforeStopCamera?: () => void;
  afterStopCamera?: () => void;
}

export interface State {
  canvas: HTMLCanvasElement;
  onAir: boolean;
  stream?: MediaStream;
}
