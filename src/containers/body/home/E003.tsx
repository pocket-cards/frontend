import * as React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import * as MyPageActions from '@actions/mypage';
import Button from '@components/buttons/Button';
import { IState } from '@models';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

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

const getC000 = (state: IState) => state.get('C000');

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
          REGIST
        </Button>
      </Grid>
    </Grid>
  );
};
