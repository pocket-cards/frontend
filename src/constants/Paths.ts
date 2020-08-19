import { PathInfo } from 'typings/types';

export const ROUTE_PATH_INDEX = {
  Root: 0,
  SignIn: 1,
  Login: 2,
  Regist: 11,
  RegistList: 12,
  RegistFinish: 13,
  Study: 21,
  StudyRegist: 22,
  StudyCard: 23,
  StudyFinish: 24,
  StudyEdit: 25,
  MyPage: 31,
  Settings: 41,
  Groups: 61,
  GroupRegist: 62,
  GroupEdit: 63,
};

export const ROUTE_PATHS = {
  [ROUTE_PATH_INDEX.Root]: '/',
  [ROUTE_PATH_INDEX.SignIn]: '/signin',
  [ROUTE_PATH_INDEX.Login]: '/login',
  [ROUTE_PATH_INDEX.Regist]: '/regist',
  [ROUTE_PATH_INDEX.RegistList]: '/regist/list',
  [ROUTE_PATH_INDEX.RegistFinish]: '/regist/finish',
  [ROUTE_PATH_INDEX.MyPage]: '/mypage',
  [ROUTE_PATH_INDEX.Settings]: '/settings',
  [ROUTE_PATH_INDEX.Groups]: '/group',
  [ROUTE_PATH_INDEX.GroupRegist]: '/group/regist',
  [ROUTE_PATH_INDEX.GroupEdit]: '/group/edit',
  [ROUTE_PATH_INDEX.Study]: '/study',
  [ROUTE_PATH_INDEX.StudyRegist]: '/study/regist',
  [ROUTE_PATH_INDEX.StudyEdit]: '/study/edit/:word',
  [ROUTE_PATH_INDEX.StudyCard]: '/study/card',
  [ROUTE_PATH_INDEX.StudyFinish]: '/study/finish',
};

export const ROUTE_INFO: PathInfo = {
  [ROUTE_PATHS[ROUTE_PATH_INDEX.Root]]: {
    showBack: false,
    showFooter: true,
  },
  [ROUTE_PATHS[ROUTE_PATH_INDEX.SignIn]]: {
    showBack: false,
    showFooter: true,
  },
  [ROUTE_PATHS[ROUTE_PATH_INDEX.Regist]]: {
    showBack: false,
    showFooter: true,
    title: 'NEW WORDS REGIST',
  },
  [ROUTE_PATHS[ROUTE_PATH_INDEX.RegistList]]: {
    showBack: false,
    showFooter: true,
    title: 'NEW WORDS REGIST LIST',
  },
  [ROUTE_PATHS[ROUTE_PATH_INDEX.RegistFinish]]: {
    showBack: false,
    showFooter: true,
  },
  [ROUTE_PATHS[ROUTE_PATH_INDEX.Groups]]: {
    showBack: false,
    showFooter: true,
    title: 'HOME',
  },
  [ROUTE_PATHS[ROUTE_PATH_INDEX.Study]]: {
    showBack: true,
    showFooter: true,
  },
  [ROUTE_PATHS[ROUTE_PATH_INDEX.StudyCard]]: {
    showBack: true,
    showFooter: false,
    title: 'STUDY CARD',
  },
  [ROUTE_PATHS[ROUTE_PATH_INDEX.StudyEdit]]: {
    showBack: false,
    showFooter: true,
    title: 'WORD DETAIL',
  },
  [ROUTE_PATHS[ROUTE_PATH_INDEX.Settings]]: {
    showBack: false,
    showFooter: true,
    title: 'SETTINGS',
  },
  // [ROUTE_PATH_INDEX.Login]: '/login',
  // [ROUTE_PATH_INDEX.Regist]: '/regist',
  // [ROUTE_PATH_INDEX.RegistList]: '/regist/list',
  // [ROUTE_PATH_INDEX.RegistFinish]: '/regist/finish',
  // [ROUTE_PATH_INDEX.MyPage]: '/mypage',
  // [ROUTE_PATH_INDEX.Settings]: '/settings',
  // [ROUTE_PATH_INDEX.Groups]: '/group',
  // [ROUTE_PATH_INDEX.GroupRegist]: '/group/regist',
  // [ROUTE_PATH_INDEX.GroupEdit]: '/group/edit',
  // [ROUTE_PATH_INDEX.Study]: '/study',
  // [ROUTE_PATH_INDEX.StudyRegist]: '/study/regist',
  // [ROUTE_PATH_INDEX.StudyEdit]: '/study/edit/:word',
  // [ROUTE_PATH_INDEX.StudyCard]: '/study/card',
  // [ROUTE_PATH_INDEX.StudyFinish]: '/study/finish',
};
