# 基础内容速看
## vue-tutorial
1. v-bind:  :
2. v-on: @
3. v-model
4. v-if v-else
5. ref  const msg = ref('') 或者在标签里引用其他组件
6. watch  watch(id,(newId,oldId) =>{console.log("oldId => newId")})
7. onMounted   onMounted(()=>{})
8. computed computed(()=>{return Hide ? todos.value.filter((e) => !e.done : todos.value})
9. 组件  <Components />
10. props 父级向子级传参
    1. 子级需要先定义需要的参数
    2. defineProps = ({msg:String})
    3. 传参 <Components :msg="xxx"/>
11. emits 子级向父级触发事件
    1. defineEmits = ({response:(msg) => typeof msg === 'string'})
    2. 调用 emit('response','hello !')
    3. 父级使用 <Components @response="(msg) => ChildMsg = msg"/>
    4. 上面省略了在父级的 script setup中ChildMsg的定义
12. 插槽 slot
    1. 父级通过组件组件传递，参数 <Components>xxx<Components />
    2. 子级用<slot>xxxxxx</slot>接收