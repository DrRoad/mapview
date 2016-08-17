LeafletWidget.methods.sortableLayersControl = function (overlays) {

  L.ControlSort = L.Control.Layers.extend({
  	// @section
  	// @aka Control.Layers options
  	options: {
  		position: 'topleft',

  		// @option autoZIndex: Boolean = true
  		// If `true`, the control will assign zIndexes in increasing order to all of its layers so that the order is preserved when switching them on/off.
  		autoZIndex: true,

  		// @option hideSingleBase: Boolean = false
  		// If `true`, the base layers in the control will be hidden when there is only one.
  		hideSingleBase: true
  	},
  	expand: function(){},
  	collapse: function(){},
  	_initLayout: function(){
  	  var className = 'leaflet-sortable-layers';
      var container = this._container = L.DomUtil.create(
        'div', 'leaflet-control-sortable'
      );

      L.DomEvent.disableClickPropagation(container);

      var form = this._form = this._container;

  		this._baseLayersList = L.DomUtil.create('div', className + '-base', container);
  		this._separator = L.DomUtil.create('div', className + '-separator', container);
  		this._overlaysList = L.DomUtil.create('div', className + '-overlays', container);

  	},
    _addItem: function (obj) {
    	var label = document.createElement('label'),
    	    input,
    	    checked = this._map.hasLayer(obj.layer);

    	if (obj.overlay) {
    		input = document.createElement('input');
    		input.type = 'checkbox';
    		input.className = 'leaflet-control-layers-selector';
    		input.defaultChecked = checked;
    	} else {
    		input = this._createRadioElement('leaflet-base-layers', checked);
    	}

    	input.layerId = L.stamp(obj.layer);

    	L.DomEvent.on(input, 'click', this._onInputClick, this);

    	var name = document.createElement('span');
    	name.innerHTML = ' ' + obj.name;

    	label.appendChild(input);
    	label.appendChild(name);


    	var container = obj.overlay ? this._overlaysList : this._baseLayersList;
    	container.appendChild(label);

    	return label;
    }
});

L.controlSort = function(baseLayers, overlays, options) {
  return new L.ControlSort(baseLayers, overlays, options);
};

var layers = this.currentLayersControl._layers;
var overlay_layers = {};
for(var i in layers) {
  var l = layers[i];
  if(l.overlay === true){
    overlay_layers[l.name] = l.layer;
  }
}

var sortlayer = L.controlSort(null, overlay_layers).addTo(this);

var map = this;

layerList = sortlayer._overlaysList;

var layArr = getIds(layerList);
sortLayers(layArr);

Sortable.create(layerList, {
  animation: 150,
  onUpdate: function(evt) {
    /*
    layArr = getIds(layerList);
    sortLayers(layArr);
    */
  }
});

function sortLayers(layArr) {
  /*
  for (var i = 0; i < layArr.length; i++) {
    var p = map._createPane(layArr[i]);
  	p.style.zIndex = 400 - i;
  }
  */
}

function getIds(inputList) {
  /*
  var outputArr = [];
  for (var i = 0; i < inputList.children.length; i++) {
    outputArr[i] = $(inputList.children[i]).text();
  }
  return outputArr;
  */
}

L.DomEvent.disableClickPropagation(layerList);
};
