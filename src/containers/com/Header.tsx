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
  Button,
} from '@material-ui/core';
// import MenuIcon from '@material-ui/icons/Menu';
// import ExitToApp from '@material-ui/icons/ExitToApp';
// import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import AddIcon from '@material-ui/icons/Add';
import MoreIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ReplayIcon from '@material-ui/icons/Replay';
import ArrowBackIcon from '@material-ui/icons/ArrowBackIos';

import { State } from '@models';
import { Actions as GroupActions } from '@actions/group';
import { Paths, Consts } from '@constants';
import Loading from '@components/Loading';

const useStyles = makeStyles(({ spacing, palette: { primary, secondary, common } }: Theme) =>
  createStyles({
    app: {
      boxShadow: 'none',
      height: spacing(8),
      backgroundColor: primary.dark,
      userSelect: 'none',
    },
    toolbar: { minHeight: spacing(8) },
    title: { flexGrow: 1, fontWeight: 600, textAlign: 'center', letterSpacing: '2px' },
    icon: { color: common.white, fontSize: spacing(4) },
    edgeButton: { margin: spacing(0) },
    replyButton: { padding: spacing(0.5) },
    menuItem: {
      '&:hover': {
        backgroundColor: primary.light,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: common.white,
        },
      },
    },
    backButton: { padding: spacing(0.5) },
    listItemIcon: { minWidth: spacing(4) },
  })
);

const audioRef = React.createRef<HTMLAudioElement>();

const app = (state: State) => state.get('app');
const b000 = (state: State) => state.get('b000');
const e000 = (state: State) => state.get('e000');

export default () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const grpActions = bindActionCreators(GroupActions, dispatch);
  const { pathname } = useLocation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { groupId } = useSelector(app);
  const { current: word } = useSelector(b000);
  const { groups } = useSelector(e000);

  const isMenuOpen = Boolean(anchorEl);

  // Left Icon action
  const handleOnClickLeft = () => {
    const paths = pathname.split('/');
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

  const handleOnGroupEdit = () => {
    // close dialog
    handleMenuClose();
    // switch to group edit
    dispatch(push(Paths.ROUTE_PATHS[Paths.ROUTE_PATH_INDEX.GroupEdit]));
  };

  // Menu Open
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  // Menu Close
  const handleMenuClose = () => setAnchorEl(null);

  /** 音声再生 */
  const handleReply = () => audioRef.current?.play();
  // 表示中画面情報
  const screen = Paths.ROUTE_INFO[pathname];

  return (
    <React.Fragment>
      <AppBar position="static" className={classes.app}>
        <Toolbar className={classes.toolbar}>
          {(() => {
            return pathname.split('/').length <= 2 ? null : (
              <IconButton className={classes.backButton} onClick={handleOnClickLeft}>
                <ArrowBackIcon className={classes.icon} />
              </IconButton>
            );
          })()}
          <Typography variant="h5" color="inherit" className={classes.title}>
            {(() => {
              if (pathname === Paths.ROUTE_PATHS[Paths.ROUTE_PATH_INDEX.Study]) {
                const groupInfo = groups.find((item) => item.id === groupId);

                return groupInfo?.name;
              }

              return screen?.title;
            })()}
          </Typography>
          {(() => {
            if (pathname === Paths.ROUTE_PATHS[Paths.ROUTE_PATH_INDEX.Settings]) {
              return <Button color="inherit">{Consts.VERSION}</Button>;
            }

            return null;
          })()}
          {(() => {
            if (pathname === Paths.ROUTE_PATHS[Paths.ROUTE_PATH_INDEX.Groups]) {
              return (
                <IconButton color="inherit" aria-label="Add" edge="end" onClick={handleOnClickAdd}>
                  <AddIcon fontSize="large" />
                </IconButton>
              );
            }

            if (pathname === Paths.ROUTE_PATHS[Paths.ROUTE_PATH_INDEX.Study]) {
              return (
                <IconButton aria-label="display more actions" edge="end" color="inherit" onClick={handleMenuOpen}>
                  <MoreIcon fontSize="large" />
                </IconButton>
              );
            }

            if (pathname === Paths.ROUTE_PATHS[Paths.ROUTE_PATH_INDEX.StudyCard]) {
              const draw = [
                <IconButton className={classes.replyButton} onClick={handleReply}>
                  <ReplayIcon className={classes.icon} />
                </IconButton>,
              ];

              if (word) {
                draw.push(<audio ref={audioRef} src={`/${word.mp3}`} />);
              }

              return draw;
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
        <MenuItem className={classes.menuItem} onClick={handleOnGroupDelete}>
          <ListItemIcon className={classes.listItemIcon}>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="フォルダ削除" />
        </MenuItem>
        <MenuItem className={classes.menuItem} onClick={handleOnGroupEdit}>
          <ListItemIcon className={classes.listItemIcon}>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="フォルダ編集" />
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};
