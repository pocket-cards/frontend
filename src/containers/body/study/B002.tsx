import * as React from 'react';
import { compose, Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import {
  WithStyles,
  StyleRules,
  Theme,
  StyleRulesCallback,
} from '@material-ui/core/styles';
import {
  withStyles,
  Grid,
  Card,
  CardContent,
  Typography,
  Fab,
} from '@material-ui/core';
import * as StudyActions from '@actions/study';
import { ROUTE_PATHS, ROUTE_PATH_INDEX } from '@constants/Paths';
import { IState, WordInfo } from '@models';

/** 単語カメラ画面 */
class B002 extends React.Component<Props, any, any> {
  handleClick = (success: boolean) => {
    const { actions } = this.props;
    actions.studyResult(success);
  }

  render() {
    const { classes, history, word } = this.props;

    console.log(this.props);
    // 学習完了
    if (!word) {
      // history.push(ROUTE_PATHS[ROUTE_PATH_INDEX.StudyFinish]);
      return <div />;
    }

    return (
      <Grid container direction="column">
        <Grid
          container
          alignItems="center"
          justify="center"
          className={classes.top}
        >
          <Card className={classes.card}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                {word.word}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {word.pronunciation}
              </Typography>
              <Typography component="p">{word.vocabulary}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid container justify="space-around" className={classes.bottom}>
          <Fab
            className={classes.button}
            size="large"
            color="secondary"
            disableFocusRipple
            disableTouchRipple
            disableRipple
            onClick={() => {
              this.handleClick(false);
            }}
          >
            No
          </Fab>
          <Fab
            className={classes.button}
            size="large"
            color="primary"
            disableFocusRipple
            disableTouchRipple
            disableRipple
            onClick={() => {
              this.handleClick(true);
            }}
          >
            Yes
          </Fab>
        </Grid>
      </Grid>
    );
  }
}

const styles: StyleRulesCallback = ({ spacing: { unit } }: Theme) => ({
  top: {
    width: '100%',
    padding: unit,
    flexGrow: 1,
  },
  bottom: {
    marginBottom: unit * 2,
  },
  button: {
    width: unit * 12,
    height: unit * 12,
  },
  card: {
    width: '80%',
    height: '50%',
    borderRadius: 0,
  },
});

/** Props */
const mapStateToProps = (state: IState) => ({
  word: state.get('B000').get('current'),
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
export interface Props
  extends WithStyles<StyleRulesCallback>,
    RouteComponentProps<{}> {
  actions: StudyActions.Actions;
  word?: WordInfo;
}
