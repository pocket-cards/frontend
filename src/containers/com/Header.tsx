import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { WithStyles, StyleRules, StyleRulesCallback } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography, Button, withStyles } from '@material-ui/core';
import { Menu as MenuIcon, Star as StarIcon } from '@material-ui/icons';
import { IState } from '@models';
import * as AppActions from '@actions/app';

class Header extends React.Component<Props, any, any> {
  render() {
    const { actions, classes } = this.props;
    if (!actions) return;

    return (
      <AppBar position="static" className={classes.app}>
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Reload"
            onClick={() => {
              // window.location.href = '/';
              window.location.reload(true);
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.title}>
            News
          </Typography>
          <Button color="inherit">Ver0.04</Button>
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = (state: IState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(AppActions, dispatch),
});

const styles: StyleRulesCallback = () => ({
  app: {
    boxShadow: 'none',
    height: '64px',
  },
  title: {
    flexGrow: 1,
  },
});

export default connect<StateFromProps, void, void, IState>(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Header));

/** State */
export interface StateFromProps {
  // tabIndex: number;
}

/** Properties */
export interface Props extends StateFromProps, WithStyles<StyleRulesCallback> {
  actions?: AppActions.Actions;
}
