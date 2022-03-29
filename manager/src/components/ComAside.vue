<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    background-color="#515c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <h3>{{ isCollapse ? '后台' : '通用管理系统' }}</h3>
    <div v-for="(item, index) in curModuleChildMenu" :key="index">
      <el-submenu :index="index + ''" v-if="item.children">
        <template slot="title">
          <i :class="item.icon"></i>
          <span slot="title">{{ item.label }}</span>
        </template>
        <el-menu-item-group
          v-for="subMenu in item.children"
          :key="subMenu.path"
        >
          <el-menu-item @click="toMenu(subMenu)" :index="subMenu.path">{{
            subMenu.label
          }}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item
        v-else
        :index="item.path"
        :key="item.path"
        @click="toMenu(item)"
      >
        <i :class="item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </el-menu-item>
    </div>
  </el-menu>
</template>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  height: 100%;
  border: none;
  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
  }
}

/*隐藏文字*/
.el-menu--collapse .el-submenu__title span {
  display: none;
}
/*隐藏 > */
.el-menu--collapse .el-submenu__title .el-submenu__icon-arrow {
  display: none;
}
</style>

<script>
// import { listMenu } from "../../views/Menu";
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      activeIndex: '/'
    }
  },
  // 检测路由变化
  watch: {
    $route() {
      this.setCurrentRoute()
      if (this.curMenuPath) {
        this.setModuleChildMenu(this.curMenuPath)
      }
    }
  },
  created() {
    this.setCurrentRoute()
    var curModuleName = this.getLasturl(this.$route.path)
    var curModuleIndex = this.allMenu.findIndex(
      item => item.modulePath === curModuleName
    )
    if (curModuleIndex === -1) {
      curModuleIndex = 0
    }
    this.initCurModuleChildMenu(this.allMenu[curModuleIndex].moduleChildren)
  },
  methods: {
    ...mapMutations({
      initCurModuleChildMenu: 'initCurModuleChildMenu'
    }),
    setModuleChildMenu(curMenuPath) {
      //获取模块名
      var moduleName = this.getLasturl(curMenuPath)
      if (moduleName === '/') {
        this.initCurModuleChildMenu(this.allMenu[0].moduleChildren)
      } else {
        var curModuleIndex = this.allMenu.findIndex(
          item => item.modulePath === moduleName
        )
        if (curModuleIndex !== -1) {
          this.initCurModuleChildMenu(
            this.allMenu[curModuleIndex].moduleChildren
          )
        }
      }
    },
    setCurrentRoute() {
      this.activeIndex = this.$route.path // 通过他就可以监听到当前路由状态并激活当前菜单
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    toMenu(item) {
      this.$router.push({ path: item.path })
      this.$store.commit('selectMenu', item)
    },
    //获取第一个反斜杠后的内容
    getLasturl(value) {
      if (value !== null || value !== '') {
        if (value.indexOf('/' > -1)) {
          var index = value.indexOf('/')
          var lastIndex = value.lastIndexOf('/')
          return value.substring(index + 1, lastIndex)
        }
      }
      return null
    }
  },
  computed: {
    isCollapse() {
      return this.$store.state.tab.isCollapse
    },
    ...mapState({
      curMenuPath: state => {
        return state.tab.curMenuPath
      },
      allMenu: state => {
        return state.tab.allMenu
      },
      curModuleChildMenu: state => {
        return state.tab.curModuleChildMenu
      }
    })
  }
}
</script>
