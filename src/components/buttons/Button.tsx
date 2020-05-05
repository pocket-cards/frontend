import * as React from 'react';
import MButton, { ButtonProps } from '@material-ui/core/Button';

class Button extends React.Component<ButtonProps, any, any> {
  render() {
    const { children } = this.props;

    return (
      <MButton disableFocusRipple disableTouchRipple disableRipple {...this.props}>
        {children}
      </MButton>
    );
  }
}

export default Button;
