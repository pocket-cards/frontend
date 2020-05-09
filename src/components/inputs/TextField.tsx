import { Theme, TextField, withStyles } from '@material-ui/core';

export default withStyles(({ palette }: Theme) => ({
  root: {
    '& label.Mui-focused': {
      color: palette.secondary.main,
    },
    '&:hover': {
      borderColor: 'blue',
    },
    '& input:valid + fieldset': {
      borderColor: palette.secondary.main,
    },
    '& input:valid:hover + fieldset': {
      borderLeftWidth: '6px !important',
      borderWidth: '2px',
      borderColor: palette.secondary.main,
    },
    '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
      borderColor: 'red',
      borderWidth: '2px',
      borderLeftWidth: 6,
    },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: palette.secondary.main,
      borderWidth: '2px',
    },
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: palette.secondary.main,
    },
  },
}))(TextField);
