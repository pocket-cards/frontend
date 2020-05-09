import * as React from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, Theme, createStyles, Grid, Card, CardContent, Typography } from '@material-ui/core';
import Loading from '@components/Loading';
import * as MyPageActions from '@actions/mypage';
import { State } from '@models';

const useStyles = makeStyles(({ spacing }: Theme) =>
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
      width: '180px',
      height: '120px',
      margin: spacing(),
    },
    title: {},
  })
);

const c000 = (state: State) => state.get('c000');

export default () => {
  const classes = useStyles();
  const actions = bindActionCreators(MyPageActions, useDispatch());
  const { remainingTest, remainingReview, daily, dailyNew, dailyReview, weekly, monthly, isLoading } = useSelector(
    c000
  );

  React.useMemo(() => {
    actions.history();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

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
};
