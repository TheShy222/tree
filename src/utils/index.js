//生成树
export const currencyTree = (list, config = {}) => {
  const DEFAULT_CONFIG = {
    id: 'id',
    children: 'children',
    pid: 'pid'
  }
  config = Object.assign({}, DEFAULT_CONFIG, config)
  const nodeMap = new Map(),
    result = [],
    { id, children, pid} = config
  for (const node of list) {
    node[children]=node[children] || []
    nodeMap.set(node[id], node)
  }
  for (const node of list) {
    const parent = nodeMap.get(node[pid])
    ;(parent ? parent.children : result).push(node)
  }
  return result
}
//DFS遍历
export const treeDFS = (tree, func) => {
  tree.forEach((item) => {
    func(item);
    if (item.children && item.children.length > 0) {
      treeDFS(item.children, func);
    }
  });
};
//树的查找
export const treeFind = (tree, func) => {
  for (const node of tree) {
    if (func(node)) return node;
    if (node.children) {
      const res = treeFind(node.children, func);
      if (res) return res;
    }
  }
  return null
}
//树节点添加
export const AddNode = (tree, newNode, targetNode, config) => {
  const DEFAULT_CONFIG = {
    id: 'id',
    children: 'children',
    pid: 'pid',
  }
  config = Object.assign({}, DEFAULT_CONFIG, config)
  const node = treeFind(tree, item => item.id == targetNode.id)
  node.children?node.children.push(newNode):[]
}
// 自定义树节点结构
export const diyTree = (tree, func) => {
  return tree.map(node => {
    node.children = node.children && diyTree(node.children, func)
    return func(node) || (node.children && node.children.length)
  })
}
//过滤
export const treeFilter = (tree, func) => {
  // 使用map复制一下节点，避免修改到原树
  return tree
    .map(node => ({ ...node }))
    .filter(node => {
      node.children = node.children && treeFilter(node.children, func)
      return func(node) || (node.children && node.children.length)
    })
}
//删除
export const removeNode = (tree, func, config = {}) => {
  const DEFAULT_CONFIG = {
    id: 'id',
    children: 'children',
    pid: 'pid',
    path:'path'
  }
  config = Object.assign({}, DEFAULT_CONFIG, config)
  const { children } = config, list = [tree]
  while (list.length) {
    const nodeList = list.shift()
    const delList = nodeList.reduce((r, n, idx) => (func(n) && r.push(idx), r), [])
    delList.reverse()
    delList.forEach(idx => nodeList.splice(idx, 1))
    const childrenList = nodeList.map(n => n[children]).filter(l => l && l.length)
    list.push(...childrenList)
  }
}
