import * as React from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import useReactRouter from 'use-react-router';
import {
  makeStyles,
  Theme,
  createStyles,
  Fab,
  Grid,
  IconButton,
  Card,
  CardHeader,
  CardContent,
  Typography,
  TextField,
} from '@material-ui/core';
import ReplayIcon from '@material-ui/icons/Replay';
import EditIcon from '@material-ui/icons/Edit';
import ArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import DoneIcon from '@material-ui/icons/Done';
import * as StudyActions from '@actions/study';
import * as AppActions from '@actions/app';
import { State, WordInfo } from '@models';
import { MODES } from '@constants/Consts';
import Loading from '@components/Loading';
import { ROUTE_PATHS, ROUTE_PATH_INDEX } from '@constants/Paths';

const useStyles = makeStyles(({ spacing, palette }: Theme) =>
  createStyles({
    container: {
      height: '100%',
      position: 'relative',
    },
    loading: {
      height: 'calc(100vh - 64px)',
      marginTop: '64px',
    },
    header: { padding: `${spacing()}px ${spacing(2)}px` },
    content: { textAlign: 'center' },
    top: {
      width: '100%',
      height: '380px',
      padding: spacing(),
      paddingTop: spacing(2),
    },
    menubar: {
      height: spacing(8),
      padding: `0px ${spacing(2)}px`,
      backgroundColor: palette.primary.main,
    },
    iconButton: {
      padding: spacing(0.5),
      '&:hover': {
        cursor: 'pointer',
      },
    },
    icon: {
      fontSize: spacing(5),
      color: 'white',
    },
    bottom: {
      marginBottom: spacing(2),
      flexGrow: 1,
    },
    button: {
      width: spacing(12),
      height: spacing(12),
      margin: `0px ${spacing(3)}px`,
    },
    card: {
      width: '90%',
      height: '100%',
      borderRadius: 4,
    },
    paper: {
      boxShadow: 'none',
      backgroundColor: 'transparent',
    },
  })
);

const getB000 = (state: State) => state.get('B000');

const audioRef = React.createRef<HTMLAudioElement>();
const zhRef = React.createRef<HTMLInputElement>();
const jaRef = React.createRef<HTMLInputElement>();

export default () => {
  const classes = useStyles();
  const actions = bindActionCreators(StudyActions, useDispatch());
  const appActions = bindActionCreators(AppActions, useDispatch());
  const { current: word, mode, isLoading } = useSelector(getB000);
  const [showText, setShowText] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const { history } = useReactRouter();

  const handleTouchStart = () => setShowText(true);

  /** 新規単語学習 */
  const handleNext = () => {
    actions.startReview(history);
  };

  const handleAnswer = (word: string, yes: boolean) => {
    actions.answer(word, yes);
    setShowText(false);

    setTimeout(() => play(), 100);
  };

  const handleBack = () => {
    // ヘッダ、フット表示する
    appActions.showHeader(true);
    appActions.showFooter(true);
    // 画面遷移
    history.push(ROUTE_PATHS[ROUTE_PATH_INDEX.StudyInit]);
  };

  const getButtons = (mode?: string, word?: WordInfo) => {
    const buttons = [];

    // 単語あり
    if (word) {
      buttons.push(
        <Fab
          key={2}
          className={classes.button}
          size="large"
          color="primary"
          disableFocusRipple
          disableTouchRipple
          disableRipple
          onTouchStart={handleTouchStart}
          onClick={() => {
            handleAnswer(word.word, true);
          }}>
          知ってる
        </Fab>
      );
      buttons.push(
        <Fab
          key={1}
          className={classes.button}
          size="large"
          color="secondary"
          disableFocusRipple
          disableTouchRipple
          disableRipple
          onTouchStart={handleTouchStart}
          onClick={() => {
            handleAnswer(word.word, false);
          }}>
          知らない
        </Fab>
      );
      return buttons;
    }

    // 単語なし
    if (mode === MODES.Review) {
      console.log(handleNext);
      buttons.push(
        <Fab
          key={3}
          className={classes.button}
          size="large"
          color="secondary"
          disableFocusRipple
          disableTouchRipple
          disableRipple
          onClick={handleNext}>
          Retry
        </Fab>
      );
    }

    return buttons;
  };

  /** 音声再生 */
  const play = () => {
    const audio = audioRef.current;

    audio && audio.play();
  };

  const handleSetEdit = () => {
    try {
      if (!word || !zhRef.current || !jaRef.current) {
        return;
      }

      const isChanged = zhRef.current.value !== word.vocChn || jaRef.current.value !== word.vocJpn;

      if (isChanged) {
        console.log('do some actions');
      }
    } finally {
      setEdit(!edit);
    }
  };

  return (
    <Grid container direction="column" className={classes.container}>
      <Grid container justify="flex-end" alignItems="center" className={classes.menubar}>
        <Grid item xs>
          <IconButton className={classes.iconButton} onClick={handleBack} disableRipple disableTouchRipple>
            <ArrowLeftIcon className={classes.icon} />
          </IconButton>
        </Grid>
        <Grid item xs={2}>
          <IconButton className={classes.iconButton} onClick={play} disableRipple disableTouchRipple>
            <ReplayIcon className={classes.icon} />
          </IconButton>
        </Grid>
      </Grid>
      {(() => {
        // Loading中
        if (isLoading) {
          return <Loading className={classes.loading} />;
        }

        if (!word) {
          return (
            <Grid container justify="center" alignItems="center" className={classes.bottom}>
              <Grid item>{getButtons(mode, word)}</Grid>
            </Grid>
          );
        }

        return (
          <React.Fragment>
            <Grid container alignItems="center" justify="center" className={classes.top}>
              <Card className={classes.card}>
                <audio ref={audioRef} src={`/${word.mp3}`} />
                <CardHeader
                  className={classes.header}
                  action={
                    <IconButton aria-label="Settings" onClick={handleSetEdit}>
                      {(() => {
                        return edit ? <DoneIcon color="secondary" /> : <EditIcon color="secondary" />;
                      })()}
                    </IconButton>
                  }
                />
                <CardContent className={classes.content}>
                  <Typography variant="h4" gutterBottom align="center">
                    {word.word}
                  </Typography>
                  <Typography className={classes.content} variant="h6" align="center">
                    {word.pronounce ? `[${word.pronounce}]` : undefined}
                  </Typography>
                  {(() => {
                    return edit ? (
                      <TextField
                        inputRef={zhRef}
                        label="中国語"
                        className={classes.content}
                        value={word.vocChn}
                        margin="normal"
                        variant="outlined"
                      />
                    ) : (
                      <Typography component="p" variant="h6" align="center" style={{ display: showText ? '' : 'none' }}>
                        {word.vocChn}
                      </Typography>
                    );
                  })()}
                  {(() => {
                    return edit ? (
                      <TextField
                        inputRef={jaRef}
                        label="日本語"
                        className={classes.content}
                        value={word.vocJpn}
                        margin="normal"
                        variant="outlined"
                      />
                    ) : (
                      <Typography component="p" variant="h6" align="center" style={{ display: showText ? '' : 'none' }}>
                        {word.vocJpn}
                      </Typography>
                    );
                  })()}
                </CardContent>
              </Card>
            </Grid>
            <Grid container justify="center" alignItems="center" className={classes.bottom}>
              <Grid item>{getButtons(mode, word)}</Grid>
            </Grid>
          </React.Fragment>
        );
      })()}
    </Grid>
  );
};
