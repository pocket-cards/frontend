import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { push } from 'connected-react-router/immutable';
import {
  makeStyles,
  Theme,
  createStyles,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core';
// import MenuIcon from '@material-ui/icons/Menu';
// import ExitToApp from '@material-ui/icons/ExitToApp';
// import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import AddIcon from '@material-ui/icons/Add';
import MoreIcon from '@material-ui/icons/MoreVert';
import FolderIcon from '@material-ui/icons/Folder';
import { State } from '@models';
import { Actions as AppActions } from '@actions/app';
import { Actions as GroupActions } from '@actions/group';
import { Paths } from '@constants';

const useStyles = makeStyles(({ spacing, palette: { primary } }: Theme) =>
  createStyles({
    app: {
      boxShadow: 'none',
      height: spacing(8),
      backgroundColor: primary.dark,
    },
    toolbar: { minHeight: spacing(8) },
    title: { flexGrow: 1 },
    button: { color: 'white' },
    icon: {
      fontSize: spacing(5),
      color: 'white',
    },
    edgeButton: { margin: spacing(0) },
  })
);
const app = (state: State) => state.get('app');

export default () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const actions = bindActionCreators(AppActions, dispatch);
  const grpActions = bindActionCreators(GroupActions, dispatch);
  const { showHeader } = useSelector(app);
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);

  // ヘッダ非表示
  if (!showHeader) {
    return <React.Fragment />;
  }

  // Left Icon action
  const handleOnClickLeft = () => {
    const paths = location.pathname.split('/');
    paths.pop();

    dispatch(push(paths.join('/')));
  };

  // switch group regist screen
  const handleOnClickAdd = () => dispatch(push(Paths.ROUTE_PATHS[Paths.ROUTE_PATH_INDEX.GroupRegist]));

  // group delete
  const handleOnGroupDelete = () => {
    // close dialog
    handleMenuClose();
    // delete group
    grpActions.del();
  };

  // Menu Open
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  // Menu Close
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <React.Fragment>
      <AppBar position="static" className={classes.app}>
        <Toolbar className={classes.toolbar}>
          {/* <IconButton className={classes.button} color="inherit" aria-label="Reload" onClick={handleOnClickLeft}>
            {(() => {
              return location.pathname.split('/').length <= 2 ? (
                <MenuIcon fontSize="large" />
              ) : (
                <ArrowLeftIcon className={classes.icon} />
              );
            })()}
          </IconButton> */}
          <Typography variant="h6" color="inherit" className={classes.title} />
          {/* <Button color="inherit">Ver{Consts.VERSION}</Button> */}
          {/* <IconButton color="inherit" aria-label="Logout" onClick={handleLogout}>
          <ExitToApp />
        </IconButton> */}

          {(() => {
            if (location.pathname === Paths.ROUTE_PATHS[Paths.ROUTE_PATH_INDEX.Groups]) {
              return (
                <IconButton color="inherit" aria-label="Add" edge="end" onClick={handleOnClickAdd}>
                  <AddIcon fontSize="large" />
                </IconButton>
              );
            }

            if (location.pathname === Paths.ROUTE_PATHS[Paths.ROUTE_PATH_INDEX.Study]) {
              return (
                <IconButton aria-label="display more actions" edge="end" color="inherit" onClick={handleMenuOpen}>
                  <MoreIcon fontSize="large" />
                </IconButton>
              );
            }
          })()}
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        getContentAnchorEl={null}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={isMenuOpen}
        onClose={handleMenuClose}>
        <MenuItem onClick={handleOnGroupDelete}>
          <ListItemIcon>
            <FolderIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="フォルダ削除" />
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};
