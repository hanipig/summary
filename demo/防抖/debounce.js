/*
 * @Description: 
 * @Autor: hanipig
 * @Date: 2021-03-29 21:25:13
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-03-29 23:52:28
 */
var count = 1;
var container = document.getElementById('container');
var cancelBtn = document.getElementById('cancelBtn');

function getUserAction (e) {
  console.log(this);//未防抖时指向目标元素   此时指向window
  console.log(e)//未防抖时指向原生事件对象   此时undefined
  container.innerHTML = count++;
  return "返回值";
};

//未进行防抖处理
// container.onmousemove = getUserAction;
let debounced = debounce(getUserAction, 10000, true);

container.onmousemove = debounced;


cancelBtn.addEventListener("click", function () {
  debounced.cancel();
})

function debounce (fn, wait, immediate) {
  let timer,
    res;

  let debounced = function () {//返回一个函数，相当于这个返回的函数就是之前的getUserAction，所以this指向目标对象、arguments对象可以获取到事件对象
    let context = this;
    let args = arguments;

    if (timer) clearTimeout(timer);//clearTimerout 后timer的值还是之前那个句柄，为truely值

    if (immediate) {
      //如果之前未执行过，则!timer为true 即立即执行
      let callNow = !timer;
      timer = setTimeout(function () {
        timer = null;//每次把timer设置为null，确保每下一次能够立即执行
        console.log("可以再次触发了");
      }, wait)
      if (callNow) {
        res = fn.apply(context, args);
      }
    } else {
      timer = setTimeout(function () {
        fn.apply(context, args);
      }, wait);
    }
    return res;
  }

  debounced.cancel = function () {
    clearTimeout(timer);
    timer = null;
  }

  return debounced;
}