import * as React from 'react';
import { makeStyles, Theme, createStyles, Grid, Button } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { TextField } from '@components/inputs';
import * as Actions from '@actions/group';
import { State } from '@models';

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

const c000 = (state: State) => state.get('C000');

export default () => {
  const classes = useStyles();
  const actions = bindActionCreators(Actions, useDispatch());
  const { isLoading } = useSelector(c000);

  if (isLoading) {
    return <Loading />;
  }

  const handleRegist = () => {
    actions.groupRegist('1111', '2222');
  };

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
        <Button fullWidth variant="contained" color="secondary" size="large" onClick={handleRegist}>
          EDIT
        </Button>
      </Grid>
    </Grid>
  );
};
