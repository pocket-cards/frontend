import * as React from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { makeStyles, Theme, createStyles, Box, Typography } from '@material-ui/core';
import { State } from '@models';
import { Actions } from '@actions/word';
import { Button } from '@components/buttons';

const useStyles = makeStyles(({ spacing, palette }: Theme) =>
  createStyles({
    container: {
      height: '100%',
      position: 'relative',
    },
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
  const { isLoading } = useSelector(e000);

  const actions = bindActionCreators(Actions, useDispatch());

  // const dispatch = useDispatch();
  // const actions = bindActionCreators(StudyActions, dispatch);
  // const appActions = bindActionCreators(Actions, dispatch);
  // const { current: word, mode, isLoading } = useSelector(getB000);
  // const [showText, setShowText] = React.useState(false);
  // const [edit, setEdit] = React.useState(false);
  const handleOnDelete = () => {
    actions.del(groupId, word);
  };

  return (
    <Box>
      <Typography>{word}</Typography>
      <Button
        size="large"
        fullWidth
        variant="contained"
        color="primary"
        type="submit"
        isLoading={isLoading}
        onClick={handleOnDelete}>
        DELETE
      </Button>
    </Box>
  );
};
