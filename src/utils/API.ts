import { API } from '@aws-amplify/api';
import { Consts } from '@constants';

export const get = async (path: string, headers?: any, name: string = Consts.API_NAME) =>
  await API.get(name, path, {
    headers,
  });

export const put = async (path: string, body?: any, name: string = Consts.API_NAME) =>
  await API.put(name, path, {
    body,
  });

export const post = async (path: string, body?: any, name: string = Consts.API_NAME) =>
  await API.post(name, path, {
    body,
  });

export const del = async (path: string, body?: any, name: string = Consts.API_NAME) =>
  await API.del(name, path, {
    body,
  });
