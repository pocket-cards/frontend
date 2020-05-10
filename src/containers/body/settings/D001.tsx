import * as React from 'react';
import Button from '@components/buttons/Button';
import { makeStyles, Theme, createStyles, Grid } from '@material-ui/core';

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
