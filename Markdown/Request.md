## 请求

### 异步请求
```jsx 
async function hanleSubmits(){
    try{
        await Submits("xxxx")
    }catch (error){
        
    }
}

// 需要返回Promise上面才能异步调用，否则会报错
function Submits(msg){
    return new Promise((resolve, reject) => {
        // 模拟异步操作（例如，发送请求、处理数据等）
        setTimeout(() => {
            const shouldError = answer.toLowerCase() !== 'lima'
            if (shouldError) {
                reject(new Error('猜的不错，但答案不对。再试试看吧！'));
            } else {
                resolve();
            }
        }, 2000);  // 模拟延迟2秒
    });
}
```