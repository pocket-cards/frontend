import * as React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '@components/Loading';
import * as MyPageActions from '@actions/mypage';
import { State } from '@models';
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
const c000 = (state: State) => state.get('c000');

const C002: React.FunctionComponent<any> = () => {
  const { daily, weekly, monthly, isLoading } = useSelector(c000);
  const actions = bindActionCreators(MyPageActions, useDispatch());

  // Loading中
  if (isLoading) {
    return <Loading />;
  }

  const data = [
    { year: '2000', words: 6 },
    { year: '2010', words: 50 },
  ];

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

export default C002;
