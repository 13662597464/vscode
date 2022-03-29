import axios from './axios';

export const getMenu = (param) => {
  return axios.request({
    url: '/permission/getMenu',
    method: 'POST',
    data: param
  });
}