import * as React from 'react';
import { compose, Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { Grid, Card, CardContent, Typography, Fab, IconButton, CardHeader, TextField } from '@material-ui/core';
import { Replay as ReplayIcon, Edit as EditIcon, KeyboardArrowLeft as ArrowLeftIcon, Done as DoneIcon } from '@material-ui/icons';
import * as StudyActions from '@actions/study';
import * as AppActions from '@actions/app';
import { IState, WordInfo } from '@models';
import { MODES } from '@constants/Consts';
import Loading from '@components/Loading';
import { ROUTE_PATHS, ROUTE_PATH_INDEX } from '@constants/Paths';

/** 単語カメラ画面 */
class B002 extends React.Component<Props, StateProps, any> {
  state = {
    showText: false,
    edit: false,
  };

  /** 音声Tag */
  private audioRef: React.RefObject<HTMLAudioElement>;
  private zhRef: React.RefObject<HTMLInputElement>;
  private jaRef: React.RefObject<HTMLInputElement>;

  constructor(props: Readonly<Props>) {
    super(props);

    this.audioRef = React.createRef<HTMLAudioElement>();
    this.zhRef = React.createRef<HTMLInputElement>();
    this.jaRef = React.createRef<HTMLInputElement>();
  }

  handleTouchStart = () => this.setState({ showText: true });

  /** 新規単語学習 */
  handleNext = () => {
    const { history, actions } = this.props;
    actions.startReview(history);
  }

  handleAnswer = (word: string, yes: boolean) => {
    this.props.actions.answer(word, yes);
    this.setState({ showText: false });

    setTimeout(() => this.play(), 100);
  }

  handleBack = () => {
    const { appActions, history } = this.props;

    // ヘッダ、フット表示する
    appActions.showHeader(true);
    appActions.showFooter(true);
    // 画面遷移
    history.push(ROUTE_PATHS[ROUTE_PATH_INDEX.StudyInit]);
  }

  getButtons = (mode: string, classes: any, word?: WordInfo) => {
    const buttons = [];

    // 単語あり
    if (word) {
      buttons.push(
        <Fab
          key={2}
          className={classes.button}
          size="large"
          color="primary"
          disableFocusRipple
          disableTouchRipple
          disableRipple
          onTouchStart={this.handleTouchStart}
          onClick={() => {
            this.handleAnswer(word.word, true);
          }}
        >
          知ってる
        </Fab>,
      );
      buttons.push(
        <Fab
          key={1}
          className={classes.button}
          size="large"
          color="secondary"
          disableFocusRipple
          disableTouchRipple
          disableRipple
          onTouchStart={this.handleTouchStart}
          onClick={() => {
            this.handleAnswer(word.word, false);
          }}
        >
          知らない
        </Fab>,
      );
      return buttons;
    }

    // 単語なし
    if (mode === MODES.Review) {
      console.log(this.handleNext);
      buttons.push(
        <Fab key={3} className={classes.button} size="large" color="secondary" disableFocusRipple disableTouchRipple disableRipple onClick={this.handleNext}>
          Retry
        </Fab>,
      );
    }

    return buttons;
  }

  /** 音声再生 */
  play = () => {
    const audio = this.audioRef.current;

    audio && audio.play();
  }

  setEdit = () => {
    const { word } = this.props;

    try {
      if (!word || !this.zhRef.current || !this.jaRef.current) {
        return;
      }

      const isChanged = this.zhRef.current.value !== word.vocChn || this.jaRef.current.value !== word.vocJpn;

      if (isChanged) {
        console.log('do some actions');
      }
    } finally {
      this.setState({ edit: !this.state.edit });
    }
  }

  render() {
    const { word, mode, isLoading, classes } = this.props;
    const { showText } = this.state;

    return (
      <Grid container direction="column" className={classes.container}>
        <Grid container justify="flex-end" alignItems="center" className={classes.menubar}>
          <Grid item xs>
            <IconButton className={classes.iconButton} onClick={this.handleBack} disableRipple disableTouchRipple>
              <ArrowLeftIcon className={classes.icon} />
            </IconButton>
          </Grid>
          <Grid item xs={2}>
            <IconButton className={classes.iconButton} onClick={this.play} disableRipple disableTouchRipple>
              <ReplayIcon className={classes.icon} />
            </IconButton>
          </Grid>
        </Grid>
        {(() => {
          // Loading中
          if (isLoading) {
            return <Loading className={classes.loading} />;
          }

          if (!word) {
            return (
              <Grid container justify="center" alignItems="center" className={classes.bottom}>
                <Grid item>{this.getButtons(mode, classes, word)}</Grid>
              </Grid>
            );
          }

          return (
            <React.Fragment>
              <Grid container alignItems="center" justify="center" className={classes.top}>
                <Card className={classes.card}>
                  <audio ref={this.audioRef} src={`/${word.mp3}`} />
                  <CardHeader
                    className={classes.header}
                    action={
                      <IconButton aria-label="Settings" onClick={this.setEdit}>
                        {(() => {
                          return this.state.edit ? <DoneIcon color="secondary" /> : <EditIcon color="secondary" />;
                        })()}
                      </IconButton>
                    }
                  />
                  <CardContent className={classes.content}>
                    <Typography variant="h4" gutterBottom align="center">
                      {word.word}
                    </Typography>
                    <Typography className={classes.content} variant="h6" align="center">
                      {word.pronounce ? `[${word.pronounce}]` : undefined}
                    </Typography>
                    {(() => {
                      return this.state.edit ? (
                        <TextField inputRef={this.zhRef} label="中国語" className={classes.content} value={word.vocChn} margin="normal" variant="outlined" />
                      ) : (
                        <Typography component="p" variant="h6" align="center" style={{ display: showText ? '' : 'none' }}>
                          {word.vocChn}
                        </Typography>
                      );
                    })()}
                    {(() => {
                      return this.state.edit ? (
                        <TextField inputRef={this.jaRef} label="日本語" className={classes.content} value={word.vocJpn} margin="normal" variant="outlined" />
                      ) : (
                        <Typography component="p" variant="h6" align="center" style={{ display: showText ? '' : 'none' }}>
                          {word.vocJpn}
                        </Typography>
                      );
                    })()}
                  </CardContent>
                </Card>
              </Grid>
              <Grid container justify="center" alignItems="center" className={classes.bottom}>
                <Grid item>{this.getButtons(mode, classes, word)}</Grid>
              </Grid>
            </React.Fragment>
          );
        })()}
      </Grid>
    );
  }
}

const styles = ({ palette, spacing }: Theme) => ({
  container: {
    height: '100%',
    position: 'relative',
  },
  loading: {
    height: 'calc(100vh - 64px)',
    marginTop: '64px',
  },
  header: { padding: `${spacing()}px ${spacing(2)}px` },
  content: { textAlign: 'center' },
  top: {
    width: '100%',
    height: '380px',
    padding: spacing(),
    paddingTop: spacing(2),
  },
  menubar: {
    height: spacing(8),
    padding: `0px ${spacing(2)}px`,
    backgroundColor: palette.primary.main,
  },
  iconButton: {
    padding: spacing(0.5),
    '&:hover': {
      cursor: 'pointer',
    },
  },
  icon: {
    fontSize: spacing(5),
    color: 'white',
  },
  bottom: {
    marginBottom: spacing(2),
    flexGrow: 1,
  },
  button: {
    width: spacing(12),
    height: spacing(12),
    margin: `0px ${spacing(3)}px`,
  },
  card: {
    width: '90%',
    height: '100%',
    borderRadius: 4,
  },
  paper: {
    boxShadow: 'none',
    backgroundColor: 'transparent',
  },
});

/** Props */
const mapStateToProps = (state: IState) => ({
  word: state.get('B000').get('current'),
  mode: state.get('B000').get('mode'),
  isLoading: state.get('B000').get('isLoading'),
});

/** Actions */
const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(StudyActions, dispatch),
  appActions: bindActionCreators(AppActions, dispatch),
});

export default compose(
  withRouter,
  withStyles(styles as any),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(B002) as any;

export interface StateProps {
  showText: boolean;
  edit: boolean;
}
/** Properties */
export interface Props extends RouteComponentProps, WithStyles {
  actions: StudyActions.Actions;
  appActions: AppActions.Actions;
  word?: WordInfo;
  mode: string;
  isLoading?: boolean;
}
