<template>
  <div>
    <el-row>
      <el-col :span="20">
        <span>{{ title }}</span>
      </el-col>
      <el-col :span="4">
        <el-button size="medium" icon="el-icon-circle-plus-outline" type="primary" @click="bindAdd">新增</el-button>
        <el-button size="medium" icon="el-icon-circle-check" type="warning" @click="save">保存</el-button>
      </el-col>
    </el-row>
    <el-table :data="showTree" style="width: 100%; margin-bottom: 20px" row-key="id"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
      <el-table-column prop="id" label="ID值"> </el-table-column>
      <el-table-column prop="pid" label="PID值"> </el-table-column>
      <el-table-column prop="label" label="节点名称"> </el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button icon="el-icon-edit" style="margin-right: 10px" type="success" size="medium"
            @click="bindEdit(scope.row)">编辑</el-button>
          <el-popconfirm title="确定删除吗？" @confirm="bindDelete(scope.row.id)">
            <el-button icon="el-icon-delete" slot="reference" type="danger" size="medium">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="type == 'ADD' ? '新增节点' : '编辑节点'" :visible.sync="show" width="40%">
      <Dialog v-if="show" :newTree="newTree" :type="type" :formInfo="formInfo" @close="bindClose"></Dialog>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Dialog from "@/components/Dialog.vue";
import { removeNode, treeDFS, currencyTree, treeFilter } from "@/utils";
import { INode } from "@/types";
export default Vue.extend({
  components: {
    Dialog,
  },
  name: "Home",
  data() {
    return {
      type: "EDIT", //EDIT 表示编辑 ADD 表示添加
      title: "选项1-1",
      show: false,
      formInfo: {},
      newList: [] as any[],
      showTree: [] as any[],
      newTree: [] as any[],
      chooseTree: [] as any[],
      options: [{ id: 'wu', pid: "0", label: "无" }]
    };
  },
  created() {
    if (localStorage.getItem("TREE") != null) {
      this.options = JSON.parse(localStorage.getItem('TREE') || '')
    }
    this.makeTree()
  },
  methods: {
    //造树
    makeTree() {
      this.newTree = currencyTree(this.options)
      //清children
      treeDFS(this.newTree, (item: INode) => {
        if (item.children?.length == 0) {
          item.children = undefined
        }
      })
      this.showTree = treeFilter(this.newTree, (item: INode) => item.label !== '无')
    },
    //刷新
    refresh() {
      this.formInfo = {
        id: '',
        pid: '',
        label: ""
      }
    },
    //添加
    bindAdd() {
      this.show = true
      this.type = 'ADD'
    },
    //关闭弹框
    bindClose(value: any) {
      this.newTree = JSON.parse(JSON.stringify(value))
      this.showTree = treeFilter(value, (item: INode) => item.label !== '无')
      this.show = false;
    },
    //编辑
    bindEdit(row: INode) {
      this.show = true;
      this.formInfo = row;
      this.type = "EDIT";
    },
    //保存
    save() {
      this.newList = []
      treeDFS(this.newTree, (item: INode) =>
        this.newList.push({ id: item.id, pid: item.pid, label: item.label, path: item.path })
      );
      localStorage.setItem("TREE", JSON.stringify(this.newList));
    },
    //删除
    bindDelete(id: string) {
      removeNode(this.newTree, (item: INode) => item.id == id);
      removeNode(this.showTree, (item: INode) => item.id == id);
    },
  },
});
</script>
<style lang="scss" scoped></style>
