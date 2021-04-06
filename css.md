## css 篇

- css 盒模型
- BFC
- flex
- 清除浮动
- 水平垂直居中
- 圣杯布局
- 双飞翼布局
- 多行、多列自适应布局
- 文本超出省略号显示

### 1.css 盒模型

> 包括 **内容区域、内边距区域、边框区域和外边距区域**
>
> **content + padding + border + margin**

#### W3C 盒模型（标准盒模型）

![alt W3C 标准盒模型](./img/w3c_box.jpeg)

#### IE 盒模型（怪异盒模型）

![alt W3C 标准盒模型](./img/ie_box.jpeg)

#### 相关属性：box-sizing: content-box/border-box

---

### 2.BFC

#### 什么是 BFC？

> BFC 全称为 **_块级格式化上下文 (Block Formatting Context)_** 。BFC 是 W3C CSS 2.1 规范中的一个概念，它决定了元素如何对其内容进行定位以及与其他元素的关系和相互作用，当涉及到可视化布局的时候，Block Formatting Context 提供了一个环境，HTML 元素在这个环境中按照一定规则进行布局。一个环境中的元素不会影响到其它环境中的布局。比如浮动元素会形成 BFC，浮动元素内部子元素的主要受该浮动元素影响，两个浮动元素之间是互不影响的。这里有点类似一个 BFC 就是一个独立的行政单位的意思。可以说 BFC 就是一个作用范围，把它理解成是一个独立的容器，并且这个容器里 box 的布局与这个容器外的 box 毫不相干。

#### 触发 BFC 的条件

- 根元素或其他包含它的元素
- 浮动元素（float 不是 none）
- 绝对定位元素（position 为 absolute 或 fixed）
- 内联块（display: inline-block）
- 表格单元格（display: table-cell, HTML 表格单元格默认属性）
- 表格标题（display: table-caption, HTML 表格标题默认属性）
- 具有 overflow 且值不是 visible 的块元素
- 弹性盒（flex 或 inline-flex）
- display: flow-root
- column-span: all

#### BFC 的约束规则

- 内部的盒子会在垂直方向上一个接一个排列
- 处于同一个 BFC 中的元素上下 margin 会重叠
- 每个元素的 margin 的左边，与容器的 border 的左边相接触
- BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然
- 计算 BFC 的高度时，考虑 BFC 所包含的所有元素，连浮动元素也参与计算（_经常利用该规则解决元素高度塌陷的问题_）

#### BFC 可以解决的问题

- 垂直外边距重叠问题
- 去除浮动
- 自适应两列布局（float + overflow）

---

### 3.flex 布局（弹性布局 [详情可进入](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html))

> display: flex/inline-flex;

#### 容器的属性

- flex-direction: row | row-reverse | column | column-reverse; 决定主轴方向
- flex-wrap: nowrap | wrap | wrap-reverse; 定义如果一条轴线排不下，如何换行
- flex-flow: flex-direction 属性和 flex-wrap 属性的简写形式，默认值为 row nowrap
- justify-content: flex-start | flex-end | center | space-between | space-around 定义项目在主轴上的对齐方式
- align-items: flex-start | flex-end | center | baseline | stretch 定义项目在交叉轴上如何对齐
  > baseline: 项目的第一行文字的基线对齐。
  >
  > stretch（默认值）：如果项目未设置高度或设为 auto，将占满整个容器的高度。
- align-content: flex-start | flex-end | center | space-between | space-around | stretch 定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用

#### 项目的属性

- order: 定义项目的排列顺序 数值越小，排列越靠前，默认为 0
- flex-grow: 定义项目的放大比例，默认为 0，即如果存在剩余空间，也不放大
- flex-shrink: 定义项目的缩小比例，默认为 1，即如果空间不足，该项目将缩小
- flex-basis: 定义了在分配多余空间之前，项目占据的主轴空间。默认值是 auto，即项目原本的大小
- flex： flex-grow, flex-shrink 和 flex-basis 的简写，默认值为 0 1 auto。后两个属性可选

### 4.清除浮动

- 添加空 div 元素 {clear: both; height :0; overflow: hidden;}

  > 原理：添加一个空 div，利用 css 的 clear: both 清除浮动，让父级能够自动获取高度
  >
  > 优点：简单、代码少、浏览器支持好、不容易出现怪问题
  >
  > 缺点：会添加无用的空 div

- 给浮动元素父级设置高度

  > 原理：直接定义父级元素高度，解决父级高度无法获取高度的问题
  >
  > 优点：简单、代码少、容易掌握
  >
  > 缺点：只适合父级元素定高的情况，要给出精确的高度，如果高度与父级的不一样，会出现问题

- 父级定义::after 伪元素 和 zoom

  ```css
  .float_div:after {
    content: "";
    clear: both;
    display: block;
    height: 0;
    overflow: hidden;
    visibility: hidden;
  }
  .float_div {
    zoom: 1;
  }
  ```

  > 原理 IE8 以上和非 IE 才支持::after，zoom 可解决 ie6 7 浮动问题
  >
  > 优点：浏览器支持好、不容易出现怪问题
  >
  > 缺点：代码多

