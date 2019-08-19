import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { IState } from '@models';
import * as AppActions from '@actions/app';
import { VERSION } from '@constants/Consts';

class Header extends React.Component<Props, any, any> {
  render() {
    const { actions, showHeader } = this.props;
    if (!actions) return;

    // ヘッダ非表示
    if (!showHeader) {
      return <React.Fragment />;
    }

    const classes = styles();
    return (
      <AppBar position="static" className={classes.app}>
        <Toolbar>
          <IconButton className={classes.button} color="inherit" aria-label="Reload">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.title} />
          <Button color="inherit">Ver{VERSION}</Button>
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = (state: IState) => ({
  showHeader: state.get('App').get('showHeader'),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(AppActions, dispatch),
});

const styles = makeStyles(() =>
  createStyles({
    app: {
      boxShadow: 'none',
      height: '64px',
    },
    title: {
      flexGrow: 1,
    },
    button: {
      color: 'white',
    },
  }),
);

export default connect<StateFromProps, void, void, IState>(
  mapStateToProps,
  mapDispatchToProps,
)(Header);

/** State */
export interface StateFromProps {
  // tabIndex: number;
}

/** Properties */
export interface Props extends StateFromProps {
  actions?: AppActions.Actions;
  showHeader?: boolean;
}
