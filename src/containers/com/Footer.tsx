import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { bindActionCreators, Dispatch, compose } from 'redux';
import { Link } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, Theme } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { Camera as CameraIcon, Home as HomeIcon, Settings as SettingsIcon, Face as FaceIcon } from '@material-ui/icons';
import { IState } from '@models';
import * as AppActions from '@actions/app';
import { ROUTE_PATH_INDEX, ROUTE_PATHS } from '@constants/Paths';

class Footer extends React.Component<Props, any, any> {
  handleChange = (_: any, value: any) => {
    const { actions } = this.props;

    actions && actions.tabChange(Number(value));
  }

  render() {
    const { tabIndex, showHeader, classes } = this.props;

    if (!showHeader) return null;

    return (
      <BottomNavigation value={tabIndex} onChange={this.handleChange} className={classes.root}>
        <BottomNavigationAction
          className={classes.action}
          value={ROUTE_PATH_INDEX.StudyInit}
          icon={<HomeIcon className={classes.icon} />}
          disableRipple
          disableTouchRipple
          component={(props: any) => <Link to={ROUTE_PATHS[ROUTE_PATH_INDEX.StudyInit]} {...props} />}
        />
        <BottomNavigationAction
          className={classes.action}
          value={ROUTE_PATH_INDEX.MyPage}
          icon={<FaceIcon className={classes.icon} />}
          disableRipple
          disableTouchRipple
          component={(props: any) => <Link to={ROUTE_PATHS[ROUTE_PATH_INDEX.MyPage]} {...props} />}
        />
        <BottomNavigationAction
          className={classes.action}
          value={ROUTE_PATH_INDEX.RegistInit}
          icon={<CameraIcon className={classes.icon} />}
          disableRipple
          disableTouchRipple
          component={(props: any) => <Link to={ROUTE_PATHS[ROUTE_PATH_INDEX.RegistInit]} {...props} />}
        />
        <BottomNavigationAction
          className={classes.action}
          value={ROUTE_PATH_INDEX.Settings}
          icon={<SettingsIcon className={classes.icon} />}
          disableRipple
          disableTouchRipple
          component={(props: any) => <Link to={ROUTE_PATHS[ROUTE_PATH_INDEX.Settings]} {...props} />}
        />
      </BottomNavigation>
    );
  }
}

const styles = ({ palette: { primary }, spacing }: Theme) => ({
  root: {
    bottom: '0',
    width: '100%',
    height: spacing(9),
    backgroundColor: primary.light,
    alignItems: 'flex-start',
  },
  action: {
    paddingTop: '8px !important',
    minWidth: 'inherit',
  },
  icon: {
    color: 'white',
    fontSize: '32px',
  },
});

const mapStateToProps = (state: IState) => ({
  tabIndex: state.get('App').get('tabIndex'),
  showHeader: state.get('App').get('showHeader'),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(AppActions, dispatch),
});

export default compose(
  withRouter,
  withStyles(styles as any),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Footer) as any;

/** State */
export interface StateFromProps {}

/** Properties */
export interface Props extends StateFromProps, RouteComponentProps<any>, WithStyles {
  actions?: AppActions.Actions;
  tabIndex?: number;
  showHeader?: boolean;
}
