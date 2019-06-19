import * as React from 'react';
import { compose, Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { WithStyles, Theme, StyleRulesCallback } from '@material-ui/core/styles';
import { withStyles, Grid, Card, CardContent, Typography, Fab, IconButton } from '@material-ui/core';
import { Replay as ReplayIcon } from '@material-ui/icons';
import * as StudyActions from '@actions/study';
import { IState, WordInfo } from '@models';
import { MODES } from '@constants/Consts';
import Loading from '@components/Loading';

/** 単語カメラ画面 */
class B002 extends React.Component<Props, StateProps, any> {
  state = {
    showText: false,
  };

  /** 音声Tag */
  private audioRef: React.RefObject<HTMLAudioElement>;

  constructor(props: Readonly<Props>) {
    super(props);

    this.audioRef = React.createRef<HTMLAudioElement>();
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

  render() {
    const { classes, word, mode, isLoading } = this.props;
    const { showText } = this.state;

    // Loading中
    if (isLoading) {
      return <Loading />;
    }

    return (
      <Grid container direction="column" className={classes.container}>
        <Grid container justify="flex-end" alignItems="center" className={classes.menubar}>
          <Grid item>
            <IconButton className={classes.iconButton} onClick={this.play} disableRipple disableTouchRipple>
              <ReplayIcon className={classes.icon} />
            </IconButton>
          </Grid>
        </Grid>
        {(() => {
          if (!word) {
            return <div>学習できる単語がありません</div>;
          }

          return (
            <Grid container alignItems="center" justify="center" className={classes.top}>
              <Card className={classes.card}>
                <audio ref={this.audioRef} src={`/${word.mp3}`} />
                <CardContent>
                  <Typography className={classes.title} variant="h4" gutterBottom align="center">
                    {word.word}
                  </Typography>
                  <Typography className={classes.pos} variant="h6" align="center">
                    {word.pronounce ? `[${word.pronounce}]` : undefined}
                  </Typography>
                  <Typography component="p" variant="h6" align="center" style={{ display: showText ? '' : 'none' }}>
                    {word.vocChn}
                  </Typography>
                  <Typography component="p" variant="h6" align="center" style={{ display: showText ? '' : 'none' }}>
                    {word.vocJpn}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })()}
        <Grid container justify="center" alignItems="center" className={classes.bottom}>
          <Grid item>{this.getButtons(mode, classes, word)}</Grid>
        </Grid>
      </Grid>
    );
  }
}

const styles: StyleRulesCallback = ({ palette, spacing: { unit } }: Theme) => ({
  container: {
    height: '100%',
  },
  top: {
    width: '100%',
    height: '380px',
    padding: unit,
    paddingTop: unit * 2,
  },
  menubar: {
    padding: `0px ${unit * 2}px`,
    backgroundColor: palette.secondary.light,
  },
  iconButton: {
    padding: unit / 2,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  icon: {
    fontSize: unit * 4,
    color: 'white',
  },
  bottom: {
    marginBottom: unit * 2,
    flexGrow: 1,
  },
  button: {
    width: unit * 12,
    height: unit * 12,
    margin: `0px ${unit * 3}px`,
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
  title: {
    paddingTop: unit * 8,
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
});

export default compose(
  withRouter,
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(B002) as any;

export interface StateProps {
  showText: boolean;
}
/** Properties */
export interface Props extends WithStyles<StyleRulesCallback>, RouteComponentProps<{}> {
  actions: StudyActions.Actions;
  word?: WordInfo;
  mode: string;
  isLoading: boolean;
}
