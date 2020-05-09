import * as React from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, makeStyles, Theme, createStyles } from '@material-ui/core';
import CameraIcon from '@material-ui/icons/Camera';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import FaceIcon from '@material-ui/icons/Face';
import { State } from '@models';
import * as AppActions from '@actions/app';
import { ROUTE_PATH_INDEX, ROUTE_PATHS } from '@constants/Paths';

const useStyles = makeStyles(({ palette: { primary }, spacing }: Theme) =>
  createStyles({
    root: {
      bottom: '0',
      width: '100%',
      height: spacing(9),
      backgroundColor: primary.light,
      alignItems: 'flex-start',
    },
    action: {
      paddingTop: '8px !important',
      minWidth: 'inherit',
    },
    icon: {
      color: 'white',
      fontSize: '32px',
    },
  })
);

const getApp = (state: State) => state.get('app');

export default () => {
  // styles
  const classes = useStyles();
  // actions
  const actions = bindActionCreators(AppActions, useDispatch());
  // reducer
  const { tabIndex, showHeader } = useSelector(getApp);

  // Bottom menu clicked
  const handleChange = (_: any, value: any) => actions.tabChange(Number(value));

  if (!showHeader) return null;

  return (
    <BottomNavigation value={tabIndex} onChange={handleChange} className={classes.root}>
      <BottomNavigationAction
        className={classes.action}
        value={ROUTE_PATH_INDEX.Home}
        icon={<HomeIcon className={classes.icon} />}
        disableRipple
        disableTouchRipple
        component={React.forwardRef((props: any, ref: any) => (
          <Link to={ROUTE_PATHS[ROUTE_PATH_INDEX.Home]} {...props} />
        ))}
      />
      <BottomNavigationAction
        className={classes.action}
        value={ROUTE_PATH_INDEX.MyPage}
        icon={<FaceIcon className={classes.icon} />}
        disableRipple
        disableTouchRipple
        component={React.forwardRef((props: any, ref: any) => (
          <Link to={ROUTE_PATHS[ROUTE_PATH_INDEX.MyPage]} {...props} />
        ))}
      />
      <BottomNavigationAction
        className={classes.action}
        value={ROUTE_PATH_INDEX.RegistInit}
        icon={<CameraIcon className={classes.icon} />}
        disableRipple
        disableTouchRipple
        component={React.forwardRef((props: any, ref: any) => (
          <Link to={ROUTE_PATHS[ROUTE_PATH_INDEX.RegistInit]} {...props} />
        ))}
      />
      <BottomNavigationAction
        className={classes.action}
        value={ROUTE_PATH_INDEX.Settings}
        icon={<SettingsIcon className={classes.icon} />}
        disableRipple
        disableTouchRipple
        component={React.forwardRef((props: any, ref: any) => (
          <Link to={ROUTE_PATHS[ROUTE_PATH_INDEX.Settings]} {...props} />
        ))}
      />
    </BottomNavigation>
  );
};
