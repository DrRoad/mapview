library(mapview)
library(sp)
library(raster)

### point vector data ###
## SpatialPointsDataFrame ##
data(meuse)
coordinates(meuse) <- ~x+y
proj4string(meuse) <- CRS("+init=epsg:28992")

mp_svg <- mapview(meuse, zcol = "soil", burst = TRUE)  # three layers

## adding a separate control; not working
##  tricky because most like will want to eliminate current layer control
##  if we pursue this
mapview:::sortableLayersControl(mp_svg@map)
## mutating the current layer control
##  buggy; loses sort ability once a click occurs on the layer control
## also mixed svg and other layers not perfect
##  will be tricky
mapview:::sortableLayersControl2(mp_svg@map)




# SpatialPixelsDataFrame
data(meuse.grid)
coordinates(meuse.grid) <- ~x+y
proj4string(meuse.grid) <- CRS("+init=epsg:28992")
gridded(meuse.grid) <- TRUE
mp_mixed <- mapview(meuse.grid, zcol = "ffreq") + meuse

mapview:::sortableLayersControl2(mp_mixed@map)
