import Mock from 'mockjs';

export default {
  getMenu: config => {
    const {
      username,
      password
    } = JSON.parse(config.body)
    //先判断用户是否存在
    //判断账号和密码是否对应
    if (username === 'admin' && password === 'admin') {
      return {
        code: 20000,
        data: {
          menu: [{
              moduleName: '工作台',
              modulePath: 'Work',
              moduleicon: '',
              moduleChildren: [{
                  label: '代办事项',
                  icon: 'el-icon-s-tools',
                  path: '/Work/Todo',
                },
                {
                  label: '业绩管理',
                  icon: 'el-icon-s-tools',
                  children: [{
                    path: '/Work/WorkManage',
                    label: '业绩统计',
                    icon: 'el-icon-data-analysis',
                  }, ]
                },
              ]
            },
            {
              moduleName: '系统设置',
              modulePath: 'SysSet',
              moduleicon: '',
              moduleChildren: [{
                label: '用户管理',
                icon: 'el-icon-s-tools',
                children: [{
                  path: '/SysSet/UserManage',
                  label: '用户列表',
                  icon: '',
                }, {
                  path: '/SysSet/MenuSet',
                  label: '菜单设置',
                  icon: '',
                }, {
                  path: '/SysSet/Authority',
                  label: '权限设置',
                  icon: '',
                }, ]
              }, ]
            }
          ],
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else if (username === 'ljh001' && password === 'ljh001') {
      return {
        code: 20000,
        data: {
          menu: [{
              moduleName: '工作台',
              modulePath: 'Work',
              moduleicon: '',
              moduleChildren: [{
                label: '代办事项(李家豪专用)',
                icon: 'el-icon-s-tools',
                path: '/Work/Todo',
              }, {
                label: '业绩管理',
                icon: 'el-icon-s-tools',
                children: [{
                  path: '/Work/WorkManage',
                  label: '业绩统计',
                  icon: 'el-icon-data-analysis',
                }, ]
              }, ]
            },
            {
              moduleName: '系统设置',
              modulePath: 'SysSet',
              moduleicon: '',
              moduleChildren: [{
                label: '用户管理',
                icon: 'el-icon-s-tools',
                children: [{
                  path: '/SysSet/UserManage',
                  label: '用户列表',
                  icon: '',
                }, ]
              }, ]
            }
          ],
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else {
      return {
        code: -1,
        data: {
          message: '密码错误'
        }
      }
    }
  }
}