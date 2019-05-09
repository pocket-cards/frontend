import * as React from 'react';
import { Footer, Header, Main } from '@containers/com';
import { hot } from 'react-hot-loader/root';

class App extends React.Component {

  render() {
    return (
      <div>
        <Header />
        <Main />
        <Footer />
      </div>
    );
  }
}

// export default withRouter(App);
export default hot(App);
