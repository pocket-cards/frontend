import * as React from 'react';
import Button from '@components/buttons/Button';
import { makeStyles, Theme, createStyles, Box } from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';

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

export default () => {
  const classes = useStyles();

  const handleStart = () => {};

  const handleStop = () => {};

  return (
    <Box display="flex" flexDirection="column" margin={2}>
      <Box>Server Status: Stop</Box>
      <Box display="flex" justifyContent="flex-end">
        <Button variant="contained" color="primary" className={classes.startBtn} size="large" onClick={handleStart}>
          Start
        </Button>
        <Button variant="contained" color="primary" className={classes.stopBtn} size="large" onClick={handleStop}>
          Stop
        </Button>
      </Box>
    </Box>
  );
};
