import * as React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import useReactRouter from 'use-react-router';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider, Grid, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import { Folder as FolderIcon, Edit as EditIcon } from '@material-ui/icons';
import Loading from '@components/Loading';
import * as MyPageActions from '@actions/mypage';
import { IState } from '@models';
import { GroupInfo } from 'typings/types';
import { ROUTE_PATHS, ROUTE_PATH_INDEX } from '@constants/Paths';

const useStyles = makeStyles(({ palette: { secondary } }: Theme) =>
  createStyles({
    root: { width: '100%' },
    list: { width: '100%' },
    text: { fontSize: '1.5rem' },
    avatar: { backgroundColor: secondary.main },
    icon: { color: secondary.light },
  })
);

const getC000 = (state: IState) => state.get('C000');

export default () => {
  const classes = useStyles();
  const actions = bindActionCreators(MyPageActions, useDispatch());
  const { isLoading } = useSelector(getC000);
  const { history } = useReactRouter();

  const groups: GroupInfo[] = [
    {
      id: 'id001',
      name: 'group001',
      description: '111111',
    },
    {
      id: 'id002',
      name: 'group002',
      description: '222222',
    },
    {
      id: 'id003',
      name: 'group003',
      description: '3333333',
    },
  ];
  // React.useMemo(() => {
  //   actions.history();
  // },            []);

  const handleOnClick = () => {
    history.push(ROUTE_PATHS[ROUTE_PATH_INDEX.StudyInit]);
  };

  // Loading中
  if (isLoading) {
    return <Loading />;
  }

  return (
    <Grid container classes={{ root: classes.root }}>
      <Grid item className={classes.list}>
        <List>
          {(() => {
            const items: any[] = [];

            groups.forEach((item, idx) => {
              items.push(
                <ListItem key={`ListItem${idx}`} button disableRipple onClick={handleOnClick} className={classes.list}>
                  <ListItemAvatar>
                    <Avatar
                      classes={{
                        colorDefault: classes.avatar,
                      }}
                    >
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
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      classes={{
                        root: classes.icon,
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );

              if (idx !== groups.length - 1) {
                items.push(<Divider key={`Divider${idx}`} />);
              }
            });

            return items;
          })()}
        </List>
      </Grid>
    </Grid>
  );
};
