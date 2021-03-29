/*
 * @Description: 
 * @Autor: hanipig
 * @Date: 2021-03-29 21:25:13
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-03-30 00:31:35
 */
var count = 1;
var container = document.getElementById('container');
var cancelBtn = document.getElementById('cancelBtn');

function getUserAction (e) {
  console.log(this);//未节流时指向目标元素   此时指向window
  console.log(e)//未节流时指向原生事件对象   此时undefined
  container.innerHTML = count++;
  return "返回值";
};

//未进行节流
// container.onmousemove = getUserAction;
// let debounced = debounce(getUserAction, 1000);

// container.onmousemove = throttle1(getUserAction, 3000);

// container.onmousemove = throttle2(getUserAction, 3000);

container.onmousemove = throttle3(getUserAction, 3000);


// cancelBtn.addEventListener("click", function () {
//   debounced.cancel();
// })

//时间戳 由头无尾
function throttle1 (fn, wait) {
  let pre = 0;//上一次的时间戳

  return function () {
    let context = this;
    let args = arguments;
    let curr = +new Date();

    if ((curr - pre) >= wait) {
      fn.apply(context, args);
      pre = curr;
      console.log("可以再次触发了");
    }
  }
}

//定时器 无头有尾
function throttle2 (fn, wait) {
  let timer = null;

  return function () {
    let context = this;
    let args = arguments;

    if (!timer) {
      timer = setTimeout(function () {
        timer = null;
        fn.apply(context, args);
      }, wait);
    }
  }
}

//两者结合 有头有尾
function throttle3 (fn, wait) {
  let timer,
    pre = 0;

  return function () {
    let args = arguments;
    let context = this;
    let curr = +new Date();
    let remaining = wait - (curr - pre);
    if (remaining <= 0 || remaining > wait) {//如果没有剩余的时间了或者改了系统时间
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }

      pre = curr;
      fn.apply(context, args);

    } else if (!timer) {
      timer = setTimeout(function () {
        pre = curr;
        timer = null;
        fn.apply(context, args);
      }, remaining);
    }
  }
}