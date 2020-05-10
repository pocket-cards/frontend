import React, { FunctionComponent, useState, Fragment } from 'react';
import {
  ListItem,
  ListItemIcon,
  makeStyles,
  Theme,
  createStyles,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { TextField } from '@components/inputs';

const useStyles = makeStyles(({ palette: { primary }, spacing }: Theme) =>
  createStyles({
    secondaryAction: {
      paddingRight: spacing(6),
    },
    itemIcon: {
      justifyContent: 'center',
    },
    itemTextRoot: {
      padding: '0px 16px 0px 8px',
      fontSize: '1.5rem',
    },
    action: {
      marginRight: spacing(3),
    },
  })
);

const edit: FunctionComponent<WordEditProps> = ({ word, onDelete }) => {
  const classes = useStyles();
  const [isEdit, setEdit] = useState(false);

  const handleOnDelete = () => onDelete(word);

  const handleEdit = () => setEdit(true);

  return (
    <ListItem
      role={undefined}
      dense
      classes={{
        secondaryAction: classes.secondaryAction,
      }}>
      {isEdit && <TextField value={word} fullWidth />}
      {!isEdit && (
        <Fragment>
          {/* <ListItemIcon classes={{ root: classes.itemIcon }} onClick={handleEdit}>
            <EditIcon color="secondary" fontSize="large" />
          </ListItemIcon> */}
          <ListItemText
            primary={word}
            primaryTypographyProps={{
              variant: 'h4',
            }}
            className={classes.itemTextRoot}
          />
          <ListItemSecondaryAction className={classes.action}>
            <DeleteIcon fontSize="large" color="secondary" onClick={handleOnDelete} />
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
