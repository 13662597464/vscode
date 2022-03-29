<template>
  <el-row :gutter="20"
          class="padding20px">
    <el-col :span="8">
      <div class="grid-content bg-purple">
        <el-card class="box-card">
          <div slot="header"
               class="clearfix">
            <span>
              <div class="block">
                <el-avatar :size="100"
                           :src="circleUrl"></el-avatar>
              </div>
            </span>
          </div>
          <div class="text item">
            登录地点:深圳
          </div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getMenu } from '../../api/data'
export default {
  data () {
    return {
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    };
  },
  // 检测路由变化
  watch: {
  },
  methods: {
  },
  computed: {
  },
  mounted () {
    // getMenu().then(res => {
    //   console.log(res)
    // });
  },
  created () {
  },
};
</script>

<style>
.el-main {
  overflow: hidden;
}
.padding20px {
  padding: 20px;
}
</style>
