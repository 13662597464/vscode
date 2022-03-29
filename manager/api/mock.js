import Mock from 'mockjs'
import homeApi from './mockServeData/home'
import permissionApi from './mockServeData/permission'

Mock.mock('/home/getData', homeApi);

Mock.mock('/permission/getMenu', permissionApi.getMenu);