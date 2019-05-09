import * as React from 'react';
import { connect } from 'react-redux';
import { IState } from '@models';
import { Route, withRouter, RouteComponentProps, Switch } from 'react-router-dom';
import { StyleRules, WithStyles } from '@material-ui/core/styles';
import { withStyles, Theme, StyleRulesCallback, Grid } from '@material-ui/core';
import { Camera, Study} from '@containers/body';
import { ROUTE_PATHS, ROUTE_PATH_INDEX } from '@constants/Paths';

class Main extends React.Component<Props, any, any> {

  render() {
    const { classes, match } = this.props;

    console.log(match, ROUTE_PATHS.Footer[ROUTE_PATH_INDEX.Study], ROUTE_PATHS.Footer[ROUTE_PATH_INDEX.Main]);
    return (
      <Grid
        container
        spacing={0}
        alignItems="center"
        justify="center"
        classes={{
          container: classes.root,
        }}
      >
        <Switch>
          <Route exact path={ROUTE_PATHS.Footer[ROUTE_PATH_INDEX.Main]} component={Camera} />
          <Route path={ROUTE_PATHS.Footer[ROUTE_PATH_INDEX.Study]} component={Study} />
        </Switch>
      </Grid>
    );
  }
}

// const mapStateToProps = (state: IState) => ({});

const styles: StyleRulesCallback = (theme: Theme) => ({
  root: {
    minHeight: 'calc(100vh - 120px)',
  },
  icon: {
    color: 'white',
  },
});

export default withRouter(connect<StateFromProps, void, void, IState>(null)(withStyles(styles)(Main)));

/** State */
export interface StateFromProps {
}

/** Properties */
export interface Props extends StateFromProps, WithStyles<StyleRules>, RouteComponentProps<any> {
}
