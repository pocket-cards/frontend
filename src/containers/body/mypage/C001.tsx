import * as React from 'react';
import { compose, Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { WithStyles, StyleRulesCallback, Theme } from '@material-ui/core/styles';
import { withStyles, Grid, Card, CardContent, Typography, CardActions } from '@material-ui/core';
import Loading from '@components/Loading';
import * as MyPageActions from '@actions/mypage';
import { IState } from '@models';

/** 単語カメラ画面 */
class C001 extends React.Component<Props, any, any> {
  componentWillMount() {
    this.props.actions.history();
  }

  render() {
    const { classes, daily, weekly, monthly, isLoading } = this.props;
    // Loading中
    if (isLoading) {
      return <Loading />;
    }

    return (
      <Grid container justify="center" className={classes.root}>
        <Grid container justify="center" className={classes.item}>
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary">
                今日の学習単語数
              </Typography>
            </CardContent>
            <CardContent>
              <Grid container alignItems="center">
                <Grid item xs>
                  <Typography className={classes.number} color="textPrimary">
                    {daily}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography className={classes.title} color="textSecondary">
                    単語
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary">
                直近７日の単語数
              </Typography>
            </CardContent>
            <CardContent>
              <Grid container alignItems="center">
                <Grid item xs>
                  <Typography className={classes.number} color="textPrimary">
                    {weekly}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography className={classes.title} color="textSecondary">
                    単語
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid container justify="center" className={classes.item}>
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary">
                直近３０日の単語数
              </Typography>
            </CardContent>
            <CardContent>
              <Grid container alignItems="center">
                <Grid item xs>
                  <Typography className={classes.number} color="textPrimary">
                    {monthly}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography className={classes.title} color="textSecondary">
                    単語
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary">
                総学習単語数
              </Typography>
            </CardContent>
            <CardContent>
              <Grid container alignItems="center">
                <Grid item xs>
                  <Typography className={classes.number} color="textPrimary">
                    {monthly}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography className={classes.title} color="textSecondary">
                    単語
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

const styles: StyleRulesCallback = ({ spacing: { unit } }: Theme) => ({
  root: {
    padding: `${unit * 2}px 0px`,
  },
  item: {
    padding: `${unit}px 0px`,
  },
  number: {
    fontSize: '1.5rem',
    textAlign: 'center',
  },
  card: {
    width: '180px',
    height: '120px',
    margin: unit,
  },
});

const mapStateToProps = (state: IState) => ({
  daily: state.get('C000').get('daily'),
  weekly: state.get('C000').get('weekly'),
  monthly: state.get('C000').get('monthly'),
  isLoading: state.get('C000').get('isLoading'),
});

/** Props */
const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(MyPageActions, dispatch),
});

export default compose(
  withRouter,
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(C001) as any;

/** Properties */
export interface Props extends WithStyles<StyleRulesCallback>, RouteComponentProps<{}> {
  actions: MyPageActions.Actions;
  daily?: number;
  weekly?: number;
  monthly?: number;
  isLoading: boolean;
}
