import * as React from 'react';
import { compose, Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { WithStyles, StyleRulesCallback, Theme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core';
import Loading from '@components/Loading';
import * as MyPageActions from '@actions/mypage';
import { IState } from '@models';
import { Animation, ValueScale } from '@devexpress/dx-react-chart';
import { ArgumentAxis, Chart, ValueAxis, BarSeries } from '@devexpress/dx-react-chart-material-ui';

/** 単語カメラ画面 */
class C002 extends React.Component<Props, any, any> {
  componentWillMount() {
    // this.props.actions.history();
  }

  render() {
    const { isLoading } = this.props;
    // Loading中
    if (isLoading) {
      return <Loading />;
    }

    const data = [{ year: '2000', words: 6 }, { year: '2010', words: 50 }];

    return (
      <Chart data={data} height={400}>
        <ArgumentAxis />
        <ValueAxis showLabels={false} />
        <ValueScale />
        <BarSeries valueField="words" argumentField="year" color="red" barWidth={0.2} />
        <Animation />
      </Chart>
    );
  }
}

const styles: StyleRulesCallback = ({ spacing: { unit } }: Theme) => ({
  root: {
    padding: `${unit * 2}px 0px`,
  },
  item: {
    padding: `${unit}px 0px`,
  },
  content: {
    padding: `${unit}px ${unit * 2}px`,
  },
  number: {
    fontSize: '2rem',
    textAlign: 'center',
  },
  card: {
    width: '170px',
    height: '120px',
    margin: unit,
  },
});

const mapStateToProps = (state: IState) => ({
  daily: state.get('C000').get('daily'),
  weekly: state.get('C000').get('weekly'),
  monthly: state.get('C000').get('monthly'),
  isLoading: state.get('C000').get('isLoading'),
});

/** Props */
const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(MyPageActions, dispatch),
});

export default compose(
  withRouter,
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(C002) as any;

/** Properties */
export interface Props extends WithStyles<StyleRulesCallback>, RouteComponentProps<{}> {
  actions: MyPageActions.Actions;
  daily?: number;
  weekly?: number;
  monthly?: number;
  isLoading: boolean;
}
