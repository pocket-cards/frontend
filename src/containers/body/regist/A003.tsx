import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Button } from '@material-ui/core';
import { Paths } from '@constants';

const a003: FunctionComponent = () => {
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
        component={(props: any) => <Link to={Paths.ROUTE_PATHS[Paths.ROUTE_PATH_INDEX.Regist]} {...props} />}>
        登録完了
      </Button>
    </Grid>
  );
};

export default a003;
