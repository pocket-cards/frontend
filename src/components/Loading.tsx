import * as React from 'react';
import { Grid, Paper, CircularProgress, WithStyles } from '@material-ui/core';
import { StyleRules, withStyles, StyleRulesCallback, Theme } from '@material-ui/core/styles';

class Loading extends React.Component<LoadingProps, any, any> {
  render() {
    const { size = 96, classes } = this.props;

    return (
      <Grid container alignItems="center" justify="center" className={classes.root}>
        <Paper className={classes.paper}>
          <CircularProgress size={size} />
        </Paper>
      </Grid>
    );
  }
}

const styles: StyleRulesCallback = ({ palette: { primary } }: Theme) => ({
  root: {
    position: 'absolute',
    height: '100%',
    backgroundColor: 'gray',
    opacity: 0.5,
    zIndex: 1000,
  },
  paper: {
    boxShadow: 'none',
    backgroundColor: 'transparent',
  },
  progress: {
    color: primary.dark,
  },
});

export default withStyles(styles)(Loading);

export interface LoadingProps extends WithStyles<StyleRulesCallback> {
  size?: number;
}
