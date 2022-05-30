// 发起 Get 请求
const Get = (url = '', params = {}, config = {}) => {
    // 定义 Token
    const headers = {token: INIS.token}
    // 合并配置
    config.headers = {...headers, ...config.headers}
    return inisHelper.fetch.get(inisHelper.customProcessApi(INIS.api) + url, params, config)
}

// 发起 Post 请求
const Post = (url = '', params = {}, config = {}) => {
    // 定义 Token
    const headers = {token: INIS.token}
    // 合并配置
    config.headers = {...headers, ...config.headers}
    return inisHelper.fetch.post(inisHelper.customProcessApi(INIS.api) + url, params, config)
}