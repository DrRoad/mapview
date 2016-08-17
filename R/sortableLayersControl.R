sortableLayersControlDependencies <- function() {
  list(
    htmltools::htmlDependency(
      "Sortable",
      '1.4.2',
      system.file("htmlwidgets/lib/sortable_layers_control", package = "mapview"),
      script = c("Sortable.js")
    ),
    htmltools::htmlDependency(
      "sortableLayersControl",
      '0.0.1',
      system.file("htmlwidgets/lib/sortable_layers_control", package = "mapview"),
      script = "sortableLayersControl.js",
      stylesheet = 'sortableLayersControl.css'
    )
  )
}

sortableLayersControlDependencies2 <- function() {
  list(
    htmltools::htmlDependency(
      "Sortable",
      '1.4.2',
      system.file("htmlwidgets/lib/sortable_layers_control", package = "mapview"),
      script = c("Sortable.js")
    ),
    htmltools::htmlDependency(
      "sortableLayersControl",
      '0.0.1',
      system.file("htmlwidgets/lib/sortable_layers_control", package = "mapview"),
      script = "sortableLayersControl2.js",
      stylesheet = 'sortableLayersControl.css'
    )
  )
}


#
# # ' Add full screen control to map
# # '
# # ' Add full screen control (https://github.com/brunob/leaflet.fullscreen)
# # ' @param map the map to add the tile layer to
# # ' @return modified map object
# # '
# # ' @examples
# # ' leaflet() %>%
# # '   addControlFullScreen()
# # ' @export
# addEasyButton <- function(
#   map
# ) {
#   map$dependencies <- c(map$dependencies, leafletFullScreenDependencies())
#   invokeMethod(map, leaflet::getMapData(map), 'addControlFullScreen')
# }

sortableLayersControl <- function(map, layer.names) {

  map$dependencies <- c(map$dependencies, sortableLayersControlDependencies())
  leaflet::invokeMethod(map, leaflet:::getMapData(map), 'sortableLayersControl')

}


sortableLayersControl2 <- function(map, layer.names) {

  map$dependencies <- c(map$dependencies, sortableLayersControlDependencies2())
  leaflet::invokeMethod(map, leaflet:::getMapData(map), 'sortableLayersControl2')

}
