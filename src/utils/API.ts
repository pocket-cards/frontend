import { API } from 'aws-amplify';
import { API_NAME } from '@constants/Consts';

export const get = async (path: string, headers?: any) =>
  await API.get(API_NAME, path, {
    headers,
  });

export const put = async (path: string, body?: any) =>
  await API.put(API_NAME, path, {
    body,
  });

export const post = async (path: string, body?: any) =>
  await API.post(API_NAME, path, {
    body,
  });
