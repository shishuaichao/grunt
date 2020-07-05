"use strict";

setTimeout(function () {
  console.log(1234);
}, 4000);


function goOne () {
  window.location.href = location.origin + '/src/pages/page1.html'
}