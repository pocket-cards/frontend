export const ROUTE_PATH_INDEX = {
  RegistInit: 11,
  RegistList: 12,
  RegistFinish: 13,
  Study: 20,
};

export const ROUTE_PATHS = {
  Footer: {
    [ROUTE_PATH_INDEX.Study]: '/study',
  },
  Regist: {
    [ROUTE_PATH_INDEX.RegistInit]: '/regist',
    [ROUTE_PATH_INDEX.RegistList]: '/regist/list',
    [ROUTE_PATH_INDEX.RegistFinish]: '/regist/finish',
  },
};
