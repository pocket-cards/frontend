import * as React from 'react';
import { RouteComponentProps, Switch, Route } from 'react-router-dom';
import { RegistInit, RegistList, RegistFinish } from '@containers/body/regist';
import { ROUTE_PATHS, ROUTE_PATH_INDEX } from '@constants/Paths';
import { withStyles } from '@material-ui/core';
import { StyleRules, WithStyles } from '@material-ui/core/styles';

class A000 extends React.Component<Props, any, any> {
  render() {
    const { match, children, classes } = this.props;

    return (
      <React.Fragment>
        <Switch>
          <Route path={`${match.path}`} exact component={RegistInit} />
          <Route
            path={ROUTE_PATHS[ROUTE_PATH_INDEX.RegistList]}
            component={RegistList}
          />
          <Route
            path={ROUTE_PATHS[ROUTE_PATH_INDEX.RegistFinish]}
            component={RegistFinish}
          />
        </Switch>
        <Route children={children} />
      </React.Fragment>
    );
  }
}

const styles: StyleRules = {
  root: {
    width: '100%',
    minHeight: 'calc(100vh - 120px)',
  },
};

export default withStyles(styles)(A000);

/** Properties */
export interface Props
  extends WithStyles<StyleRules>,
    RouteComponentProps<{}> {}
