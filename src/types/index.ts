/**
 * 节点
 */
export interface INode {
    id: string
    pid: string
    label?:string
    children?: [],
    path?:any []
}