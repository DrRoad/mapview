LeafletWidget.methods.sortableLayersControl2 = function () {

  var map = this;

  var layerList = map.currentLayersControl._overlaysList;

  sortLayers(layerList);

  Sortable.create(layerList, {
    animation: 150,
    onUpdate: function(evt) {
      sortLayers(layerList);
    }
  });

  function getLayer(layerName){
    var layers = map.currentLayersControl._layers;
    var layer = {};
    for(var i in layers){
      if(layers[i].name === layerName){
        layer = layers[i];
        break;
      }
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

  function getElements(layerGroup) {
    var els = $.map(
      layerGroup.layer._layers,
      function(layer){
        return layer._container;
      }
    );

    return els;
  };

  function sortLayers(layerList) {
    // currently only supports svg overlays
    //   easy enough though to add z-index to non-svg
    //   but difficult because all svg elements reside in a single svg
    //   so svg combined with non-svg where the non-svg ordered between members
    //   of svg will not work unless we split our svg container
    //   into multiple svgs and place them in separate divs
    //   not impossible but a lot more intrusive

    var ids = getIds(layerList);
    var layers = ids.map(function(i,id){return getLayer(id);});

    // Should the top layer be placed on top or the bottom placed on top?
    //   currently bottom layer in layer control will be placed on top
    //   to change just remove reverse below


    //build from last to first so reverse
    layers.toArray().reverse().map(function(layer){
      var els = $(getElements(layer));
      var svg = els.parent();
      //remove the elements
      els.detach();
      //add them back to beginning of parent svg
      svg.prepend(els);
    });
  }

  L.DomEvent.disableClickPropagation(layerList);
};
