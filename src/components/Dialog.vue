<template>
    <el-form :model="form" :rules="rules">
        <el-form-item label="父节点" prop="path">
            <el-cascader :options="myTree" v-model="form.path" :props="optionProps" clearable></el-cascader>
        </el-form-item>
        <el-form-item label="节点名称" prop="label">
            <el-input v-model="form.label"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="oprate">确定</el-button>
        </el-form-item>
    </el-form>
</template>
<script lang="ts">
import Vue from "vue";
import { INode } from "@/types";
import { AddNode, currencyTree, treeFind, treeDFS, removeNode } from "@/utils";
import { Message } from "element-ui";
export default Vue.extend({
    name: "Home",
    props: ["show", "formInfo", "type", "newTree"],
    data() {
        return {
            optionProps: {
                value: "id",
                checkStrictly: true,
            },
            myTreeList: [] as any[],
            form: {
                id: "",
                pid: "",
                label: "",
                path: [],
            },
            rules: {
                path: [{ required: true, message: "请选择父节点", trigger: "blur" }],
                label: [{ required: true, message: "请输入value值", trigger: "blur" }],
            },
            myTree: [] as any[],
        };
    },
    created() {
        this.myTree = JSON.parse(JSON.stringify(this.newTree))
        if (this.type == "EDIT") {
            this.form = { ...this.formInfo }
            removeNode(this.myTree, (item: INode) => item.id == this.formInfo.id)
            treeDFS(this.myTree, (item: INode) => {
                if (item.children?.length == 0) {
                    item.children = undefined
                }
            })
        } else {
            this.refresh();
            this.myTree = JSON.parse(JSON.stringify(this.newTree));
        }
    },
    methods: {
        //刷新
        refresh() {
            this.form = {
                id: "",
                pid: "",
                label: "",
                path: [],
            };
        },
        //操作
        oprate() {
            if (this.type == "ADD") {
                this.bindAdd();
            } else {
                this.bindEdit();
            }
        },
        //添加
        bindAdd() {
            if (this.form.label == "" || this.form.path.length == 0) {
                Message({
                    message: "未选择根节点或节点值为空!",
                    type: "error",
                });
                return;
            }
            const targetNode = treeFind(
                this.myTree,
                (item: INode) => item.id == this.form.path[this.form.path.length - 1]
            );
            const newNode: INode = {
                id: Date.now().toString().slice(-3),
                pid: targetNode.id,
                label: this.form.label,
                path: this.form.path,
            };
            if (targetNode.id == "wu") {
                newNode.pid = "0";
                this.myTree.push(newNode);
                this.$emit("close", this.myTree);
            } else {
                if (!targetNode.children) {
                    targetNode.children = [];
                }
                AddNode(this.myTree, newNode, targetNode);
                Message({
                    message: "添加成功!",
                    type: "success",
                });
                this.$emit("close", this.myTree);
            }
        },
        //编辑
        bindEdit() {
            this.myTreeList = [];
            treeDFS(this.newTree, (item: INode) => {
                if (item.id == this.form.id) {
                    let obj: INode = { ...this.form };
                    obj.pid = this.form.path[this.form.path.length - 1];
                    if (obj.pid == "wu") {
                        obj.pid = "0";
                    }
                    this.myTreeList.push({
                        id: obj.id,
                        pid: obj.pid,
                        label: obj.label,
                        path: obj.path,
                    });
                } else {
                    this.myTreeList.push({
                        id: item.id,
                        pid: item.pid,
                        label: item.label,
                        path: item.path,
                    });
                }
            });
            this.myTree = currencyTree(this.myTreeList);
            treeDFS(this.myTree, (item: INode) => {
                if (item.children?.length == 0) {
                    item.children = undefined;
                }
            });
            this.$emit("close", this.myTree);
        },
    },
});
</script>
<style lang="scss" scoped></style>