- 父级设置 overflow: hidden;

  > 原理：必须定义 width 或者 zoom:1;同时不能定义 height；浏览器会自动检查浮动区域的高度
  >
  > 优点：简单、代码少、浏览器支持好
  >
  > 缺点：不能和 position 配合使用，因为超出的范围会被隐藏

- 父级设置 overflow: auto;

  > 原理：必须定义 width 或者 zoom:1;同时不能定义 height；浏览器会自动检查浮动区域的高度
  >
  > 优点：简单、代码少、浏览器支持好
  >
  > 缺点：内部宽高超过父级时，会出现滚动条

- 父级（包括父级同级元素）同时设置浮动

  > 原理：所有盒子一起浮动，就变成一个整体
  >
  > 缺点：会形成新的浮动问题（不推荐使用）

- 父级设置成 display: table;
  > 不推荐使用

### 5.水平垂直居中

- 居中元素宽高固定时

  - absolute + top 50%; left 50% + margin-left: -50%;margin-top: -50%
  - absolute + top bottom left right 0 + margin: auto
  - absolute + top left calc(50% - 居中元素的 1/2 宽高)

- 居中元素宽高未知
  - absolute + transform(-50%, -50%) （transform 属性可相对自身宽高进行偏移）
  - line-height（父元素定高且设置 line-height，text-align:center;居中元素设置为 inline-block，line-height:initial）
  - flex
  - css-table（父元素 display: table-cell,text-align:center,vertical-align: middle;居中元素 display: inline-block）

### 6.圣杯布局（浮动实现）

> 实现过程大致如下：
>
> 1.这三个 div 的 HTML 摆放的先后顺序是有讲究的，middle 这个显示在中间的 div，在 html 里是排在最前面的，然后是 left，最后是 right。
>
> 2.在 container 没有设置 padding，left 这个 div 和 right 这个 div 都没设置 margin 与相对定位 relative 之前，三个 div 都 float：left。这时候页面上显示的是 middle 独占一行，然后是 left 这个 div，然后是 right 这个 div
>
> 3.然后 left 这个 div 设置 margin-left：-100%。这样 left 就能从第二排蹦到第一排最左边并覆盖 middle 这个 div。
>
> 4.right 这个 div 设置 margin-left: -200px;这个值是它自己宽度的大小。然后 right 这个 div 也蹦到第一排最右边并覆盖 middle 这个 div。
>
> 5.这个时候 container 设置 padding，这个 padding 的大小是 left 与 right 这两个 div 分别的宽度，然后 left 与 right 这两个 div 分别再设置相对定位，移动自己宽度的距离，就正常显示了。
>
> 这种布局方式 ie7 都兼容，ie6 没有测试过。。。
>
> 如果想要这三个 div 中间有间隙，那么可以设置 container 的 padding 值与两个 div 的 left 和 right 值。比如上面例子想有 10px 的间隙，那就设置 left 这个 div 的 left 值为-210px，right 这个 div 的 right 值为-210px,然后设置 container 的 padding:0 210px。就能达到效果

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

> 这种方式实现的思路是：左右两边绝对定位，然后中间的 div 设置 left right，也能达到同样的效果。也不用在意中间的三个 div 的排版顺序
>
> 这种布局想要中间有间隙，只要 left right 的值分别大于左右两个 div 的宽度就行了
>
> 也兼容 ie7，ie6 没测试过

```html
<div class="container2">
  <div class="left red">left</div>
  <div class="middle green">middle</div>
  <div class="right yellow">right</div>
</div>
```

```css
.container2 {
  position: relative;
  height: 200px;
  .left,
  .middle,
  .right {
    position: absolute;
    height: 100%;
    text-align: left;
  }
  .left,
  .right {
    width: 200px;
  }
  .left {
    left: 0;
  }
  .right {
    right: 0;
  }
  .middle {
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

> 双飞翼布局和圣杯布局看起来都差不多，但是最大的不同就是：双飞翼布局中 middle 中间的这个 div 里面还有一个 div，主要通过这个 div 的 margin 值来达到布局的目的。然后 left 和 right 这两个 div 都不用再设置相对定位 relative。其它的都基本一样
>
> 这个布局的间隙就是设置 middle 这个 div 里面的 div 的 margin 左右的值大于两边 div 宽度就行了。
>
> 兼容 ie7，ie6 未测试过。
>
> 总结：圣杯布局的 HTML 中 div 的顺序都是自适应宽度的 div 排最前，然后是固定宽度的 div。然后只操作固定宽度的 div 的 margin 等值，然后装这三个 div 的盒子设置 padding 值，最后自适应宽度的 div 就只需设置 100%宽度和浮动就行了。

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
.container3 {
  margin-top: 20px;
  height: 200px;
  .left,
  .right,
  .middle {
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
