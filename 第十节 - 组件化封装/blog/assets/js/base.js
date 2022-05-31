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

const components = {
    // 友链组件
    iLinks: {
        data(){
            return {
                links: [],
            }
        },
        mounted(){
            this.getLinks()
        },
        methods: {
            // 获取友情数据
            getLinks(){
                Get('links').then(res=>{
                    if (res.code == 200) {
                        this.links = res.data
                    }
                })
            },
        },
        template: `<li class="side-nav-item">
            <a data-bs-toggle="collapse" href="#sidebarMaps" aria-expanded="false" aria-controls="sidebarMaps" class="side-nav-link">
                <i class="uil-location-point"></i>
                <span> 友链 </span>
                <span class="menu-arrow"></span>
            </a>
            <div class="collapse" id="sidebarMaps">
                <ul class="side-nav-second-level">
                    <li v-for="(item, index) in links.data" :key="index">
                        <a :href="item.url" target="_blank">{{item.name}}</a>
                    </li>
                </ul>
            </div>
        </li>`
    }
}