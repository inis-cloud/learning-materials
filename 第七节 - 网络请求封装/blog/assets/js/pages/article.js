(()=>{
    const app = Vue.createApp({
        data(){
            return {
                id: null,
                links: [],
                article: {},
            }
        },
        mounted(){
            const id = inisHelper.get.query.string('id')
            if (inisHelper.is.empty(id)) window.location.href = '/'
            else {
                this.id = id
                this.getArticle()
            }
            this.getLinks()
        },
        methods:{
            // 获取友情数据
            getLinks(){
                Get('/links').then(res=>{
                    if (res.code == 200) {
                        this.links = res.data
                    }
                })
            },
            // 获取文章数据
            getArticle(id = this.id){
                Get('/article', {
                    id,
                }).then(res=>{
                    if (res.code == 200) {
                        this.article = res.data
                        console.log(res.data);
                    }
                })
            },
        }
    }).mount('#app')
})()