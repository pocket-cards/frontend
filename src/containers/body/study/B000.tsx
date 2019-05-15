import * as React from 'react';
import { RouteComponentProps, Switch, Route } from 'react-router-dom';
import { WithStyles, StyleRules, withStyles } from '@material-ui/core/styles';
import { StudyCards, StudyInit, StudyFinish } from '@containers/body/study';
import { ROUTE_PATHS, ROUTE_PATH_INDEX } from '@constants/Paths';

class B000 extends React.Component<Props, any, any> {
  render() {
    const { match, children } = this.props;

    return (
      <React.Fragment>
        <Switch>
          <Route path={`${match.path}`} exact component={StudyInit} />
          <Route
            path={ROUTE_PATHS[ROUTE_PATH_INDEX.StudyCard]}
            component={StudyCards}
          />
          <Route
            path={ROUTE_PATHS[ROUTE_PATH_INDEX.StudyFinish]}
            component={StudyFinish}
          />
        </Switch>
        <Route children={children} />
      </React.Fragment>
    );
  }
}

const styles: StyleRules = {};

export default withStyles(styles)(B000);

/** Properties */
export interface Props
  extends WithStyles<StyleRules>,
    RouteComponentProps<{}> {}
