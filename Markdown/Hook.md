## 特别注意

1. React 通过 Hook 调用的顺序 来存储和恢复组件的状态。如果在 if 或循环里使用 Hook，调用顺序就会变化，导致 React 不知道该如何恢复状态。  
   1️⃣ 只能在函数组件的顶层调用 Hook，不要放在 if、循环 或者嵌套函数里。  
   2️⃣ 只能在 React 组件或自定义 Hook 里使用 Hook，不能在普通 JS 函数里调用。
2. 总结

|       ❌ 错误       |       ✅ 正确       |
|:----------------:|:----------------:|
| 在 if 语句中调用 Hook	 |   在组件顶层调用 Hook   |
|   在循环中调用 Hook	   |      用数组存状态      |
|  在普通函数里调用 Hook	  | 只在组件或自定义 Hook 里用 |

### IF中示范

1. 正确示范

```tsx
 function Counter({shouldUseState}) {
    // ✅ 直接在组件顶层调用 Hook，保持顺序不变
    const [count, setCount] = useState(0);

    if (!shouldUseState) {
        return <p>No counter</p>;
    }

    return (
        <button onClick={() => setCount(count + 1)}>Count: {count}</button>
    );
}
```

2. 错误示范

```tsx
function Counter({shouldUseState}) {
    if (shouldUseState) {
        // ❌ 不能在 if 语句里使用 Hook
        const [count, setCount] = useState(0);
    }

    return <button>Click me</button>;
}  
```

### forEach中示范

正确示范

```tsx
function MyComponent({items}) {
    // ✅ 只调用一次 useState，存储所有 items 的状态
    const [values, setValues] = useState(items.map((item) => item.value));

    return (
        <div>
            {values.map((value, index) => (
                <p key={index}>Value: {value}</p>
            ))}
        </div>
    );
}
```

错误示范

```tsx
function MyComponent({items}) {
    items.forEach((item) => {
        // ❌ 不能在循环中使用 Hook
        const [value, setValue] = useState(item.value);
    });

    return <div>Invalid Example</div>;
}  
```

### 嵌套函数 在顶层定义

正确示范

```tsx
function MyComponent() {
    const [count, setCount] = useState(0);

    function doSomething() {
        setCount(count + 1); // ✅ 只在事件里调用 setState，不调用 useState
    }

    return <button onClick={doSomething}>Click me {count}</button>;
}
```

错误示范

```tsx
function MyComponent() {
    function doSomething() {
        // ❌ 不能在嵌套函数中调用 Hook
        const [count, setCount] = useState(0);
    }

    return <button onClick={doSomething}>Click me</button>;
}
```