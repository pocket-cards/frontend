import * as React from 'react';
import { Footer, Header } from '@containers/com';
import { Switch, Route, RouteComponentProps, withRouter } from 'react-router-dom';
import { Grid, StyleRulesCallback, Theme, WithStyles } from '@material-ui/core';
import { ROUTE_PATHS, ROUTE_PATH_INDEX } from '@constants/Paths';
import { RegistMain, StudyMain } from '@containers/body';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import { connect } from 'react-redux';

class App extends React.Component<Props, any> {
  render() {
    const { children, classes, match } = this.props;

    return (
      <Grid container direction="column" className={classes.container}>
        <Header />
        <Grid
          container
          spacing={0}
          classes={{
            container: classes.body,
          }}
        >
          <Switch>
            <Route path={ROUTE_PATHS[ROUTE_PATH_INDEX.RegistInit]} component={RegistMain} />
            <Route path={ROUTE_PATHS[ROUTE_PATH_INDEX.StudyInit]} component={StudyMain} />
            <Route component={RegistMain} />
          </Switch>
          <Route children={children} />
        </Grid>
        <Footer />
      </Grid>
    );
  }
}

const styles: StyleRulesCallback = ({ spacing: { unit } }: Theme) => ({
  container: {
    minHeight: 'calc(100vh - 112px)',
  },
  body: {
    // minHeight: 'calc(100vh - 128px)',
    flexGrow: 1,
  },
  icon: {
    color: 'white',
  },
});

const mapStateToProps = () => ({});

export default compose(
  withRouter,
  connect(mapStateToProps),
  withStyles(styles),
)(App) as any;

/** Properties */
export interface Props extends WithStyles<StyleRulesCallback>, RouteComponentProps<any> {}
