import { showHideMetadata } from "./controls";

//Metadata panel fields
const layerTitle = document.querySelector(".metadata-title").querySelector("h5");
const layerLegend = document.querySelector(".metadata-contents-legend").querySelector("img");
const layerAbstract = document.querySelector(".metadata-contents-abstract").querySelector("span");
const layerTimeStart = document.querySelector(".metadata-contents-time-start").querySelector("span");
const layerTimeEnd = document.querySelector(".metadata-contents-time-end").querySelector("span");
const layerUnits = document.querySelector(".metadata-contents-units").querySelector("span");
const timeSlider = document.querySelector(".time-slider__range");
const currentTime = document.querySelector(".time-current-timestamp");
const currentTimeTitle = document.querySelector(".time-current-layer");
const layerBasemap =document.querySelector(".basemap-list__item");

//DATE FORMATTING
function formatDate(date){
  let temp = date.substring(0,4) + '-' + date.substring(4,6) + '-' + date.substring(6,8);
  return temp;
}

//BACK DATE
function backDate(date){
  let temp = date.split('-').join('');
  return temp;
}

//LAYERS AVALIABLE (from getCapabilities httpXMLRequest)
function readLayers(layers) {
  let listNames = [];
  Array.from(layers).forEach(function (arrayItem) {
    let trimName = arrayItem.getElementsByTagName("Name")[0].textContent;
    listNames.push(trimName);
  });
  return listNames;
}

//LAYERS DICTIONARY
/*Function that identifies the repetitions of the layers and extract the dates from the naming*/
function layerDict(layers) {
  var layerDict = {};
  var layerDates = {};
  var uniqueDates =[];
  layers.forEach((layer, i) => {
    let a = layer.split("_");
    let b = a.slice(3,a.length).join("_");
    if (layerDict[b]!=undefined) {
      layerDict[b] = layerDict[b]+1;
      layerDates[b].push(a[2]);
      uniqueDates.push(a[2]);
    }else {
      if (!isNaN(a[2])) {
        layerDict[b] = 1;
        layerDates[b] = [a[2]];
        uniqueDates.push(a[2]);
      } else {
        layerDict[layer.split(":").slice(1,layer.length).join("_")] = 1;
      }
    }
  });
  var dates = uniqueDates.sort();
  return [layerDict,layerDates,dates];
}

