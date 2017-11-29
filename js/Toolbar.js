L.Control.Toolbar = L.Control.extend({
	onAdd: function (map){
		var toolbar = L.DomUtil.get("toolbar");
		return toolbar;
	},
	onRemove:function (map){
		
	}
});
L.control.toolbar = function (options){
	return new L.Control.Toolbar(options);
}