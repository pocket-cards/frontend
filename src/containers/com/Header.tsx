import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push, getLocation } from 'connected-react-router/immutable';
import { makeStyles, Theme, createStyles, AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToApp from '@material-ui/icons/ExitToApp';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import ArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import { State } from '@models';
import * as AppActions from '@actions/app';
import { VERSION } from '@constants/Consts';
import { ROUTE_PATHS, ROUTE_PATH_INDEX } from '@constants/Paths';

const useStyles = makeStyles(({ spacing, palette: { primary } }: Theme) =>
  createStyles({
    app: {
      boxShadow: 'none',
      height: '64px',
      backgroudColor: primary.dark,
    },
    title: {
      flexGrow: 1,
    },
    button: {
      color: 'white',
    },
    icon: {
      fontSize: spacing(5),
      color: 'white',
    },
  })
);
const app = (state: State) => state.get('app');

export default () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const actions = bindActionCreators(AppActions, dispatch);
  const { showHeader } = useSelector(app);

  // ヘッダ非表示
  if (!showHeader) {
    return <React.Fragment />;
  }

  const handleLogout = () => actions.logout();

  // Left Icon action
  const handleOnClickLeft = () => {
    const paths = location.pathname.split('/');
    paths.pop();

    dispatch(push(paths.join('/')));
  };

  const handleOnClickAdd = () => push(ROUTE_PATHS[ROUTE_PATH_INDEX.GroupNew]);

  return (
    <AppBar position="static" className={classes.app}>
      <Toolbar>
        <IconButton className={classes.button} color="inherit" aria-label="Reload" onClick={handleOnClickLeft}>
          {(() => {
            return location.pathname.split('/').length <= 2 ? <MenuIcon /> : <ArrowLeftIcon className={classes.icon} />;
          })()}
        </IconButton>
        <Typography variant="h6" color="inherit" className={classes.title} />
        <Button color="inherit">Ver{VERSION}</Button>
        <IconButton color="inherit" aria-label="Logout" onClick={handleLogout}>
          <ExitToApp />
        </IconButton>
        <IconButton color="inherit" aria-label="Add" onClick={handleOnClickAdd}>
          <AddCircleOutline />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
