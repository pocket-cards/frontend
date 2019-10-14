import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, compose } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, ListItemSecondaryAction, Grid, Button, ListItemIcon, Divider } from '@material-ui/core';
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons';
import { IState } from '@models';
import * as RegistActions from '@actions/regist';
import Loading from '@components/Loading';

/** 単語登録リスト画面 */
class A002 extends React.Component<Props, any, any> {
  /** 単語登録 */
  handleRegist = () => {
    const { actions, words, history } = this.props;

    actions.registWords(words, history);
  };

  /** 単語削除 */
  handleRemove = (word: string) => {
    const { actions } = this.props;

    actions.removeWord(word);
  };

  /** クリア */
  componentWillUnmount() {
    this.props.actions.clear();
  }

  render() {
    const { words, isLoading, classes } = this.props;

    // 単語データなし
    if (!isLoading && words.length === 0) {
      // history.push(ROUTE_PATHS[ROUTE_PATH_INDEX.RegistInit]);
      console.log('Do no have any more words');
      return <div />;
    }

    return (
      <Grid container direction="column" wrap="nowrap" className={classes.container}>
        {(() => (isLoading ? <Loading /> : undefined))()}
        <Grid item xs={12} className={classes.root}>
          <List>
            {words.map(value => (
              <React.Fragment>
                <ListItem
                  key={value}
                  role={undefined}
                  dense
                  classes={{
                    secondaryAction: classes.secondaryAction,
                  }}
                >
                  <ListItemIcon classes={{ root: classes.itemIcon }}>
                    <EditIcon className={classes.icon} color="secondary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={value}
                    primaryTypographyProps={{
                      variant: 'h3',
                    }}
                    className={classes.itemTextRoot}
                  />
                  <ListItemSecondaryAction
                    classes={{
                      root: classes.action,
                    }}
                  >
                    <DeleteIcon
                      fontSize="large"
                      color="secondary"
                      className={classes.icon}
                      onClick={() => {
                        this.handleRemove(value);
                      }}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider key={`${value}1`} />
              </React.Fragment>
            ))}
          </List>
        </Grid>
        <Grid item xs={12} className={classes.bottom}>
          <Button variant="contained" color="primary" className={classes.button} onClick={this.handleRegist}>
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
  isLoading: state.get('A000').get('isLoading'),
});

/** 単語一覧のActions */
const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(RegistActions, dispatch),
});

/** Styles */
const styles = ({ palette: { primary }, spacing }: Theme) => ({
  container: {
    position: 'relative',
  },
  root: {
    paddingLeft: spacing(),
    paddingRight: spacing(2),
  },
  item: {
    height: spacing(6),
  },
  itemIcon: {
    marginRight: spacing(),
  },
  itemTextRoot: {
    padding: '0px 16px 0px 8px',
    fontSize: '1.5rem',
  },
  secondaryAction: {
    paddingRight: spacing(6),
  },
  action: {
    marginRight: spacing(1.5),
    marginTop: spacing(0.5),
  },
  bottom: {
    margin: spacing(2),
    textAlign: 'right',
    position: 'relative',
  },
  button: {
    width: spacing(15),
    position: 'absolute',
    bottom: '0px',
    right: '0px',
    '&:hover': {
      backgroundColor: primary.main,
    },
  },
  icon: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
});

export default compose(
  withRouter,
  withStyles(styles as any),
  connect<StateFromProps, void, void, IState>(
    mapStateToProps,
    mapDispatchToProps
  )
)(A002) as any;

/** State */
export interface StateFromProps {
  words: string[];
}

/** Properties */
export interface Props extends StateFromProps, RouteComponentProps, WithStyles {
  actions: RegistActions.Actions;
  isLoading: boolean;
}
