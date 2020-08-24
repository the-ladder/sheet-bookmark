const inner = {};

// 定时器
inner.setTimeoutPromise = async (func,timerange) => {
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
};

// 触发书签函数
async function toggleBookmark() {
    let obj = [];
    // 拿到所有书签
    let bookmarks = await browser.bookmarks.getTree();
    // 书签 根节点
    // let bookmarksData = bookmarks[0];

    inner.bookmarkChildren(bookmarks,obj);

    console.log(obj);
}

// 递归书签目录
/**
 *
 * @param {Array} bookmarks 书签数组
 * @param {Object} obj 存储的对象
 */
inner.bookmarkChildren = (bookmarks,obj) => {
    let thisObj={};
    // 循环书签数组
    for(let o of bookmarks){
        // 书签对象
        for(let i in o){
            if(i==='children' && o[i].length!==0) {
                inner.bookmarkChildren(o[i],obj);
            }else {
                thisObj[i] = o[i];
            }
        }
        obj.push(thisObj);
    }
    return obj;
};

// browser.browserAction.onClicked.addListener(toggleBookmark);

