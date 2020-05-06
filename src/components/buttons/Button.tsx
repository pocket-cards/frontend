import * as React from 'react';
import { Button as MButton, ButtonProps } from '@material-ui/core';

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
