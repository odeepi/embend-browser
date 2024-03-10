function byId(id) {
  return document.getElementById(id);
}

function byClass(c) {
  return document.getElementsByClassName(c);
}

function fullscreen(elm) {
  (elm.requestFullscreen ? elm.requestFullscreen() : (elm.webkitRequestFullscreen ? elm.webkitRequestFullscreen() : (elm.mozRequestFullScreen ? elm.mozRequestFullScreen() : (elm.msRequestFullscreen ? elm.msRequestFullscreen() : alert('Your browser does not support fullscreen!')))))
}

var currentTab = 1;
var currentTabs = 1;

function openTab(id) {
  for (var i = 0, tabcontents = byId('tabs').children; i < tabcontents.length; i++) {
    tabcontents[i].style.display = 'none';
  }
  for (var i = 0, tabbtns = byId('tabbtns').children; i < tabbtns.length; i++) {
    tabbtns[i].className = tabbtns[i].className.replace(' active', '');
  }
  byId('tab'+id).style.display = 'block';
  currentTab = id;
  byId('tabb'+id).className += ' active';
}

window.onload = function() {
  byId('address').addEventListener('keyup', function (event) {
    if (event.keyCode == 13) {
      document.getElementById('load').click();
    }
  });
}

function load() {
  byId('iweb' + currentTab).src = byId('address').value;
}

function close() {
  byId('tabb'+currentTab).parentNode.removeChild(byId('tab'+currentTab));
  byId('tab'+currentTab).parentNode.removeChild(byId('tab'+currentTab));
}

function newtab() {
  var t = ++currentTab;
  var tabbtn = document.createElement('button');
  tabbtn.className = 'btn';
  tabbtn.setAttribute('onclick', 'openTab('+t+')');
  tabbtn.id = 'tabb'+t;
  tabbtn.innerHTML = 'Tab '+t;
  
  var div = document.createElement('div');
  div.id = 'tab'+t;
  div.className = 'tabcontent';
  div.style.display = 'none';
  var closeBtn = document.createElement('button');
  closeBtn.onclick = 'close()';
  closeBtn.className = 'topright';
  closeBtn.innerHTML = '[x]';
  div.appendChild(closeBtn);
  var fullBtn = document.createElement('button');
  fullBtn.onclick = "fullscreen(byId('iweb'+currentTab))";
  fullBtn.className = 'topright2';
  fullBtn.innerHTML = '<ion-icon name="resize-outline"></ion-icon>';
  div.appendChild(fullBtn);
  var iframe = document.createElement('iframe');
  iframe.src = 'https://www.google.com/webhp?igu=1';
	iframe.height = '500';
  iframe.width = '100%';
  iframe.id = 'iweb'+t;
  iframe.allowFullscreen = true;
  div.appendChild(iframe);
  
  byId('tabbtns').appendChild(tabbtn);
  byId('tabs').appendChild(div);
  openTab(t);
  
}
