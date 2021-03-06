var map;
var imageWidth = 1024;
var imageHeight = 768;
function addBaseLayer(){
	// 设置地图范围
	map=new L.map("map",{
		crs:L.CRS.Simple,//普通图片地图所用坐标系
		dragging:false,// 禁用拖拽功能
		doubleClickZoom:false,//禁用双击放大功能
		scrollWheelZoom:false,//禁用滚轮缩放
		zoomControl:true, // 隐藏缩放工具
		minZoom:-5
	});
	//map=new L.map("map",{crs:L.CRS.Simple,minZoom:-1});
	var bounds = [[0,0],[imageHeight,imageWidth]];
	// 矢量切片地图
	var vectorLayer = L.imageOverlay('./images/test.jpg',bounds).addTo(map);
	map.fitBounds(bounds);
}

function addCustomLayer(){
	var contentXY = function (x,y){
		
		if(L.Util.isArray(x)){
			return L.mapPoint(x[0],imageHeight-x[1]);
		}
		//return L.mapPoint(x,imageHeight-y);
		return L.mapPoint(x,imageHeight-y);
	}

    
	
	var contentXYs = function (xys){
		var mps = [];
		for ( var i = 0; i < xys.length; i++) {
			mps.push(contentXY(xys[i]));
		}
		return mps;
	}
	// 添加图层示例
	var gLayer = L.graphicsLayer({minZoom:-5}).addTo(map);
	// 添加线示例
	var contentPoints = [[0, 0],
	                 [50, 60],
	                 [imageWidth, imageHeight]];
	contentPoints = contentXYs(contentPoints);//转换为地理坐标
	L.graphic(L.polyline(contentXYs(contentPoints)),L.simpleLineSymbol({color: 'white'})).addTo(gLayer);
	/**contentPoints = [
	           	[430,600],
	            [436, 522],
	            [456 ,500 ],
	            [510 ,510 ],
	            [546 ,554 ],
	            [526 ,630 ],
	            [472 ,601 ]	            
	          ];**/
	contentPoints =[[108.19964868337733,729.6878746574106], [250.70650304684992,699.339192709634], [120.07521988033338,618.8492101524874], [120.07521988033338,622.8077338848061]];    
	//contentPoints =[[402.0444242489623,572.0517807885235],[744.3565340380788,422.72099463890896], [445.69496173884966,358.393886759075], [464.0741354188022,404.34182095895636]];           
	//console.log(contentPoints);
	contentPoints = contentXYs(contentPoints);//转换为地理坐标
	console.log(contentPoints);
	// 面示例
	//L.graphic(L.polygon(contentPoints),L.pictureFillSymbol({image:"./images/i_globe.png",color: 'red'})).addTo(gLayer);
	var hotArea = L.graphic(L.polygon(contentPoints),L.simpleFillSymbol({fillColor:'white',fillOpacity:0.1,color: 'white'})).addTo(gLayer);
	
	hotArea.attributes = {name:"测试色块1"};
	hotArea.on({
		click: function (evt){
			var g = evt.target;
			if(g.attributes && g.attributes.name)
				alert(g.attributes.name);
		}
	});
//	//给面添加文本
	L.graphic(L.polygon(contentPoints),L.textSymbol({text:"色块1",fontSize:20,color:'#0000ff'}),{},{interactive:false}).addTo(gLayer);
	
	// 点示例
	// 普通圆点
	L.graphic(contentXY(30,50),L.simpleMarkerSymbol({style:"circle",width:20,height:100})).addTo(gLayer);
	// 文本点
//	L.graphic(contentXY(250,600),L.textSymbol({text:"测试文本",fontSize:20})).addTo(gLayer);
	// 图片点
//	var imagePoint = L.graphic(contentXY(300,300),L.pictureMarkerSymbol({image:"./images/i_globe.png",width:20,height:30})).addTo(gLayer);
	
	//动画示例
	var imagePoint = L.graphic(contentXY(0,0),L.pictureMarkerSymbol({image:"./images/i_globe.png",width:20,height:20}));
	var context = this;
	var anim = null;
	function updown(up){
		// 缓动方式
		var easing = "Circ.easeIn";
		if(up)
			easing = "Circ.easeOut";//Linear
//		var easing = "Linear";
		// 动画类
		anim = L.animation(0,1,function(value,end){
			// 具体动作
			var x,y,w;
			if(up){
				x = imageWidth - value * imageWidth;
				y = imageHeight - value * imageHeight;
				w = 50- value * 30;
			}
			else {
				x = 0 + imageWidth * value;
				y = 0 + imageHeight * value;
				w = 20 + value * 30;
			}
			var xy = contentXY(x,y);
			imagePoint.getGeometry().setX(xy.getX());
			imagePoint.getGeometry().setY(xy.getY());
			imagePoint.getSymbol().options.width = w;
			imagePoint.getSymbol().options.height = w;
			// 地洞Graphic绑定的提示窗
			imagePoint.moveTooltip();
			// 移动Graphic绑定的弹窗
			imagePoint.movePopup();
			// 修改弹窗内容
			imagePoint.bindPopup("curTime:"+Date.now());
			
			imagePoint.redraw();
			if(end){//启动下一动画
				updown(!up);
			}
		},easing,5000);// 5秒
	}
	var start = new Date().valueOf();
	imagePoint.addTo(gLayer).on({
		click: function (){
			if(anim){
				if(anim.isRunning())
					anim.pause();
				else
					anim.resume();
			}
			else {
				start = new Date().valueOf();
				updown(false);
			}
		}
	});
//	imagePoint.bindTooltip("my tooltip text").openTooltip();
//	imagePoint.bindPopup("my pop text",{closeOnClick:false,autoClose:false}).openPopup();
//	
	//单独添加一个气泡,单击地图时不会自动关闭
	var popup = L.popup({closeOnClick:false,autoClose:false})
		.setMapPoint(contentXY(200,200))
		.setContent('<p>我是一个popup</p>')
		.openOn(map);
}
$(function(){
	addBaseLayer();
	addCustomLayer();
});