window.onload = function () {
    //第一步：鼠标移入移出，显示和隐藏左右箭头
    // 获取元素
    var container = document.querySelector('.container');
    var arrow = document.querySelector('.arrow');

    container.onmouseenter = function () {
        arrow.style.opacity = 1;
        clearInterval(timer);
    }
    container.onmouseleave = function () {
        arrow.style.opacity = 0;
        clearInterval(timer);
        timer = setInterval(function () {
            right.onclick();
        }, 1500);
    }

    // 第二步：点击小圆点，切换图片
    // 获取元素
    var olLis = document.querySelectorAll('ol li');
    // 移动的是装图片的盒子，所以只用获取ul
    var ulBox = document.querySelector('ul');

    // 先给ul设宽，让ul和宽由图片撑开
    // 1.先得到单张图片的宽
    var imgWidth = ulBox.children[0].offsetWidth;
    // console.log(imgWidth);//590

    // 让图片显示到正确的位置,让ul这个盒子整体向左移一个图片的距离
    ulBox.style.left = -imgWidth + 'px';
    
    // ulBox的宽 = 单个图片的宽 * 图片个数 +'px'
    // ulBox.style.Width = imgWidth * ulBox.children.length + 'px';
    // console.log(ulBox.style.Width);//4720


    // 先遍历给每个小圆点加点击事件
    olLis.forEach(function (item, index) {
        item.onclick = function () {
            // 每次点击小圆点，图片都要移动
            // 小圆点排他
            change(index);

            ulBox.style.left = -imgWidth * (index + 1) + 'px';
            count = index;
        }
    })


    // 第三步：点击右箭头，切换图片
    // 获取元素
    var left = arrow.querySelector('a:first-child');
    var right = arrow.querySelector('a:last-child');
    // console.log(left,right);

    // 右箭点击事件
    // 声明一个变量，记录每次右击的索引
    var count = 0;
    var flag = true;
    right.onclick = function () {
        if (flag) {
            flag = false;
            count++;
        if (count >= ulBox.children.length-2) {
            // ulBox.style.left = -imgWidth + 'px';

            // animate的left是让动画再往后移一张
            // function是让图片立即跳到第一张，做到无缝跳转
            animate(ulBox, { left: -imgWidth * (count + 1) }, function () {
                flag = true;
                ulBox.style.left = -imgWidth + 'px';
            });
            count = 0;
        } else {
            flag = true;
            // ulBox.style.left = -imgWidth * (count + 1) + 'px';
            animate(ulBox, { left: -imgWidth * (count + 1) });
        }
        // 排他放后面，count++等于6时，小圆点就没有样式了
            change(count);
        
        }
    }
    left.onclick = function () {
        if (flag) {
            flag = false;
            count--;
            // 如果count<0,让图片继续往左移动一张，再跳转到最后一张
            if (count < 0) {
            // 不加动画
            // ulBox.style.left = -imgWidth * (count + 1) + 'px';
            // count = ulBox.children.length - 3;
            // ulBox.style.left = -imgWidth * (count + 1) + 'px';

            // 加动画
            animate(ulBox, { left: -imgWidth * (count + 1) }, function () {
                flag = true;
                count = ulBox.children.length - 2;
                ulBox.style.left = -imgWidth * count+ 'px';
            });
            count = ulBox.children.length - 3;
        } else {
            // ulBox.style.left = -imgWidth * (count + 1) + 'px';

            flag = true;
            animate(ulBox, { left: -imgWidth * (count + 1) });
        }
            change(count);
        }
    }

    // 自动播放
    var timer = setInterval(function () {
        right.onclick();
    },1500);



    function change(n) {
        // 小圆点排他
        olLis.forEach(function (item) {
            item.removeAttribute('class');
        })
        olLis[n].className = 'current';
    }
}