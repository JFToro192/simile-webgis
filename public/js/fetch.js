import { readLayers, layerDict, createListElements, groupLayers, setupLayers } from "./functions";

import 'ol/ol.css';
import {Map, View} from 'ol';
import Overlay from 'ol/Overlay';
import {Image as ImageLayer, Group as LayerGroup, Tile as TileLayer} from 'ol/layer';
import ImageWMS from 'ol/source/ImageWMS';
import OSM from 'ol/source/OSM';
import {createStringXY} from 'ol/coordinate';
import {toLonLat} from 'ol/proj';
import {toStringHDMS} from 'ol/coordinate';
import Stamen from 'ol/source/Stamen';
import {FullScreen, OverviewMap, ScaleLine, defaults as defaultControls} from 'ol/control';
import MousePosition from 'ol/control/MousePosition';

var baseURLWMS = "http://127.0.0.1/geoserver/geonode/wms";//geonode workspace
var getCapabilitiesURL = "http://127.0.0.1/geoserver/ows?service=wms&version=1.3.0&request=GetCapabilities";

const staticLayers = document.querySelector('#layer1');
const timeSeriesLayers = document.querySelector('#layer2');
const map = document.querySelector('#map');

fetch(getCapabilitiesURL)
  .then(response => response.text())
  .then(data => {
    const parser = new DOMParser();
    const xml = parser.parseFromString(data, "application/xml");
    return xml;
  })
  .catch(console.error)
  .then(xml => {
    var layers = xml.getElementsByTagName("Layer")[0].getElementsByTagName("Layer");
    var listNames = readLayers(layers);
    var layerCount = layerDict(listNames);//[Layer Repetition (obj), Layer Dates(obj)]
    /*Target the corresponding list according to the time series*/
    let n = 0;//counter for static layers;
    let k = 0;//counter for time series layers;
    let t = 2;//id for the corresponding time series;
    Object.keys(layerCount[0]).forEach(function(key) {
      if (layerCount[0][key]==1){
        createListElements(key,staticLayers,1,n);
        n = n + 1;
      } else {
        createListElements(key,timeSeriesLayers,t,k);
        t = t + 1;
      }
    });
    /*Create the layer groups*/
    var layerGroups = groupLayers(baseURLWMS,layerCount);
    return {layerGroups:layerGroups, layerCount:layerCount};
  })
  .then( layerData => {
    var layerGroups = layerData["layerGroups"];
    var layerCount = layerData["layerCount"];
    /*Add the map to the page*/
    // OverviewMap control
    var basemap = [
      new TileLayer({
        source: new OSM(),
      }),
      new TileLayer({
        source: new Stamen({
          layer: 'watercolor',
        }),
        visible: false,
      }),
      new TileLayer({
        source: new Stamen({
          layer: 'terrain',
        }),
        visible: false,
      }),
      new TileLayer({
        source: new Stamen({
          layer: 'toner',
        }),
        visible: false,
      })  ];

    var groupBasemap = new LayerGroup({layers:basemap});

    var source = new OSM();
    var overviewMapControl = new OverviewMap({
      layers: [
        new TileLayer({
          source: source,
        }),
      ],
    });

    console.log(layerGroups);
    /**
    * Elements that make up the popup.
    */
    var container = document.getElementById('pop');
    var content = document.getElementById('popup-content');
    var closer = document.getElementById('popup-closer');
    var featureinfo = document.getElementById('popup-getinfo');
    /**
    * Create an overlay to anchor the popup to the map.
    */
    var overlay = new Overlay({
      element: container,
      autoPan: true,
      autoPanAnimation: {
        duration: 250,
      },
    });

    var view = new View({
        center: [991969.176408, 5777569.219963],
        zoom: 9.5
      })

    // /**
    // * Add a click handler to hide the popup.
    // * @return {boolean} Don't follow the href.
    // */
    // //closer.onclick = function () {
    //   overlay.setPosition(undefined);
    //   closer.blur();
    //   return false;
    // };

    //Mouse coordinate
    var mousePositionControl = new MousePosition({
      coordinateFormat: createStringXY(4),
      projection: 'EPSG:4326',
      // comment the following two lines to have the mouse position
      // be placed within the map.
      className: 'custom-mouse-position',
      target: document.querySelector('.mouse-position'),
      undefinedHTML: 'Coordinates: &nbsp;',
    });
    
    //TODO: Add the groups of layes for the time series as function of the collection length
    //console.log(layerGroups[1].length);

    //Map
    const map = new Map({
      controls: defaultControls().extend([
                                          overviewMapControl,
                                          new ScaleLine(),
                                          mousePositionControl]),
      target: 'map',
      layers: [
        groupBasemap,
        //TODO: Retrieve the new time series autmatically
        // layerGroups[0],
        // layerGroups[1][0],
        // layerGroups[1][1],
        // layerGroups[1][2],
        // layerGroups[1][3],
        // layerGroups[1][4],
      ],
      overlays: [overlay],
      view: view,
    });
    
    setupLayers('#layer', map.getLayerGroup(), layerCount[1]);
    var projectionSelect = document.getElementById('projection');
    projectionSelect.addEventListener('change', function (event) {
      mousePositionControl.setProjection(event.target.value);
    });

    var precisionInput = document.getElementById('precision');
    precisionInput.addEventListener('change', function (event) {
      var format = createStringXY(event.target.valueAsNumber);
      mousePositionControl.setCoordinateFormat(format);
    });

    /**
     * Add a click handler to the map to render the popup.
     */
    // map.on('singleclick', function (evt) {
    //   console.log("hi");
    //   var coordinate = evt.coordinate;
    //   var hdms = toStringHDMS(toLonLat(coordinate));

    //   content.innerHTML = '<p>You clicked here:</p><code>' + hdms + '</code>';
    //   overlay.setPosition(coordinate);

    //   // var viewResolution = /** @type {number} */ (view.getResolution());
    //   // var url = new TileLayer({
    //   //   source: new OSM(),
    //   // }).getFeatureInfo(
    //   //   evt.coordinate,
    //   //   viewResolution,
    //   //   'EPSG:3857',
    //   //   {'INFO_FORMAT': 'text/html'}
    //   // );
    //   // if (url) {
    //   //   fetch(url)
    //   //     .then(function (response) { return response.text(); })
    //   //     .then(function (html) {
    //   //       document.getElementById('pop').innerHTML = html;
    //   //     });
    //   // }
    //   // console.log(features);
    // });

  })
  .catch(console.error);
