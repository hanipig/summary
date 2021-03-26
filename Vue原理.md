<!--
 * @Description:
 * @Autor: hanipig
 * @Date: 2021-03-24 20:30:19
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-03-26 22:37:59
-->

## Vue 原理

### 组件化 和 MVVM

> 1.很早之前就有组件化这个概念，jsp php ，但都是静态渲染，需要通过操作 dom 实现更新 2.vue 较传统的组件化采用数据驱动视图、mvvm

### 响应式

- 核心 API - Object.defineProperty
- 响应式代码实现
  - 监听对象、监听数组
  - 复杂对象、深度监听
  - 几个缺点
    > 1. 深度监听，需要地柜到底，一次性计算量大
    > 2. 无法监听新增/删除属性（Vue.set、Vue.delete）
    > 3. 无法原生监听数组，需要特殊处理
- Object.defineProperty 缺点
- Vue3.0 Proxy，兼容性问题

### vdom

> 1. DOM 操作非常耗费性能
> 2. 以前用 jQuery，可以自行控制 DOM 操作的时机，手动调整
> 3. Vue 和 React 是数据驱动视图，如何有效控制 DOM 操作？

> 解决方案：
>
> 1. 有了一定的复杂度， 想减少计算次数比较难；
> 2. 能不能把计算，更多的转移为 JS 计算？因为 JS 执行速度很快；
> 3. vdom - 用 JS 模拟 DOM 结构，计算出最小的变更，操作 DOM；

### diff 算法

> 1. diff 算法是 vdom 中最核心、最关键的部分
> 2. diff 算法能在日常使用 vue react 中体现出来（key）
> 3. diff 即对比，是一个广泛的概念

#### diff 优化实践复杂度到 O(n)

> 1. 只比较同一级别，不跨级比较
> 2. tag 不相同，则直接删除重建，不再深度比较
> 3. tag 和 key，两者都相同，则认为是相同节点，不再深度比较

#### 涉及到的函数

> 1. h 函数返回 vnode 结构{sel, data, children, text, ele, key}
> 2. patch 函数(isSameVnode 否：销毁重建) => pathVonde（1.判断 text 是否不相等，销毁旧 vnode 插入新 vnode 2.1 新旧 child 都存在走 undateChildren 2.2 新 childe 存在，旧 child 不存在，把旧 vnode.text 置空并添加新 child 2.3 旧 child 存在，新 child 不存在，移除旧 vnode 2.4 旧 text 都存在，新 text 不存在，直接置空旧 text） => updateChildren（1.头头、头尾、尾头、尾尾对比，相同就 继续 patchVnode 2. 在旧 child 中查找当前 startIndex 的 key 是否存在，存在就进一步比较 tag，相同就继续 patchVnode，不相同就插入新 child）

### 模板编译

### 渲染过程

### 前端路由
