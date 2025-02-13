## [useState](https://zh-hans.react.dev/learn/state-a-components-memory)

## state 中的数据不可修改。实际上是替换
## 如果要修改array / object.要么复制原来的然后替换要修改的内容再set。要么就用 useImmer
```jsx 
import { useImmer } from 'use-immer';

const [person,setPerson] = useImmer({
    name: 'Niki de Saint Phalle',
    artwork: {
        title: 'Blue Nana',
        city: 'Hamburg',
        image: 'https://i.imgur.com/Sd1AgUOm.jpg',
    }
})

function handleName(e){
    setPerson((draft) =>{
        draft.name = e.target.value
    })
}

function handleTitle(e){
    setPerson((draft) =>{
        draft.artwork.title = e.target.value
    })
}
```

### 用法
const [smt,setSmt]  // state 变量,state setter
1. state 变量 (index) 会保存上次渲染的值。
2. state setter 函数 (setIndex) 可以更新 state 变量并触发 React 重新渲染组件。 

### [更新函数](https://zh-hans.react.dev/learn/queueing-a-series-of-state-updates)
```jsx 
import {useState} from "react";

const [count, setCount] = useState(0)

return (
    <>
        <button onClick={(e) => {
            e.stopPropagation();
            setNumber(count+1)              //1
            setNumber(count+1)              //1
            setNumber(count => count + 1)   //2 使用了上面的count。因为是 count => count 是更新函数
            setNumber(count => count + 1)   //3 使用了上面的count
            setNumber(count => count + 1)   //4 使用了上面的count
            setNumber(43)                   //43
        }}></button>
    </>
)
```

### 隔离且私有
1. 还记得那两个点击计数器么

### 局部变量无法在多次渲染中持续保存

### 更改局部变量不会触发重新渲染。因为React不知道
#### 

### 更新 object/array

### array.slice() array.filter() array.map() 都是创建新的数组，不影响原来的数组
### 该死，[...oldList] 是浅拷贝，意思对这个修改会影响 oldList
### 如果需要反转和排序，请使用新的数组装，然后对新的数组进行操作, [...oldList]

```jsx 
import {useState} from "react";

const initialList = [
    {id: 0, title: 'Big Bellies'},
    {id: 1, title: 'Lunar Landscape'},
    {id: 2, title: 'Terracotta Army'},
];
const [xx, setXx] = useState(initialList)

const newList = [...initialList] // 新建一个
newList.reverse()
setXx(newList)
```

## 以上的问题都可以通过用  setImmer()来解决
### 实际上是 setImmer帮你做了这些，比如 无副作用地创建对象或者数组

## 这个该死的 .map(),怎么return 空也要push进去