<!--
 * @Description: 
 * @Autor: hanipig
 * @Date: 2021-03-22 21:44:05
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-03-23 00:38:50
-->
## Vue总结

### vue-cli创建项目

### 基本使用
+ 插值表达式
+ v-html：有xss风险，会覆盖子组件
+ computed 有缓存，data不变则不会重新计算
+ watch 深度监听、监听引用类型，拿不到oldVal
+ class和style
+ 条件渲染
+ v-if v-show的区别，使用场景
+ v-for、遍历对象、key 的重要性、v-for 和 v-if不建议同时使用
+ 事件、event参数，自定义参数、事件修饰符，按键修饰符、事件被绑定到哪里（event.target,event.currentTarget）？
  > 1.event是原生的
  > 
  > 2.事件被挂载到当前元素
+ 表单、v-model

### 组件
+ props 和 $emit
+ 组件间通讯-自定义事件
  > 父子间
  > 任意层级间 自定义事件（$on、$off、$emit）
+ 组件生命周期
  > 单个组件（挂载、更新、销毁）
  > 
  > 父子组件：
    > 1. 父组件beforeCreate --> 父组件created --> 父组件beforeMount  --> 子组件beforeCreate --> 子组件created --> 子组件beforeMount  -->  子组件 mounted  --> 父组件mounted 
    > 2. 父组件beforeUpdate => 子组件beforeUpdate =>子组件updated => 父组件updated
    > 3. 父组件beforeDestroy => 子组件beforeDestroy => 子组件destroyed => 父组件destroyed


### 高级特性
+ 自定义v-model
+ $nextTick
  > 1.Vue是异步渲染的
  >
  > 2.data改变后，Dom不会立刻渲染，会将多次修改data修改做整合
  >
  > 3.$nextTick会在DOM渲染之后被触发，以获取最新DOM节点
+ slot
+ 动态、异步组件
+ keep-alive
+ mixin