import Cookie from "js-cookie";
export default {
  state: {
    isCollapse: false,
    tabsList: [{
      path: '/',
      label: '首页',
      icon: 'home'
    }],
    allMenu: [],
    curMenu: null,
    curMenuPath: null,
    curModuleChildMenu: []
  },
  mutations: {
    initCurModuleChildMenu(state, val) {
      state.curModuleChildMenu = val;
    },
    setAllMenu(state, val) {
      state.allMenu = val;
      Cookie.set('menu', JSON.stringify(val));
    },
    clearAllMenu(state) {
      state.allMenu = [];
      Cookie.remove('menu');
    },
    addMenu(state, router) {
      if (!Cookie.get('menu')) {
        return;
      }
      const menu = JSON.parse(Cookie.get('menu'));
      state.allMenu = menu;
      const menuArray = [];
      menu.forEach(item => {
        item.moduleChildren.forEach(moduleChild => {
          if (moduleChild.children) {
            moduleChild.children = moduleChild.children.map(item => {
              item.component = () => import(`../../views${item.path}`);
              return item;
            });
            menuArray.push(...moduleChild.children);
          } else {
            moduleChild.component = () => import(`../../views${moduleChild.path}`);
            menuArray.push(moduleChild);
          }
        });
      });
      //路由的动态添加
      menuArray.forEach(item => {
        router.addRoute('Main', item);
      });
    },
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse;
    },
    selectMenu: function(state, val) {
      if (val.path !== '/') {
        state.curMenu = val;
        const result = state.tabsList.findIndex(item => item.path === val.path);
        if (result === -1) {
          state.tabsList.push(val);
        }
      } else {
        state.curMenu = null;
      }
    },
    setCurMenuPath(state, val) {
      state.curMenuPath = val;
    },
    closeTag(state, val) {
      const result = state.tabsList.findIndex(item => item.path === val.path);
      state.tabsList.splice(result, 1);
    },
    clearTag(state) {
      state.tabsList = [{
        path: '/',
        label: '首页',
        icon: 'home'
      }];
    }
  }
}