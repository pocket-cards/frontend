import * as React from 'react';
import { compose, Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { WithStyles, Theme, StyleRulesCallback } from '@material-ui/core/styles';
import { withStyles, Grid, Card, CardContent, Typography, Fab, Paper, CircularProgress } from '@material-ui/core';
import * as StudyActions from '@actions/study';
import { IState, WordInfo } from '@models';
import { MODES } from '@constants/Consts';

/** 単語カメラ画面 */
class B002 extends React.Component<Props, any, any> {
  /** 新規単語学習 */
  handleNext = () => {
    const { history, actions } = this.props;
    actions.startReview(history);
    // switch (mode) {
    //   case MODES.New:
    //     // actions.startNew(history);
    //     break;
    //   case MODES.AllTest:
    //     // actions.startTest(history);
    //     break;
    //   case MODES.Review:
    //     // actions.startReview(history);
    //     break;
    // }
  }

  handleAnswer = (word: string, yes: boolean) => this.props.actions.answer(word, yes);

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

  render() {
    const { classes, word, mode, isLoading } = this.props;

    // Loading中
    if (isLoading) {
      return (
        <Grid container alignItems="center" justify="center" className={classes.container}>
          <Paper className={classes.paper}>
            <CircularProgress size={96} className={classes.progress} />
          </Paper>
        </Grid>
      );
    }

    return (
      <Grid container direction="column" className={classes.container}>
        {(() => {
          if (!word) {
            return undefined;
          }

          return (
            <Grid container alignItems="center" justify="center" className={classes.top}>
              <Card className={classes.card}>
                <audio autoPlay src={`https://cards.aws-handson.com/${word.mp3}`} />
                <CardContent>
                  <Typography className={classes.title} variant="h3" gutterBottom align="center">
                    {word.word}
                  </Typography>
                  <Typography className={classes.pos} variant="h6" align="center">
                    {word.pronounce ? `/${word.pronounce}/` : undefined}
                  </Typography>
                  <Typography component="p" variant="h6" align="center">
                    {word.vocChn}
                  </Typography>
                  <Typography component="p" variant="h6" align="center">
                    {word.vocJpn}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })()}
        <Grid container justify="center" alignItems={word ? 'flex-start' : 'center'} className={classes.bottom}>
          {this.getButtons(mode, classes, word)}
        </Grid>
      </Grid>
    );
  }
}

const styles: StyleRulesCallback = ({ spacing: { unit } }: Theme) => ({
  container: {
    backgroundColor: 'whitesmoke',
  },
  top: {
    width: '100%',
    height: '280px',
    padding: unit,
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
    width: '80%',
    height: '80%',
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
});

export default compose(
  withRouter,
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(B002) as any;

/** Properties */
export interface Props extends WithStyles<StyleRulesCallback>, RouteComponentProps<{}> {
  actions: StudyActions.Actions;
  word?: WordInfo;
  mode: string;
  isLoading: boolean;
}
