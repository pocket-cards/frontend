import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps, withRouter, Switch, Route } from 'react-router-dom';
import { WithStyles, StyleRules } from '@material-ui/core/styles';
import { withStyles, Grid, Fab } from '@material-ui/core';
import { IState } from '@models';
import * as AppActions from '@actions/app';

class A003 extends React.Component<Props, any, any> {

  render() {
    const { actions, classes, match } = this.props;

    console.log(this.props);
    return (
      <div>111111111</div>
    );
  }
}

const mapStateToProps = (state: IState) => ({

});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(AppActions, dispatch),
});

const styles: StyleRules = {

};

export default withRouter(connect<StateFromProps, void, void, IState>(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(A003)));

/** State */
export interface StateFromProps {
  // tabIndex: number;
}

/** Properties */
export interface Props extends StateFromProps, WithStyles<StyleRules>, RouteComponentProps<{}> {
  actions?: AppActions.Actions;
}
