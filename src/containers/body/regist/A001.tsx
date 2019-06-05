import * as React from 'react';
import { compose, Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { WithStyles, StyleRules } from '@material-ui/core/styles';
import { withStyles, Grid, Fab } from '@material-ui/core';
import * as RegistActions from '@actions/regist';
import WebCamera from '@components/WebCamera';
import Button from '@components/buttons/Button';

/** 単語カメラ画面 */
class A001 extends React.Component<Props, any, any> {
  state = {
    onAir: false,
  };

  startCamera = (): void => this.setState({ onAir: true });
  afterStopCamera = (): void => this.setState({ onAir: false });

  render() {
    const { classes } = this.props;
    const { onAir } = this.state;

    console.log(this.state);

    const isShow = !onAir;
    const justify = onAir ? 'flex-start' : 'center';

    return (
      <Grid
        container
        alignItems="center"
        justify={justify}
        direction="column"
        // className={classes.root}
      >
        {(() => {
          if (!isShow) return <div />;

          return (
            <Button variant="contained" color="primary" onClick={this.startCamera}>
              カメラ開始
            </Button>
          );
        })()}
        <WebCamera
          onAir={onAir}
          takePhoto={(dataUri: string) => {
            console.log(dataUri);
          }}
          afterStopCamera={this.afterStopCamera}
        />
      </Grid>
    );
  }
}

const styles: StyleRules = {};

/** Props */
const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(RegistActions, dispatch),
});

export default compose(
  withRouter,
  withStyles(styles),
  connect(
    null,
    mapDispatchToProps,
  ),
)(A001) as any;

/** Properties */
export interface Props extends WithStyles<StyleRules>, RouteComponentProps<{}> {
  actions: RegistActions.Actions;
}
