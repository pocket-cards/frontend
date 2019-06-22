import * as React from 'react';
import { Footer, Header } from '@containers/com';
import { Switch, Route, RouteComponentProps, withRouter } from 'react-router-dom';
import { Grid, StyleRulesCallback, Theme, WithStyles } from '@material-ui/core';
import { ROUTE_PATHS, ROUTE_PATH_INDEX } from '@constants/Paths';
import { RegistMain, StudyMain, MyPageMain } from '@containers/body';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { IState } from '@models';

class App extends React.Component<Props, any> {
  render() {
    const { children, classes, showHeader } = this.props;

    return (
      <Grid container direction="column" className={classes.container}>
        <Header />
        <div
          className={classes.body}
          style={{
            minHeight: showHeader ? 'calc(100vh - 136px)' : '100vh',
            maxHeight: showHeader ? 'calc(100vh - 136px)' : '100vh',
            height: showHeader ? 'calc(100vh - 136px)' : '100vh',
          }}
        >
          <Switch>
            <Route path={ROUTE_PATHS[ROUTE_PATH_INDEX.RegistInit]} component={RegistMain} />
            <Route path={ROUTE_PATHS[ROUTE_PATH_INDEX.MyPage]} component={MyPageMain} />
            <Route path={ROUTE_PATHS[ROUTE_PATH_INDEX.StudyInit]} component={StudyMain} />
            <Route path={ROUTE_PATHS[ROUTE_PATH_INDEX.Settings]} component={StudyMain} />
            <Route component={StudyMain} />
          </Switch>
          <Route children={children} />
        </div>
        <Footer />
      </Grid>
    );
  }
}

const styles: StyleRulesCallback = ({ spacing: { unit } }: Theme) => ({
  container: {
    // minHeight: 'calc(100vh - 112px)',
  },
  body: {
    backgroundColor: 'whitesmoke',
    position: 'relative',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  icon: {
    color: 'white',
  },
});

const mapStateToProps = (state: IState) => ({
  showHeader: state.get('App').get('showHeader'),
});

export default compose(
  withRouter,
  connect(mapStateToProps),
  withStyles(styles),
)(App) as any;

/** Properties */
export interface Props extends WithStyles<StyleRulesCallback>, RouteComponentProps<any> {
  showHeader?: boolean;
}
