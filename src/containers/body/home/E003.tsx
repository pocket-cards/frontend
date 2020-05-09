import * as React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, Theme, createStyles, Grid, TextField } from '@material-ui/core';
import Button from '@components/buttons/Button';
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

const getC000 = (state: State) => state.get('c000');

export default () => {
  const classes = useStyles();
  const actions = bindActionCreators(Actions, useDispatch());

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
        <Button fullWidth variant="contained" color="secondary" onClick={handleRegist}>
          REGIST
        </Button>
      </Grid>
    </Grid>
  );
};
