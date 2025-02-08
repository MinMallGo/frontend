import {useState} from "react";

const user = {
    name: 'Hedy Lamarr',
    imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
    imageSize: 90,
}

const products = [
    {title: 'Cabbage', id: 1},
    {title: 'Garlic', id: 2},
    {title: 'Apple', id: 3},
]

export default function Square() {
    // 为了演示组件间状态共享，需要在上面定义setState和handleFunc
    const [count,setCount] = useState(0)
    function handleClick(){
        setCount(count+1)
    }

    return (
        <>
            <button className="square">{user.imageSize}</button>
            <MyButton/>
            <User/>
            <FetchLists/>
            <ShoppingList />
            <MyClick />
            <MyCounter />

            <ShareStateCounter count={count} clickFunc={handleClick} />
            <ShareStateCounter count={count} clickFunc={handleClick} />
        </>

    );
}

function User() {
    return (
        <>
            <h1>{user.name}</h1>
            <img
                alt={user.name}
                src={user.imageUrl}
                style={{
                    height: user.imageSize,
                    width: user.imageSize
                }}
            />
        </>
    )
}

function MyButton() {
    return (
        <>
            <button className="square">xx</button>
        </>
    )
}

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

function ShoppingList() {
    const products = [
        {title: '卷心菜', isFruit: false, id: 1},
        {title: '大蒜', isFruit: false, id: 2},
        {title: '苹果', isFruit: true, id: 3},
    ];

    const item = products.map(product =>
        <li
            key={product.id} style={{color: product.isFruit ? 'blue' : 'red'}}>
            {product.title}
        </li>
    )

    return (
        <>
            <ul>
                {item}
            </ul>
        </>
    )
}

function MyClick(){
    function handleClick(){
        alert("I am handling click event!")
    }

    return (
        <>
            <button onClick={handleClick}>click me!</button>
        </>
    )
}

function MyCounter(){
    // 需要注意的是，这里定义的是局部变量，函数退出了就没有了
    // 在父组件中调用 <MyCounter /> <MyCounter /> 他们有独立的数据
    const  [count,setCount] = useState(0)
    function updateCount(){
        setCount(count+1)
    }

    return (
        <>
            <br/>
            <button onClick={updateCount}>count is : {count}</button>
        </>
    )
}

function ShareStateCounter({count,clickFunc}){
    return (
        <>
            <br/>
            <button onClick={clickFunc}>count is : {count}</button>
        </>
    )
}