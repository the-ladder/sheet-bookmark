/* eslint-disable camelcase */
new Vue({
    el: '#wrap',
    data:{
        'btn_value': '搜索', // 搜索按钮文字
        'input_value': '', // 搜索框输入值
        'input_placeholder': '网址 | 书签名称 | 分类', // 搜索框placeholder值
        'bookmarkArr': [], // 所有书签
        'search_result': [], // 搜索结果
        'search_cache': {}, // 搜索缓存
        'search_history': [], // 搜索词历史
    },
    methods:{
        // 点击按钮
        async clickBtn(){
            // 更改页面状态
            this.search_result = [];

            // 搜索书签
            for(let o of this.bookmarkArr){
                // 添加符合要求的书签
                if(
                    o.title.includes(this.input_value) ||
                    o.url.includes(this.input_value)
                ) this.search_result.push(o);
            }
        },
        /**
         * 递归书签目录
         * @param {Array} bookmarks 书签数组
         * @param {Object} obj 存储的对象
         */
        bookmarkChildren(bookmarks){
            let obj=[];
            // 循环书签数组
            for(let o of bookmarks){
                // 书签对象
                if(o.children && o.children.length>0) {
                    obj = [...this.bookmarkChildren(o.children),...obj];
                }else{
                    delete o.children;
                    for(let i in o) if(!o[i]) continue;
                    if(o.type!=='bookmark') continue;
                    obj.push(o);
                }
            }
            return obj;
        },
        // 触发书签函数
        async toggleBookmark(){
            let data = [];
            let obj = [];
            // 拿到所有书签
            let bookmarks = await browser.bookmarks.getTree();
            // 书签 根节点
            let rdata = this.bookmarkChildren(bookmarks,obj);
            for(let {dateAdded,id,index,parentId,title,type,url} of rdata) {
                data.push({dateAdded, id, index, parentId, title, type, url})
            }
            this.bookmarkArr = data;

            return data;
        },
        // 定时器
        setTimeoutPromise(func,timerange){
            return new Promise((resolve,reject) => {
                try{
                    setTimeout(() => {
                        func();
                        resolve();
                    },timerange);
                }catch(e){
                    reject(e.message);
                }
            });
        },
    },
    mounted(){
        // 弹窗渲染完毕,默认获取所有书签
        this.toggleBookmark();
    },
});
