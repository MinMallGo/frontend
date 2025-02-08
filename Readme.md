## min-mall

## 并称哲学：Simple

| 需求	Simple |          方式          |
|:---------:|:--------------------:|
|  UI 结构	   |       组件化，拆小组件       |
|   组件数据	   |       props 传递       |
|   状态管理	   |  useState + Zustand  |
|    API    | 数据	fetch + useEffect |
|    路由	    |   react-router-dom   |
| Redux？ ❌	 |     用 Zustand 替代     |
| 复杂管理？ ❌	  |  组件 = UI，数据从 API 来   |

## React

### 接近javascript

### fast start

``` 
npm create vite@latest my-mall --template react
cd my-mall
npm install
npm run dev
```

### 操作

#### 条件渲染

1. 没有特殊的语法，就是js的if-else

```tsx
let content
if (isLogin) {
    content = <AdminPanel/>
} else {
    content = <LoginPanle/>
}

return (
    <>
        {content}
    </>
)
```

#### 列表渲染

1. 使用for循环和array的map()来渲染组件列表

```tsx
const products = [
    {title: 'Cabbage', id: 1},
    {title: 'Garlic', id: 2},
    {title: 'Apple', id: 3},
]

function FetchLists() {
    const items = products.map(product =>
        <li key={product.id}>
            {product.title}
        </li>
    )

    return (
        <>
            <ul>{items}</ul>
        </>
    )
}
```

##### li标签

1. 特别需要注意的是每个li标签都需要一个独立的key,比如数据库里面数据的ID

#### 响应事件

1. 通过事件处理函数。特别需要注意的是不需要加 **()**,因为触发时React会调用这个Func

```tsx
function MyClick() {
    function handleClick() {
        alert("I am handling click event!")
    }

    return (
        <>
            <button onClick={handleClick}>click me!</button>
        </>
    )
}
```

#### 更新界面

1. 使用 **useState** 来更新数据

```tsx
function MyCounter() {
    const [count, setCount] = useState(0)

    function addCount() {
        setCount(count + 1)
    }

    return (
        <>
            <button onClick={addCount}>click {count} times</button>
        </>
    )
}
```

1. 需要特别注意的是,下面代码里面的count是相互独立的

```tsx
export default function App() {
    return (
        <>
            <MyCounter/>
            <MyCounter/>
        </>
    )
}
```

#### Hook 以 useXxx 开头
##### [使用Hook需要注意的事](./Markdown/Hook.md)


#### 组件间状态共享
1. 在父组件中定义，然后传递到一个或者子组件中，即可实现多个组件状态共享
2. 比如你要修改 ***count***，父组件中定义 **_handleClick_** 的方法,然后 **_setCount(count+1)_**,这个方法也跟着传到子组件就好
3. 需要注意的是向组件传递 ***Func*** 的时候，不需要加 ***()***
```tsx
import {useState} from "react";

export default function App() {
    cosnt [count, setCount] = useState(0)

    function handleClick() {
        setCount(count + 1)
    }

    return (
        <>
            <ShareCounter count={count} clickFunc={handleClick}/>
        </>
    )
}

function ShareCounter({count, clickFunc}) {
    return (
        <>
            <button onClick={clickFunc}>count is : {count}</button>
        </>
    )
}
```