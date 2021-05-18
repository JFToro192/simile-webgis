//Panels
let rmPanel = document.querySelector(".slider");
let awPanel = document.querySelector(".about-webgis");
let apPanel = document.querySelector(".about-project");
let tocPanel = document.querySelector(".table-content-container");
let tcPanel = document.querySelector(".time-manager");
let bmPanel = document.querySelector(".basemap-container");
let mtPanel = document.querySelector(".metadata-panel");

//Buttons
let rmButt =  document.querySelector(".btn-readme");
let awButt =  document.querySelector(".btn-webgis");
let apButt =  document.querySelector(".btn-project");
let tocButt =  document.querySelector(".ol-layers-show");
let tcButt = document.querySelector(".ol-time");
let bmButt = document.querySelector(".ol-basemap");
let mtButt = document.querySelector(".ol-metadata");

//Show Readme
rmButt.onclick = function() {
    if(rmPanel.classList.contains("active")){
        rmPanel.classList.remove("active");
    }
    else{
        rmPanel.classList.add("active");
    }
}

//Show About Project
apButt.onclick = function() {
    if(apPanel.classList.contains("active")){
        apPanel.classList.remove("active");
    }
    else{
        apPanel.classList.add("active");
    }
}

//Show About WebGIS
awButt.onclick = function() {
    if(awPanel.classList.contains("active")){
        awPanel.classList.remove("active");
    }
    else{
        awPanel.classList.add("active");
    }
}

//Show table of contents
tocButt.onclick = function() {
    if(tocPanel.classList.contains("active")){
        tocPanel.classList.remove("active");
    }
    else{
        tocPanel.classList.add("active");
    }
}

//Show time control
tcButt.onclick = function() {
    if(tcPanel.classList.contains("active")){
        tcPanel.classList.remove("active");
    }
    else{
        tcPanel.classList.add("active");
    }
}

// Show basemap options
bmButt.onclick = function() {
    if(bmPanel.classList.contains("active")){
        bmPanel.classList.remove("active");
    }
    else{
        bmPanel.classList.add("active");
    }
}

// Show layer metadata
mtButt.onclick = function() {
    if(mtPanel.classList.contains("active")){
        mtPanel.classList.remove("active");
    }
    else{
        mtPanel.classList.add("active");
    }
}

// Display layer metadata
function showHideMetadata() {
    let about =  document.querySelector(".metadata-panel");
    if(about.classList.contains("active")){
        about.classList.remove("active");
    }
    else{
        about.classList.add("active");
    }
}

// Slider
function showHideSlider() {
    let slider =  document.querySelector(".slider");
    if(slider.classList.contains("active")){
        slider.classList.remove("active");
        $('.slides').find('.slide').addClass('active');
        $('.slides').find('.manual-btn').addClass('active');
    }
    else{
        slider.classList.add("active");
        $('.slides').find('.slide').removeClass('active');
        $('.slides').find('.manual-btn').addClass('active');
    }
}


// // Automatic navigation of slideshow
// var counter = 1;
// setInterval(function(){
// document.getElementById('radio' + counter).checked = true;
// counter++;
// if(counter > 4){
//     counter = 1;
// }
// }, 10000);
module.exports = { showHideMetadata };