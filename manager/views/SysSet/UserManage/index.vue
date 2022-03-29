<template>
  <div class="manage">
    <el-dialog :title="opType='add'?'新增用户':'更新用户'"
               :visible.sync="isShow">
      <com-form :formLabel="opFormLabel"
                :form="opForm"
                :inline="true"
                ref="form"></com-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="isShow=false">取消</el-button>
        <el-button type="primary"
                   @click="confirm">确定</el-button>
      </div>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary"
                 @click="addUser">+新增</el-button>
      <com-form :formLabel="opSearchFormLabel"
                :form="opSearchForm"
                :inline="true"
                ref="form">
        <el-button type="primary"
                   @click="getList">搜索</el-button>
      </com-form>

    </div>
  </div>
</template>

<script>
import ComForm from '../../../src/components/ComForm'
export default {
  name: 'User',
  components: {
    ComForm
  },
  data () {
    return {
      opType: 'add',
      isShow: false,
      opFormLabel: [{
        model: 'name',
        label: '姓名',
        type: 'input'
      }],
      opSearchFormLabel: [{
        model: 'name',
        label: '姓名',
        type: 'input'
      }],
      opForm:
      {
        name: ''
      },
      opSearchForm:
      {
        name: ''
      }
    }
  },
  methods: {
    confirm () {

    },
    addUser () {
      this.isShow=true;
      this.opType='add';
      this.opForm={
        name: ''
      }

    },
    getList () {

    }
  }
}
</script>

<style>
</style>
