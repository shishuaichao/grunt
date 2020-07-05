"use strict";

setTimeout(function () {
  console.log(1234);
}, 4000);


function goTwo () {
  window.location.href = location.origin + '/src/pages/page2.html'
}