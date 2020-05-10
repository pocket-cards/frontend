import * as React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles, Theme, createStyles, Box, IconButton, Typography } from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';
import RefreshOutlinedIcon from '@material-ui/icons/RefreshOutlined';
import Button from '@components/buttons/Button';
import { State } from '@models';
import { Actions } from '@actions/app';

const useStyles = makeStyles(({ spacing }: Theme) =>
  createStyles({
    button: {
      margin: spacing(),
      letterSpacing: spacing(0.25),
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    startBtn: {
      width: spacing(15),
      margin: spacing(),
      backgroundColor: green[600],
      '&:hover': {
        backgroundColor: green[800],
      },
    },
    stopBtn: {
      width: spacing(15),
      margin: spacing(),
      backgroundColor: red[700],
      '&:hover': {
        backgroundColor: red[900],
      },
    },
  })
);

const app = (state: State) => state.get('app');

export default () => {
  const classes = useStyles();
  const { isLoading, status } = useSelector(app);
  const actions = bindActionCreators(Actions, useDispatch());

  const handleStart = () => actions.start();
  const handleStop = () => actions.stop();
  const handleStatus = () => actions.status();

  return (
    <Box display="flex" flexDirection="column" margin={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" component="h4">
          Server Status: {status}
        </Typography>
        <IconButton aria-label="delete" color="secondary" onClick={handleStatus} disabled={isLoading}>
          <RefreshOutlinedIcon fontSize="large" />
        </IconButton>
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="primary"
          className={classes.startBtn}
          size="large"
          onClick={handleStart}
          isLoading={isLoading}>
          Start
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.stopBtn}
          size="large"
          onClick={handleStop}
          isLoading={isLoading}>
          Stop
        </Button>
      </Box>
    </Box>
  );
};
