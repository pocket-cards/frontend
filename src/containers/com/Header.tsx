import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import useReactRouter from 'use-react-router';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import { Menu as MenuIcon, ExitToApp, AddCircleOutline, KeyboardArrowLeft as ArrowLeftIcon } from '@material-ui/icons';
import { IState } from '@models';
import * as AppActions from '@actions/app';
import { VERSION } from '@constants/Consts';

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
const app = (state: IState) => state.get('App');

export default () => {
  const classes = useStyles();
  const actions = bindActionCreators(AppActions, useDispatch());
  const { showHeader } = useSelector(app);
  const { location, history } = useReactRouter();

  console.log(location.pathname.split('/'));

  // ヘッダ非表示
  if (!showHeader) {
    return <React.Fragment />;
  }

  const handleLogout = () => actions.logout();

  // Left Icon action
  const handleOnClickLeft = () => {
    const paths = location.pathname.split('/');
    paths.pop();

    history.push(paths.join('/'));
  };

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
        <IconButton color="inherit" aria-label="Add">
          <AddCircleOutline />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
