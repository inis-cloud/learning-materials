(()=>{
    const app = Vue.createApp({
        data(){
            return {
                id: null,
                links: [],
                article: {},
                comments: {
                    page: {
                        code: 1,
                        list: []
                    },
                    data: {}
                }
            }
        },
        mounted(){
            const id = inisHelper.get.query.string('id')
            if (inisHelper.is.empty(id)) window.location.href = '/'
            else {
                this.id = id
                this.getArticle()
                this.getComments()
            }
            this.getLinks()
        },
        methods:{
            // 获取友情数据
            getLinks(){
                Get('links').then(res=>{
                    if (res.code == 200) {
                        this.links = res.data
                    }
                })
            },
            // 获取文章数据
            getArticle(id = this.id){
                Get('article', {
                    id,
                }).then(res=>{
                    if (res.code == 200) {
                        this.article = res.data
                        // console.log(res.data);
                    }
                })
            },
            // 获取文章下的评论数据
            getComments(page = this.comments.page.code){
                Get('comments',{
                    article_id: this.id, tree: false, page
                }).then(res=>{
                    if (res.code == 200) {
                        this.comments.data = res.data
                        // 更新页码
                        this.comments.page.code = page
                        this.comments.page.list = inisHelper.create.paging(page, res.data.page, 5)
                        console.log(res.data);
                        console.log(this.comments);
                    }
                })
            }
        }
    }).mount('#app')
})()