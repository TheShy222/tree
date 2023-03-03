<template>
  <div>
    <el-row>
      <el-col :span="22">
        <span>{{ title }}</span>
      </el-col>
      <el-col :span="2">
        <el-button size="medium" icon="el-icon-circle-plus-outline" type="warning" @click="bindAdd">新增</el-button>
      </el-col>
    </el-row>
    <el-table :data="data" style="width: 100%; margin-bottom: 20px">
      <el-table-column prop="name" label="字段名称"></el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button icon="el-icon-edit" style="margin-right: 10px" type="primary" size="medium"
            @click="bindEdit(scope.row)">编辑</el-button>
          <el-popconfirm title="确定删除吗？" @confirm="bindDelete(scope.row.id)">
            <el-button icon="el-icon-delete" slot="reference" type="danger" size="medium">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-dialog :title="type == 'ADD' ? '新增节点' : '编辑节点'" :visible.sync="show" width="40%">
      <Dialog v-if="show" :newTree="newTree" :type="type" :formInfo="formInfo" @close="bindClose"></Dialog>
    </el-dialog> -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Dialog from "@/components/Dialog.vue";

import { INode } from "@/types";
export default Vue.extend({
  components: {
    Dialog,
  },
  name: "Home",
  data() {
    return {
      type: "EDIT", //EDIT 表示编辑 ADD 表示添加
      title: "动态表单使用页面",
      show: false,
      data: [{ name: "vue" }, {name:"react"}]
    };
  },
  created() {
  },
  methods: {
    //添加
    bindAdd() {
      this.show = true
      this.type = 'ADD'
    },
    //关闭弹框
    bindClose(value: any) {
      this.show = false;
    },
    //编辑
    bindEdit(row: INode) {
      this.show = true;
      // this.formInfo = row;
      this.type = "EDIT";
    },
    //删除
    bindDelete(id:number) {
      console.log(id);
    }
  }
})
</script>
<style lang="scss" scoped></style>
