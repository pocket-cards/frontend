import * as React from 'react';
import { RouteComponentProps, withRouter, Link } from 'react-router-dom';
import { WithStyles, StyleRules } from '@material-ui/core/styles';
import { withStyles, Button, Grid } from '@material-ui/core';
import { ROUTE_PATHS, ROUTE_PATH_INDEX } from '@constants/Paths';

/** 単語登録完了画面 */
class A003 extends React.Component<Props, any, any> {
  render() {
    return (
      <Grid
        container
        alignItems="center"
        justify="center"
        // className={classes.root}
      >
        <Button
          variant="contained"
          color="primary"
          // className={classes.button}
          component={(props: any) => (
            <Link to={ROUTE_PATHS[ROUTE_PATH_INDEX.RegistInit]} {...props} />
          )}
        >
          登録完了
        </Button>
      </Grid>
    );
  }
}

const styles: StyleRules = {};

export default withRouter(withStyles(styles)(A003));

/** Properties */
export interface Props
  extends WithStyles<StyleRules>,
    RouteComponentProps<{}> {}
