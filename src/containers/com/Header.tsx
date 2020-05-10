import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { push } from 'connected-react-router/immutable';
import { makeStyles, Theme, createStyles, AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToApp from '@material-ui/icons/ExitToApp';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import MoreIcon from '@material-ui/icons/MoreVert';
import ArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import { State } from '@models';
import { Actions } from '@actions/app';
import { Paths } from '@constants';

const useStyles = makeStyles(({ spacing, palette: { primary } }: Theme) =>
  createStyles({
    app: {
      boxShadow: 'none',
      height: '64px',
      backgroundColor: primary.dark,
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
  const actions = bindActionCreators(Actions, dispatch);
  const { showHeader } = useSelector(app);
  const location = useLocation();

  // ヘッダ非表示
  if (!showHeader) {
    return <React.Fragment />;
  }

  const handleLogout = () => actions.logout();

  // Left Icon action
  const handleOnClickLeft = () => {
    console.log(111);
    const paths = location.pathname.split('/');
    paths.pop();

    dispatch(push(paths.join('/')));
  };

  const handleOnClickAdd = () => dispatch(push(Paths.ROUTE_PATHS[Paths.ROUTE_PATH_INDEX.GroupRegist]));

  return (
    <React.Fragment>
      <AppBar position="static" className={classes.app}>
        <Toolbar>
          <IconButton className={classes.button} color="inherit" aria-label="Reload" onClick={handleOnClickLeft}>
            {(() => {
              return location.pathname.split('/').length <= 2 ? (
                <MenuIcon />
              ) : (
                <ArrowLeftIcon className={classes.icon} />
              );
            })()}
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.title} />
          {/* <Button color="inherit">Ver{Consts.VERSION}</Button> */}
          {/* <IconButton color="inherit" aria-label="Logout" onClick={handleLogout}>
          <ExitToApp />
        </IconButton> */}
          {/* <IconButton color="inherit" aria-label="Add" onClick={handleOnClickAdd}>
          <AddCircleOutline />
        </IconButton> */}
          <IconButton aria-label="display more actions" edge="end" color="inherit">
            <MoreIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {/* <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}>
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      </Menu> */}
    </React.Fragment>
  );
};
