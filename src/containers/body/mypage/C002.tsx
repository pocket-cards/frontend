import * as React from 'react';
import { compose, Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Loading from '@components/Loading';
import * as MyPageActions from '@actions/mypage';
import { IState } from '@models';
import { Animation, ValueScale } from '@devexpress/dx-react-chart';
import { ArgumentAxis, Chart, ValueAxis, BarSeries } from '@devexpress/dx-react-chart-material-ui';

// const useStyles = makeStyles(({ spacing }: Theme) =>
//   createStyles({
//     root: {
//       padding: `${spacing(2)}px 0px`,
//     },
//     item: {
//       padding: `${spacing()}px 0px`,
//     },
//     content: {
//       padding: `${spacing()}px ${spacing(2)}px`,
//     },
//     number: {
//       fontSize: '2rem',
//       textAlign: 'center',
//     },
//     card: {
//       width: '170px',
//       height: '120px',
//       margin: spacing(),
//     },
//   }),
// );
/** 単語カメラ画面 */

const C002 = function (props: Props) {
  const { isLoading } = props;
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
};

const mapStateToProps = (state: IState) => ({
  daily: state.get('C000').get('daily'),
  weekly: state.get('C000').get('weekly'),
  mly: state.get('C000').get('monthly'),
  isLoading: state.get('C000').get('isLoading'),
});

/** Props */
const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(MyPageActions, dispatch),
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(C002) as any;

/** Properties */
export interface Props extends RouteComponentProps<{}> {
  actions: MyPageActions.Actions;
  daily?: number;
  weekly?: number;
  monthly?: number;
  isLoading: boolean;
}