//POPULATE THE TABLE OF CONTENTS
/*This function builds the elements inside the table of contents.
  -Checkbox: layer visibility
  -Name: Layer Name
  -Information icon: Container dedicated to provide the layer Information
  -Download icon
  -Opacity icon
  -Opacity slider
*/
function createListElements(layerName,domlist,i,j){
  /*
    -DOMList corresponds to the ul to fill in with the layers list
    -i is the numerical identifier for the typology of layers {1:'static-layers',2:'time-series-layers'}
    -j is the numerical identifier of each layer within a group (assigned consecutively)
  */
  var listElement = domlist;

  /*CREATE THE CONTAINERS FOR EACH LAYER CONTROL*/
  //Create the container for each of the layer controls
  var div_li = document.createElement('div');
    div_li.setAttribute("id","divLi");
    div_li.setAttribute("class","divLi");
  //Create the container for the show/hide control
  var div_chck = document.createElement('div');
    div_chck.setAttribute("id","divChck");
    div_chck.setAttribute("class","divLi__chck");
  //Create the container for the label name
  var div_layerName = document.createElement('div');
    div_layerName.setAttribute("id","divLayerName");
    div_layerName.setAttribute("class","divLi__layerName");
    div_layerName.setAttribute("title",layerName);
  //Create the container for the info control
  var div_layerInfo = document.createElement('div');
    var a_layerInfo = document.createElement('a');
    var i_layerInfo = document.createElement('i');
    i_layerInfo.setAttribute("id",`info${i}${j}`);
    i_layerInfo.setAttribute("class","fas fa-info-circle legend-info info");
    i_layerInfo.setAttribute("title","Layer Info");
    a_layerInfo.appendChild(i_layerInfo);
    div_layerInfo.appendChild(a_layerInfo);
    div_layerInfo.setAttribute("id","divLayerInfo");
    div_layerInfo.setAttribute("class","divLi__layerInfo");
    //Create the container for the info control
  var div_layerDownload = document.createElement('div');
    var a_layerDownload = document.createElement('a');
    a_layerDownload.setAttribute("class","link-download");
    var i_layerDownload = document.createElement('i');
    i_layerDownload.setAttribute("id",`download${i}${j}`);
    i_layerDownload.setAttribute("class","fa fa-download layer-download download");
    i_layerDownload.setAttribute("title","Download GEOTIFF");
    a_layerDownload.appendChild(i_layerDownload);
    div_layerDownload.appendChild(a_layerDownload);
    div_layerDownload.setAttribute("id","divLayerDownload");
    div_layerDownload.setAttribute("class","divLi__layerDownload");

  var div_layerOpacity = document.createElement('div');
    var a_layerOpacity = document.createElement('a');
    var i_layerOpacity = document.createElement('i');
    i_layerOpacity.setAttribute("class","fas fa-adjust");
    i_layerOpacity.setAttribute("title","Layer Opacity");
    a_layerOpacity.appendChild(i_layerOpacity);
    div_layerOpacity.appendChild(a_layerOpacity);
    div_layerOpacity.setAttribute("id","divLayerOpacity");
    div_layerOpacity.setAttribute("class","divLi__layerOpacity");

  /*CREATE THE ELEMENTS FOR EACH LAYER CONTROL*/
  var li = document.createElement('li');
    li.setAttribute("id","layer"+i+j);

  /*CREATE THE CONTROLS FOR EACH LAYER*/
  var inp_chck = document.createElement('input');
    inp_chck.setAttribute("id","visible"+i+j);
    inp_chck.setAttribute("class","visible");
    inp_chck.setAttribute("type","checkbox");
  var sp_chck = document.createElement('span');
    sp_chck.setAttribute("class","tooltip");
    //sp_chck.textContent = "Show/Hide";
  var sp = document.createElement('span');
    sp.textContent = layerName;
  var inp_op = document.createElement('input');
    inp_op.setAttribute("class","opacity");
    inp_op.setAttribute("type","range");
    inp_op.setAttribute("min","0");
    inp_op.setAttribute("max","1");
    inp_op.setAttribute("step","0.01");

  /*ORGANISE THE CONTROLS INSIDE THE CONTAINERS*/
    //Assign the controls to the corresponding container
    div_chck.appendChild(inp_chck);
    div_chck.appendChild(sp_chck);
    div_layerName.appendChild(sp);
    // div_layerOrder.appendChild(z_order);
    div_layerOpacity.appendChild(inp_op);
    //Group the controls containers to a single div
    div_li.appendChild(div_chck);
    div_li.appendChild(div_layerName);
    // div_li.appendChild(div_layerOrder);
    div_li.appendChild(div_layerInfo);
    div_li.appendChild(div_layerDownload);
    div_li.appendChild(div_layerOpacity);
    //Assign the div of containers as a list
    li.appendChild(div_li);
    listElement.appendChild(li);
}

//Compose the request to arrange the styles for the visualization
function composeRequest(date,key){
  let params = {'LAYERS': 'a__'+date+'_'+key, 'STYLES': `geonode:${key.split('_')[1]}`};
  return params;
}

import {Image as ImageLayer, Group as LayerGroup} from 'ol/layer';
import ImageWMS from 'ol/source/ImageWMS';

function groupLayers(baseURLWMS,layerCount) {
  let gstatic = [];
  let gtimeseries = [];
  Object.keys(layerCount[0]).forEach(function(key) {
    if (layerCount[0][key]==1){
      gstatic.push(
        new ImageLayer({
          source: new ImageWMS({
            url: baseURLWMS,
            params: {'LAYERS': key},
          }),
          visible: false,
          opacity: 0.5,
          zIndex: 0
        }));
    } else {
        let ts = [];
        layerCount[1][key].forEach((date, i) => {
          let tstemp = new ImageLayer({
            source: new ImageWMS({
              url: baseURLWMS,
              params: composeRequest(date,key),
            }),
            visible: false,
            opacity: 0.5,
            zIndex: 0,
            date:date,
            typename:key,
          }); 
          //Provide a date {key:value} pair to the image object to
          ts.push(tstemp);
        });
        gtimeseries.push(new LayerGroup({layers:ts}));
      }
  });
  gstatic = new LayerGroup({layers:gstatic});
  var groups = [];
  groups.push(gstatic);
  groups.push(gtimeseries);

  return groups;
}

