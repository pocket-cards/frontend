import * as React from 'react';
import { compose, Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { Grid, Card, CardContent, Typography } from '@material-ui/core';
import Loading from '@components/Loading';
import * as MyPageActions from '@actions/mypage';
import { IState } from '@models';

/** 単語カメラ画面 */
class C001 extends React.Component<Props, any, any> {
  componentWillMount() {
    this.props.actions.history();
  }

  render() {
    const { remainingTest, remainingReview, daily, dailyNew, dailyReview, weekly, monthly, isLoading } = this.props;
    // Loading中
    if (isLoading) {
      return <Loading />;
    }

    const classes = styles();
    return (
      <Grid container justify="center" className={classes.root}>
        <Grid container justify="center" className={classes.item}>
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary">
                今日の残単語数
              </Typography>
            </CardContent>
            <CardContent className={classes.content}>
              <Grid container alignItems="center">
                <Grid item xs>
                  <Typography className={classes.number} color="textPrimary">
                    {remainingTest}
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
                今日の残復習単語数
              </Typography>
            </CardContent>
            <CardContent className={classes.content}>
              <Grid container alignItems="center">
                <Grid item xs>
                  <Typography className={classes.number} color="textPrimary">
                    {remainingReview}
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
                今日の新規単語数
              </Typography>
            </CardContent>
            <CardContent className={classes.content}>
              <Grid container alignItems="center">
                <Grid item xs>
                  <Typography className={classes.number} color="textPrimary">
                    {dailyNew}
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
                今日の復習単語数
              </Typography>
            </CardContent>
            <CardContent className={classes.content}>
              <Grid container alignItems="center">
                <Grid item xs>
                  <Typography className={classes.number} color="textPrimary">
                    {dailyReview}
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
                今日の学習単語数
              </Typography>
            </CardContent>
            <CardContent className={classes.content}>
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
            <CardContent className={classes.content}>
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
            <CardContent className={classes.content}>
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

const styles = makeStyles(({ spacing }: Theme) =>
  createStyles({
    root: {
      padding: `${spacing(2)}px 0px`,
    },
    item: {
      padding: `${spacing()}px 0px`,
    },
    content: {
      padding: `${spacing()}px ${spacing(2)}px`,
    },
    number: {
      fontSize: '2rem',
      textAlign: 'center',
    },
    card: {
      width: '170px',
      height: '120px',
      margin: spacing(),
    },
    title: {},
  }),
);

const mapStateToProps = (state: IState) => ({
  remainingTest: state.get('C000').get('remainingTest'),
  remainingReview: state.get('C000').get('remainingReview'),
  daily: state.get('C000').get('daily'),
  dailyNew: state.get('C000').get('dailyNew'),
  dailyReview: state.get('C000').get('dailyReview'),
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
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(C001) as any;

/** Properties */
export interface Props extends RouteComponentProps<{}> {
  actions: MyPageActions.Actions;
  remainingTest?: number;
  remainingReview?: number;
  daily?: number;
  dailyNew?: number;
  dailyReview?: number;
  weekly?: number;
  monthly?: number;
  isLoading: boolean;
}
