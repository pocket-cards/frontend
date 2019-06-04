import * as React from 'react';
import { compose, Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { WithStyles, Theme, StyleRulesCallback } from '@material-ui/core/styles';
import { withStyles, Grid, Card, CardContent, Typography, Fab } from '@material-ui/core';
import * as StudyActions from '@actions/study';
import { IState, WordInfo } from '@models';
import { MODES } from '@constants/Consts';

/** 単語カメラ画面 */
class B002 extends React.Component<Props, any, any> {
  /** 学習リトライ */
  handleRetry = () => this.props.actions.retry();
  /** 新規単語学習 */
  handleNext = (mode: string) => {
    const { history, actions } = this.props;

    switch (mode) {
      case MODES.New:
        actions.startNew(history);
        break;
      case MODES.NewTest:
        actions.startNewTest(history);
        break;
      case MODES.AllTest:
        actions.startTest(history);
        break;
      case MODES.Review:
        actions.startReview(history);
        break;
    }
  }

  handleAnswer = (word: string, yes: boolean) => this.props.actions.answer(word, yes);

  getButtons = (mode: string, classes: any, word?: WordInfo) => {
    const buttons = [];

    const text1 = word ? '知らない' : 'Retry';
    const text2 = word ? '知ってる' : 'Next';
    const action1 = word
      ? () => {
        this.handleAnswer(word.word, false);
      }
      : () => {
        this.handleRetry();
      };
    const action2 = word
      ? () => {
        this.handleAnswer(word.word, true);
      }
      : () => {
        this.handleNext(mode);
      };

    buttons.push(
      <Fab className={classes.button} size="large" color="secondary" disableFocusRipple disableTouchRipple disableRipple onClick={action1}>
        {text1}
      </Fab>,
    );
    buttons.push(
      <Fab className={classes.button} size="large" color="primary" disableFocusRipple disableTouchRipple disableRipple onClick={action2}>
        {text2}
      </Fab>,
    );

    return buttons;
  }

  render() {
    const { classes, word, mode } = this.props;

    console.log(this.props);

    return (
      <Grid container direction="column" className={classes.container}>
        {(() => {
          if (!word) {
            return undefined;
          }

          return (
            <Grid container alignItems="center" justify="center" className={classes.top}>
              <Card className={classes.card}>
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
});

/** Props */
const mapStateToProps = (state: IState) => ({
  word: state.get('B000').get('current'),
  mode: state.get('B000').get('mode'),
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
}