//LAYERS DISPLAY
/*This functions control the visualisation of the layers*/
function bindInputs(layerid, layer, layerDates) {
  //Checkbox layer visibility
  var visibilityInput = $(layerid + ' input.visible');
  visibilityInput.on('change', function () {
    layer.setVisible(this.checked);
  });
  visibilityInput.prop('checked', layer.getVisible());

  //TODO: retrieve the abstract provided for the layer. Currently: alternative abstract according to layer typology
  var infoInput = $(layerid + ' i.info');
  infoInput.on('click', function () {
    if('source' in layer.values_){
      let layerName = layer.values_.source.params_.LAYERS;
      let layerSplit = layerName.split('_');
      let layerNameShort =  layerSplit.slice(3,layerSplit.length).join('_');
      let legend = layer.values_.source.getLegendUrl();

      //TODO: Temporal variable while retrieving the abstract for the server
      let abstract = {
        'CHL':'The chlorophyll (CHL) maps (unit of measurement mg/m^-3) were obtained from the images acquired by the OLCI sensor on board the Sentinel-3 satellite of the European Space Agency (ESA) and have a spatial resolution of 300 m.)',
        'TSM':'The Transported Solid Matter (TSM). is a measure of the concentration of particles (mg/L), both organic and inorganic, suspended in water, and relates closely to water turbidity. The water temperature is known to affect the metabolic rates and biological activity of aquatic lifeforms and can change the solubility of certain compounds.',
        'LST':'Lake surface water temperature (LST) describes the temperature of the lake surface (°C), one important indicator of lake hydrology and biogeochemistry. Temperature trends observed over many years can be an indicator of how climate change affects the lake.'
      }

      //TODO: Temporal variable hosting the units for the layers
      let units = {
        'CHL':'mg/m^-3',
        'TSM':'mg/L',
        'LST':'°C'
      }

      showHideMetadata();
      
      layerTitle.innerHTML = layerNameShort;
      layerLegend.setAttribute("src",`${legend}&STYLE=geonode:${layerSplit[layerSplit.length - 1]}`)
      layerAbstract.innerHTML = abstract[layerSplit[layerSplit.length - 1]];
      layerTimeStart.innerHTML=formatDate(layerDates[layerNameShort][0]);
      layerTimeEnd.innerHTML=formatDate(layerDates[layerNameShort][layerDates[layerNameShort].length - 1]);
      layerUnits.innerHTML=units[layerSplit[layerSplit.length - 1]];

      timeSlider.setAttribute("min",0);
      timeSlider.setAttribute("max",layerDates[layerNameShort].length-1);
      timeSlider.setAttribute("value",layerDates[layerNameShort].length-1);
      timeSlider.setAttribute("step",1);

      //Initialize the current time on info request
      currentTime.innerHTML= formatDate(layerDates[layerNameShort][ layerDates[layerNameShort].length-1]);
      currentTimeTitle.innerHTML = layerNameShort;

      //Slider time
      timeSlider.addEventListener('input', function () {
        currentTime.innerHTML = formatDate(layerDates[layerNameShort][this.value]);
      });
    }
  });

  timeSlider.addEventListener('input', function () {
    if ('date' in layer.values_){      
      let d = backDate(currentTime.textContent);
      let n = layerTitle.innerHTML;
      if (layer.values_.typename==n && layer.values_.date==d){
        layer.setVisible(true);
        layer.setOpacity(1);
      } else{
        layer.setVisible(false);
      }
    }
  });

  //Download layer GeoTIFF WMS.
  //TODO: WCS request and bounding box for download. And select the projection for the download. Currently WGS84/UTM zone 32N (EPSG:32632) 
  var downloadInput = $(layerid + ' i.download');
  downloadInput.on('click', function () {
    if('source' in layer.values_){
      let layername = layer.values_.source.params_.LAYERS;
      let layerUrl = layer.values_.source.getUrl();
      window.open(layerUrl+'?service=WMS&version=1.1.0&request=GetMap&layers=geonode%3A'+layername+'&bbox=436050.38%2C5050939.04%2C543016.94%2C5122457.00&width=768&height=684&srs=EPSG%3A32632&styles=&format=image%2Fgeotiff'); 
    }
  });

  //Slider layer opacity
  var opacityInput = $(layerid + ' input.opacity');
  opacityInput.on('input', function () {
    layer.setOpacity(parseFloat(this.value));
  });
  opacityInput.val(String(layer.getOpacity()));

  //Change Basemaps

}
    
function setupLayers(id, group, layerDates) {
  group.getLayers().forEach(function (layer, i) {
    var layerid = id + i;
        
    bindInputs(layerid, layer, layerDates);
    if (layer instanceof LayerGroup) {
      setupLayers(layerid, layer, layerDates);
    }
  });
}

module.exports = { readLayers, layerDict, createListElements, groupLayers, setupLayers };

