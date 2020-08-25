
# SHEET-BOOKMARK

## 书签格式

字段| 类型| 解释
---|---|---
id | string | 节点的唯一标识符。唯一标识符在当前用户配置文件中保证唯一，并且在浏览器重新启动后仍然有效。
parentId | string | 父节点的标识符（id）。根节点没有此属性。
index | integer | 该节点在父文件夹中的位置（从 0 开始）。
url | string | 当用户单击书签时打开的URL。文件夹没有此属性。
title | string | 该节点显示的文字。
dateAdded | number | 该节点创建的时间，表示为自 1970 年 1 月 1 日午夜至今所经过的毫秒数（new Date | dateAdded)）。
dateGroupModified | number | 该文件夹内容的上一次修改时间，表示为自 1970 年 1 月 1 日午夜至今所经过的毫秒数。
unmodifiable | bookmarks.BookmarkTreeNodeUnmodifiable | 表示该节点不可修改的原因，"managed"表示该节点由系统管理员配置。如果该节点可以由用户和扩展程序修改（默认）则省略。
children | array | bookmarks.BookmarkTreeNode. 该节点的所有子节点（已排序）。

### 历史

* **2020-08-24**
  * 完成书签呈现
* **2020-08-25**
  * 完成书签搜索

### 接下来

* 存储本地书签
* 书签分类