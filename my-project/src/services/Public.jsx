export const BaseUri = "http://192.168.20.88:8080/v1/"
export const Uris = {
    category: {
        group: "category",
        action: {
            create: "/create",
            search: "/search",
            update: "/update",
            delete: "/delete"
        }
    },
    user: {
        group: "user",
        action: {
            login: "/login",
            logout: "/logout",
            register: "/register",
        }
    },
    admin: {
        group: "user",
        action: {
            login: "/login",
            logout: "/logout",
            register: "/register",
        }
    },
    spu: {
        group: "spu",
        action: {
            create: "/create",
            search: "/search",
            update: "/update",
            delete: "/delete"
        }
    },
    sku: {
        group: "sku",
        action: {
            create: "/create",
            search: "/search",
            update: "/update",
            delete: "/delete"
        }
    },
    spec: {
        group: "spec",
        action: {
            create: "/create",
            search: "/search",
            update: "/update",
            delete: "/delete"
        }
    },
    coupon: {
        group: "coupon",
        action: {
            create: "/create",
            search: "/search",
            update: "/update",
            delete: "/delete"
        }
    },
    secKill: {
        group: "secKill",
        action: {
            create: "/create",
            search: "/search",
            update: "/update",
            delete: "/delete"
        }
    },

}
export const ReqTimeout = 5 * 1000

export const Codes = [
    {code: 200, isSuccess: true, isRedirect: false},
    {code: 400, isSuccess: false, isRedirect: false},
    // 不对，这里应该是跳转到某个页面上
    // 用户未登录
    {code: 401, isSuccess: false, isRedirect: true, description: "user not login!", page: "user/login"},
    // 管理员未登录
    {code: 403, isSuccess: false, isRedirect: true, description: "admin not login!", page: "admin/login"},
]

export const ApiStatus = {
    success: {code: 200, isSuccess: true, isRedirect: false},
    error: {code: 400, isSuccess: false, isRedirect: false},
    userLogin: {code: 401, isSuccess: false, isRedirect: true, description: "user not login!", page: "user/login"},
    adminLogin: {code: 403, isSuccess: false, isRedirect: true, description: "admin not login!", page: "admin/login"},
}