import * as React from 'react';
import { Grid, Paper, CircularProgress, WithStyles } from '@material-ui/core';
import { StyleRules } from '@material-ui/core/styles';

class Loading extends React.Component<LoadingProps, any, any> {
  render() {
    const { size, classes } = this.props;

    return (
      <Grid container alignItems="center" justify="center">
        <Paper className={classes.paper}>
          <CircularProgress size={size} />
        </Paper>
      </Grid>
    );
  }
}

const styles: StyleRules = {
  paper: {
    boxShadow: 'none',
    backgroundColor: 'transparent',
  },
};

export default Loading;

export interface LoadingProps extends WithStyles<StyleRules> {
  size?: number;
}
