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
                },
                comment: {
                    pid: 0,             // 评论的父级ID
                    content: '',        // 评论内容
                    nickname: '',       // 评论人昵称
                    email: '',          // 评论人邮箱
                    url: '',            // 评论人网址
                    article_id: 0,      // 文章ID
                }
            }
        },
        components: {
            'i-links': components.iLinks,
        },
        mounted(){
            const id = inisHelper.get.query.string('id')
            if (inisHelper.is.empty(id)) window.location.href = '/'
            else {
                this.id = id
                this.comment.article_id = id
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
                        // console.log(res.data);
                        // console.log(this.comments);
                    }
                })
            },
            // 发表评论
            postComment(){
                if (inisHelper.is.empty(this.comment.content)) {
                    $.NotificationApp.send(null, "评论内容不得为空~", "top-right", "rgba(0,0,0,0.2)", "warning")
                } else if (inisHelper.is.empty(this.comment.nickname)) {
                    $.NotificationApp.send(null, "你好神秘啊，居然不愿意告诉我你的名字", "top-right", "rgba(0,0,0,0.2)", "warning")
                } else if (inisHelper.is.empty(this.comment.email)) {
                    $.NotificationApp.send(null, "你好神秘啊，居然不愿意告诉我你的邮箱", "top-right", "rgba(0,0,0,0.2)", "warning")
                } else {
                    Post('comments', this.comment).then(res=>{
                        if (res.code == 200) {
                            this.comment.content = ''
                            this.getComments()
                        }
                    })
                }
            }
        }
    }).mount('#app')
})()