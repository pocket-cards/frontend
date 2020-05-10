import * as React from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { makeStyles, Theme, createStyles, TextField, Box } from '@material-ui/core';
import Button from '@components/buttons/Button';
import { Actions } from '@actions/group';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const useStyles = makeStyles(({ spacing }: Theme) =>
  createStyles({
    root: {
      padding: '0px 16px',
    },
    button: {
      paddingTop: spacing(4),
    },
  })
);

const schema = yup.object().shape<GroupRegistForm>({
  name: yup.string().required(),
});

export default () => {
  // const classes = useStyles();
  const actions = bindActionCreators(Actions, useDispatch());
  const { handleSubmit, register } = useForm<GroupRegistForm>({
    mode: 'onChange',
    validationSchema: schema,
  });

  const onSubmit = handleSubmit((datas) => {
    actions.regist(datas.name, datas.description);
  });

  return (
    <form onSubmit={onSubmit}>
      <Box margin={2}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="name"
          label="Group Name"
          name="name"
          autoFocus
          inputRef={register}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="description"
          label="Group Description"
          name="description"
          inputRef={register}
        />
        <Box mt={2}>
          <Button size="large" fullWidth variant="contained" color="secondary" type="submit">
            REGIST
          </Button>
        </Box>
      </Box>
    </form>
  );
};

interface GroupRegistForm {
  name: string;
  description?: string;
}
