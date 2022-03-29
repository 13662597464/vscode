<template>
  <el-container>
    <el-aside width="auto">
      <com-aside></com-aside>
    </el-aside>
    <el-container>
      <el-header>
        <el-menu :default-active="activeIndex"
                 class="el-menu-demo"
                 mode="horizontal"
                 @select="handleSelect"
                 background-color="#545c64"
                 text-color="#fff"
                 active-text-color="#ffd04b">
          <el-menu-item @click="handleMenu">
            <i class="el-icon-s-fold"></i>
          </el-menu-item>
          <el-menu-item v-for="item in headerModule"
                        :key="item.modulePath"
                        :index="item.modulePath"
                        @click="moduleMenu(item)">{{item.moduleName}}</el-menu-item>
          <div class="header-dropdown">
            <el-dropdown>
              <el-avatar size="medium"
                         src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人信息</el-dropdown-item>
                <el-dropdown-item @click.native="loginOut">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-menu>
      </el-header>
      <el-main>
        <com-tag></com-tag>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// import { listMenu } from "../views/Menu.js";
import ComAside from "../src/components/ComAside";
import ComTag from "../src/components/ComTag";
import { mapState,mapMutations } from 'vuex';
export default {
  data () {
    return {
      activeIndex: "/",
      headerModule: [],
    };
  },
  // 检测路由变化
  watch: {
    $route () {
      this.setCurrentRoute();
    }
  },
  created () {
    this.setCurMenu();
    this.setCurrentRoute();
  },
  computed: {
    ...mapState({
      allMenu: (state) => {
        return state.tab.allMenu
      },
    })
  },
  components: { ComAside,ComTag },
  methods: {
    ...mapMutations({
      initCurModuleChildMenu: 'initCurModuleChildMenu',
      setCurMenuPath: 'setCurMenuPath',
    }),
    setCurMenu () {
      this.headerModule=this.allMenu;
    },
    setCurrentRoute () {
      //拿到当前的地址
      var curPath=this.$route.path;
      //获取模块名
      var moduleName=this.getLasturl(curPath);
      //如果是首页,默认选中第一个模块
      if(moduleName==='/') {
        this.activeIndex=this.headerModule[0].modulePath;
      } else {
        this.activeIndex=moduleName;// 通过他就可以监听到当前路由状态并激活当前菜单
      }
    },
    handleSelect (key,keyPath) {
      // console.log(key,keyPath);
    },
    moduleMenu (item) {
      var that=this;
      if(item.modulePath!=="") {
        this.headerModule.filter(function(Modules) {
          if(Modules.modulePath==item.modulePath) {
            that.initCurModuleChildMenu(Modules.moduleChildren);
            that.setCurMenuPath(item.modulePath);
          }
        });
      }
    },
    //获取第一个反斜杠后的内容
    getLasturl (value) {
      if(value!==null||value!=="") {
        if(value.indexOf("/">-1)) {
          var index=value.indexOf("/");
          var lastIndex=value.lastIndexOf("/");
          return value.substring(index+1,lastIndex);
        }
      }
      return null;
    },
    handleMenu () {
      this.$store.commit('collapseMenu');
    },
    loginOut () {
      this.$store.commit('clearAllMenu');
      this.$store.commit('clearToken');
      this.$router.push({ name: 'login' });
    }
  },
};
</script>

<style lang="less" scoped>
.el-header {
  padding: 0;
}
.el-container {
  height: 100%;
}
.el-main {
  padding: 0;
}
.router-link-active {
  text-decoration: none;
}

.header-dropdown {
  height: 60px;
  display: flex;
  align-items: center;
  float: right;
  margin-right: 50px;
}
</style>