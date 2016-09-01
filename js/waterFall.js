/**
 * 瀑布流
 * 2016/08/30
 */
window.onload = function(){
	waterFall();
	
	window.onscroll = function(){
		if(isScrollShow()){
			//手动数据
			var data = {
				"imgs" : [{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.jpg"},{"src":"5.jpg"},{"src":"6.jpg"},{"src":"7.jpg"},{"src":"8.jpg"},{"src":"9.jpg"},{"src":"10.jpg"},{"src":"11.jpg"},{"src":"12.jpg"},{"src":"13.jpg"},{"src":"14.jpg"},{"src":"15.jpg"},{"src":"16.jpg"},{"src":"17.jpg"},{"src":"18.jpg"},{"src":"19.jpg"},{"src":"20.jpg"},{"src":"21.jpg"}]
			}
			var oCon = document.getElementById('container');
			for(var i=0;i<data.imgs.length;i++){
				var nBox = document.createElement('div');
				nBox.className = 'box';
				nBox.innerHTML = '<div class="pic">'
								+ '<img src="img/' + data.imgs[i].src + '">'
								+ '</div>';
				oCon.appendChild(nBox);
			}
			waterFall();
		}
	}
}

/**
 * 根据窗口大小算出列数，
 * 用定位方法将图片放到最小高度那一列
 */
function waterFall(){
	var oCon = document.getElementById('container'),
		obox = $('box'),
		dWidth = document.body.clientWidth || document.documentElement.clientWidth,	//可见区域宽度
		oboxWidth = obox[0].offsetWidth,		//box宽度
		cols = Math.floor(dWidth/oboxWidth);	//列数
		
//	设置content
	oCon.style.cssText = 'width:' + oboxWidth * cols + 'px;margin: 0 auto';
//	console.log(oboxWidth);
	
	var arrHei = [];	//存放第一行盒子高度
	for(var i=0;i<obox.length;i++){
		if(i<cols){
			arrHei.push(obox[i].offsetHeight);
		}else{
			var minHei = Math.min.apply(null,arrHei);	//获取数组最小高度值
			var minIdx = getMinIdx(arrHei,minHei);		//获取数组最小高度索引
			
			obox[i].style.position = 'absolute';
			obox[i].style.top = minHei + 'px';
			obox[i].style.left = oboxWidth * minIdx + 'px';
			
			arrHei[minIdx] += obox[i].offsetHeight;	//改变数组最小高度的值(即最小值加上追加图片的高)
		}
	}
}

/**
 * 获取classname
 * @param {String} clsname
 */
function $(clsname){
	var doc = document.getElementsByTagName('*');
	var boxes = [];
	for(var i=0;i<doc.length;i++){
		if(doc[i].className == clsname){
			boxes.push(doc[i]);
		}
	}
	return boxes;
}

/**
 * 获取数组中最小值索引
 * @param {Array} arr
 * @param {String} val
 */
function getMinIdx(arr,val){
	for(var n in arr){
		if(arr[n] == val){
			return n;
		}
	}
}

/**
 * 判断是否加载图片
 * return boolean
 */
function isScrollShow(){
	var boxes = $('box');
	var length = boxes.length;
	var lastBoxHei = boxes[length-1].offsetTop + Math.floor(boxes[length-1].offsetHeight/2);
	
	//滚动高度，混杂模式 || 标准模式
	var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
	var hei = document.body.clientHeight || document.documentElement.clientHeight;
	
//	console.log(lastBoxHei+'?'+theHei);
	return lastBoxHei < scrollTop + hei;
}
