import * as React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import useReactRouter from 'use-react-router';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider, Grid } from '@material-ui/core';
import { Image as ImageIcon } from '@material-ui/icons';
import Loading from '@components/Loading';
import * as MyPageActions from '@actions/mypage';
import { IState } from '@models';
import { GroupInfo } from 'typings/types';
import { ROUTE_PATHS, ROUTE_PATH_INDEX } from '@constants/Paths';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      padding: '0px 16px',
    },
    list: {
      width: '100%',
    },
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
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={item.name} secondary={item.description} />
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
