import * as React from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { makeStyles, Theme, createStyles, Box, Typography, Card, CardContent } from '@material-ui/core';
import { State } from '@models';
import { Actions } from '@actions/word';
import { Button } from '@components/buttons';

const useStyles = makeStyles(({ spacing, palette }: Theme) =>
  createStyles({
    container: {
      height: '100%',
      position: 'relative',
    },
    root: { margin: spacing(2), textAlign: 'center' },
  })
);

interface B003Params {
  word: string;
}

const app = (state: State) => state.get('app');
const e000 = (state: State) => state.get('e000');

export default () => {
  const classes = useStyles();
  const { word } = useParams<B003Params>();
  const { groupId } = useSelector(app);
  const { isLoading, wordDetail } = useSelector(e000);

  const actions = bindActionCreators(Actions, useDispatch());

  const handleOnDelete = () => {
    actions.del(groupId, word);
  };

  return (
    <Box>
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h4" component="h2">
            {wordDetail?.id}
          </Typography>
          <Typography variant="h5" color="textSecondary">
            /{wordDetail?.pronounce}/
          </Typography>

          <Typography variant="h5" component="p">
            <br />
            {wordDetail?.vocChn}
            <br />
            {wordDetail?.vocJpn}
          </Typography>
        </CardContent>
      </Card>
      <Box margin={2} display="flex" justifyContent="center">
        <Button
          size="large"
          fullWidth
          variant="contained"
          color="secondary"
          type="button"
          isLoading={isLoading}
          onClick={handleOnDelete}>
          DELETE
        </Button>
        <Button
          size="large"
          fullWidth
          variant="contained"
          color="primary"
          type="button"
          isLoading={isLoading}
          onClick={handleOnDelete}>
          UPDATE
        </Button>
      </Box>
    </Box>
  );
};
