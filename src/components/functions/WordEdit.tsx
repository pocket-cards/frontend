import React, { FunctionComponent, useState, Fragment } from 'react';
import { ListItem, makeStyles, Theme, createStyles, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { TextField } from '@components/inputs';

const useStyles = makeStyles(({ palette, spacing }: Theme) =>
  createStyles({
    listItem: {
      paddingLeft: spacing(0.5),
      paddingRight: spacing(1),
    },
    itemIcon: { justifyContent: 'center' },
    itemTextRoot: {
      padding: '0px 16px 0px 8px',
      fontSize: '1.5rem',
    },
    action: {
      top: '0px',
      right: '0px',
      position: 'inherit',
      transform: 'none',
      display: 'flex',
      alignItems: 'center',
    },
    icon: { color: palette.secondary.light },
  })
);

const edit: FunctionComponent<WordEditProps> = ({ word, onDelete }) => {
  const classes = useStyles();
  const [isEdit, setEdit] = useState(false);

  const handleOnDelete = () => onDelete(word);

  const handleEdit = () => setEdit(true);

  return (
    <ListItem dense className={classes.listItem}>
      {isEdit && <TextField value={word} fullWidth />}
      {!isEdit && (
        <Fragment>
          <ListItemText
            primary={word}
            primaryTypographyProps={{
              variant: 'h5',
            }}
            className={classes.itemTextRoot}
          />
          <ListItemSecondaryAction className={classes.action}>
            <DeleteIcon fontSize="large" className={classes.icon} onClick={handleOnDelete} />
          </ListItemSecondaryAction>
        </Fragment>
      )}
    </ListItem>
  );
};

interface WordEditProps {
  word: string;
  onDelete: (word: string) => void;
  onEdit?: (word: string) => void;
}

export default edit;
