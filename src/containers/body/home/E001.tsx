import React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { push } from 'connected-react-router/immutable';
import {
  makeStyles,
  Theme,
  createStyles,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Box,
} from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';
import Button from '@components/buttons/Button';
import { Actions as AppActions } from '@actions/app';
import { Actions as GroupActions } from '@actions/group';
import { Paths } from '@constants';
import { State } from '@models';

const useStyles = makeStyles(({ palette: { primary, secondary, common }, spacing }: Theme) =>
  createStyles({
    list: {
      width: 'auto',
      margin: spacing(2),
      backgroundColor: common.white,
      borderRadius: 8,
      '&:hover': {
        backgroundColor: 'rgba(94, 146, 243, 0.5)',
      },
    },
    text: { fontSize: '1.5rem' },
    avatar: { backgroundColor: secondary.main },
    icon: { color: secondary.light },
    button: {
      fontSize: '1.5rem',
    },
  })
);

const e000 = (state: State) => state.get('e000');

export default () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const actions = bindActionCreators(GroupActions, dispatch);
  const appActions = bindActionCreators(AppActions, dispatch);
  const { groups } = useSelector(e000);

  // Folder click
  const handleOnClick = (groupId: string) => {
    // 選択値を保存する
    appActions.groupSelect(groupId);

    // 画面遷移
    dispatch(push(Paths.ROUTE_PATHS[Paths.ROUTE_PATH_INDEX.Study]));
  };

  // フォルダなしの場合
  if (groups.length === 0) {
    return (
      <Box margin={2} ml={4} mr={4} display="flex" justifyContent="center">
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          // @ts-ignore
          component={Link}
          to={Paths.ROUTE_PATHS[Paths.ROUTE_PATH_INDEX.GroupRegist]}>
          フォルダを新規作成
        </Button>
      </Box>
    );
  }

  return (
    <List>
      {groups.map((item, idx) => (
        <ListItem
          key={idx}
          button
          disableRipple
          onClick={() => {
            handleOnClick(item.id);
          }}
          className={classes.list}>
          <ListItemAvatar>
            <Avatar
              classes={{
                colorDefault: classes.avatar,
              }}>
              <FolderIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            classes={{
              primary: classes.text,
            }}
            primary={item.name}
            secondary={item.description}
          />
        </ListItem>
      ))}
    </List>
  );
};
