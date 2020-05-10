import React, { FunctionComponent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { List, Divider, Theme, Box, makeStyles, createStyles } from '@material-ui/core';
import { State } from '@models';
import { Actions } from '@actions/regist';
import { Button } from '@components/buttons';
import { WordEdit } from '@components/functions';

const useStyles = makeStyles(({ palette: { primary }, spacing }: Theme) =>
  createStyles({
    root: {
      margin: spacing(1),
      padding: spacing(0),
    },
    item: {
      height: spacing(6),
    },
    bottom: {
      margin: spacing(2),
      textAlign: 'right',
      position: 'relative',
    },
    button: {
      width: spacing(15),
    },
  })
);

const a000 = (state: State) => state.get('a000');

const a002: FunctionComponent<any> = () => {
  const classes = useStyles();
  const { isLoading, words } = useSelector(a000);
  const actions = bindActionCreators(Actions, useDispatch());

  /** 単語登録 */
  const handleRegist = () => {
    actions.registWords(words);
  };

  /** 単語削除 */
  const handleRemove = (word: string) => {
    actions.removeWord(word);
  };

  // 単語データなし
  if (!isLoading && words.length === 0) {
    console.log('Do no have any more words');
    return <div />;
  }

  return (
    <Box margin={2}>
      <List className={classes.root}>
        {words.map((value, idx) => (
          <React.Fragment key={idx}>
            <WordEdit key={idx} word={value} onDelete={handleRemove} />
            <Divider key={`${value}1`} />
          </React.Fragment>
        ))}
      </List>
      <Box padding={2} display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={handleRegist}
          size="large"
          isLoading={isLoading}>
          登録
        </Button>
      </Box>
    </Box>
  );
};

export default a002;
