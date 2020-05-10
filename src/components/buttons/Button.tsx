import React, { FunctionComponent } from 'react';
import {
  Button,
  ButtonProps,
  ButtonBaseProps,
  CircularProgress,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
    },
    wrapper: {
      margin: theme.spacing(1),
      position: 'relative',
    },
    buttonProgress: {
      color: green[500],
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
  })
);

const button: FunctionComponent<Props> = ({ isLoading, children, ...props }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Button disableFocusRipple disableTouchRipple disableRipple {...props} disabled={isLoading}>
        {children}
      </Button>
      {isLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
    </React.Fragment>
  );
};

interface Props extends ButtonProps {
  isLoading?: boolean;
}

export default button;
