import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { WithStyles, StyleRules, withStyles } from '@material-ui/core/styles';
import { Grid, Fab } from '@material-ui/core';
import { AccessAlarm as AccessAlarmIcon } from '@material-ui/icons';
import { IState } from '@models';
import * as AppActions from '@actions/app';

class Study extends React.Component<Props, any, any> {

  render() {
    const { classes } = this.props;

    return (
      <Grid
        container
        alignItems="center"
        justify="center"
      >
        <Grid>
          <Fab
            aria-label="Camera"
            className={classes.fab}
            size="large"
            color="secondary"
          >
            <AccessAlarmIcon />
          </Fab>
        </Grid>
      </Grid>
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

export default connect<StateFromProps, void, void, IState>(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Study));

/** State */
export interface StateFromProps {
  // tabIndex: number;
}

/** Properties */
export interface Props extends StateFromProps, WithStyles<StyleRules> {
  actions?: AppActions.Actions;
}
