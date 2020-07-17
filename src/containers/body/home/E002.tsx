import * as React from 'react';
import { TextField, Box } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button } from '@components/buttons';
import { Actions } from '@actions/group';
import { State } from '@models';

const e000 = (state: State) => state.get('e000');
const app = (state: State) => state.get('app');

export default () => {
  const actions = bindActionCreators(Actions, useDispatch());
  const { groups, isLoading } = useSelector(e000);
  const { groupId } = useSelector(app);

  // 選択中のGroup情報取得
  const groupInfo = groups.find((item) => item.id === groupId);

  // 初期値設定
  const { handleSubmit, register } = useForm<GroupEditForm>({
    mode: 'onChange',
    defaultValues: {
      name: groupInfo?.name,
      description: groupInfo?.description,
    },
  });

  // 編集
  const onSubmit = handleSubmit((datas) => {
    console.log(datas);

    actions.edit({
      id: groupId,
      name: datas.name,
      description: datas.description,
    });
  });

  return (
    <form onSubmit={onSubmit}>
      <Box margin={2}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="name"
          label="Group Name"
          name="name"
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
          <Button size="large" fullWidth variant="contained" color="secondary" type="submit" isLoading={isLoading}>
            EDIT
          </Button>
        </Box>
      </Box>
    </form>
  );
};

interface GroupEditForm {
  name: string;
  description?: string;
}
