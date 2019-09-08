import * as React from 'react';
import { compose, Dispatch, bindActionCreators } from 'redux';
import { Auth } from 'aws-amplify';
import { withRouter, RouteComponentProps, Redirect } from 'react-router-dom';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Container, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import * as AppActions from '@actions/app';
import { connect } from 'react-redux';
import { IState } from '@models';
import { CognitoUser } from '@aws-amplify/auth';

class SignIn extends React.Component<Props, any, any> {
  handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const user = (await Auth.signIn({
        username: this.state.email,
        password: this.state.password,
      })) as CognitoUser;

      console.log(user);
      this.props.actions.loggedIn(user);
    } catch (err) {
      console.log(err);
      this.props.actions.logout();
    }
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    const { classes, isLoggedIn } = this.props;

    if (isLoggedIn) return <Redirect to={'/'} />;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={this.handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={this.handleChange}
            />
            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

const styles = ({ spacing, palette }: Theme): any => ({
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
});

/** Props */
const mapStateToProps = (state: IState) => ({
  isLoggedIn: state.get('App').get('user') !== undefined,
});
/** Actions */
const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(AppActions, dispatch),
});
export default compose(
  withRouter,
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(SignIn) as any;

export interface Props extends WithStyles, RouteComponentProps {
  actions: AppActions.Actions;
  isLoggedIn: boolean;
}
