import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, compose } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { WithStyles, StyleRules } from '@material-ui/core/styles';
import {
  withStyles,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
  IconButton,
} from '@material-ui/core';
import { Comment as CommentIcon } from '@material-ui/icons';
import { IState } from '@models';
import * as AppActions from '@actions/app';

/** 単語登録リスト画面 */
class A002 extends React.Component<Props, any, any> {
  render() {
    const { actions, classes, match } = this.props;

    console.log(this.props);
    console.log(11111);
    return (
      <List className={classes.root}>
        {[0, 1, 2, 3].map(value => (
          <ListItem key={value} role={undefined} dense button>
            <Checkbox checked tabIndex={-1} disableRipple />
            <ListItemText primary={`Line item ${value + 1}`} />
            <ListItemSecondaryAction>
              <IconButton aria-label="Comments">
                <CommentIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    );
  }
}

const mapStateToProps = (state: IState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(AppActions, dispatch),
});

const styles: StyleRules = {};

export default compose(
  withRouter,
  withStyles(styles),
  connect<StateFromProps, void, void, IState>(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(A002) as any;

/** State */
export interface StateFromProps {
  // tabIndex: number;
}

/** Properties */
export interface Props
  extends StateFromProps,
    WithStyles<StyleRules>,
    RouteComponentProps<{}> {
  actions?: AppActions.Actions;
}
