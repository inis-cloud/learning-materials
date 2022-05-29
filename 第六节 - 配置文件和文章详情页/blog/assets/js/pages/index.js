(()=>{
    const app = Vue.createApp({
        data(){
            return {
                article: {
                    count: 0,
                    page : 1,
                    data : [],
                },
                links: [],
                page: {
                    code: 1,    // 当前页码
                    list: [],   // 页码列表
                }
            }
        },
        mounted(){
            this.getArticle()
            this.getLinks()
        },
        methods:{
            getArticle(page = this.page.code){
                inisHelper.fetch.get(INIS.api + '/article',{
                    limit: 4, page
                }).then(res=>{
                    if (res.code == 200) {
                        // 方法一
                        // this.article    = res.data
                        // 方法二
                        this.article.count = res.data.count
                        this.article.page  = res.data.page
                        this.article.data  = [...this.article.data, ...res.data.data]
                        this.page.list  = inisHelper.create.paging(page, res.data.page, 5)
                        this.page.code  = page
                    }
                })
            },
            // 获取友情数据
            getLinks(){
                inisHelper.fetch.get(INIS.api + '/links').then(res=>{
                    if (res.code == 200) {
                        this.links = res.data
                    }
                })
            },
        }
    }).mount('#app')
})()