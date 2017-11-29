var map;
function addBaseLayer(){
	// 设置地图范围
	map=new L.map("map").setCenterPoint([120.28125,36.54495],1);
	// 矢量切片地图
	var vectorLayer = L.commonTileLayer("http://10.140.246.54:8399/arcgis/rest/services/sd_vector0704/MapServer",{maxZoom:12}).addTo(map);
	// 影像切片地图
	var rasterLayer = L.commonTileLayer("http://10.140.246.54:8399/arcgis/rest/services/SDDOM/MapServer",{maxZoom:12});
	
	var thematicLayer = L.commonTileLayer("http://10.140.246.42:8399/arcgis/rest/services/wqt_06_bingqu_2016_30/MapServer",{maxZoom:12});
	var thematicLayer1 = L.commonTileLayer("http://10.140.246.42:8399/arcgis/rest/services/wqt_06_bingqu_2016_50/MapServer",{maxZoom:12});
	
	var thematicLayer2 = L.rrServiceLayer("http://10.140.246.42:8399/arcgis/rest/services/TH_WQT_dsmd_2016/MapServer/export?size={W},{H}&bboxSR=4490&format=png8&dpi=96&f=image&imageSR=4490&transparent=true&bbox={XMIN},{YMIN},{XMAX},{YMAX}");
	
	// 电网网架地图，直接添加,显示输电导线和输电电缆
	L.rrServiceLayer("http://10.140.246.184:10072/?FORMAT=png&WIDTH={W}&BBOX={XMIN},{YMIN},{XMAX},{YMAX}&MAPID=110&LAYERS={LAYERS}&HEIGHT={H}",
			{LAYERS:"02010100000,02020100000"}).addTo(map);
	// 图层控制器
	var baseLayers = {
		"影像地图": rasterLayer,
		"冰区分布图_30年一遇":thematicLayer,
		"冰区分布图_50年一遇":thematicLayer1,
		"矢量专题图":thematicLayer2,
		"矢量地图": vectorLayer
	};
	L.control.layers(baseLayers, {}).addTo(map);
	// 比例尺
	L.control.scale().addTo(map);
}
//添加17地市坐标地图
function addSDMap(){
	//17地市图层
	var gLayer = L.graphicsLayer().addTo(map).bringToFront();
	for ( var i = 0; i < mapContent.MapContent.length; i++) {
		var geo = mapContent.MapContent[i].geometry.rings;
		//黑色边线，不填充
		L.graphic(L.polygon(geo),L.simpleFillSymbol({fill:false,opacity:1,weight:2,color: '#FF'})).addTo(gLayer);
	}
}
//API 示例代码
function appShow(){
	// 添加图层示例//{minZoom:2,maxZoom:4}
	var gLayer = L.graphicsLayer({id:"gLayer"}).addTo(map).bringToBack();
	// 添加线示例
	var mapPoints = [
	                 [116.99306459576137, 36.69806863523607],
	                 [117.6, 36.69806863523607],
	                 [117.9, 36.99806863523607]
	                  ];
	L.graphic(L.polyline(mapPoints),L.simpleLineSymbol({color: 'red'})).addTo(gLayer);
	mapPoints = [
	           	[117.99306459576137, 36.79806863523607],
	            [118.99306459576137, 36.79806863523607],
	            [118.0 ,36.99806863523607 ]
	          ];
	// 面示例
	L.graphic(L.polygon(mapPoints),L.pictureFillSymbol({image:"./images/i_globe.png",color: 'red'})).addTo(gLayer);
	
	L.graphic(L.polygon(mapPoints),L.textSymbol({text:"测试文本",fontSize:20})).addTo(gLayer);
	
	// 点示例
	// 普通圆点
//	L.graphic(L.mapPoint(120.28125,36.54495),L.simpleMarkerSymbol({style:"circle",width:20,height:100})).addTo(gLayer);
	// 文本点
//	L.graphic(L.mapPoint(120.28125,36.54495),L.textSymbol({text:"测试文本",fontSize:20})).addTo(gLayer);
	// 图片点
//	var imagePoint = L.graphic(L.mapPoint(120.28125,36.54495),L.pictureMarkerSymbol({image:"./images/i_globe.png",width:20,height:30}));
	
	//动画示例
	var imagePoint = L.graphic(L.mapPoint(120.28125,36.54495),L.pictureMarkerSymbol({image:"./images/i_globe.png",width:20,height:20}));
	var context = this;
	var anim = null;
	function updown(up){
		// 缓动方式
//		var easing = "Circ.easeIn";
//		if(up)
//			easing = "Circ.easeOut";//Linear
		var easing = "Linear";
		// 动画类
		anim = L.animation(0,1,function(value,end){
			// 具体动作
			var y,w;
			if(up){
				y = 36.54495 + value * 1;
				w = 50- value * 30;
			}
			else {
				y = 37.54495 - value * 1;
				w = 20+value * 30;
			}
			imagePoint.getGeometry().setY(y);
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
	function resize(){
		var easing = "Circ.easeIn";
		// 动画类
		anim = L.animation(0,1,function(value,end){
			// 具体动作
			var y,w;
			if(up){
				y = 36.54495 + value * 1;
				w = 50- value * 30;
			}
			else {
				y = 37.54495 - value * 1;
				w = 20+value * 30;
			}
			imagePoint.getGeometry().setY(y);
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
		},easing,5000);
	}
	var start = new Date().valueOf();
	imagePoint.addTo(gLayer).on({
		click: function (){
//			gLayer.removeAll();
			if(anim){
				if(anim.isRunning())
					anim.pause();
				else
					anim.resume();
			}
			else {
				start = new Date().valueOf();
				updown(true);
			}
		}
	});
	imagePoint.bindTooltip("my tooltip text").openTooltip();
	imagePoint.bindPopup("my pop text",{closeOnClick:false,autoClose:false}).openPopup();
	
	//单独添加一个气泡,单击地图时不会自动关闭
	var popup = L.popup({closeOnClick:false,autoClose:false})
		.setMapPoint([117.99306459576137, 36.79806863523607])
		.setContent('<p>我是一个popup</p>')
		.openOn(map);
}
function loadMap(){
	// 为NBGISMiniJS 内部类增加方法
	L.Map.include({
		getGraphicsLayer: function (id){
			var gLayer;
			this.eachLayer(function (layer){
				if(layer instanceof L.GraphicsLayer && layer.options.id == id){
					gLayer = layer;
					return true;
				}
			});
			return gLayer;
		}
	});
	
	addBaseLayer();
	addSDMap();
	appShow();
	var gLayer = map.getGraphicsLayer("gLayer");
	debugger;
}
$(function(){
	loadMap();
});
