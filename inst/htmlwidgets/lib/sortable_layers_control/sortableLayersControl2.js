LeafletWidget.methods.sortableLayersControl2 = function () {

  var map = this;

  var layerList = map.currentLayersControl._overlaysList;

  Sortable.create(layerList, {
    animation: 150,
    onUpdate: function(evt) {
      sortLayers();
    }
  });

  function getLayer(layerName){
    var layers = map.currentLayersControl._layers;
    var layer = {};
    for(var i in layers){
      if(layers[i].name === layerName) layer = layers[i];
      break;
    }
    return layer;
  }

  function getIds(layerList) {
    var layerNames = $(layerList).find(":checked")
      .parent()
      .map(function(d){
        return $(this).text().substr(1,this.length);
      });

    return layerNames;
  }

  function sortLayers() {
    var ids = getIds(layerList);
    var layers = ids.map(getLayer);
  }

  L.DomEvent.disableClickPropagation(layerList);
};
