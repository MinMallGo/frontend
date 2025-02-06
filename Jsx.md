# Jsx 语法

## 创建和嵌套组件
### 组件（首字母必须是大写）
```react
function MyButton(){
    return (
        <button>我是一个按钮</button>
    )
}
```

### 导出和嵌套使用
使用上面的函数
```react
export default function MyApp(){
    return (
        <div>
            <h1>欢迎来到我的应用</h1>
            <MyButton />
        </div>
    )
}
```

### 必须使用闭合的标签

### 多个标签用<div></div> 或者 <></> 返回
```react
function AboutPage(){
    return (
        <>
            <h1>11</h1>
            <p>你好</p>
        </>
    )
}
```

### css样式  使用className来指定类名
```react
<img className="avatar" />

.avatar{
    border-radius: 50%
}
```

### 数据显示
```react
return(
    <h1>
        {user.name}
    </h1>
)
```

### JSX 转义 js.
####  数据读取用 {}
```react
return (
    <img 
    className="avator"
    src={user.imgUrl}
    >
)
```

### 暂时看不懂的骚操作之 {{}}
```react

return (
    <img 
    className="avator"
    src={user.imgUrl}
    style={{
        width:user.imageSize
        heigth:user.imgageSize
    }}
    />
)
```
注释： style={{}} 并不是一个特殊的语法，而是 style={ } JSX 大括号内的一个普通 {} 对象。当你的样式依赖于 JavaScript 变量时，你可以使用 style 属性。


### 条件渲染
#### 简单的 IF-ELSE
```react

let content;
if (isLogin){
    content = <AdminPanel />
}else{
    content = <LoginForm />
}

return (
    <>
        {content}
    </>
)

```
#### jsx还可以这样玩 (推荐简单的IF-ELSE)
```react

<>
{isLogin} ? (
    <AdminPanel />
) : (
    <LoginForm />
)
</>


// 如果不需要ELSE分支
<>
    {isLogin && <AdminPanel />}
</>
```

### FOR - ARRAY-MAP
```react

const listItem = products.map(product =>
    <li key={product.id}>
        {product.title}
    </>
)

return (
    <ul>{listItems}</ul>
)
```

#### example
```react

const products = [
    { title: '卷心菜', isFruit: false, id: 1 },
    { title: '大蒜', isFruit: false, id: 2 },
    { title: '苹果', isFruit: true, id: 3 },
];

// 遍历然后return
function TestFor(){
    const item = products.map(product => 
        <li 
            key={product.id} 
            style={{
                color: {product.isFruit} ? "red":"black"
            }}
        >
            {product.title}
        </li>
    )

    return (
        <ul>{item}</ul>
    )

}
```