export const ROUTE_PATH_INDEX = {
  SignIn: 1,
  RegistInit: 11,
  RegistList: 12,
  RegistFinish: 13,
  StudyInit: 21,
  StudyCard: 22,
  StudyFinish: 23,
  MyPage: 31,
  Settings: 41,
  GroupList: 51,
  GroupNew: 52,
  GroupEdit: 53,
};

export const ROUTE_PATHS = {
  [ROUTE_PATH_INDEX.SignIn]: '/login',
  [ROUTE_PATH_INDEX.RegistInit]: '/regist',
  [ROUTE_PATH_INDEX.RegistList]: '/regist/list',
  [ROUTE_PATH_INDEX.RegistFinish]: '/regist/finish',
  [ROUTE_PATH_INDEX.StudyInit]: '/home',
  [ROUTE_PATH_INDEX.StudyCard]: '/home/card',
  [ROUTE_PATH_INDEX.StudyFinish]: '/home/finish',
  [ROUTE_PATH_INDEX.MyPage]: '/mypage',
  [ROUTE_PATH_INDEX.Settings]: '/settings',
  [ROUTE_PATH_INDEX.GroupList]: '/group',
  [ROUTE_PATH_INDEX.GroupNew]: '/group/add',
  [ROUTE_PATH_INDEX.GroupEdit]: '/group/edit',
};
