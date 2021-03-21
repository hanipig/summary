## css 篇

+ css盒模型
+ BFC
+ flex
+ 清除浮动
+ 水平垂直居中
+ 圣杯布局
+ 双飞翼布局
+ 多行、多列自适应布局
+ 文本超出省略号显示

### 1.css盒模型
> 包括 __内容区域、内边距区域、边框区域和外边距区域__
> 
> __content + padding + border + margin__

#### W3C盒模型（标准盒模型）
![alt W3C 标准盒模型](./img/w3c_box.jpeg)

#### IE盒模型（怪异盒模型）
![alt W3C 标准盒模型](./img/ie_box.jpeg)

#### 相关属性：box-sizing: content-box/border-box

___

### 2.BFC

#### 什么是BFC？
> BFC 全称为 ___块级格式化上下文 (Block Formatting Context)___ 。BFC是 W3C CSS 2.1 规范中的一个概念，它决定了元素如何对其内容进行定位以及与其他元素的关系和相互作用，当涉及到可视化布局的时候，Block Formatting Context提供了一个环境，HTML元素在这个环境中按照一定规则进行布局。一个环境中的元素不会影响到其它环境中的布局。比如浮动元素会形成BFC，浮动元素内部子元素的主要受该浮动元素影响，两个浮动元素之间是互不影响的。这里有点类似一个BFC就是一个独立的行政单位的意思。可以说BFC就是一个作用范围，把它理解成是一个独立的容器，并且这个容器里box的布局与这个容器外的box毫不相干。

#### 触发BFC的条件
+ 根元素或其他包含它的元素
+ 浮动元素（float不是none）
+ 绝对定位元素（position为absolute 或 fixed）
+ 内联块（display: inline-block）
+ 表格单元格（display: table-cell, HTML表格单元格默认属性）
+ 表格标题（display: table-caption, HTML表格标题默认属性）
+ 具有overflow且值不是visible的块元素
+ 弹性盒（flex或inline-flex）
+ display: flow-root
+ column-span: all

#### BFC的约束规则
+ 内部的盒子会在垂直方向上一个接一个排列
+ 处于同一个BFC中的元素上下margin会重叠
+ 每个元素的margin的左边，与容器的border的左边相接触
+ BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然
+ 计算BFC的高度时，考虑BFC所包含的所有元素，连浮动元素也参与计算（_经常利用该规则解决元素高度塌陷的问题_）

#### BFC可以解决的问题
+ 垂直外边距重叠问题
+ 去除浮动
+ 自适应两列布局（float + overflow）

___

### 3.flex布局（弹性布局 [详情可进入](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html))
> display: flex/inline-flex;

#### 容器的属性
+ flex-direction: row | row-reverse | column | column-reverse; 决定主轴方向
+ flex-wrap: nowrap | wrap | wrap-reverse; 定义如果一条轴线排不下，如何换行
+ flex-flow: flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap
+ justify-content: flex-start | flex-end | center | space—between | space-around 定义项目在主轴上的对齐方式
+ align-items: flex-start | flex-end | center | baseline | stretch 定义项目在交叉轴上如何对齐
> baseline: 项目的第一行文字的基线对齐。
> 
> stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。
+ align-content: flex-start | flex-end | center | space-between | space-around | stretch 定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用

#### 项目的属性
+ order: 定义项目的排列顺序 数值越小，排列越靠前，默认为0
+ flex-grow: 定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大
+ flex-shrink: 定义项目的缩小比例，默认为1，即如果空间不足，该项目将缩小
+ flex-basis: 定义了在分配多余空间之前，项目占据的主轴空间。默认值是auto，即项目原本的大小
+ flex： flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选

### 4.清除浮动
+ 添加空div元素 {clear: both; height :0; overflow: hidden;}
  > 原理：添加一个空div，利用css的clear: both清除浮动，让父级能够自动获取高度
  >
  > 优点：简单、代码少、浏览器支持好、不容易出现怪问题
  >
  > 缺点：会添加无用的空div

+ 给浮动元素父级设置高度
  > 原理：直接定义父级元素高度，解决父级高度无法获取高度的问题
  > 
  > 优点：简单、代码少、容易掌握
  >
  > 缺点：只适合父级元素定高的情况，要给出精确的高度，如果高度与父级的不一样，会出现问题

+ 父级定义::after伪元素 和 zoom
    ```css
    .float_div:after{
        content:"";
        clear:both;
        display:block;
        height:0;
        overflow:hidden;
        visibility:hidden;
    }
    .float_div{
        zoom:1
    }
    ```
  > 原理IE8以上和非IE才支持::after，zoom可解决ie6 7 浮动问题
  >
  > 优点：浏览器支持好、不容易出现怪问题
  >
  > 缺点：代码多

+ 父级设置overflow: hidden;
  > 原理：必须定义width或者zoom:1;同时不能定义height；浏览器会自动检查浮动区域的高度
  > 
  > 优点：简单、代码少、浏览器支持好
  >
  > 缺点：不能和position 配合使用，因为超出的范围会被隐藏

+ 父级设置overflow: auto;
  > 原理：必须定义width或者zoom:1;同时不能定义height；浏览器会自动检查浮动区域的高度
  > 
  > 优点：简单、代码少、浏览器支持好
  >
  > 缺点：内部宽高超过父级时，会出现滚动条

+ 父级（包括父级同级元素）同时设置浮动
  > 原理：所有盒子一起浮动，就变成一个整体
  >
  > 缺点：会形成新的浮动问题（不推荐使用）

