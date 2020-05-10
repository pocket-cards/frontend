import React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router/immutable';
import {
  makeStyles,
  Theme,
  createStyles,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';
import Loading from '@components/Loading';
import * as Actions from '@actions/group';
import { State } from '@models';
import { Paths } from '@constants';

const useStyles = makeStyles(({ palette: { primary, secondary, common }, spacing }: Theme) =>
  createStyles({
    root: {},
    row: {
      margin: spacing(2),
      height: spacing(8),
    },
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
  })
);

const e000 = (state: State) => state.get('e000');

export default () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const actions = bindActionCreators(Actions, dispatch);
  const { isLoading, groups } = useSelector(e000);

  React.useEffect(() => {
    actions.groupList();
  }, []);

  // Loading中
  if (isLoading) {
    return <Loading />;
  }

  // Folder click
  const handleOnClick = () => dispatch(push(Paths.ROUTE_PATHS[Paths.ROUTE_PATH_INDEX.StudyInit]));

  return (
    <List>
      {groups.map((item, idx) => (
        <ListItem key={idx} button disableRipple onClick={handleOnClick} className={classes.list}>
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
