import * as React from 'react';
import { compose, Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { WithStyles, Theme, StyleRulesCallback } from '@material-ui/core/styles';
import { withStyles, Grid, Card, CardContent, Typography, Fab } from '@material-ui/core';
import * as StudyActions from '@actions/study';
import { IState, WordInfo } from '@models';

/** 単語カメラ画面 */
class B002 extends React.Component<Props, any, any> {
  handleClick = (success: boolean) => {
    const { actions } = this.props;
    // actions.startNew();

    // 次の単語
    actions.next();
  }

  render() {
    const { classes, history, word } = this.props;

    console.log(this.props);
    // 学習完了
    if (!word) {
      return <div />;
    }

    return (
      <Grid container direction="column" className={classes.container}>
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
        <Grid container justify="center" className={classes.bottom}>
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
}
