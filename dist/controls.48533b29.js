parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"ZsLb":[function(require,module,exports) {
var e=document.querySelector(".slider"),t=document.querySelector(".about-webgis"),c=document.querySelector(".about-project"),a=document.querySelector(".table-content-container"),s=document.querySelector(".nav-items.readme"),i=document.querySelector(".nav-items.webgis"),n=document.querySelector(".nav-items.about"),o=document.querySelector(".ol-layers-show");function l(){var e=document.querySelector(".table-content-container");e.classList.contains("active")?e.classList.remove("active"):e.classList.add("active")}function r(){var e=document.querySelector(".time-manager");e.classList.contains("active")?e.classList.remove("active"):e.classList.add("active")}function d(){var e=document.querySelector(".plot-container");e.classList.contains("active")?e.classList.remove("active"):e.classList.add("active")}function v(){var e=document.querySelector(".basemap-container");e.classList.contains("active")?e.classList.remove("active"):e.classList.add("active")}function u(){var e=document.querySelector(".metadata-panel");e.classList.contains("active")?e.classList.remove("active"):e.classList.add("active")}function m(){var e=document.querySelector(".slider");e.classList.contains("active")?(e.classList.remove("active"),$(".slides").find(".slide").addClass("active"),$(".slides").find(".manual-btn").addClass("active")):(e.classList.add("active"),$(".slides").find(".slide").removeClass("active"),$(".slides").find(".manual-btn").addClass("active"))}n.onclick=function(){c.classList.contains("active")?c.classList.remove("active"):c.classList.add("active")},i.onclick=function(){t.classList.contains("active")?t.classList.remove("active"):t.classList.add("active")},o.onclick=function(){a.classList.contains("active")?a.classList.remove("active"):a.classList.add("active")};var L=1;setInterval(function(){document.getElementById("radio"+L).checked=!0,++L>4&&(L=1)},1e4);
},{}]},{},["ZsLb"], null)
//# sourceMappingURL=controls.48533b29.js.map