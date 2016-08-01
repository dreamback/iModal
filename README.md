# iModal
移动端模拟弹框,modal,iModal

## iModal 模拟弹框
简单调用例子调用：

```
var imodal =  iModal({
    title:'提示',
    content:'我是内容',
    ok:function(){},
    cancel: function(){}
})
```

---
[++demo++](./demo.html)
快速参数文档：

参数 | 类型/值|  默认 | 说明
---|---|---|---
title | String/false | false | false时不显示title
content | String | '' |
ok | Function/false|false| this指向iModal对象,false时不显示该按钮,方法内部return false时，不自动关闭弹层
okText| String|'确定'|
cancel|Function/false|false|this指向iModal对象,false时不显示该按钮,方法内部return false时，不自动关闭弹层
cancelText|String|'取消'|
oninit|Function|function(){}|初始化时的回调，this指向iModal对象
onshow|Function|function(){}|显示时的回调，this指向iModal对象
onclose|Function|function(){}|关闭是的回调,this指向iModal对象
btns|Object|{}|自定义按钮，下面再做描述
remove|Boolean |true|关闭时是否移出节点
auto|Boolean|true|初始化时是否自动打开弹层

btns例子：

```
    btns:{
        myBtn:{
            text:'我的按钮',
            callback: function(){}
        },
        ...
    }
```
- 可以自定义多个按钮；
- 上面代码将生成 ==<button class="myBtn">我的按钮</button>== 大按钮HTML结构；
- 同时可以为myBtn编写自定义样式；
- 如果callbak返回false,点击后不关闭弹层，同时this纸箱iModal对象；
- 如果超过2个按钮（包括ok&cancel按钮），一个按钮变为纵向排版。

---

方法文档：

方法名 |参数| 说明
---|---|---
content|html|重新设置内容
show |无| 在设置auto:false时，可以调用show()打开弹层。
close |无| 关闭弹层





