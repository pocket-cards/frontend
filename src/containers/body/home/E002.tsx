import * as React from 'react';
import { makeStyles, Theme, createStyles, Grid, TextField, Button } from '@material-ui/core';

const useStyles = makeStyles(({ spacing }: Theme) =>
  createStyles({
    root: {
      padding: '0px 16px',
    },
    button: {
      paddingTop: spacing(4),
    },
  })
);

export default () => {
  const classes = useStyles();
  // const actions = bindActionCreators(MyPageActions, useDispatch());
  // const { isLoading } = useSelector(getC000);

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="name"
          label="Group Name"
          name="name"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="description"
          label="Group Description"
          name="description"
        />
      </Grid>
      <Grid item xs={12} className={classes.button}>
        <Button fullWidth variant="contained" color="secondary">
          EDIT
        </Button>
      </Grid>
    </Grid>
  );
};
