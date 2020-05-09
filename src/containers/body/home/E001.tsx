import * as React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import useReactRouter from 'use-react-router';
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
import * as MyPageActions from '@actions/mypage';
import { State } from '@models';
import { GroupInfo } from 'typings/types';
import { ROUTE_PATHS, ROUTE_PATH_INDEX } from '@constants/Paths';

const useStyles = makeStyles(({ palette: { secondary, common }, spacing }: Theme) =>
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
    },
    text: { fontSize: '1.5rem' },
    avatar: { backgroundColor: secondary.main },
    icon: { color: secondary.light },
  })
);

const getC000 = (state: State) => state.get('C000');

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

  const handleOnClick = () => {
    history.push(ROUTE_PATHS[ROUTE_PATH_INDEX.StudyInit]);
  };

  // Loading中
  if (isLoading) {
    return <Loading />;
  }

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
          {/* <ListItemSecondaryAction>
            <IconButton
              edge="end"
              aria-label="edit"
              classes={{
                root: classes.icon,
              }}>
              <EditIcon />
            </IconButton>
          </ListItemSecondaryAction> */}
        </ListItem>
      ))}
    </List>
    // <Box>
    //   {groups.map((item, idx) => {
    //     return (
    //       <Box key={idx} boxShadow={3} className={classes.row} borderRadius={4}>
    //         {item.id}
    //       </Box>
    //     );
    //   })}
    // </Box>
    // <Box>
    //   {(() => {
    //     const items: any[] = [];

    //     groups.forEach((item, idx) => {
    //       items.push(
    //         <ListItem key={`ListItem${idx}`} button disableRipple onClick={handleOnClick} className={classes.list}>
    //           <ListItemAvatar>
    //             <Avatar
    //               classes={{
    //                 colorDefault: classes.avatar,
    //               }}>
    //               <FolderIcon />
    //             </Avatar>
    //           </ListItemAvatar>
    //           <ListItemText
    //             classes={{
    //               primary: classes.text,
    //             }}
    //             primary={item.name}
    //             secondary={item.description}
    //           />
    //           {/* <ListItemSecondaryAction>
    //                 <IconButton
    //                   edge="end"
    //                   aria-label="edit"
    //                   classes={{
    //                     root: classes.icon,
    //                   }}>
    //                   <EditIcon />
    //                 </IconButton>
    //               </ListItemSecondaryAction> */}
    //         </ListItem>
    //       );

    //       // if (idx !== groups.length - 1) {
    //       //   items.push(<Divider key={`Divider${idx}`} />);
    //       // }
    //     });

    //     return items;
    //   })()}
    // </Box>
    // <Grid container classes={{ root: classes.root }}>
    //   <Grid item className={classes.list}>
    //     <List>
    //       {(() => {
    //         const items: any[] = [];

    //         groups.forEach((item, idx) => {
    //           items.push(
    //             <ListItem key={`ListItem${idx}`} button disableRipple onClick={handleOnClick} className={classes.list}>
    //               <ListItemAvatar>
    //                 <Avatar
    //                   classes={{
    //                     colorDefault: classes.avatar,
    //                   }}>
    //                   <FolderIcon />
    //                 </Avatar>
    //               </ListItemAvatar>
    //               <ListItemText
    //                 classes={{
    //                   primary: classes.text,
    //                 }}
    //                 primary={item.name}
    //                 secondary={item.description}
    //               />
    //               {/* <ListItemSecondaryAction>
    //                 <IconButton
    //                   edge="end"
    //                   aria-label="edit"
    //                   classes={{
    //                     root: classes.icon,
    //                   }}>
    //                   <EditIcon />
    //                 </IconButton>
    //               </ListItemSecondaryAction> */}
    //             </ListItem>
    //           );

    //           if (idx !== groups.length - 1) {
    //             items.push(<Divider key={`Divider${idx}`} />);
    //           }
    //         });

    //         return items;
    //       })()}
    //     </List>
    //   </Grid>
    // </Grid>
  );
};
