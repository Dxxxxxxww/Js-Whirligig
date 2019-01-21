/**
 *获取dom对象
 *
 * @param {*} id 传入标签id
 * @returns 返回标签对象
 */
function my$(id) {
    return document.getElementById(id);
}


/**
 *
 *中国式时间
 * @param {*} dt Date对象
 * @returns 格式化好的中国式时间字符串
 */
function getDate(dt) {
    var year = dt.getFullYear();
    var month = dt.getMonth() + 1;
    var day = dt.getDate();
    var week = dt.getDay();
    var hour = dt.getHours();
    var min = dt.getMinutes();
    var sec = dt.getSeconds();

    month = fomat(month);
    day = fomat(day);
    week = initWeek(week);
    hour = fomat(hour);
    min = fomat(min);
    sec = fomat(sec);
    
    var str = year + '年' + month + '月' + day + '日' + ',星期' + week + ',' + hour + ':' + min + ':' + sec;
    return str;
}

/**
 *
 *
 * @param {*} week 星期几
 * @returns 格式化好的中国星期
 */
function initWeek(week) {
    switch (week) {
        case 1:
            week = '一';
            break;
        case 2:
            week = '二';
            break;
        case 3:
            week = '三';
            break;
        case 4:
            week = '四';
            break;
        case 5:
            week = '五';
            break;
        case 6:
            week = '六';
            break;
        default:
            week = '日';
            break;
    }
    return week;
}

/**
 *
 *
 * @param {*} dt 日期或者时间
 * @returns 格式化好的日期或时间
 */
function fomat(dt) {
    return dt < 10 ? '0' + dt : dt;
}


/**
 *去除数组中重复元素
 *
 * @param {*} array 有重复元素的数组
 * @returns 返回一个没有重复元素的新数组
 */
function uniqueArr(array){
    var r = [];
    for(var i = 0; i < array.length; i++) {
        for(var j = i + 1; j < array.length; j++){
            if (array[i] === array[j]) {
                j = ++i;
            }
        }
        r.push(array[i]);
    }
    return r;
}



//兼容ie8  
//设置文本
function setInnerText(element, text) {
    if (typeof element.textContent === 'undefined') {
        element.innerText = text;
    }else {
        element.textContent = text;
    }
}
//获取文本
function getInnerText(element) {
    if (typeof element.textContent === 'undefined') {
        return element.innerText;
    }else {
        return element.textContent;
    }
}

/**
 *兼容ie8的为节点/元素绑定事件(一个节点多个事件)
 *
 * @param {*} element 标签/元素
 * @param {*} type    事件类型
 * @param {*} func    事件处理函数
 */
function myAddEventListener(element, type, func) {
    //判断浏览器是否支持
    if (element.addEventListener) {
        element.addEventListener(type,func,false);
    }else if (element.attachEvent){
        element.attachEvent('on'+type,func);
    }else {
        element['on'+type] = func;
    }
}

/**
 *兼容ie8的事件的解绑函数
 *
 * @param {*} element  标签/元素
 * @param {*} type    事件类型
 * @param {*} func    事件处理函数
 */
function myRemoveEventListener(element, type, func) {
    //判断浏览器是否支持
    if (element.removeEventListener) {
        element.removeEventListener(type,func,false);
    }else if (element.detachEvent){
        element.detachEvent('on'+type,func);
    }else {
        element['on'+type] = null;
    }
}

/**
 *传入元素和目标位置 使元素匀速移动到目标位置
 *
 * @param {*} element obj
 * @param {*} target number
 */
function move(element, target) {
    //每次开始时先清理一次定时器。
    if (element.interval) {
      console.log('element.interval==='+element.interval);
      clearInterval(element.interval);
    }
    //当前位置
    var current = element.offsetLeft;
    //步进
    var step = 9;
    step = (target > current) ? step : -step;
    //移动 如果使用var 来创建定时器，那么每点一次就会开辟一个空间创建一个定时器所以将定时器设置在元素的属性上，这样就是改变元素的指向
    element.interval = setInterval(function () {
      current += step;
      if (Math.abs(current - target) > Math.abs(step)) {
        car.style.left = current + 'px';
      }else {
        console.log('element.interval++++'+element.interval);
        clearInterval(element.interval);
        element.style.left = target + 'px';
      }
    },10);
  }

/**
 *兼容代码，获取浏览器滚动值
 *
 * @returns 包含滚动值的对象
 */
function getScroll() {
    return {
      top : window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || -1,
      left : window.scrollX || document.documentElement.scrollLeft || document.body.scrollLeft || -1
    };
}

/**
 *兼容ie8 获取元素css属性值
 *
 * @param {*} element 元素
 * @param {*} attr    css属性
 * @returns           属性值  -1则表示此浏览器不支持所有方法， 无法获取
 */
function getStyle(element, attr) {
    return (window.getComputedStyle? window.getComputedStyle(element, null)[attr]: element.currentStyle[attr]) || -1;
}


//传入元素，任意属性， 目标值，做动画效果
/**
 *动画函数
 *
 * @param {*} element 元素
 * @param {*} json    json对象，包含各种键值对， 键为属性名， 值为目标值
 * @param {*} func    回调函数
 */
function animate(element, json, func) {
    if (element.timeId) {
      clearInterval(element.timeId);
    }
    element.timeId = setInterval(function () {
      //设置标记
      var flag = true;
      for (const attr in json) {
        var current = 0 ;
        var target = 0;
        var step = 0;
        if (attr == 'opacity') {
          current = getStyle(element, attr) * 100; // 乘100 更好算，避免浮点数
          target = json[attr] * 100;
          step = (target - current) / 5;
          step = step > 0 ? Math.ceil(step) : Math.floor(step);
          current += step;
          element.style[attr] = current / 100;
        }else if (attr == 'zIndex') {
          element.style[attr] = json[attr];
        } else {
          current = parseInt(getStyle(element, attr));
          target = json[attr];
          step = (target - current)/5;
          step = step > 0 ? Math.ceil(step) : Math.floor(step);
          current += step;
          element.style[attr] = current + 'px';
        }
        //当遍历json中属性时，倘若有一个属性尚未达到目标值，则将标记改为false，不清除定时器，直至所有值达到目标值。
        if (current !== target) {
          flag = false;
        }
        // console.log('目标位置: '+target+'当前位置: '+current+'当前速度: '+ step);
      }
      if (flag) {
        clearInterval(element.timeId);
        if (func) {
          func();
        }
      }
    }, 20);
  }