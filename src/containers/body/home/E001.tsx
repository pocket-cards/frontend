import * as React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import { Image as ImageIcon, Work as WorkIcon, BeachAccess as BeachAccessIcon, Delete as DeleteIcon } from '@material-ui/icons';
import Loading from '@components/Loading';
import * as MyPageActions from '@actions/mypage';
import { IState } from '@models';
import { GroupInfo } from 'typings/types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
  })
);

const getC000 = (state: IState) => state.get('C000');

export default () => {
  console.log('E001');
  const classes = useStyles();
  const actions = bindActionCreators(MyPageActions, useDispatch());
  const { isLoading } = useSelector(getC000);

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
    // console.log(111);
  };

  // Loading中
  if (isLoading) {
    return <Loading />;
  }

  return (
    <List className={classes.root}>
      {(() => {
        const items: any[] = [];

        groups.forEach((item, idx) => {
          // tslint:disable-next-line: trailing-comma
          items.push(
            <ListItem key={`ListItem${idx}`} button disableRipple onClick={handleOnClick}>
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
  );
};
