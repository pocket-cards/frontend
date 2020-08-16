import React, { FunctionComponent, Fragment } from 'react';
import {
  ListItem,
  makeStyles,
  Theme,
  createStyles,
  ListItemText,
  List,
  Divider,
  ListItemAvatar,
  Avatar,
  Button,
  Box,
  Typography,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import SwipeableViews, { OnSwitchingCallbackTypeDescriptor } from 'react-swipeable-views';
import { Consts } from '@constants';

const useStyles = makeStyles(({ palette, spacing }: Theme) =>
  createStyles({
    root: {
      paddingTop: spacing(1),
      paddingBottom: spacing(0),
      height: `calc(100vh - ${Consts.HEADER_HEIGHT + Consts.FOOT_HEIGHT + 152}px)`,
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
      padding: spacing(0),
    },
    avatar: {
      backgroundColor: palette.primary.light,
    },
    avatarBtn: {
      color: palette.common.white,
      fontSize: '0.75rem',
    },
    swipe: { width: '100%' },
    button: {
      color: palette.common.white,
      fontWeight: 600,
      height: spacing(7),
      backgroundColor: red.A700,
      borderRadius: '0px',
    },
  })
);

const list: FunctionComponent<WordListProps> = ({ list, onRemove }) => {
  const classes = useStyles();

  const handleOnChangeIndex = (index: number, indexLatest: number) => (row: number) => {
    if (index === 1 && indexLatest === 0) {
      onRemove?.(row);
    }
  };

  return (
    <List className={classes.root}>
      {list.map((item, idx) => (
        <Fragment key={idx}>
          <ListItem className={classes.item}>
            <SwipeableViews
              enableMouseEvents
              onChangeIndex={(index: number, indexLatest: number) => {
                handleOnChangeIndex(index, indexLatest)(idx);
              }}
              className={classes.swipe}>
              <Box display="flex" alignItems="center" padding="8px 16px">
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
              </Box>
              <Box>
                <Button fullWidth disableRipple disableTouchRipple disableFocusRipple className={classes.button}>
                  <Typography variant="button" component="h2">
                    DELETE
                  </Typography>
                </Button>
              </Box>
            </SwipeableViews>
          </ListItem>
          <Divider />
        </Fragment>
      ))}
    </List>
  );
};

interface WordListProps {
  list: string[];
  onRemove?: (index: number) => void;
}

export default list;
