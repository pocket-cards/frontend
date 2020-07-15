import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Hub } from '@aws-amplify/core';
import { Auth, CognitoUser, CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {
  Container,
  CssBaseline,
  Avatar,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  Theme,
  makeStyles,
  createStyles,
} from '@material-ui/core';
import { Actions } from '@actions/app';
import { State } from '@models';

const useStyles = makeStyles(({ palette, spacing }: Theme) =>
  createStyles({
    '@global': {
      body: {
        backgroundColor: palette.common.white,
      },
    },
    paper: {
      marginTop: spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: spacing(1),
      backgroundColor: palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: spacing(1),
    },
    submit: {
      margin: spacing(3, 0, 2),
    },
    button: {
      padding: spacing(0),
    },
  })
);

const app = (state: State) => state.get('app');

const SignIn = () => {
  const classes = useStyles();
  const actions = bindActionCreators(Actions, useDispatch());
  const { user } = useSelector(app);
  const [values, setValues] = useState({
    username: '',
    passwd: '',
  });

  const handleAuth = ({ payload }: any) => {
    switch (payload.event) {
      case 'signIn':
        break;
      case 'signOut':
        actions.logout();
      default:
    }
  };

  useEffect(() => {
    Auth.currentAuthenticatedUser().then(console.log).catch(console.error);

    Hub.listen('auth', handleAuth);

    return () => Hub.remove('auth', handleAuth);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const user = (await Auth.signIn({
        username: values.username,
        password: values.passwd,
      })) as CognitoUser;

      actions.loggedIn(user);
    } catch (err) {
      console.log(err);

      actions.logout;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in to PocketCards
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Email Address"
            name="username"
            autoComplete="email"
            autoFocus
            value={values.username}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="passwd"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={values.passwd}
            onChange={handleChange}
          />
          <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
          <Button type="submit" size="large" fullWidth variant="contained" color="primary" className={classes.submit}>
            Sign In
          </Button>
          <Button
            type="button"
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            onClick={() => Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google })}>
            <img src="./img/btn_google_signin_dark_normal_web.png" />
          </Button>
          <Grid container>
            <Grid item xs></Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SignIn;
