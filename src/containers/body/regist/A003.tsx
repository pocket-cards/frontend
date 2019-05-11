import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
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

/** 単語登録完了画面 */
class A003 extends React.Component<Props, any, any> {
  render() {
    const { actions, classes, match } = this.props;

    return (
      <List className={classes.root}>
        {[0, 1, 2, 3].map(value => (
          <ListItem key={value} role={undefined} dense button>
            <Checkbox
              checked={this.state.checked.indexOf(value) !== -1}
              tabIndex={-1}
              disableRipple
            />
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

export default withRouter(
  connect<StateFromProps, void, void, IState>(
    mapStateToProps,
    mapDispatchToProps,
  )(withStyles(styles)(A003)),
);

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
