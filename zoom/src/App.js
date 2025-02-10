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
    const [count, setCount] = useState(0)

    function handleClick() {
        setCount(count + 1)
    }

    return (
        <>
            <button className="square">{user.imageSize}</button>
            <MyButton/>
            <User/>
            <FetchLists/>
            <ShoppingList/>
            <MyClick/>
            <MyCounter/>

            <ShareStateCounter count={count} clickFunc={handleClick}/>
            <ShareStateCounter count={count} clickFunc={handleClick}/>

            <Philosophy/>
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

function MyCounter() {
    // 需要注意的是，这里定义的是局部变量，函数退出了就没有了
    // 在父组件中调用 <MyCounter /> <MyCounter /> 他们有独立的数据
    const [count, setCount] = useState(0)

    function updateCount() {
        setCount(count + 1)
    }

    return (
        <>
            <br/>
            <button onClick={updateCount}>count is : {count}</button>
        </>
    )
}

function ShareStateCounter({count, clickFunc}) {
    return (
        <>
            <br/>
            <button onClick={clickFunc}>count is : {count}</button>
        </>
    )
}

function Philosophy() {
    const lists = [
        {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
        {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
        {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
        {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
        {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
        {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
    ]

    const [stock, setStock] = useState(false)
    const [filterText, setFilterText] = useState('')

    function changeStockShow(checked) {
        console.log(checked)
        setStock(checked)
    }
    //
    function changeFilterText(context) {
        setFilterText(context)
    }

    return (
        <>
            <br/>
            <br/>
            <br/>
            <SearchBar filterText={filterText} inStock={stock} textChange={changeFilterText} checkedChange={changeStockShow}/>
            <ProductTable filterText={filterText} inStock={stock} products={lists}/>
        </>
    )
}

function SearchBar({filterText, inStock, textChange, checkedChange}) {
    return (
        <>
            <form>
                <input type="text" value={filterText} onChange={(e) => textChange(e.target.value)}
                       placeholder="Search..."/>
                <label>
                    <input type="checkbox" checked={inStock} onChange={(e) => checkedChange(e.target.checked)}/> Only show
                    stock fruit
                </label>
            </form>
        </>
    )
}

function ProductTable({filterText, inStock, products}) {
    return (
        <>
            <ShowRow filterText={filterText} inStock={inStock} products={products}/>
        </>
    )
}

function Title() {
    return (
        <>
            <tr>
            <th>
                    Name
                </th>
                <th>
                    Title
                </th>
            </tr>

        </>
    )
}

function ShowRow({filterText, inStock, products}) {
    const row = []
    let category = null
    products.forEach((product) => {
        // 字符串搜索
        if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
            return
        }
        // 条件筛选
        if (inStock && !product.stocked) {
            return
        }

        if (category !== product.category) {
            row.push(
                <ShowCategory category={product.category} key={product.category}/>
            )
        }
        row.push(<tr key={product.name}>
            <td>{product.name}</td>
            <td>{product.price}</td>
        </tr>)

        category = product.category
    })

    return (
        <table>
            <thead>
            <Title/>
            </thead>
            <tbody>
            {row}
            </tbody>
        </table>
    )
}

function ShowCategory({category}) {
    return (
        <tr key={category}>
            <th colSpan="2">
                {category}
            </th>
        </tr>
    )
}