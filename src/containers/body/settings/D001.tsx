import * as React from 'react';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import Button from '@components/buttons/Button';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(({ spacing }: Theme) =>
  createStyles({
    root: {
      padding: `${spacing(2)}px 0px`,
    },
    item: {
      padding: `${spacing()}px 0px`,
    },
    button: {
      width: spacing(20),
      height: spacing(20),
      margin: spacing(),
      letterSpacing: spacing(0.25),
      fontSize: '1.25rem',
      fontWeight: 600,
    },
  })
);

export default () => {
  const classes = useStyles();
  // const actions = bindActionCreators(StudyActions, useDispatch());
  // const appActions = bindActionCreators(AppActions, useDispatch());

  return (
    <Grid container className={classes.root} justify="center">
      <Grid item className={classes.item}>
        <Button variant="contained" color="primary" className={classes.button}>
          状態更新
        </Button>
        <Button variant="contained" color="primary" className={classes.button}>
          未定
        </Button>
      </Grid>
      <Grid item className={classes.item}>
        <Button variant="contained" color="primary" className={classes.button}>
          未定
        </Button>
        <Button variant="contained" color="primary" className={classes.button}>
          未定
        </Button>
      </Grid>
    </Grid>
  );
};
