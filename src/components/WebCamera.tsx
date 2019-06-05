import * as React from 'react';

const isNotSupport = () => navigator.mediaDevices.getUserMedia === undefined;

const FACING_MODE = {
  // 前カメラ
  USER: 'user',
  // 後カメラ
  ENVIRONMENT: 'environment',
};

class WebCamera extends React.Component<any, any, any> {

  state = {
    canvas: document.createElement('canvas') as HTMLCanvasElement,
  };

  componentDidMount() {
    // Camera Not Support
    if (isNotSupport()) {
      return;
    }

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

        const video = element as HTMLVideoElement;
        video.srcObject = value;

        video.onloadedmetadata = () => video.play();
      });
  }

  drawImage() {
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

  takePhoto = ({ type, quality } = { type: 'image/png', quality: 1 }) => {
    this.drawImage();
    const canvas = this.state.canvas;
    const base64 = canvas.toDataURL(type, quality);

    console.log(base64);
  }

  render() {
    // if (isNotSupport()) {
    //   return <div>It is not support camera</div>;
    // }

    return (
      <div>
        <video id="video" muted autoPlay playsInline />
      </div>
    );
  }
}

export default WebCamera;
