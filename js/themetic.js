var map;
var thematicLayer;
var highligthLayer;
function addBaseLayer(){
	// 设置地图范围
	map=new L.map("map").setCenterPoint([120.28125,36.54495],1);

	thematicLayer = L.themeticLayer("http://10.140.246.42:8399/arcgis/rest/services/wqt_06_bingqu_2016_100/MapServer",
							{layerIndex:2,whereClause:""}).addTo(map);
	
	// 电网网架地图，直接添加,显示输电导线和输电电缆
	L.rrServiceLayer("http://10.140.246.184:10072/?FORMAT=png&WIDTH={W}&BBOX={XMIN},{YMIN},{XMAX},{YMAX}&MAPID=110&LAYERS={LAYERS}&HEIGHT={H}",
			{LAYERS:"02010100000,02020100000"}).addTo(map);
			
	highlightLayer = L.graphicsLayer().addTo(map);
	// 比例尺
	L.control.scale().addTo(map);
}
//API 示例代码
function appShow(){
	highlightLayer.removeAll();
	thematicLayer.queryByGeometry(2,"1=1",L.mapPoint(117.53326132964682,36.46877614959979),function (graphics){
		for(var i=0;i<graphics.length;i++){
			graphics[i].addTo(highlightLayer);
		}
	});
	thematicLayer.queryByFieldValue(2,'level','1',function (graphics){
		for(var i=0;i<graphics.length;i++){
			graphics[i].addTo(highlightLayer);
		}
	});
}
function showAll(){
	thematicLayer.setWhereClause(2,"");
}
function changeLevel(){
	thematicLayer.setWhereClause(2,"level='1'");
}
function addToolbar(){
	L.control.toolbar({position:'topleft'}).addTo(map);
}
function glowThemeticMap(){
	thematicLayer.glow();
}
function loadMap(){
	addBaseLayer();
	addToolbar();
}
$(function(){
	loadMap();
});