+ 父级设置成display: table;
  > 不推荐使用


### 5.水平垂直居中
+ 居中元素宽高固定时
  + absolute + top 50%; left 50% + margin-left: -50%;margin-top: -50%
  + absolute + top bottom left right 0 + margin: auto
  + absolute + top left calc(50% - 居中元素的1/2宽高)
  
+ 居中元素宽高未知
  + absolute + transform(-50%, -50%) （transform 属性可相对自身宽高进行偏移）
  + line-height（父元素定高且设置line-height，text-align:center;居中元素设置为inline-block，line-height:initial）
  + flex 
  + css-table（父元素display: table-cell,text-align:center,vertical-align: middle;居中元素display: inline-block）

### 6.圣杯布局（浮动实现）
> 实现过程大致如下：
> 
> 1.这三个div的HTML摆放的先后顺序是有讲究的，middle这个显示在中间的div，在html里是排在最前面的，然后是left，最后是right。
>
>2.在container没有设置padding，left这个div和right这个div都没设置margin与相对定位relative之前，三个div都float：left。这时候页面上显示的是middle独占一行，然后是left这个div，然后是right这个div
>
>3.然后left这个div设置margin-left：-100%。这样left就能从第二排蹦到第一排最左边并覆盖middle这个div。
>
>4.right这个div设置margin-left: -200px;这个值是它自己宽度的大小。然后right这个div也蹦到第一排最右边并覆盖middle这个div。
>
>5.这个时候container设置padding，这个padding的大小是left与right这两个div分别的宽度，然后left与right这两个div分别再设置相对定位，移动自己宽度的距离，就正常显示了。
>
>这种布局方式ie7都兼容，ie6没有测试过。。。
>
>如果想要这三个div中间有间隙，那么可以设置container的padding值与两个div的left和right值。比如上面例子想有10px的间隙，那就设置left这个div的left值为-210px，right这个div的right值为-210px,然后设置container的padding:0 210px。就能达到效果
```html
<div class="container">
    <div class="middle green">middle</div>
    <div class="left red">left</div>
    <div class="right yellow">right</div>
</div>
```
```css
.container {
  height: 100px;
  padding: 0 210px;
  .left,
  .middle,
  .right {
    float: left;
    height: 100px;
    text-align: left;
  }
  .left,
  .right {
    width: 200px;
    position: relative;
  }
  .left {
    margin-left: -100%;
    left: -210px;
  }
  .right {
    margin-left: -200px;
    right: -210px;
  }
  .middle {
    width: 100%;
  }
  .red {
    background-color: red;
  }
  .yellow {
    background-color: yellow;
  }
  .green {
    background-color: green;
  }
}
```

#### 6.1 仿圣杯布局（绝对定位实现） 
> 这种方式实现的思路是：左右两边绝对定位，然后中间的div设置left right，也能达到同样的效果。也不用在意中间的三个div的排版顺序
>
> 这种布局想要中间有间隙，只要left right的值分别大于左右两个div的宽度就行了
>
> 也兼容ie7，ie6没测试过

```html
<div class="container2">
    <div class="left red">left</div>
    <div class="middle green">middle</div>
    <div class="right yellow">right</div>
</div>
```

```css
.container2{
  position: relative;
  height: 200px;
  .left,
  .middle,
  .right{
    position: absolute;
    height: 100%;
    text-align: left;
  }
  .left,
  .right{
    width: 200px;
  }
  .left{
    left: 0;
  }
  .right{
    right: 0;
  }
  .middle{
    left: 210px;
    right: 210px;
  }
  .red {
    background-color: red;
  }
  .yellow {
    background-color: yellow;
  }
  .green {
    background-color: green;
  }
}
```

### 7. 双飞翼布局
> 双飞翼布局和圣杯布局看起来都差不多，但是最大的不同就是：双飞翼布局中middle中间的这个div里面还有一个div，主要通过这个div的margin值来达到布局的目的。然后left和right这两个div都不用再设置相对定位relative。其它的都基本一样
>
> 这个布局的间隙就是设置middle这个div里面的div的margin左右的值大于两边div宽度就行了。
>
> 兼容ie7，ie6未测试过。
>
> 总结：圣杯布局的HTML中div的顺序都是自适应宽度的div排最前，然后是固定宽度的div。然后只操作固定宽度的div的margin等值，然后装这三个div的盒子设置padding值，最后自适应宽度的div就只需设置100%宽度和浮动就行了。

```html
<div class="container3">
    <div class="middle">
    <div class="middle-in green">left-in</div>
    </div>
    <div class="left red">left</div>
    <div class="right yellow">right</div>
</div>
```

```css
.container3{
  margin-top: 20px;
  height: 200px;
  .left,
  .right,
  .middle{
    height: 100%;
    float: left;
    text-align: left;
  }
  .left,
  .right {
    width: 200px;
  }
  .middle {
    width: 100%;
  }
  .middle-in {
    margin: 0 210px;
    height: 100%;
  }
  .left {
    margin-left: -100%;
  }
  .right {
    margin-left: -200px;
  }
  .red {
    background-color: red;
  }
  .yellow {
    background-color: yellow;
  }
  .green {
    background-color: green;
  }
}
```

### 8. 多行、多列自适应布局

### 9. 文本超出省略号显示
#### 单行文本
```css
.ellipsis {
  width: 500px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

#### 多行文本
```css
.ellipsis2 {
    width: 200px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* 指定块容器中内容限制为指定行数 */
    -webkit-box-orient: vertical;
}
```
