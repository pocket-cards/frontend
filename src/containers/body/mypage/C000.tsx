import * as React from 'react';
import { RouteComponentProps, Switch, Route } from 'react-router-dom';
import { WithStyles, StyleRules, withStyles } from '@material-ui/core/styles';
import { MypageInit } from '@containers/body/mypage';
import { ROUTE_PATHS, ROUTE_PATH_INDEX } from '@constants/Paths';

class C000 extends React.Component<Props, any, any> {
  render() {
    const { match, children } = this.props;

    console.log(match, ROUTE_PATHS[ROUTE_PATH_INDEX.MyPage]);
    return (
      <React.Fragment>
        <Switch>
          <Route path={`${match.path}`} exact component={MypageInit} />
          {/* <Route path={ROUTE_PATHS[ROUTE_PATH_INDEX.MyPage]} component={MypageInit} /> */}
          {/* <Route path={ROUTE_PATHS[ROUTE_PATH_INDEX.StudyFinish]} component={StudyFinish} /> */}
        </Switch>
        <Route children={children} />
      </React.Fragment>
    );
  }
}

const styles: StyleRules = {};

export default withStyles(styles)(C000);

/** Properties */
export interface Props extends WithStyles<StyleRules>, RouteComponentProps {}
