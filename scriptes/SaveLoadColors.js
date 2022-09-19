const colorBack = document.getElementsByClassName('color_back')[0];
const colorText = document.getElementsByClassName('color_text')[0];
const buttonClear = document.getElementsByClassName('btn_clear')[0];
var inputSrc = document.getElementsByClassName('input_src')[0];
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
 	Load();
});

buttonClear.onclick = () =>{
   SendMes('drop')
   colorBack.value = "#000000";
   colorText.value = "#000000";
   inputSrc.value = "";
   inputRange.value = 10;
   localStorage.clear();
};

function Load(){
	var back = localStorage.getItem("back");
	var text = localStorage.getItem('text');

	colorBack.value = back;
	colorText.value = text;
}

$('.color_back').change(function(){
   localStorage.setItem('back',colorBack.value);
   SendMes('back^'+colorBack.value);
});

$('.color_text').change(function(){
   localStorage.setItem('text',colorText.value);
   SendMes('text^'+ colorText.value);
});


async function SendMes(mes){

	chrome.tabs.sendMessage(tabId, {greeting: mes}, function(response)
	{
	    console.log('ok');
	});
}

