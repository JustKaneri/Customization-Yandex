var inputRange = document.getElementsByClassName('input_opacity')[0];

chrome.windows.getAll({populate:true},getAllOpenWindows);
var tabId = 0;

function getAllOpenWindows(winData) {
  var tabs = [];
  for (var i in winData) {
      console.log(winData[i]);
    if (winData[i].focused === true) {
        var winTabs = winData[i].tabs;
        var totTabs = winTabs.length;
        for (var j=0; j<totTabs;j++) {
         if(winTabs[j].url == "https://ya.ru/"){
            tabId = winTabs[j].id;
         }
        }
    }
  }
}

window.addEventListener('load', (event) => {
	var opac = localStorage.getItem('opac');
  if(opac == null){
    return;
  }

 	inputRange.value = opac;

});


inputRange.oninput = () => {

	console.log(inputRange.value);

	localStorage.setItem('opac',inputRange.value);
	SendMes('opac^'+ inputRange.value);	
}


async function SendMes(mes){

	chrome.tabs.sendMessage(tabId, {greeting: mes}, function(response)
	{
	    console.log('ok');
	});
}
