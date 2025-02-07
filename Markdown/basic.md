# vue3 基础语法

## script setup

## [v-bin: 关于绑定](https://cn.vuejs.org/tutorial/#step-3)
1. 动态绑定 **_v-bin:_** => **_:_**
2. 绑定 v-bind:class="titleClass" => 简化为 :class="titleClass"
   1. 意思将上面的标签的class绑定成了titleClass这个动态值 
   2. 如果是绑定id，则 :id="titleClass"
## [v-on: 事件监听](https://cn.vuejs.org/tutorial/#step-4)
1. **_v-on:_** => **_@_**
2. \<button v-on:click="clickFunc" >{{count}}\</button>  => \<button @click="clickFunc" >{{count}}\</button>

## [v-model 表单绑定](https://cn.vuejs.org/tutorial/#step-5)
1. **_v-model=_**
2. \<input :value="text" @onClick="onInput"/> => \<input v-model="text" />
3. 怎么获取v-model绑定的值？ 
4. 比如上面是 v-model="text",即 text.value

## [v-if v-else 条件渲染](https://cn.vuejs.org/tutorial/#step-6)
1. **_v-if_** **_v-else_**
2. \<h1 v-if="a">a\</h1> \<h1 v-else>b\</h1>  当a为true时，显示a，否则显示b

## [v-for 列表渲染](https://cn.vuejs.org/tutorial/#step-7)
1. v-for="todo in todos" :key="todo.id"


## [computed() 属性值计算 ](https://cn.vuejs.org/tutorial/#step-8)
1. 监听内部使用到的**ref**值，**并非所有ref**


## [生命中周期和模板引用](https://cn.vuejs.org/tutorial/#step-9)
### 生命周期
1. [举个例子]
   ``` 
   <p ref="pRef">hello </p>
   const pRef = ref(null)
   ```
2. 当\<script setup> 执行时，DOM还不存在，所以这只能 const pRef = ref(null)，然后在onMount()的方法里执行操作
3. onMount()操作示例
   ```
   onMount(() =>{
      // pRef.value 即  p 标签了
      pRef.value.textContent = "123123"
   })
   ```
4. onMounted() 所有挂在完成之后执行该方法

### 模板引用
``` 
<p ref="pRef">hello </p>
```

## [watch 监听器 ](https://cn.vuejs.org/tutorial/#step-10)
1. 监听到id.value发生变化时，触发后面的func
2. watch(watchRef,func)
3. example: watch(id,(xid) => {console.log("id was changed!")})

## [组件](https://cn.vuejs.org/tutorial/#step-11)
1. 引用组件： import ChildComp from './ChildComp.vue'
2. 模板中使用： <ChildComp />

## [props](https://cn.vuejs.org/tutorial/#step-12)
1. 父组件传递数据给子组件。
2. 子组件中要先定义他需要，然后才能传递
   ```
   // 子组件中先定义
   defineProps({
      msg:String
   })
   
   // 父组件中传递
   // 1. 先引入子组件
   <script setup>
      ....
       import A from './A.vue'
       const xxx = ref('不好，有东西来了')
   </script setup>
   <template>
      <A :msg="xxxxx">
   </template>
   ```
   
## [Emits](https://cn.vuejs.org/tutorial/#step-13)
1. 子组件向父组件触发事件
2. 也是在子组件中定义 emits
3. example:
   ```
   // child.vue
   <script setup>
      const emit = defineEmits(['response']) // 定义一个response事件
      // maybe there is a better way.
      const emit = defineEmits({
          response: (msg) => typeof msg === 'string'      
      })
      emit('response','you are so good!') // 调用，前面是事件，后面是参数
   </script setup>
   
   // parent.vue
   <script setup>
       import Child from './child.vue'
       const childMsg = ref("xx")
   </script setup>
   <template>
      <Child @response="(msg) => childMsg = msg"/> // 讲emits传上来的第一个参数作为msg，然后替换了本地的 childMsg
      {{childMsg}}
   </template>
   ```
   
## [插槽 slots](https://cn.vuejs.org/tutorial/#step-14)
1. 父组件传递数据给子组件的另一种方式
2. example:
``` 
// child.vue
<slot>default context</slot> // 当父组件没有给子组件传递任何内容时，就默认显示这个玩意儿
// parent.vue
...
import Child from './child.vue'
const msg = ref("this msg comes from parent.vue")
...

<template>{{msg}}</template> 
```