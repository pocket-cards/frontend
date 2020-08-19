import React, { Fragment, useState } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import Auth from '@aws-amplify/auth';
import {
  makeStyles,
  Theme,
  createStyles,
  Box,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  ListItemSecondaryAction,
} from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';
import RefreshOutlinedIcon from '@material-ui/icons/RefreshOutlined';
import DeleteIcon from '@material-ui/icons/DeleteOutline';

import { Button, IOSSwitch } from '@components/buttons';
import { State } from '@models';
import { Actions } from '@actions/app';
import { Consts } from '@constants';

const useStyles = makeStyles(({ spacing, palette }: Theme) =>
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
    avatar: { backgroundColor: palette.primary.main },
    settings: { backgroundColor: palette.grey[100] },
  })
);

const app = (state: State) => state.get('app');

export default () => {
  const classes = useStyles();
  const { isLoading, status, displayCtrl } = useSelector(app);
  const actions = bindActionCreators(Actions, useDispatch());
  const [removeWord, setRemoveWord] = useState(displayCtrl[Consts.ShowTypes.REMOVE_WORD] ? true : false);

  // server start
  const handleStart = () => actions.start();
  // server stop
  const handleStop = () => actions.stop();
  // Refresh server status
  const handleStatus = () => actions.status();

  // Logout
  const handleLogout = async () => {
    await Auth.signOut();

    actions.logout();
  };

  const handleRemoveWordChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    // component status update
    setRemoveWord(checked);
    //
    actions.show(Consts.ShowTypes.REMOVE_WORD, checked);
  };

  return (
    <Fragment>
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
        <Box display="flex" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            className={classes.stopBtn}
            size="large"
            onClick={handleLogout}
            isLoading={isLoading}>
            Logout
          </Button>
        </Box>
      </Box>
      <Box>
        <List className={classes.settings}>
          <ListItem divider>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <DeleteIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText>単語削除ボタン表示</ListItemText>
            <ListItemSecondaryAction>
              <IOSSwitch checked={removeWord} onChange={handleRemoveWordChange} />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Box>
    </Fragment>
  );
};
