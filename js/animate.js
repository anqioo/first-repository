
/**
 * 创建时间：2022/08/24  08:49
 * 创建作者：0711 
 * 封装说明：一个普通的js封装动画
 * 
 * 参数1：dom对象
 * 参数2：描述动画操作属性的对象
 * 参数3：回调函数-结束之后调用
 * */

/*
    animate(box, { left: 200, top: 120, fontSize: 30 }, function() {})
*/

function animate(el, obj, fn) {
    // 默认的规则，在使用这种间歇定时器的时候，先清除一下
    clearInterval(el.timer);
    el.timer = setInterval(function () {
        var flag = true;
        // 因为传入的参数是对象，也就是dom有可能同时需要改变很多的属性
        for (var k in obj) {
            // 业务核心：定时器，步长值，目标距离和当前值
            // obj[k]  目标距离   当前属性 k   当前值  getStyle(el, k);
            var curNum = parseInt(getStyle(el, k)) || 0;
            var steps = (obj[k] - curNum) / 5;

            // 当步长值小于个位，需要取整
            steps = steps > 0 ? Math.ceil(steps) : Math.floor(steps);

            // 通过计算获得需要移动的距离，如果步长值不需要增加了，证明到位置了
            var distance = curNum + steps;
            el.style[k] = distance + 'px';
            if (curNum !== obj[k]) flag = false;
        }

        // 利用标记法判断
        if (flag) {
            clearInterval(el.timer);
            // 如果有回调函数则调用，没有则不调用
            fn && fn();
        }
    }, 25)
}


// 依赖的小封装 - 获取样式
function getStyle(el, attr) {
    if (window.getComputedStyle) {
        // 兼容主流浏览器
        return window.getComputedStyle(el)[attr];
    } else if (el.currentStyle) {
        // 兼容IE低版本浏览器
        return el.currentStyle[attr];
    } else {
        // 获取的是行内样式
        return el.style[attr];
    }
}


/*

function animate(el, obj, fn) {
    // 初始化一个变量，用于接收将来的定时器
    var timer;
    // 因为传入的参数是对象，也就是dom有可能同时需要改变很多的属性
    for (var k in obj) {
        // 每一个属性都分配一个定时器，单独去处理
        ; (function (timer, k) {
            timer = setInterval(function () {
                // 业务核心：定时器，步长值，目标距离和当前值
                // obj[k]  目标距离   当前属性 k   当前值  getStyle(el, k);
                var curNum = parseInt(getStyle(el, k)) || 0;
                var steps = (obj[k] - curNum) / 5;

                // 当步长值小于个位，需要取整
                steps = steps > 0 ? Math.ceil(steps) : Math.floor(steps);

                // 通过计算获得需要移动的距离，如果步长值不需要增加了，证明到位置了
                var distance = curNum + steps;
                if (steps === 0) clearInterval(timer);
                el.style[k] = distance + 'px';
            }, 25)
        })(timer, k)
    }
}

*/