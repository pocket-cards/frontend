import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, compose } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import {
  WithStyles,
  StyleRules,
  Theme,
  StyleRulesCallback,
} from '@material-ui/core/styles';
import {
  withStyles,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Grid,
  Button,
  Avatar,
} from '@material-ui/core';
import { Folder as FolderIcon, Delete as DeleteIcon } from '@material-ui/icons';
import { IState } from '@models';
import * as RegistActions from '@actions/regist';
import { ROUTE_PATHS, ROUTE_PATH_INDEX } from '@constants/Paths';

/** 単語登録リスト画面 */
class A002 extends React.Component<Props, any, any> {
  /** 単語登録 */
  handleRegist = () => {
    const { actions, history } = this.props;

    actions.registWords(['test']);

    history.push(ROUTE_PATHS[ROUTE_PATH_INDEX.RegistFinish]);
  }

  /** 単語削除 */
  handleRemove = (word: string) => {
    const { actions } = this.props;

    actions.removeWord(word);
  }

  render() {
    const { classes, words, history } = this.props;

    // 単語データなし
    if (!words || words.length === 0) {
      history.push(ROUTE_PATHS[ROUTE_PATH_INDEX.RegistInit]);
      return <div />;
    }

    return (
      <Grid container direction="column" wrap="nowrap">
        <Grid item xs={12}>
          <List className={classes.root}>
            {words.map(value => (
              <ListItem key={value} role={undefined} dense>
                <Avatar>
                  <FolderIcon />
                </Avatar>
                <ListItemText primary={value} />
                <ListItemSecondaryAction>
                  <IconButton
                    className={classes.deleteButton}
                    disableRipple
                    disableTouchRipple
                    onClick={() => {
                      this.handleRemove(value);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={12} className={classes.button}>
          <Button
            variant="contained"
            color="secondary"
            // className={classes.button}
            onClick={this.handleRegist}
          >
            登録
          </Button>
        </Grid>
      </Grid>
    );
  }
}

/** 単語一覧のProps */
const mapStateToProps = (state: IState) => ({
  words: state.get('A000').get('words'),
});

/** 単語一覧のActions */
const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(RegistActions, dispatch),
});

/** Styles */
const styles: StyleRulesCallback = ({ spacing: { unit } }: Theme) => ({
  button: {
    textAlign: 'right',
    marginRight: unit * 2,
  },
  deleteButton: {
    marginRight: unit * 2,
  },
});

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
  words: string[];
}

/** Properties */
export interface Props
  extends StateFromProps,
    WithStyles<StyleRules>,
    RouteComponentProps<{}> {
  actions: RegistActions.Actions;
}
