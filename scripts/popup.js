/* eslint-disable camelcase */
new Vue({
    el: '#wrap',
    data:{
        'btn_value': '搜索',
        'input_value': '',
        'bookmarkArr': [], // 所有书签
        'search_result': [], // 搜索结果
        'search_cache': [], // 搜素缓存

        // ===== css-start =====
        'css':{
            'input_div': 'inputDiv inputDiv-default',
            'input_div_default': 'inputDiv inputDiv-default',
            'input_div_clicked': 'inputDiv inputDiv-clicked',
            'button': 'button',
        },
        // =====  css-end  =====
    },
    methods:{
        // 点击按钮
        async clickBtn(){
            this.btn_value === '搜索'?this.clickSearch():this.clickReset();
        },
        // 按钮为搜索
        async clickSearch(){
            // 更改页面状态
            this.css.input_div = this.css.input_div_clicked;
            this.btn_value = '重置';

            // 搜索书签
            for(let o of this.bookmarkArr){
                this.search_result = [];
                // 添加符合要求的书签
                if(
                    o.title.includes(this.input_value) ||
                    o.url.includes(this.input_value)
                ) this.search_result.push(o);
            }
        },
        // 按钮为重置
        clickReset(){
            // 更改页面状态
            this.css.input_div = this.css.input_div_default;
            this.btn_value = '搜索';
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
            let obj = [];
            // 拿到所有书签
            let bookmarks = await browser.bookmarks.getTree();
            // 书签 根节点
            let rdata = this.bookmarkChildren(bookmarks,obj);
            this.bookmarkArr = rdata;
            return rdata;
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
