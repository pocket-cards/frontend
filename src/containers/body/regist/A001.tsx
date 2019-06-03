import * as React from 'react';
import { compose, Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { WithStyles, StyleRules } from '@material-ui/core/styles';
import { withStyles, Grid, Fab } from '@material-ui/core';
import { Camera as CameraIcon } from '@material-ui/icons';
import * as RegistActions from '@actions/regist';
import { ROUTE_PATHS, ROUTE_PATH_INDEX } from '@constants/Paths';
// import ClCamera from './Camera';

/** 単語カメラ画面 */
class A001 extends React.Component<Props, any, any> {
  handleClick = async () => {
    const { actions, history } = this.props;

    // actions.uploadImage(1);
    console.log(navigator);
    const test = navigator.mediaDevices.getUserMedia({ video: true });
    console.log(test);
    // history.push(ROUTE_PATHS[ROUTE_PATH_INDEX.RegistList]);]

    // if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    //   navigator.mediaDevices
    //     .getUserMedia({
    //       audio: false,
    //       video: {
    //         facingMode: {
    //           exact: 'environment',
    //         },
    //       },
    //     })
    //     .then(stream => {
    //       this.refs.video.srcObject = stream;
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // }
  }

  componentDidMount() {
    if (navigator.mediaDevices.getUserMedia === undefined) {
      return;
    }

    const sleep = (ms = 0) => new Promise(r => setTimeout(r, ms));

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(async mediaStream => {
        const video = document.querySelector('video');
        if (video) {
          (video as HTMLVideoElement).srcObject = mediaStream;
        }

        // Once crbug.com/711524 is fixed, we won't need to wait anymore. This is
        // currently needed because capabilities can only be retrieved after the
        // device starts streaming. This happens after and asynchronously w.r.t.
        // getUserMedia() returns.
        await sleep(1000);

        const track = mediaStream.getVideoTracks()[0];
        const capabilities = track.getCapabilities();
        const settings = track.getSettings();

        // const input = document.querySelector('input[type="range"]');

        // // Check whether zoom is supported or not.
        // if (!('zoom' in capabilities)) {
        //   return Promise.reject('Zoom is not supported by ' + track.label);
        // }

        // // Map zoom to a slider element.
        // input.min = capabilities.zoom.min;
        // input.max = capabilities.zoom.max;
        // input.step = capabilities.zoom.step;
        // input.value = settings.zoom;
        // input.oninput = function (event) {
        //   track.applyConstraints({ advanced: [{ zoom: event.target.value }] });
        // };
        // input.hidden = false;
      })
      .catch(error => alert(error));

    // console.log(111);
    // alert(111);
    // // コンポーネント
    // const element = document.getElementById('video');
    // if (!element) return;
    // alert(2222);
    // console.log(222);
    // try {
    //   const stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
    //   alert(stream);
    //   console.log(stream);
    //   const video = element as HTMLVideoElement;
    //   video.srcObject = stream;
    //   alert(video);
    //   console.log(video);
    //   video.onloadedmetadata = () => video.play();
    // } catch (err) {
    //   console.log(err);
    // }
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid
        container
        alignItems="center"
        justify="center"
        // className={classes.root}
      >
        <Fab
          aria-label="Camera"
          // className={classes.fab}
          size="large"
          color="secondary"
          disableFocusRipple
          disableTouchRipple
          disableRipple
          onClick={this.handleClick}
        >
          <CameraIcon />
        </Fab>
        <video autoPlay id="video" />
      </Grid>
    );
  }
}

const styles: StyleRules = {};

/** Props */
const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(RegistActions, dispatch),
});

export default compose(
  withRouter,
  withStyles(styles),
  connect(
    null,
    mapDispatchToProps,
  ),
)(A001) as any;

/** Properties */
export interface Props extends WithStyles<StyleRules>, RouteComponentProps<{}> {
  actions: RegistActions.Actions;
}
