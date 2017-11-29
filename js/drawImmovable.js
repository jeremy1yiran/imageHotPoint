var map;
var imageWidth = 480;
var imageHeight = 270;
var gLayer;
function addBaseLayer(){
	// 设置地图范围
	map=new L.map("map",{
		crs:L.CRS.Simple,//普通图片地图所用坐标系
		dragging:true,// 禁用拖拽功能
		doubleClickZoom:false,//禁用双击放大功能
		scrollWheelZoom:false,//禁用滚轮缩放
		zoomControl:true, // 隐藏缩放工具
		zoomSnap:0.2,
		minZoom:0
	});
	//map=new L.map("map",{crs:L.CRS.Simple,minZoom:-1});

	var bounds = [[0,0],[imageHeight,imageWidth]];
	// 矢量切片地图
	var vectorLayer = L.imageOverlay('./images/building2.png',bounds).addTo(map);
	map.fitBounds(bounds);
}


function setDrawMapPointTool (){
	map.drawTool.setDrawMapPointTool({
		drawLayer:gLayer,
	onDrawEnd:function(graphic){
		alert(graphic);
	}});
}
function setDrawPolylineTool (){
	map.drawTool.setDrawPolylineTool({drawLayer:gLayer,onDrawEnd:function(graphic){
		alert(graphic);
	}});
}
function setDrawPolygonTool (){
	map.drawTool.setDrawPolygonTool({drawLayer:gLayer,onDrawEnd:function(graphic){
		var pg = graphic.getGeometry();
		var pts = pg.getPoints();
		var array = new Array();
		for(var i=0;i<pts.length;i++){
			for(var j=0;j<pts[i].length-1;j++){
				//console.log(pts[i][j].getX()+","+pts[i][j].getY());
				var array_second = new Array();
				//array[j]=pts[i][j].getX()+","+pts[i][j].getY();
			    array_second[0] = pts[i][j].getX();
			    array_second[1] = imageHeight-pts[i][j].getY();
			    console(array_second[0]+","+array_second[1]);
				console("Find position in console");
			    array[j] = array_second;
			}
		}
		
	}});
}
function setDrawRectTool (){
	map.drawTool.setDrawRectTool({drawLayer:gLayer,onDrawEnd:function(graphic){
		alert(graphic);
	}});
}
function setDrawCircleTool (){
	map.drawTool.setDrawCircleTool({drawLayer:gLayer,onDrawEnd:function(graphic){
		alert(graphic);
	}});
}
function stop (){
	map.drawTool.disable();
}
function addToolbar(){
	L.control.toolbar({position:'topleft'}).addTo(map);
}
$(function(){
	addBaseLayer();
	//addCustomLayer();
	addToolbar();
});