<template>
  <div class="tabs">
    <el-tag
      v-for="(item, index) in tags"
      :key="item.path"
      :closable="item.path !== '/'"
      :effect="$route.path === item.path ? 'dark' : 'plain'"
      @click="changeMenu(item)"
      @close="handleClose(item, index)"
    >
      {{ item.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Comtag',

  data() {
    return {}
  },

  mounted() {},

  methods: {
    ...mapMutations({
      close: 'closeTag',
      setCurMenuPath: 'setCurMenuPath'
    }),
    changeMenu(item) {
      this.$router.push(
        { path: item.path },
        onComplete => {},
        onAbort => {}
      )
      this.setCurMenuPath(item.path)
    },
    handleClose(tag, index) {
      const length = this.tags.length - 1
      this.close(tag)
      if (tag.path !== this.$route.path) {
        return
      }
      if (index === length) {
        this.$router.push({
          path: this.tags[index - 1].path
        })
        this.setCurMenuPath(this.tags[index - 1].path)
      } else {
        this.$router.push({
          path: this.tags[index].path
        })
        this.setCurMenuPath(this.tags[index].path)
      }
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
    },
    initTag() {
      var curPath = this.$route.path
      if (curPath !== '/') {
        var curModuleName = this.getLasturl(this.$route.path)
        var curModuleIndex = this.allMenu.findIndex(
          item => item.modulePath === curModuleName
        )
        if (curModuleIndex !== -1) {
          this.allMenu[curModuleIndex].moduleChildren
          var curModule = this.allMenu[curModuleIndex].moduleChildren
          var curModuleChildIndex = curModule.findIndex(
            item => item.path === curPath
          )
          if (curModuleChildIndex !== -1) {
            this.$store.commit('selectMenu', curModule[curModuleChildIndex])
          } else {
            curModule.filter(item => {
              if (item.children) {
                var childrenMenu = item.children
                childrenMenu.filter(cItem => {
                  if (cItem.path === curPath) {
                    this.$store.commit('selectMenu', cItem)
                  }
                })
              }
            })
          }
        }
      }
    }
  },
  created() {
    this.initTag()
  },
  computed: {
    ...mapState({
      tags: state => {
        // 映射 count3 为 store.state.conut3的值
        return state.tab.tabsList
      },
      allMenu: state => {
        return state.tab.allMenu
      }
    })
  }
}
</script>

<style lang="less" scoped>
.tabs {
  padding: 20px;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>
