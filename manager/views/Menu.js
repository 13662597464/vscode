let listMenu = [{
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
        },
        {
          path: '',
          label: '权限设置',
          icon: '',
        }
      ]
    }, ]
  }
];

export {
  listMenu,
}