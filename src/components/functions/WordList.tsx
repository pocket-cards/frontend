import React, { FunctionComponent, useState, Fragment } from 'react';
import {
  ListItem,
  ListItemIcon,
  makeStyles,
  Theme,
  createStyles,
  ListItemText,
  ListItemSecondaryAction,
  List,
  Divider,
  ListItemAvatar,
  Avatar,
  Button,
} from '@material-ui/core';
import { Consts } from '@constants';

const useStyles = makeStyles(({ palette, spacing }: Theme) =>
  createStyles({
    root: {
      paddingTop: spacing(2),
      paddingBottom: spacing(2),
      height: `calc(100vh - ${Consts.HEADER_HEIGHT + Consts.FOOT_HEIGHT + 182}px)`,
      overflowY: 'auto',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
    itemIcon: {
      justifyContent: 'center',
    },
    itemTextRoot: {
      margin: '0px',
      '& .MuiTypography-root': {
        fontSize: '1.25rem',
      },
    },
    item: {
      backgroundColor: palette.grey[100],
    },
    avatar: {
      backgroundColor: palette.primary.light,
    },
    avatarBtn: {
      color: palette.common.white,
      fontSize: '0.75rem',
    },
  })
);

const list: FunctionComponent<WordListProps> = ({ list }) => {
  const classes = useStyles();

  return (
    <List dense className={classes.root}>
      {list.map((item, idx) => (
        <Fragment>
          <ListItem key={idx} className={classes.item}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <Button className={classes.avatarBtn}>詳細</Button>
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={item}
              primaryTypographyProps={{
                variant: 'body1',
              }}
              className={classes.itemTextRoot}
            />
          </ListItem>
          <Divider />
        </Fragment>
      ))}
    </List>
  );
};

interface WordListProps {
  list: string[];
}

export default list;
