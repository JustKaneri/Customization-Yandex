const colorBack = document.getElementsByClassName('color_back')[0];
const colorText = document.getElementsByClassName('color_text')[0];
let tabId = 0;

chrome.windows.getAll({populate:true},getAllOpenWindows);

window.addEventListener('load', (event) => {
 	Load();
});



function Load(){
	var back = localStorage.getItem("back");
	var text = localStorage.getItem('text');

	colorBack.value = back;
	colorText.value = text;
}

$('.color_back').change(function(){
   localStorage.setItem('back',colorBack.value);
   SendMes('all ok')
});

$('.color_text').change(function(){
   localStorage.setItem('text',colorText.value);
});


async function SendMes(mes){

	chrome.tabs.sendMessage(tabId, {greeting: mes}, function(response)
	{
	    console.log(response.farewell);
	});
}


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
